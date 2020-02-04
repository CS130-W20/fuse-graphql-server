import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../prisma/generated/prisma-client';

const ENV = process.env.NODE_ENV;
const URL = ENV === 'production' ? 'https://light-the-fuse.herokuapp.com/' : 'http://localhost:4000';

const typeDefs = `
  type Query {
    ping: String!
    People: [Person]
  }
  
  type Person {
    name: String!
    age: Int!
  }
`;

const resolvers = {
  Query: {
    ping: () => 'pong',
    People: (_root, _args, context) => context.prisma.persons(),
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { prisma },
});

// eslint-disable-next-line no-console
server.start(() => console.log(`${ENV} Server is running on ${URL}!`));
