import { initializeApolloClient } from 'src/apollo/client.apollo'
import appConfig from 'src/shared/config/app.config';
import { NOT_FOUND_ERROR_MESSAGE } from 'src/shared/constants/error.constant';
import { blogBySlugQuery, blogsQuery } from './query/blogs.query'
import { BlogBySlug, BlogBySlugVariables, BlogBySlug_sujamesBlogCollection_items } from './query/__generated__/BlogBySlug';
import { BlogCollection, BlogCollectionVariables, BlogCollection_sujamesBlogCollection_items } from './query/__generated__/BlogCollection';

interface IGetBlogsArgs {
  preview?: boolean;
}

interface IGetBlogBySlugArgs {
  slug: string;
  preview?: boolean;
}

export const getBlogs = async (args?: IGetBlogsArgs): Promise<BlogCollection_sujamesBlogCollection_items[]> => {
  const { data } = await initializeApolloClient().query<BlogCollection, BlogCollectionVariables>({
    context: {
      headers: {
        Authorization: `Bearer ${args && args.preview
          ? appConfig.contentful.previewApiAccessToken
          : appConfig.contentful.deliveryApiAccessToken
        }`,
      },
    },
    query: blogsQuery,
    variables: {
      ...args,
    },
    fetchPolicy: 'cache-first',
  });

  return data.sujamesBlogCollection.items;
};

export const getBlogBySlug = async (args: IGetBlogBySlugArgs): Promise<BlogBySlug_sujamesBlogCollection_items> => {
  const { default: isEmpty } = await import ('lodash/isEmpty');

  const { data } = await initializeApolloClient().query<BlogBySlug, BlogBySlugVariables>({
    context: {
      headers: {
        Authorization: `Bearer ${args && args.preview
          ? appConfig.contentful.previewApiAccessToken
          : appConfig.contentful.deliveryApiAccessToken
        }`,
      },
    },
    query: blogBySlugQuery,
    variables: {
      slug: args.slug,
    },
    fetchPolicy: 'cache-first',
  });

  if (isEmpty(data.sujamesBlogCollection.items)) {
    throw NOT_FOUND_ERROR_MESSAGE;
  }

  return data.sujamesBlogCollection.items[0];
};
