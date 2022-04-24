const userRoot = 'users';

export const routesV1 = {
  version: 'v1',
  auth: {
    login: 'login',
  },
  users: {
    createUser: `${userRoot}/create`,
  },
};
