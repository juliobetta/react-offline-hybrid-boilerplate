/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base');

const Joi = validate.Joi;
process.env.BABEL_ENV = 'production';

const root = '../..';

const config = validate(merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'bundle.[name].[chunkhash].js',
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
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'assets/[name].[hash:20].[ext]'
        }
      },
      {
        test: require.resolve(`${root}/app/index.js`),
        loader: 'imports?offlineRuntime=offline-plugin/runtime'
      }

    ]
  },

  postcss: [ autoprefixer ],

  toolbox: { theme: './app/theme/_config.scss' },

  plugins: [
    new OfflinePlugin({
      ServiceWorker: {
        events: true,
        excludes: ['*.hot-update.*']
      }
    }),

    new ExtractTextPlugin({
      filename: 'styles.[name].[chunkhash].css',
      allChunks: true
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      quiet: true
    }),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env': {
        'ENV'      : JSON.stringify('web'),
        'NODE_ENV' : JSON.stringify('production')
      }
    }),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.bundle.js",
      minChunks: 2,
      chunks: ['app', 'vendor'].filter(key => key !== "vendor")
    }),

    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'bundle.[name].[chunkhash].js'}),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../index.html',
      favicon: `${root}/app/favicon.ico`,
      chunksSortMode:  (a, b) => {  //alphabetical descending order
        // remove hash
        const _a = a.names[0].replace(/(\w+\.)(\w+\.)(\w+\.)/, "$1$2");
        const _b = b.names[0].replace(/(\w+\.)(\w+\.)(\w+\.)/, "$1$2");

        if (_a > _b) { return -1; }
        if (_a < _b) { return 1;  }

        return 0;
      }
    })
  ]
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
