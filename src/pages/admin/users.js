import Head from 'next/head';
import AdminLayout from 'components/adminLayout';
import {useEffect, useState} from 'react';
import {useIdentityContext} from 'react-netlify-identity-gotrue';

const Users = () => {
  const identity = useIdentityContext();
  const [users, setUsers] = useState();

  useEffect(() => {
    if (identity.user) {
      identity
        .authorizedFetch('/api/list-users')
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setUsers(response.users);
        });
    }
  }, [identity]);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [formMessage, setFormMessage] = useState();
  const [formError, setFormError] = useState();

  const submitHandler = async (event) => {
    event.preventDefault();
    setFormMessage();
    setFormError();
    const newUser = {
      email,
      password,
      user_metadata: {full_name: fullName},
    };
    identity
      .authorizedFetch('/api/create-user', {
        method: 'POST',
        body: JSON.stringify(newUser),
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.statusCode === 204) {
          setUsers((users) => [...users, newUser]);
        } else {
          setFormError(response.error);
        }
      });
  };

  const handleDelete = (id) => {
    identity
      .authorizedFetch('/api/delete-user', {
        method: 'POST',
        body: JSON.stringify({id}),
      })
      .then((response) => {
        setUsers((users) => users.filter((x) => x.id !== id));
        console.log(response);
      });
  };

  return (
    <AdminLayout>
      <>
        <Head>
          <title>Users | Admin - Trailhead</title>
        </Head>
        <h2>Users</h2>
        {users?.map((user) => (
          <li key={user.email}>
            {user.email}{' '}
            {identity.user.id !== user.id ? (
              <button type="button" onClick={() => handleDelete(user.id)}>
                delete
              </button>
            ) : null}
          </li>
        ))}

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
          <button type="submit">Create user</button>
        </form>
      </>
    </AdminLayout>
  );
};
export default Users;
