import gql from 'graphql-tag';

export const blogFragment = gql`
  fragment BlogFragment on SujamesBlog {
    slug
    title
    coverImg {
      width
      height
      url
    }
    createdAt
    description
    content
    tags
  }
`;
