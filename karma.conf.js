// Karma configuration
// Generated on Sun Aug 27 2017 20:01:38 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon', 'browserify', 'mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'client/dependencies/angular/angular.js',
      'client/dependencies/angular-route/angular-route.js',
      'client/dependencies/angular-sanitize/angular-sanitize.js',
      'client/dependencies/angular-markdown-directive/markdown.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'client/app/app.module.js',
      'client/app/app.routes.js',
      'client/app/app.run.js',
      'client/app/**/*.module.js',
      'client/app/**/*.service.js',
      'client/app/**/*.controller.js',
      'client/app/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       'client/app/**/*.spec.js': [ 'browserify' ],
    },

    plugins: ['karma-browserify', 'karma-jasmine', 'karma-chrome-launcher', 'karma-sinon', 'karma-mocha', 'karma-chai'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
