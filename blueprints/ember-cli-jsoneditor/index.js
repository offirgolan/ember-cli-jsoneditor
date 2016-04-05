/*jshint node:true*/
module.exports = {
  description: 'ember-cli-jsoneditor',

  afterInstall: function() {
    return this.addPackageToProject('jsoneditor'); // is a promise
  }
};
