/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base');

const Joi = validate.Joi;

process.env.BABEL_ENV = 'production';

const config = validate(merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    '../index'
  ],

  output: {
    path: path.join(__dirname, '../../build/dist'),
    publicPath: '../dist/',
    pathinfo: false
  },

  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        exclude: /\.\/app/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass!toolbox'
        })
      },
      { test: /\.woff(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?.*)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ]
  },

  postcss: [ autoprefixer ],

  toolbox: { theme: './app/theme/_config.scss' },

  plugins: [

    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.ENV'      : JSON.stringify('desktop'),
      'process.env.NODE_ENV' : JSON.stringify('production'),
    }),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      quiet: true
    }),

    new HtmlWebpackPlugin({
      filename: 'app.html',
      template: '../app.html',
      inject: false
    })
  ],
  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
}), {
    schemaExtension: Joi.object({
      sassLoader: Joi.any(),
      toolbox: Joi.any(),
      resolve: {
        modules: Joi.any()
      }
    })
  }
);

module.exports = config;
