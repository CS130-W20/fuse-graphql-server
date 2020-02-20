import { getUserId } from '../utils';

function ping() {
  return 'pong';
}

async function user(parent, args, context) {
  const userId = getUserId({ context });
  console.log(`logged in user id: ${userId}`);
  return context.prisma.user({
    id: userId,
  });
}

export default {
  ping,
  user,
};
