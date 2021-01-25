import Head from 'next/head';
import Link from 'next/link';
import {useIdentityContext} from 'react-netlify-identity-gotrue';

import Layout from 'components/layout';
import Private from 'components/Private';

export default function Profile() {
  const identity = useIdentityContext();
  return (
    <Layout>
      <Head>
        <title>Trailhead - profile</title>
      </Head>
      <Private>
        <h2>profile</h2>
        {identity?.user ? (
          <p>
            Welcome to your account, {identity.user.user_metadata.full_name}
          </p>
        ) : (
          <p>Please log in</p>
        )}
        <Link href="/">go home</Link>
      </Private>
    </Layout>
  );
}
