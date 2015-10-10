Package.describe({
  name: 'fgm:mapjs',
  version: '0.0.1',

  // Brief, one-line summary of the package.
  summary: "A Meteor wrapper for Mindmup's MapJS library",

  // URL to the Git repository containing the source code for this package.
  // git: '',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  var where = 'client';

  api.versionsFrom('1.2.0.2');
  api.use('jquery', where);
  api.addFiles(['client/mapjs.js'], where, {bare: true});

  if (api.export) {
    api.export('MAPJS');
  }
});

Package.onTest(function(api) {
  var where = 'client';

  //api.use('fgm:errors', where);
  //api.use(['tinytest', 'test-helpers'], where);
  //
  //api.addFiles('errors_tests.js', where);
});
