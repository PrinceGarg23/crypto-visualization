// webpack.config.js
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      url: require.resolve('url/'),
      http: require.resolve('stream-http'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
