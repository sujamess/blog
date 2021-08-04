export const blogFragment = `
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