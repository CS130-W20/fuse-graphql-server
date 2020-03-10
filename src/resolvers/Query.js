import { ApolloError } from 'apollo-server';
import { createPairKey, getUserId } from '../utils';
import { EVENT_STATUS, EVENT_ORDER, FRIEND_STATUS } from '../constants';

function ping() {
  return 'pong';
}

async function user(parent, { id }, context) {
  return context.prisma.user({
    id,
  });
}

async function me(parent, args, context) {
  return getUserId({ context })
    .then((userId) => context.prisma.user({
      id: userId,
    }));
}

async function event(parent, { eventId }, context) {
  // TODO verify that use has permissions to access event
  const eventQuery = await context.prisma.event({
    id: eventId,
  });

  if (!eventQuery) {
    throw new ApolloError('An event with that ID does not exist');
  }

  return eventQuery;
}

async function completedEvents(parent, { userId }, context) {
  return context.prisma.events({
    where: {
      owner: {
        id: userId,
      },
      status: EVENT_STATUS.completed,
    },
  });
}

async function completedEventsCount(parent, { userId }, context) {
  let queryUserId;

  if (userId != null) {
    queryUserId = userId;
  } else {
    queryUserId = await getUserId({ context });
  }

  const eventsConnection = await context.prisma.eventsConnection({
    where: {
      AND: [{
        OR: [{
          owner: {
            id: queryUserId,
          },
        },
        {
          joined_some: {
            id: queryUserId,
          },
        }],
      },
      {
        status: EVENT_STATUS.completed,
      }],
    },
  }).aggregate();

  return eventsConnection.count;
}

async function newsFeed(parent, args, context) {
  const userId = await getUserId({ context });

  return context.prisma.events({
    where: {
      OR: [
        {
          owner: {
            id: userId,
          },
        },
        {
          invited_some: {
            id: userId,
          },
        },
        {
          joined_some: {
            id: userId,
          },
        },
      ],
    },
    orderBy: EVENT_ORDER.updateTimeDesc,
  });
}

async function friendProfileEvents(parent, { friendUserId }, context) {
  // TODO verify that friendUserId is in fact a friend
  const currentUserId = await getUserId({ context });
  return context.prisma.events({
    where: {
      OR: [
        {
          // friend-owned set/lit events where user is invited
          AND: [
            {
              owner: {
                id: friendUserId,
              },
              invited_some: {
                id: currentUserId,
              },
            },
            {
              status_in: [EVENT_STATUS.set, EVENT_STATUS.lit],
            },
          ],
        },
        {
          // friend-owned set/lit events where user joined
          AND: [
            {
              owner: {
                id: friendUserId,
              },
              joined_some: {
                id: currentUserId,
              },
            },
            {
              status_in: [EVENT_STATUS.set, EVENT_STATUS.lit],
            },
          ],
        },
        {
          OR: [
            {
              // friend-owned completed events
              AND: [
                {
                  owner: {
                    id: friendUserId,
                  },
                },
                {
                  status_in: [EVENT_STATUS.completed],
                },
              ],
            },
            {
              // friend-participated completed events
              AND: [
                {
                  joined_some: {
                    id: friendUserId,
                  },
                },
                {
                  status_in: [EVENT_STATUS.completed],
                },
              ],
            },
          ],
        },
      ],
    },
    orderBy: EVENT_ORDER.updateTimeDesc,
  });
}

async function friendsCount(parent, { userId }, context) {
  let queryUserId;

  if (userId != null) {
    queryUserId = userId;
  } else {
    queryUserId = await getUserId({ context });
  }

  const friendsConnection = await context.prisma.friendshipsConnection({
    where: {
      pairKey_starts_with: queryUserId,
      status: FRIEND_STATUS.CONFIRMED,
    },
  }).aggregate();

  return friendsConnection.count;
}

async function friendshipStatus(parent, { friendUserId }, context) {
  const userId = await getUserId({ context });
  const pairKey = createPairKey(userId, friendUserId);
  const friendship = await context.prisma.friendship({
    pairKey,
  });

  if (!friendship) {
    return FRIEND_STATUS.NONE;
  }

  return friendship.status;
}

async function users(parent, { prefix }, context) {
  return context.prisma.users({
    where: {
      name_starts_with: prefix,
    },
    orderBy: 'name_ASC',
  });
}

export default {
  ping,
  user,
  me,
  event,
  completedEvents,
  completedEventsCount,
  newsFeed,
  friendProfileEvents,
  friendsCount,
  friendshipStatus,
  users,
};
