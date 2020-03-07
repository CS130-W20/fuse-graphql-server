import { getUserId } from '../utils';

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

async function completedEvents(parent, { userId }, context) {
  return context.prisma.events({
    where: {
      owner: {
        id: userId,
      },
      status: 'COMPLETED',
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
        status: 'COMPLETED',
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
    orderBy: 'updatedAt_DESC',
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
      id: queryUserId,
    },
  }).aggregate();

  return friendsConnection.count;
}

export default {
  ping,
  user,
  me,
  completedEvents,
  completedEventsCount,
  newsFeed,
  friendsCount,
};
