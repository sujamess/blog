import { getBlogData, getBlogsId, IBlogData } from 'lib/blog';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatDate, formatReadingTime } from 'utils/formatter';
import Head from 'next/head';
import Divider from 'components/Divider';
import { BLOG_INDEX_PAGE_TITLE } from 'pages';
import Markdown from 'components/Markdown';
interface IBlogProps {
  blogData: IBlogData;
}

const Blog = ({ blogData }: IBlogProps) => {
  return (
    <>
      <Head>
        <title>{BLOG_INDEX_PAGE_TITLE} • {blogData.metaData.title}</title>
        <meta name="description" content={blogData.metaData.description} />
      </Head>
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-3/4 px-4 py-4">
          <p className="text-4xl font-medium break-words">{blogData.metaData.title}</p>
          <p className="text-sm font-extralight">{formatDate(blogData.metaData.date)} • {formatReadingTime(blogData.metaData.readingTime)}</p>
          <Divider />
        </div>
        <div className="w-full sm:w-3/4 px-4 py-4">
          <Markdown content={blogData.content} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogData = await getBlogData(params.id as string);
  
  return {
    props: {
      blogData,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getBlogsId();

  return {
    paths,
    fallback: false,
  }
}

export default Blog;
