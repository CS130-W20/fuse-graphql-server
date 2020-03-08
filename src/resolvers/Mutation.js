import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError, ApolloError } from 'apollo-server';
import fetch from 'node-fetch';
import {
  APP_SECRET, createPairKey, getUserId, incrementStatus,
} from '../utils';

async function signup(parent, { email, name, password }, context) {
  const hash = await bcrypt.hash(password, 10);
  const user = await context.prisma.createUser({
    email,
    name,
    score: 0,
    hash,
  });

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


async function createEvent(parent, { title, description }, context) {
  return getUserId({ context })
    .then((ownerId) => {
      const owner = {
        connect: {
          id: ownerId,
        },
      };

      return context.prisma.createEvent({
        title,
        description,
        owner,
        status: 'SET',
      });
    });
}

async function requestFriend(parent, { userId }, context) {
  return getUserId({ context })
    .then(async (selfUserId) => {
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
    });
}

async function confirmFriend(parent, { userId }, context) {
  return getUserId({ context })
    .then(async (selfUserId) => {
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

      return 'Friendship confirmed';
    });
}

/**
 * Use to update the event title, description, and eventually the date/time etc
 * @param {*} eventId event ID
 * @param {*} title new title of event or null
 * @param {*} description new desciption of event or null
 */
async function updateEventDetails(parent, { eventId, title, description }, context) {
  if (title == null && description == null) {
    throw new ApolloError('Nothing to change... Please supply new data');
  }

  const eventUpdate = {};

  if (title != null) {
    eventUpdate.title = title;
  }
  if (description != null) {
    eventUpdate.description = description;
  }

  return context.prisma.updateEvent({
    where: {
      id: eventId,
    },
    data: eventUpdate,
  });
}

async function updateEventStatus(parent, { eventId, currentEventStatus, newEventStatus }, context) {
  // TODO verify that user has auth to change event status
  // get the event to verify the currentEventStatus is the same as the event status
  const event = await context.prisma.event({
    id: eventId,
  });

  if (event.status !== currentEventStatus) {
    throw new ApolloError('Event status and current status does not match');
  }

  if (newEventStatus == null && currentEventStatus === 'COMPLETED') {
    throw new ApolloError('Event is already complete');
  }

  const newAssignedStatus = (newEventStatus == null)
    ? incrementStatus(currentEventStatus)
    : newEventStatus;

  return context.prisma.updateEvent({
    where: {
      id: eventId,
    },
    data: {
      status: newAssignedStatus,
    },
  });
}

async function updateProfileDetails(parent, { name, bio }, context) {
  const userId = await getUserId({ context });

  const data = { name, bio };

  return context.prisma.updateUser({
    where: {
      id: userId,
    },
    data,
  });
}

export default {
  signup,
  login,
  createEvent,
  requestFriend,
  confirmFriend,
  updateEventStatus,
  updateEventDetails,
  updateProfileDetails,
};
