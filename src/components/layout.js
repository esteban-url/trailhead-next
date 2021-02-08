import Head from 'next/head';
import PropTypes from 'prop-types';
import Navigation from './navigation';

export const siteTitle = 'trailhead - next';

const Layout = ({children}) => {
  return (
    <>
      <div>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
      </div>
      <footer style={{paddingTop: '16rem'}}>footer</footer>
    </>
  );
};
Layout.propTypes = {children: PropTypes.arrayOf(PropTypes.element)};
export default Layout;
