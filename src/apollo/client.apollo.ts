import { ApolloClient, InMemoryCache } from '@apollo/client';
import appConfig from 'src/shared/config/app.config';

let apolloClient: ApolloClient<any>;

export const initializeApolloClient = (): ApolloClient<any> => {
  // Return if contentfulClient is already initialized
  if (apolloClient) {
    return apolloClient;
  }

  // Create the Apollo Client once in the client
  apolloClient = apolloClient
    ?? new ApolloClient({
      uri: appConfig.contentful.baseUrl,
      cache: new InMemoryCache(),
    });

  // Restore the cache using the data passed from
  // getStaticProps/getServerSideProps
  apolloClient.cache.restore({ ...apolloClient.extract() });

  return apolloClient;
};
