import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import fetch from 'node-fetch';

const APP_SECRET = 'l1ght-Th3-4uz3';

async function getUserId({ context }) {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    try {
      return fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,email`)
        .then((response) => response.json())
        .then(async ({ email }) => context.prisma.user({ email }).id())
        .catch(() => {
          const { userId } = jwt.verify(token, APP_SECRET);
          return userId;
        })
        .catch(() => {
          throw new AuthenticationError('Not authenticated');
        });
    } catch (err) {
      const { userId } = jwt.verify(token, APP_SECRET);
      return userId;
    }
  }
  throw new AuthenticationError('Not authenticated');
}

function createPairKey(selfUserId, userId) {
  return `${selfUserId}-${userId}`;
}


export {
  APP_SECRET,
  getUserId,
  createPairKey,
};
