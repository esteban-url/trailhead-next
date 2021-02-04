import Head from 'next/head';
import Layout from 'components/layout';
import LoginForm from 'components/user/loginForm';
const Login = () => {
  return (
    <Layout>
      <Head>
        <title>Trailhead - login</title>
      </Head>
      <h2>login</h2>
      <LoginForm />
    </Layout>
  );
};
export default Login;
