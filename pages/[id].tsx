import { getBlogData, getBlogsId, IBlogData } from 'lib/blog';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatDate, formatReadingTime } from 'utils/formatter';
import Head from 'next/head';

interface IBlogProps {
  blogData: IBlogData;
}

const Blog = ({ blogData }: IBlogProps) => {
  return (
    <>
      <Head>
        <title>{blogData.title}</title>
        <meta name="description" content={blogData.description} />
      </Head>
      <div className="flex flex-col items-center">
        <div className="h-full w-1/2 px-4 py-4">
          <p className="text-4xl font-extrabold">{blogData.title}</p>
          <p className="text-sm">{formatDate(blogData.date)} • {formatReadingTime(blogData.estimatedTime)}</p>
        </div>
          <div className="w-screen border-b-2" />
        <div className="h-full w-1/2 px-4 py-4">
          <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
          {/* {blogData.contentHtml} */}
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
