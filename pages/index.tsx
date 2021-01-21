import Card from 'components/Card';
import { getSortedPostsData, IBlogData } from 'lib/blog';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface IBlogsProps {
  blogsData: IBlogData[];
}

export const BLOG_INDEX_PAGE_TITLE = 'Sujames Blog';
const BLOG_INDEX_PAGE_META = 'Sujames Blog that build from Next.js';

const Blogs = ({ blogsData }: IBlogsProps) => {
  return (
    <>
      <Head>
        <title>{BLOG_INDEX_PAGE_TITLE}</title>
        <meta name="description" content={BLOG_INDEX_PAGE_META} />
      </Head>
      <section className="w-full flex justify-center">
        <div className="sm:w-3/4 text-gray-700 body-font">
          <div className="flex flex-wrap -m-4">
            {blogsData.map((blogData, index) => (
              <Card
                key={index}
                id={blogData.id}
                title={blogData.metaData.title}
                category={blogData.metaData.category}
                description={blogData.metaData.description}
                date={blogData.metaData.date}
              />
            ))}
          </div>
        </div>
      </section>
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
