import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';
import {useIdentityContext} from 'react-netlify-identity-gotrue';

import Layout from 'components/layout';

const ResetPassword = () => {
  const identity = useIdentityContext();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [formMessage, setFormMessage] = useState();
  const [formError, setFormError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormMessage();
    setFormError();
    if (password !== passwordConfirmation) {
      setFormError("Your passwords don't match");
      return;
    }
    await identity
      .completeUrlTokenTwoStep({
        password,
      })
      .then(() =>
        setFormMessage('Please check your email to confirm your account!'),
      )
      .catch((e) => setFormError(e.message));
  };
  return (
    <Layout>
      <Head>
        <title>Reset your password - Trailhead</title>
      </Head>
      <h2>Reset your password</h2>
      Enter your new password. After confirming, you will be asked to log in
      again.
      <form onSubmit={submitHandler}>
        <input
          onChange={(event) => setPassword(event.currentTarget.value)}
          type="password"
        />
        <br />
        <input
          onChange={(event) =>
            setPasswordConfirmation(event.currentTarget.value)
          }
          type="password"
        />
        <div style={{color: 'blue'}}>{formMessage}</div>
        <div style={{color: 'red'}}>{formError}</div>
        <button type="submit">Sign Up</button>
        <Link href="/user/login">Login instead</Link>
      </form>
    </Layout>
  );
};
export default ResetPassword;
