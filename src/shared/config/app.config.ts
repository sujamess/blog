const appConfig = {
  contentful: {
    baseUrl: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    deliveryApiAccessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN,
    previewApiAccessToken: process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN,
  },
  google: {
    analytics: {
      measurement_id: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
    },
  },
};

export default appConfig;
