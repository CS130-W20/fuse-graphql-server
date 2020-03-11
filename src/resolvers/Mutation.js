import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError, ApolloError } from 'apollo-server';
import fetch from 'node-fetch';
import {
  APP_SECRET, createPairKey, getUserId, incrementStatus,
} from '../utils';
import query from './Query';
import { LIST_DIFF_TYPE, FRIEND_STATUS } from '../constants';

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


async function createEvent(parent, { title, description, invitees }, context) {
  const selfUserId = await getUserId({ context });

  const owner = {
    connect: {
      id: selfUserId,
    },
  };

  const inviteeIdObjs = invitees.map((invitee) => (
    {
      id: invitee,
    }
  ));

  const invited = {
    connect: inviteeIdObjs,
  };

  return context.prisma.createEvent({
    title,
    description,
    owner,
    status: 'SET',
    invited,
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

      return 'Request sent.';
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

async function removeFriend(parent, { userId }, context) {
  // get user id
  const selfUserId = await getUserId({ context });
  const selfPairKey = createPairKey(selfUserId, userId);
  const friendPairKey = createPairKey(userId, selfUserId);

  // verify users are friends
  const friendshipStatus = await query.friendshipStatus(parent, { friendUserId: userId }, context);
  if (friendshipStatus !== FRIEND_STATUS.CONFIRMED) {
    throw new ApolloError('Cannot remove someone who is not already your friend');
  }

  const removalMutation = await context.prisma.deleteManyFriendships({
    pairKey_in: [selfPairKey, friendPairKey],
  });

  if (removalMutation && removalMutation.count === 2) {
    return true;
  }

  return false;
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

async function updateEventInviteList(parent, { eventId, userDiffList }, context) {
  // TODO verify authorization to do this

  // TODO verify first that all requested operations are valid. E.g. all users
  // to add are not in the list and all users to remove are in the list

  await userDiffList.forEach(async (diff) => {
    const { userId, diffType } = diff;
    const where = {
      id: eventId,
    };

    switch (diffType) {
      case LIST_DIFF_TYPE.add: {
        await context.prisma.updateEvent({
          where,
          data: {
            invited: {
              connect: {
                id: userId,
              },
            },
          },
        });
        break;
      }
      case LIST_DIFF_TYPE.remove: {
        await context.prisma.updateEvent({
          where,
          data: {
            invited: {
              disconnect: {
                id: userId,
              },
            },
          },
        });
        break;
      }
      default: {
        throw new ApolloError('Invalid list diff type');
      }
    }
  });

  return context.prisma.event({
    id: eventId,
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

async function joinEvent(parent, { eventId }, context) {
  const userId = await getUserId({ context });

  const invited = await context.prisma.event({
    id: eventId,
  }).invited();

  if (!invited.find((user) => user.id === userId)) throw new Error('Cannot join this event');

  return context.prisma.updateEvent({
    where: {
      id: eventId,
    },
    data: {
      joined: {
        connect: {
          id: userId,
        },
      },
      invited: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
}

async function leaveEvent(parent, { eventId }, context) {
  const userId = await getUserId({ context });

  const joined = await context.prisma.event({
    id: eventId,
  }).joined();

  if (!joined.find((user) => user.id === userId)) throw new Error('Cannot leave this event');

  return context.prisma.updateEvent({
    where: {
      id: eventId,
    },
    data: {
      joined: {
        disconnect: {
          id: userId,
        },
      },
      invited: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export default {
  signup,
  login,
  createEvent,
  requestFriend,
  confirmFriend,
  removeFriend,
  updateEventStatus,
  updateEventDetails,
  updateEventInviteList,
  updateProfileDetails,
  joinEvent,
  leaveEvent,
};
