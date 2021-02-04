import Head from 'next/head';
import AdminLayout from 'components/adminLayout';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useIdentityContext} from 'react-netlify-identity-gotrue';

const Users = () => {
  const identity = useIdentityContext();
  const [users, setUsers] = useState();
  const [creatingUser, setCreatingUser] = useState(false);
  const toggleCreatingUser = () => setCreatingUser(!creatingUser);
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

  const handleDelete = (id) => {
    identity
      .authorizedFetch('/api/delete-user', {
        method: 'POST',
        body: JSON.stringify({id}),
      })
      .then((response) => {
        if (response.ok) {
          setUsers((users) => users.filter((x) => x.id !== id));
        } else {
          console.info(response);
        }
      });
  };

  return (
    <AdminLayout>
      <>
        <Head>
          <title>Users | Admin - Trailhead</title>
        </Head>
        <h2>Users</h2>

        {creatingUser ? (
          <CreateUser
            addUserHandler={setUsers}
            closeHandler={toggleCreatingUser}
          />
        ) : (
          <>
            <button type="button" onClick={toggleCreatingUser}>
              Create new user
            </button>
            <ul>
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
            </ul>
          </>
        )}
      </>
    </AdminLayout>
  );
};

const CreateUser = ({closeHandler, addUserHandler}) => {
  const identity = useIdentityContext();
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
        if (response.ok) {
          addUserHandler((users) => [newUser, ...users]);
          closeHandler();
        } else {
          return response.json();
        }
      })
      .then((response) => {
        if (response?.error) {
          setFormError(response.error);
        }
      })
      .catch((error) => {
        console.info(error);
        setFormError('oh no :(');
      });
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <button type="button" onClick={closeHandler}>
          Cancel
        </button>
      </div>
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
  );
};
CreateUser.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  addUserHandler: PropTypes.func,
};
export default Users;
