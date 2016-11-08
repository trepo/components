const webpack = require('./webpack.config.js');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      {pattern: 'src/*.js', watched: false},
    ],
    preprocessors: {
      'src/*.js': ['webpack'],
    },
    webpack,
    webpackMiddleware: {
      stats: 'errors-only',
    },
  });
};
