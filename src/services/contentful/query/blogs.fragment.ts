import gql from 'graphql-tag';

export const blogFragment = gql`
  fragment BlogFragment on SujamesBlog {
    slug
    title
    coverImg {
      url
    }
    createdAt
    description
    content
    tags
  }
`;
