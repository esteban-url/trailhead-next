import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/layout';
import {useIdentityContext} from 'react-netlify-identity-gotrue';
import {useState} from 'react';

export default function ForgotPassworn() {
  const identity = useIdentityContext();
  const [userEmail, setUserEmail] = useState();
  const [formMessage, setFormMessage] = useState();
  const [formError, setFormError] = useState();
  const submitHandler = async (event) => {
    event.preventDefault();
    setFormError();
    setFormMessage();
    await identity
      .sendPasswordRecovery({
        email: userEmail,
      })
      .then(() =>
        setFormMessage(
          `Check your ${userEmail} inbox for instructions on how to reset your password.`,
        ),
      )
      .catch((event) => setFormError(event.message));
  };

  return (
    <Layout>
      <Head>
        <title>Reset your password - Trailhead</title>
      </Head>
      <h2>login</h2>
      <form onSubmit={submitHandler}>
        <input
          onChange={(event) => setUserEmail(event.currentTarget.value)}
          type="text"
        />
        <br />
        {formMessage ? <div style={{color: 'blue'}}>{formMessage}</div> : null}
        {formError ? <div style={{color: 'red'}}>{formError}</div> : null}

        <button type="submit">Get reset link</button>
        <Link href="/user/login">nevermind! take me back to login</Link>
      </form>
    </Layout>
  );
}
//

//password-reset
//Enter your new password. After confirming, you will be asked to log in again.
