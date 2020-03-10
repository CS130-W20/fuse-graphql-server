import { noAuthClient } from './client';
import { TEST_USER } from './constants';
import { LOGIN_MUTATION, PING_QUERY } from './graphqlQueries';

test('ping the graphql server', async () => {
  const { data } = await noAuthClient.query({
    query: PING_QUERY,
  });
  expect(data).toStrictEqual({ ping: 'pong' });
});

test('get auth token', async () => {
  const { data: { login: { token } } } = await noAuthClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email: TEST_USER.email, password: TEST_USER.password },
  });
  expect(token).toBeDefined();
});

test('wrong password fails login', async () => {
  await noAuthClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email: TEST_USER.email, password: `${TEST_USER.password}+fakenews` },
  }).catch((error) => {
    expect(error.message).toBe('GraphQL error: Invalid password');
  });
});

test('invalid email fails login', async () => {
  await noAuthClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email: `${TEST_USER.email}+fakenews`, password: TEST_USER.password },
  }).catch((error) => {
    expect(error.message).toBe('GraphQL error: Email is not associated with a user');
  });
});
