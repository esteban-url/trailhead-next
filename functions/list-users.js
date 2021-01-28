/* eslint-disable no-undef */
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const {identity, user} = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const {allowedRoles} = ['admin'];
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = 'Bearer ' + identity.token;

  try {
    if (roles.some((role) => allowedRoles.includes(role))) {
      return fetch(usersUrl, {
        method: 'GET',
        headers: {Authorization: adminAuthHeader},
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return {statusCode: 200, body: JSON.stringify(data)};
        })
        .catch((e) => {
          return {
            statusCode: 500,
            body: 'Internal Server Error: ' + e,
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
