import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { TEST_USER, URL } from './constants';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: URL,
  fetch,
});

const authLink = setContext((_, { headers }) => () => ({
  headers: {
    ...headers,
    authorization: `Bearer ${TEST_USER.token}`,
  },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // eslint-disable-next-line no-console
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }

  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const authClient = new ApolloClient({
  cache,
  link: authLink.concat(errorLink.concat(link)),
});

export const noAuthClient = new ApolloClient({
  cache,
  link: errorLink.concat(link),
});
