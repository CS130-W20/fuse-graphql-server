import { authClient } from './client';
import { USER_QUERY } from './graphqlQueries';

test('ping the graphql server', async () => {
  const { data } = await authClient.query({
    query: USER_QUERY,
  });
  expect(data).toStrictEqual({
    user: {
      __typename: 'User',
      id: 'ck751iad6000h0711u9sqkbfa',
      name: 'Test User',
      email: 'test@testmail.com',
      ownedEvents: data.user.ownedEvents,
    },
  });

  expect(data.user.ownedEvents).toBeDefined();
});
