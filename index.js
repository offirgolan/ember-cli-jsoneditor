/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-jsoneditor',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/jsoneditor/jsoneditor.js');
    app.import('vendor/jsoneditor/jsoneditor.css');
    app.import('vendor/jsoneditor/img/jsoneditor-icons.svg', {
      destDir: 'assets/img'
    });

  },

  treeForVendor: function(vendorTree) {
    var trees = [];
    var jsonEditorPath = require.resolve('jsoneditor').replace('index.js', 'dist');

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(jsonEditorPath, {
      destDir: 'jsoneditor'
    }));

    return mergeTrees(trees);
  }
};
