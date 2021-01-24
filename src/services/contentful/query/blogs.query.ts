import gql from 'graphql-tag';
import { blogFragment } from './blogs.fragment';

export const blogsQuery = gql`
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

export const blogBySlugQuery = gql`
  query BlogBySlug($slug: String) {
    sujamesBlogCollection(where: { slug: $slug }) {
      items {
        ...BlogFragment
      }
    }
  }
  ${blogFragment}
`;