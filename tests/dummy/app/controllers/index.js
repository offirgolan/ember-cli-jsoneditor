import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.json = {
      foo: 'bar'
    };
  }
});
