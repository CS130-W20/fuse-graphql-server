import { authClient } from './client';
import { FRIENDSHIP_STATUS_QUERY } from './graphqlQueries';

test('test friendship status query', async () => {
  const { data } = await authClient.query({
    query: FRIENDSHIP_STATUS_QUERY,
    variables: {
      friendUserId: 'ck742ckz9003q078173447mrg',
    },
  });
  expect(data).toStrictEqual({
    friendshipStatus: 'CONFIRMED',
  });
});
