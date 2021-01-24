import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Card from 'src/components/Card';
import Pagination from 'src/components/Pagination';
import SEO from 'src/components/SEO';
import { BlogCollection_sujamesBlogCollection_items } from 'src/services/contentful/query/__generated__/BlogCollection';
import { defaultDateFormat } from 'src/shared/constants/app.constant';

interface IBlogsProps {
  blogs: BlogCollection_sujamesBlogCollection_items[];
}

const Blogs = ({ blogs }: IBlogsProps) => {
  return (
    <>
      <SEO />
      <div className="max-w-7xl mx-auto space-y-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {blogs.map((blog, index) => (
            <Card
              key={index}
              slug={blog.slug}
              title={blog.title}
              tags={blog.tags}
              coverImgUrl={blog.coverImg.url}
              coverImgWidth={blog.coverImg.width}
              coverImgHeight={blog.coverImg.height}
              description={blog.description}
              date={blog.createdAt}
            />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const { default: dayjs } = await import ('dayjs');
  const { default: chunk } = await import ('lodash/chunk');
  const { default: get } = await import ('lodash/get');
  const { getBlogs } = await import ('src/services/contentful/blogs');

  const targetPage = Number(get(context, 'params.page[1]', '1'))
  const blogs = await getBlogs();
  const blogChunks = chunk(blogs, 9);

  return {
    props: {
      blogs: get(blogChunks, targetPage - 1).map((blog) => ({
        ...blog,
        createdAt: dayjs(blog.createdAt).format(defaultDateFormat),
      })),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: chunk } = await import ('lodash/chunk');
  const { getBlogs } = await import ('src/services/contentful/blogs');

  const blogs = await getBlogs();
  const blogChunks = chunk(blogs, 9);

  return {
    paths: blogChunks.map((_, i) => {
      const page = i + 1;

      return {
        params: {
          page: page === 1 ? [] : ['pages', page.toString()],
        },
      };
    }),
    fallback: false,
  };
};

export default Blogs;
