import jwt from 'jsonwebtoken';

const APP_SECRET = 'l1ght-Th3-4uz3';

function getUserId({ context }) {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error('Not authenticated');
}


export {
  APP_SECRET,
  getUserId,
};
