import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';
import { APP_SECRET, getUserId } from '../utils';

async function signup(parent, { email, name, password }, context) {
  const hash = await bcrypt.hash(password, 10);
  const user = await context.prisma.createUser({ email, name, hash });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new AuthenticationError('Email is not associated with a user');
  }

  const valid = await bcrypt.compare(args.password, user.hash);
  if (!valid) {
    throw new AuthenticationError('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}


async function createEvent(parent, { title }, context) {
  const ownerId = getUserId({ context });
  const owner = {
    connect: {
      id: ownerId,
    },
  };

  return context.prisma.createEvent({
    title,
    owner,
  });
}

export default {
  signup,
  login,
  createEvent,
};
