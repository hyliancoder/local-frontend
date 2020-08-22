import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
// import { persistCache } from 'apollo-cache-persist';

/**
 * Creates a Apollo Link, that adds authentication token to request
 */
const createAuthLink = () => {
  const request = operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  };

  return new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
};

/**
 * Helper functions that handles error cases
 */
const handleErrors = () => {
  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver

            // modify the operation context with a new token
            const newToken = localStorage.getItem('token');
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: newToken,
              },
            });
            // retry the request, returning the new observable
            return forward(operation);
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  });
};

/**
 * Creates a Apollo Client
 *
 * @param {string} apiUrl, GraphQL api url
 * @param {string} websocketApiUrl, GraphQL WebSocket api url
 */

export const createApolloClient = (apiUrl, websocketApiUrl) => {
  const cache = new InMemoryCache();

  //need to fix it not updating cache on all users updates, only updates feed on adding/removing your own
  // try {
  //   persistCache({
  //     cache: cache,
  //     storage: window.localStorage,
  //   });
  // } catch (error) {
  //   console.error('Error restoring Apollo cache', error);
  // }

  const errorLink = handleErrors();
  const authLink = createAuthLink();
  const uploadLink = createUploadLink({ uri: apiUrl }); // Upload link also creates an HTTP link

  // Create WebSocket link
  const authToken = localStorage.getItem('token');
  const wsLink = new WebSocketLink({
    uri: websocketApiUrl,
    options: {
      timeout: 60000,
      reconnect: true,
      connectionParams: {
        authorization: authToken,
      },
    },
  });

  // Temporary fix for early websocket closure resulting in websocket connections not being instantiated
  // https://github.com/apollographql/subscriptions-transport-ws/issues/377

  wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
    wsLink.subscriptionClient.maxConnectTimeGenerator.max;

  // Split links, so we can send data to each link
  // depending on what kind of operation is being sent
  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    uploadLink
  );

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, terminatingLink]),
    cache,
  });
};
