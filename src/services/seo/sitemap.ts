import { NextApiHandler } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';
import { INTERNAL_SERVER_ERROR_STATUS_CODE, INTERNAL_SERVER_ERROR_MESSAGE } from 'src/shared/constants/error.constant';
import { getSortedPostsData } from '../../lib/blog';

const sitemapApi: NextApiHandler = async (req, res) => {
  try {
    const blogs = await getSortedPostsData();

    const sitemapStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    sitemapStream.write({
      url: '',
      changefreq: 'daily',
      priority: 0.7,
    });

    blogs.forEach((blog) => {
      sitemapStream.write({
        url: blog.id,
        lastmod: blog.metaData.date,
        changefreq: 'daily',
        priority: 0.7,
      });
    });

    sitemapStream.end();
    
    const sitemap = await streamToPromise(sitemapStream);

    res.write(sitemap.toString());

    res.end();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send(INTERNAL_SERVER_ERROR_MESSAGE);
  }
};

export default sitemapApi;
