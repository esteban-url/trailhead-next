import Head from 'next/head';
import Link from 'next/link';
import {useIdentityContext} from 'react-netlify-identity-gotrue';
import PropTypes from 'prop-types';
import Private from './Private';

export const siteTitle = 'trailhead - next';

const AdminLayout = ({children}) => {
  const identity = useIdentityContext();

  return (
    <>
      <Private rolesAllowed={['admin']}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header style={{backgroundColor: 'lightgray'}}>
          <nav style={{paddingBottom: '2rem'}}>
            <Link href="/">
              <h1>trailhead - admin</h1>
            </Link>
            <Link href="/user/signup">sign up</Link>{' '}
            <Link href="/user/login">login</Link>
            {identity.user && (
              <button onClick={identity.logout}>Log Out</button>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </Private>
    </>
  );
};
AdminLayout.propTypes = {children: PropTypes.element};
export default AdminLayout;
