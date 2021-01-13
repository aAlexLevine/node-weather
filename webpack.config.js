const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, '/react-client/src');
const DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: ['react-hot-loader/patch', `${SRC_DIR}/index.jsx`],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.jsx?/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    hot: true,
    open: false,
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'http://back:3000',
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
