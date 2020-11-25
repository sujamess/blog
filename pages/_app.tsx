import Head from 'next/head';
import Layout from 'components/Layout';
import { AppProps } from 'next/app';
import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="shortcut icon" href="/favicon.ico" key="shortcutIcon" />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.manifest" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="apple-mobile-web-app-title" content="Sujames Blog" />
        <meta name="application-name" content="Sujames Blog" />
        <meta name="msapplication-TileColor" content="#4B5563" />
        <meta name="theme-color" content="#4B5563" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
