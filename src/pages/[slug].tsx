import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Divider from 'src/components/Divider';
import SEO from 'src/components/SEO';
import DefaultErrorPage from 'next/error';
import { BlogBySlug_sujamesBlogCollection_items } from 'src/services/contentful/query/__generated__/BlogBySlug';
import { defaultDateFormat } from 'src/shared/constants/app.constant';
import { useRouter } from 'next/router';
import Tags from 'src/components/Tags';
import Image from 'next/image';
import Loading from 'src/components/Loading';

interface IBlogProps {
  blog: BlogBySlug_sujamesBlogCollection_items;
}

const Blog = ({ blog }: IBlogProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading />
    );
  }

  if (!blog) {
    return (
      <>
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
      <div className="mx-auto w-full lg:w-1/2 shadow-2xl rounded-2xl px-4 pb-4 lg:px-12 lg:pb-12 xl:px-16 xl:pb-16">
        <div className="px-4">
          <Image
            alt={`${blog.title}-slug-cover-img`}
            objectFit="contain"
            src={blog.coverImg.url}
            width={868}
            height={468}
            layout="responsive"
          />
          <Tags tags={blog.tags} />
          <p className="text-4xl font-medium break-words">{blog.title}</p>
          <p className="text-sm font-extralight">{blog.createdAt}</p>
          <Divider />
        </div>
        <div className="px-4 py-4">
          <article
            className="prose prose-lg max-w-full"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const { default: dayjs } = await import ('dayjs');
  const { getBlogBySlug } = await import ('src/services/contentful/blogs');
  const { markdownToString } = await import ('src/lib/markdown');

  try {
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
  } catch (_error) {
    return {
      notFound: true,
    }
  }
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
