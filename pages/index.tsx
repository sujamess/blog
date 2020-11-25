import Card from 'components/Card';
import { getSortedPostsData, IBlogData } from 'lib/blog';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface IBlogsProps {
  blogsData: IBlogData[];
}

const BLOG_INDEX_PAGE_TITLE = 'Sujames Blog';
const BLOG_INDEX_PAGE_META = 'Sujames Blog that build from Next.js';

const Blogs = ({ blogsData }: IBlogsProps) => {
  return (
    <>
      <Head>
        <title>{BLOG_INDEX_PAGE_TITLE}</title>
        <meta name="description" content={BLOG_INDEX_PAGE_META} />
      </Head>
      <div className="flex flex-col items-center h-screen">
        <div className="w-11/12 md:w-8/12 flex flex-wrap -mx-4">
          {blogsData.map((blogData, index) => (
            <Card
              key={index}
              id={blogData.id}
              title={blogData.title}
              estimatedTime={blogData.estimatedTime}
              description={blogData.description}
              date={blogData.date}
            />
          ))}
          <div className="w-full flex justify-between pb-8 sm:pb-8 mt-4 sm:mt-8 px-4">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-mono hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Newer
            </button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-mono hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Older
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogsData = await getSortedPostsData();

  return {
    props: {
      blogsData,
    },
  };
};

export default Blogs;
