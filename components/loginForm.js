import Link from 'next/link';
import {useState} from 'react';
import {useIdentityContext} from 'react-netlify-identity-gotrue';
import {useRouter} from 'next/router';

export default function LoginForm(callbackPath) {
  const router = useRouter();
  const identity = useIdentityContext();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [formError, setFormError] = useState();
  const submitHandler = async (event) => {
    event.preventDefault();
    setFormError();
    await identity
      .login({
        email: userEmail,
        password: userPassword,
      })
      .then(() => router.push(callbackPath ? callbackPath : '/user/profile'))
      .catch((event) => setFormError(event.message));
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        onChange={(event) => setUserEmail(event.currentTarget.value)}
        type="text"
      />
      <br />
      <input
        onChange={(event) => setUserPassword(event.currentTarget.value)}
        type="password"
      />
      <br />
      <Link href="/user/forgot-password">Forgot your password?</Link>
      <br />
      <div style={{color: 'red'}}>{formError}</div>
      <button type="submit">Login</button>
      <Link href="/user/signup">Sign up instead</Link>
    </form>
  );
}
