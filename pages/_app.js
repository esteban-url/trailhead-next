import '../styles/globals.css';
import NetlifyIdentityContext from 'react-netlify-identity-gotrue';
import PropTypes from 'prop-types';

const MyApp = ({Component, pageProps}) => {
  return (
    <NetlifyIdentityContext url={'https://todo-ccs24.netlify.app/'}>
      <Component {...pageProps} />
    </NetlifyIdentityContext>
  );
};
MyApp.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.any,
};
export default MyApp;
