import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const APP_SECRET = 'l1ght-Th3-4uz3';

function getUserId({ context }) {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
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
