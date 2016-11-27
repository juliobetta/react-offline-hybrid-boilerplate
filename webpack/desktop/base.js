/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const validate = require('webpack-validator');

const Joi = validate.Joi;
const root = '../..';

module.exports = validate({
  context: path.resolve(__dirname, `${root}/app/scripts`),

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      {
        test: require.resolve(`${root}/app/scripts/utils/database.js`),
        loader: 'imports?memdown=memdown'
      }
    ]
  },

  output: {
    path: path.join(__dirname, `${root}/app`),
    filename: 'bundle.js',
    //
    // // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  resolve: {
    modules: [
      path.resolve(__dirname, `${root}/app/scripts`),
      path.resolve(__dirname, `${root}/node_modules`)
    ],
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [
    new ProgressBarPlugin(),
    new webpack.ContextReplacementPlugin(/bindings$/, /^$/)
  ],

  externals: [
    'pouchdb',
    'leveldown',
    'memdown',
    'bindings'
  ]
}, {
  schemaExtension: Joi.object({
    resolve: {
      modules: Joi.any()
    }
  })
});
