import Head from 'next/head';
import AdminLayout from 'components/adminLayout';
import {useEffect, useState} from 'react';
import {useIdentityContext} from 'react-netlify-identity-gotrue';

const Users = () => {
  const identity = useIdentityContext();
  const [response, setResponse] = useState();

  useEffect(() => {
    if (identity.user) {
      setResponse(
        identity
          .authorizedFetch('/api/list-users')
          .then((response) => response.json()),
      );
    }
  }, [identity]);

  return (
    <AdminLayout>
      <Head>
        <title>Users | Admin - Trailhead</title>
      </Head>
      <h2>Users</h2>
      {response?.users?.map((user) => (
        <li key={user.email}>{user.email}</li>
      ))}
    </AdminLayout>
  );
};
export default Users;
