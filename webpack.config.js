const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Updated to include JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'App': path.resolve(__dirname, 'src/App.js')  // Explicit alias
    }
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'production',
};