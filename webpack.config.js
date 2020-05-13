const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob');

const API_HOST = process.env.API_HOST || 'http://localhost:5000';
// Constants
const PORT = process.env.PORT || '8080';
const HOST = process.env.HOST || '0.0.0.0';

const PATHS = {
  src: path.join(__dirname, 'client/src')
};

module.exports = {
  entry: ['@babel/polyfill', './client/src/index.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index-bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          plugins: [
            ['import', { libraryName: 'antd', style: true }]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      favicon: './client/public/static/images/favicon.ico'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: HOST,
    port: PORT,
    proxy: {
      '/api': {
        target: API_HOST,
        pathRewrite: { '^/api': '' },
        secure: false
      },
      secure: false,
      changeOrigin: true
    }
  }
};
