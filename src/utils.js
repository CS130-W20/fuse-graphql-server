import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import fetch from 'node-fetch';

const APP_SECRET = 'l1ght-Th3-4uz3';

async function getUserId({ context }) {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
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
  }
  throw new AuthenticationError('Not authenticated');
}

function createPairKey(selfUserId, userId) {
  return `${selfUserId}-${userId}`;
}

function incrementStatus(currentStatus) {
  switch (currentStatus) {
    case 'SET': {
      return 'LIT';
    }
    case 'LIT': {
      return 'COMPLETED';
    }
    default:
      return 'COMPLETED';
  }
}


export {
  APP_SECRET,
  getUserId,
  createPairKey,
  incrementStatus,
};
