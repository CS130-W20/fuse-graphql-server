import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { URL } from './constants';
import { LOGIN_MUTATION, PING_QUERY } from './graphqlQueries';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: URL,
  fetch,
});

const client = new ApolloClient({
  link,
  cache,
});

test('ping the graphql server', async () => {
  const { data } = await client.query({
    query: PING_QUERY,
  });
  expect(data).toStrictEqual({ ping: 'pong' });
});

test('get auth token', async () => {
  const { data: { login: { token } } } = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email: 'test@testmail.com', password: 'password' },
  });
  expect(token).toBeDefined();
});

test('wrong password fails login', async () => {
  await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email: 'test@testmail.com', password: 'wrong_password' },
  }).catch((error) => {
    expect(error.message).toBe('GraphQL error: Invalid password');
  });
});

test('invalid email fails login', async () => {
  await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email: 'fake@fakemail.com', password: 'password' },
  }).catch((error) => {
    expect(error.message).toBe('GraphQL error: Email is not associated with a user');
  });
});
