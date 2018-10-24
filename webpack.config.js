require('dotenv').config();

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const outputPath = path.resolve(__dirname, 'public');

module.exports = (env, { mode }) => ({
  entry: './src/app.js',
  output: {
    filename: 'bundle.min.js',
    path: outputPath,
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __ENDPOINT__: mode === 'development'
        ? JSON.stringify(`http://localhost:${process.env.SERVER_PORT}/weather/`)
        : JSON.stringify('/weather/')
    }),
    new CopyWebpackPlugin([
      { from: './src/assets' }
    ]),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true
            }
          }
        ]
      }
    ]
  }
});