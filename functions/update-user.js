// eslint-disable-next-line no-undef
const fetch = require('node-fetch');

// eslint-disable-next-line no-undef
exports.handler = async (event, context) => {
  const {identity, user} = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const allowedRoles = ['admin'];
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = 'Bearer ' + identity.token;

  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(usersUrl, {
        method: 'POST',
        headers: {Authorization: adminAuthHeader},
        body: JSON.stringify({...JSON.parse(event.body), confirm: true}),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Created a user! 204!');
          console.log(JSON.stringify({data}));
          return {statusCode: 204};
        })
        .catch((error) => {
          console.log(error);
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + error,
          };
        });
    } else {
      return {statusCode: 401};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};