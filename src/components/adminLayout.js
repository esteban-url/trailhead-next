import Head from 'next/head';
import PropTypes from 'prop-types';
import Private from './Private';
import Navigation from './navigation';

export const siteTitle = 'trailhead - next';

const AdminLayout = ({children}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={{backgroundColor: 'lightgray'}}>
        <Navigation />
      </header>
      <Private rolesAllowed={['admin']}>
        <main>{children}</main>
      </Private>
    </>
  );
};
AdminLayout.propTypes = {children: PropTypes.element};
export default AdminLayout;
