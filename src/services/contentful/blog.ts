import { blogFragment } from 'src/shared/constants/graphql.constant';
import config from 'src/shared/config/app.config';
import { Blog, GetBlogsResult } from 'src/shared/@types/blog';

export const getBlogs = async (preview = false): Promise<Blog[]> => {
  const query = `
    query BlogCollection($skip: Int, $limit: Int, $preview: Boolean) {
      sujamesBlogCollection(
        skip: $skip,
        limit: $limit,
        preview: $preview,
        order: [createdAt_DESC]
      ) {
        items {
          ...BlogFragment
        }
      }
    }
    ${blogFragment}
  `;

  try {
    const blogs: GetBlogsResult = await fetch(
      config.contentful.baseUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${preview
              ? config.contentful.previewApiAccessToken
              : config.contentful.deliveryApiAccessToken
            }`,
        },
        body: JSON.stringify({
          query,
        }),
      }
    ).then(res => res.json());

    return blogs.data.sujamesBlogCollection.items;
  } catch (error) {
    throw error;
  }
}

export const getBlogBySlug = async (slug: string, preview = false) => {
  const query = `
    query BlogBySlug($slug: String) {
      sujamesBlogCollection(where: { slug: $slug }) {
        items {
          ...BlogFragment
        }
      }
    }
    ${blogFragment}
  `;

  try {
    const blogs: GetBlogsResult = await fetch(
      config.contentful.baseUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${
            preview
            ? config.contentful.previewApiAccessToken
            : config.contentful.deliveryApiAccessToken
          }`,
        },
        body: JSON.stringify({
          query,
          variables: {
            slug,
          },
        }),
      }
    ).then(res => res.json());

    return blogs.data.sujamesBlogCollection.items[0];
  } catch (error) {
    return error.json();
  }
}

