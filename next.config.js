const config = require('config');

module.exports = {
  publicRuntimeConfig: {
    ...config
  },
  async rewrites() {
    return [
      {
        source: '/auth',
        destination: '/api/auth',
      },
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
      }
    ]
  }
};
