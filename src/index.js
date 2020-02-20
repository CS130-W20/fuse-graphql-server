import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../prisma/generated/prisma-client';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';

const ENV = process.env.NODE_ENV;
const URL = ENV === 'production' ? 'https://light-the-fuse.herokuapp.com/' : 'http://localhost:4000';

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

// eslint-disable-next-line no-console
server.start(() => console.log(`${ENV} Server is running on ${URL}!`));
