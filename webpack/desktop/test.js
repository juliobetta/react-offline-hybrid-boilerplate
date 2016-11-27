/** Used in .babelrc for 'test' environment */

// for babel-plugin-webpack-loaders
require('babel-register');
const autoprefixer = require('autoprefixer');
const resolve      = require('path').resolve;
const validate     = require('webpack-validator');
const devConfig    = require('./development');
const Joi          = validate.Joi;

const root = '../..';

module.exports = validate({
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
      resolve(__dirname, `${root}/app/scripts`),
      resolve(__dirname, `${root}/node_modules`)
    ],

    extensions: ['', '.js', '.jsx', '.json'],
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
          'css-loader?sourceMaps&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass!toolbox'
        ]
      },
      { test: /\.woff(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?.*)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?.*)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  postcss: [autoprefixer],
  toolbox: { theme: './app/theme/_config.scss' },
}, {
  schemaExtension: Joi.object({
    sassLoader: Joi.any(),
    toolbox: Joi.any(),
    resolve: {
      modules: Joi.any()
    }
  })
});
