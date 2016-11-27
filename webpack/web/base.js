/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const validate = require('webpack-validator');

const Joi  = validate.Joi;
const root = '../..';

module.exports = validate({
  context: path.resolve(__dirname, `${root}/app/scripts`),

  entry: {
    app: '../index.js',
    vendor: [
      'babel-polyfill',
      'classnames',
      'invariant',
      'normalize.css', // <-
      'pouchdb',
      'pouchdb-find',
      'pouchdb-quick-search',
      'react',
      'react-addons-css-transition-group',
      'react-addons-transition-group',
      'react-addons-update',
      'react-css-themr',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-toolbox', // <-
      'redux',
      'redux-form',
      'redux-logger',
      'redux-router',
      'redux-thunk'
    ]
  },

  module: {
    loaders:[
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' }
    ]
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modules: [
      path.resolve(__dirname, `${root}/app/scripts`),
      path.resolve(__dirname, `${root}/node_modules`)
    ]
  },

  plugins: [new ProgressBarPlugin()]
}, {
  schemaExtension: Joi.object({
    resolve: {
      modules: Joi.any()
    }
  })
});
