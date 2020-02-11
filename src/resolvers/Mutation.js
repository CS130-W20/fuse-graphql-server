import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { APP_SECRET } from '../utils';

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
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.hash);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

export default {
  signup,
  login,
};
