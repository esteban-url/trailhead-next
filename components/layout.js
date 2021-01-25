import Head from 'next/head';
import Link from 'next/link';
import {useIdentityContext} from 'react-netlify-identity-gotrue';
import PropTypes from 'prop-types';

export const siteTitle = 'trailhead - next';

const Layout = ({children}) => {
  const identity = useIdentityContext();

  return (
    <>
      <div>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <nav style={{paddingBottom: '2rem'}}>
            <Link href="/">
              <h1>trailhead </h1>
            </Link>
            <Link href="/user/signup">sign up</Link>{' '}
            <Link href="/user/login">login</Link>
            {identity.user && (
              <button onClick={identity.logout}>Log Out</button>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </div>
      <footer style={{paddingTop: '16rem'}}>footer</footer>
    </>
  );
};
Layout.propTypes = {children: PropTypes.element};
export default Layout;
