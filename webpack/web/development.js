/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const formatter = require('eslint-formatter-pretty');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base');

const port = process.env.PORT || 8080;
const root = '../..';

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, `${root}/build`),
    filename: 'bundle.[name].js',
    pathinfo: true
  },

  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        exclude: /(\.\/app)/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMaps&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader!toolbox-loader'
        })
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/media/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        debug: true,
        postcss: [autoprefixer],
        toolbox: { theme: './app/theme/_config.scss' },
      }
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin({
      filename: 'styles.[name].css',
      allChunks: true
    }),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.ENV'      : JSON.stringify('web'),
      'process.env.NODE_ENV' : JSON.stringify('development')
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../index.html',
      chunksSortMode:  (a, b) => {  //alphabetical descending order
        if (a.names[0] > b.names[0]) { return -1; }
        if (a.names[0] < b.names[0]) { return 1;  }

        return 0;
      }
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: +port,
    historyApiFallback: true,
    contentBase: './'
  }
});
