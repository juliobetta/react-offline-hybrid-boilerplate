/** Used in .babelrc for 'test' environment */

// for babel-plugin-webpack-loaders
require('babel-register');
const webpack      = require('webpack');
const autoprefixer = require('autoprefixer');
const resolve      = require('path').resolve;
const devConfig    = require('./development');

const root = '../..';

module.exports = {
  output: { libraryTarget: 'commonjs2' },

  resolve: {
    alias: {
      actions: resolve(__dirname, `${root}/app/scripts/actions`),
      constants: resolve(__dirname, `${root}/app/scripts/constants`),
      components: resolve(__dirname, `${root}/app/scripts/components`),
      models: resolve(__dirname, `${root}/app/scripts/models`),
      utils: resolve(__dirname, `${root}/app/scripts/utils`),
      views: resolve(__dirname, `${root}/app/scripts/views`)
    },

    modules: [
      resolve(__dirname, `${root}/app`),
      resolve(__dirname, `${root}/app/scripts`),
      resolve(__dirname, `${root}/node_modules`)
    ],

    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    // Use base + development loaders, but exclude 'babel-loader'
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(css|scss)$/,
        exclude: /\.\/app/,
        loaders: [
          'style-loader',
          'css-loader?sourceMaps&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader!toolbox-loader'
        ]
      },
      { test: /\.woff(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?.*)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
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

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.ENV'        : JSON.stringify('desktop'),
      'process.env.NODE_ENV'   : JSON.stringify('test')
    }),
  ]
};
