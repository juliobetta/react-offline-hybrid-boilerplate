/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base');


process.env.BABEL_ENV = 'production';

const config = merge(baseConfig, {
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
        exclude: /(\.\/app)/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader!toolbox-loader'
        })
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
        postcss: [autoprefixer],
        toolbox: { theme: './app/theme/_config.scss' }
      }
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.ENV'        : JSON.stringify('desktop'),
      'process.env.NODE_ENV'   : JSON.stringify('production')
    }),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),

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
});

module.exports = config;
