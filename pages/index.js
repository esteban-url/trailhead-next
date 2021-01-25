import Head from 'next/head';

import Layout from 'components/layout';
import useIdentityRedirects from 'hooks/useIdentityRedirects';

const Home = () => {
  useIdentityRedirects();
  return (
    <Layout>
      <Head>
        <title>Trailhead - home</title>
      </Head>
      landing
    </Layout>
  );
};
export default Home;
