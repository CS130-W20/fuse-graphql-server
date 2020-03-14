import { authClient } from './client';
import { USER_QUERY } from './graphqlQueries';
import { TEST_USER } from './constants';

test('test user query', async () => {
  const { data } = await authClient.query({
    query: USER_QUERY,
    variables: {
      id: TEST_USER.id,
    },
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
