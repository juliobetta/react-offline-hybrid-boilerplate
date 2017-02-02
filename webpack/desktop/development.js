/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const formatter = require('eslint-formatter-pretty');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base');

const port = process.env.PORT || 8000;

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    '../index'
  ],

  output: {
    path: path.join(__dirname, 'app'),
    publicPath: `http://localhost:${port}/dist/`,
    pathinfo: true
  },

  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        exclude: /(\.\/app)/,
        loaders: [
          'style-loader',
          'css-loader?sourceMaps&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader!toolbox-loader'
        ]
      },
      { test: /\.woff(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        debug: true,
        postcss: [autoprefixer],
        toolbox: { theme: './app/theme/_config.scss' },
        eslint: { formatter }
      }
    }),

    // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoEmitOnErrorsPlugin(),

    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env.ENV'        : JSON.stringify('desktop'),
      'process.env.NODE_ENV'   : JSON.stringify('development')
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
