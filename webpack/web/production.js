/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./base');

const publicPath = '/';
process.env.BABEL_ENV = 'production';

const root = '../..';

const config = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    publicPath,
    path: path.join(__dirname, '../../www'),
    filename: 'bundle.[name].[chunkhash].js',
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
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[hash:20].[ext]'
        }
      },
      {
        test: require.resolve(`${root}/app/index.js`),
        loader: 'imports-loader?offlineRuntime=offline-plugin/runtime'
      }

    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [autoprefixer],
        toolbox: { theme: './app/theme/_config.scss' },
      }
    }),

    new OfflinePlugin({
      publicPath,
      relativePaths: false,
      ServiceWorker: {
        events: true,
        excludes: ['*.hot-update.*']
      },
      AppCache: {
        publicPath: `${publicPath}/appcache`
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
      'process.env.ENV'      : JSON.stringify('web'),
      'process.env.NODE_ENV' : JSON.stringify('production')
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
});

module.exports = config;
