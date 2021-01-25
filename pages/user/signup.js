import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';
import {useIdentityContext} from 'react-netlify-identity-gotrue';

import Layout from 'components/layout';

export default function Signup() {
  const identity = useIdentityContext();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [formMessage, setFormMessage] = useState();
  const [formError, setFormError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormMessage();
    setFormError();
    await identity
      .signup({
        password,
        email,
        user_metadata: {
          full_name: fullName,
        },
      })
      .then(() =>
        setFormMessage('Please check your email to confirm your account!'),
      )
      .catch((e) => setFormError(e.message));
  };
  return (
    <Layout>
      <Head>
        <title>Trailhead - signup</title>
      </Head>
      <h2>Sign up</h2>
      <form onSubmit={submitHandler}>
        <input
          onChange={(event) => setFullName(event.currentTarget.value)}
          type="text"
        />
        <br />
        <input
          onChange={(event) => setEmail(event.currentTarget.value)}
          type="text"
        />
        <br />
        <input
          onChange={(event) => setPassword(event.currentTarget.value)}
          type="password"
        />
        <br />
        <div style={{color: 'blue'}}>{formMessage}</div>
        <div style={{color: 'red'}}>{formError}</div>
        <button type="submit">Sign Up</button>
        <Link href="/user/login">Login instead</Link>
      </form>
    </Layout>
  );
}
