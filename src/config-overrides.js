const path = require('path');

module.exports = {
  webpack: (config, env) => {
    // Add alias for "@" to point to the "src" directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};
