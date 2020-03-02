import { getUserId } from '../utils';

function ping() {
  return 'pong';
}

async function user(parent, args, context) {
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
  });
}

export default {
  ping,
  user,
  completedEvents,
  newsFeed,
};
