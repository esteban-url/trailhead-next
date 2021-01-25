import Head from 'next/head';

import Layout from 'components/layout';
import useIdentityRedirects from 'hooks/useIdentityRedirects';

export default function Home() {
  useIdentityRedirects();
  return (
    <Layout>
      <Head>
        <title>Trailhead - home</title>
      </Head>
      landing
    </Layout>
  );
}
