import { getUserId } from '../utils';

function ping() {
  return 'pong';
}

async function user(parent, args, context) {
  const userId = getUserId({ context });
  return context.prisma.user({
    id: userId,
  });
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

export default {
  ping,
  user,
  completedEvents,
};
