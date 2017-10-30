export default {
  // The URL we're connecting to
  hostname: 'http://localhost:3004',
  // Map shortnames to the actual endpoints, so that we can use them in the middleware
  endpoints: {
    'users': '/users',
    'deleteUser': '/users',
    'getUser': '/users'
  }
};
