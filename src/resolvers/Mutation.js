import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';
import fetch from 'node-fetch';
import { APP_SECRET, createPairKey, getUserId } from '../utils';

async function signup(parent, { email, name, password }, context) {
  const hash = await bcrypt.hash(password, 10);
  const user = await context.prisma.createUser({ email, name, hash });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, { email, password, fbToken }, context) {
  if (email && password) {
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new AuthenticationError('Email is not associated with a user');
    }

    const valid = await bcrypt.compare(password, user.hash);
    if (!valid) {
      throw new AuthenticationError('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  }

  if (fbToken) {
    return fetch(`https://graph.facebook.com/me?access_token=${fbToken}&fields=name,email`)
      .then((response) => response.json())
      .then((data) => context.prisma.upsertUser({
        where: {
          email: data.email,
        },
        create: {
          name: data.name,
          email: data.email,
        },
        update: {},
      }))
      .then((user) => ({
        token: fbToken,
        user,
      }));
  }
  throw new AuthenticationError('must provide email + password or fb token');
}


async function createEvent(parent, { title }, context) {
  const ownerId = getUserId({ context });
  const owner = {
    connect: {
      id: ownerId,
    },
  };

  return context.prisma.createEvent({
    title,
    owner,
    status: 'SET',
  });
}

async function requestFriend(parent, { userId }, context) {
  const selfUserId = getUserId({ context });
  const selfPairKey = createPairKey(selfUserId, userId);
  const friendPairKey = createPairKey(userId, selfUserId);

  // add sent request
  await context.prisma.updateUser({
    where: {
      id: selfUserId,
    },
    data: {
      friends: {
        upsert: {
          where: {
            pairKey: selfPairKey,
          },
          create: {
            friend: {
              connect: {
                id: userId,
              },
            },
            pairKey: selfPairKey,
            status: 'SENT_REQUEST',
          },
          update: {
            status: 'SENT_REQUEST',
          },
        },
      },
    },
  });

  // add received request
  await context.prisma.updateUser({
    where: {
      id: userId,
    },
    data: {
      friends: {
        upsert: {
          where: {
            pairKey: friendPairKey,
          },
          create: {
            friend: {
              connect: {
                id: selfUserId,
              },
            },
            pairKey: friendPairKey,
            status: 'RECEIVED_REQUEST',
          },
          update: {
            status: 'RECEIVED_REQUEST',
          },
        },
      },
    },
  });
}

async function confirmFriend(parent, { userId }, context) {
  const selfUserId = getUserId({ context });
  const selfPairKey = createPairKey(selfUserId, userId);
  const friendPairKey = createPairKey(userId, selfUserId);

  const receivedRequest = await context.prisma.friendship({
    pairKey: selfPairKey,
  }).status()
    .then((status) => status === 'RECEIVED_REQUEST');

  if (!receivedRequest) throw new AuthenticationError('Cannot confirm unreceived friendship request');

  const sentRequest = await context.prisma.friendship({
    pairKey: friendPairKey,
  }).status()
    .then((status) => status === 'SENT_REQUEST');

  if (!sentRequest) throw new AuthenticationError('Cannot confirm unsent friendship request');

  await context.prisma.updateManyFriendships({
    where: {
      pairKey_in: [selfPairKey, friendPairKey],
    },
    data: {
      status: 'CONFIRMED',
    },
  });

  return 'Frienship confirmed';
}

export default {
  signup,
  login,
  createEvent,
  requestFriend,
  confirmFriend,
};
