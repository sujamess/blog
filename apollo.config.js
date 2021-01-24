require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'contentful',
      url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}?access_token=${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
      headers: {},
      skipSSLValidation: true,
    },
  },
};