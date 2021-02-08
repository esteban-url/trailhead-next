import Link from 'next/link';
import {useIdentityContext} from 'react-netlify-identity-gotrue';
import PropTypes from 'prop-types';

export const siteTitle = 'trailhead - next';

const Navigation = ({children}) => {
  const identity = useIdentityContext();

  return (
    <nav style={{paddingBottom: '2rem'}}>
      <Link href="/">
        <h1>trailhead </h1>
      </Link>

      {identity.user?.app_metadata?.roles?.indexOf('admin') >= 0 ? (
        <Link href="/admin/users">admin </Link>
      ) : null}
      {children}
      <>
        {identity.user ? (
          <>
            <Link href="/user/profile">profile </Link>{' '}
            <button onClick={identity.logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link href="/user/signup">sign up</Link>
            <Link href="/user/login">login</Link>
          </>
        )}
      </>
    </nav>
  );
};
Navigation.propTypes = {children: PropTypes.arrayOf(PropTypes.element)};
export default Navigation;
