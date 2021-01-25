import {useIdentityContext} from 'react-netlify-identity-gotrue';
import {useRouter} from 'next/router';
import LoginForm from './loginForm';
import PropTypes from 'prop-types';

const Private = ({children, rolesAllowed}) => {
  const router = useRouter();
  const identity = useIdentityContext();

  return identity.loading ? (
    <h3>loading...</h3>
  ) : identity.user ? (
    (rolesAllowed &&
      rolesAllowed.some(
        (r) => identity.user?.app_metadata?.roles?.indexOf(r) >= 0,
      )) ||
    !rolesAllowed ? (
      <>{children}</>
    ) : (
      <>Authenticated, but not authorized</>
    )
  ) : (
    <LoginForm callbackPath={router.pathname} />
  );
};
Private.propTypes = {
  children: PropTypes.element,
  rolesAllowed: PropTypes.array,
};
export default Private;
