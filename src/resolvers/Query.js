import { getUserId } from '../utils';

function ping() {
  return 'pong';
}

async function user(parent, args, context) {
  console.log(context);
  const userId = getUserId({ context });
  return context.prisma.user({
    id: userId,
  });
}

export default {
  ping,
  user,
};
