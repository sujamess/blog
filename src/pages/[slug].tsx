import { GetStaticPaths, GetStaticProps } from 'next';
import Divider from 'src/components/Divider';
import SEO from 'src/components/SEO';
import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router';
import Tags from 'src/components/Tags';
import Image from 'next/image';
import Loading from 'src/components/Loading';
import { Blog as BlogPost } from 'src/shared/@types/blog'

interface IBlogProps {
  blog: BlogPost;
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
        <Image
          className="px-4"
          alt={`${blog.title}-slug-cover-img`}
          objectFit="contain"
          src={blog.coverImg.url}
          width={592}
          height={320}
          layout="responsive"
        />
        <div className="p-6">
          <Tags tags={blog.tags} />
          <p className="text-3xl font-medium break-words">{blog.title}</p>
          <p className="text-sm font-extralight">{blog.createdAt}</p>
          <Divider />
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
  const { default: dayjs } = await import('dayjs');
  const { getBlogBySlug } = await import('src/services/contentful/blog');
  const { markdownToString } = await import('src/lib/markdown');
  const { defaultDateFormat } = await import ('src/shared/constants/app.constant');

  try {
    const blog = await getBlogBySlug(params.slug as string, preview);

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
  const { getBlogs } = await import('src/services/contentful/blog');

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
