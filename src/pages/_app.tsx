import Layout from 'src/components/Layout';
import { AppProps } from 'next/app';
import 'src/styles/tailwind.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
