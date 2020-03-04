const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob');

const API_HOST = process.env.API_HOST || 'http://localhost:5000';

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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
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
      }
    ]
  },
  plugins: [
   // TODO: need to purge css.
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    // }),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      favicon: './client/public/static/images/favicon.ico'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    disableHostCheck: true,
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
