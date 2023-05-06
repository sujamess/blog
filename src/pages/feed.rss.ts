import { getBlogCollection } from '@core/services/blog';
import rss from '@astrojs/rss';

export const get = async () => {
  const blogs = await getBlogCollection()

  const rssItems = blogs.map(item => {
    const { data, slug } = item;

    return {
      title: data.title,
      description: data.description || '',
      link: `/${slug}`,
      pubDate: new Date(data.createdAt),
    }
  });

  return rss({
    title: 'Sujamess Blog',
    description: 'Stay ahead of the curve with my tech blog, featuring the latest news, trends, and insights on all things tech, and lifestyle',
    site: 'https://blog.sujamess.com',
    items: rssItems,
  });
}
