import { GetStaticPaths, GetStaticProps } from 'next';
import { Head } from 'next/document';
import React from 'react';
import Divider from 'src/components/Divider';
import SEO from 'src/components/SEO';
import DefaultErrorPage from 'next/error';
import { BlogBySlug_sujamesBlogCollection_items } from 'src/services/contentful/query/__generated__/BlogBySlug';
import { defaultDateFormat } from 'src/shared/constants/app.constant';
import { useRouter } from 'next/router';
import Adsense from 'src/components/Adsense';

interface IBlogProps {
  blog: BlogBySlug_sujamesBlogCollection_items;
}

const Blog = ({ blog }: IBlogProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <video
            src="https://media.tenor.com/videos/2a80e4b7a52833a14ed31b0bfa59e601/mp4"
            className="w-full h-auto"
            autoPlay
            loop
            muted
          />
          <div className="pt-4 pb-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl pt-2">กำลังโหลด</h1>
            <div className="pt-6 prose prose-blue max-w-3xl mx-auto">
              กำลังดึงข้อมูล...กรุณารอสักครู่
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.description}
      />
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-1/2 px-4">
          <p className="text-4xl font-medium break-words">{blog.title}</p>
          <p className="text-sm font-extralight">{blog.createdAt}</p>
          <Divider />
        </div>
        <section className="flex justify-center py-4">
          <Adsense />
        </section>
        <div className="w-full sm:w-1/2 px-4 py-4">
          <article
            className="prose prose-cyan max-w-full"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </div>
        <section className="flex justify-center py-4">
          <Adsense />
        </section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const { default: dayjs } = await import ('dayjs');
  const { getBlogBySlug } = await import ('src/services/contentful/blogs');
  const { markdownToString } = await import ('src/lib/markdown');

  const blog = await getBlogBySlug({ slug: params.slug as string, preview });

  return {
    props: {
      blog: {
        ...blog,
        content: await markdownToString(blog.content),
        createdAt: dayjs(blog.createdAt).format(defaultDateFormat),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getBlogs } = await import ('src/services/contentful/blogs');

  const blogs = await getBlogs();

  return {
    paths: blogs.map((blog) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: true,
  };
};

export default Blog;
