const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

const BROWSER_NAME = 'chrome';
const BROWSER_MIN_SUPPORTED_VERSION = 52;

const BabelLoaderRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
};
const TSLoaderRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'ts-loader'
  }
};
// Local Loader
const TSickleLoaderRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'tsickle-loader'
  }
}

module.exports = {
  entry: {
    'application': './src/client.ts',
  },
  output: {
    filename: 'bundle.[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist', BROWSER_NAME),
    publicPath: `/dist/${BROWSER_NAME}/`,
    chunkFilename: 'bundle.[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  resolveLoader: {
    alias: {
      'tsickle-loader': path.resolve(__dirname, '..', 'loaders', 'tsickle-loader.js')
    }
  },
  module: {
    rules: [
      TSickleLoaderRule,
      TSLoaderRule,
    ],
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: ['.gitignore'],
      quiet: true
    }),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        compilation_level: 'ADVANCED'
      },
      concurrency: 3,
    })
  ]
}