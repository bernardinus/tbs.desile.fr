// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-05 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'front/components/jquery/dist/jquery.js',
      'front/components/angular/angular.js',
      'front/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'front/components/angular-gettext/dist/angular-gettext.js',
      'front/components/angular-md5/angular-md5.js',
      'front/components/angular-re-captcha/angular-re-captcha.js',
      'front/components/angular-route/angular-route.js',
      'front/components/angular-touch/angular-touch.js',
      'front/components/waypoints/waypoints.js',
      'front/components/SHA-1/sha1.js',
      'front/components/angulartics/src/angulartics.js',
      'front/components/angulartics/src/angulartics-adobe.js',
      'front/components/angulartics/src/angulartics-chartbeat.js',
      'front/components/angulartics/src/angulartics-cnzz.js',
      'front/components/angulartics/src/angulartics-flurry.js',
      'front/components/angulartics/src/angulartics-ga-cordova.js',
      'front/components/angulartics/src/angulartics-ga.js',
      'front/components/angulartics/src/angulartics-gtm.js',
      'front/components/angulartics/src/angulartics-kissmetrics.js',
      'front/components/angulartics/src/angulartics-mixpanel.js',
      'front/components/angulartics/src/angulartics-piwik.js',
      'front/components/angulartics/src/angulartics-scroll.js',
      'front/components/angulartics/src/angulartics-segmentio.js',
      'front/components/angulartics/src/angulartics-splunk.js',
      'front/components/angulartics/src/angulartics-woopra.js',
      'front/components/angulartics/src/angulartics-marketo.js',
      'front/components/angulartics/src/angulartics-intercom.js',
      'front/components/bootstrap/dist/js/bootstrap.js',
      'front/components/angular-resource/angular-resource.js',
      'front/components/moment/moment.js',
      'front/components/fullcalendar/dist/fullcalendar.js',
      'front/components/angular-ui-calendar/src/calendar.js',
      'front/components/moment-range/lib/moment-range.js',
      'front/components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'front/components/jstzdetect/jstz.min.js',
      'front/components/jquery-sticky-table-headers/js/jquery.stickytableheaders.js',
      'front/components/vis/dist/vis.min.js',
      'front/components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
