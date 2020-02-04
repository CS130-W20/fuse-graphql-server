import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../prisma/generated/prisma-client';

const ENV = process.env.NODE_ENV;

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
server.start(() => console.log(`Server is running on ${ENV}!`));
