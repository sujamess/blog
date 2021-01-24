import Head from 'next/head'
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface ISEOProps {
  title?: string;
  description?: string;
  image?: string;
}

const SEO: React.FC<ISEOProps> = ({ title, description, image, children }) => {
  const router = useRouter();

  const transformedTitle = useMemo(() => (
    title
      ? `Sujames Blog · ${title}`
      : 'Sujames Blog'
  ), [title]);

  return (
    <>
      <Head>
        <title>{transformedTitle}</title>

        <meta name="title" content={transformedTitle} />
        <meta name="description" content={description || 'Sujames Blogs'} />

        <link rel="icon" href="/icon.png" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:title" content={transformedTitle} />
        <meta property="og:description" content={description} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={router.asPath} />
        <meta property="twitter:title" content={transformedTitle} />
        <meta property="twitter:description" content={description} />

        <meta property="og:image" content={image} />
        <meta property="twitter:image" content={image} />

        {children}
      </Head>
    </>
  );
};

export default SEO;
