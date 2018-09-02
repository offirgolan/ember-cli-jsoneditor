import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | json editor', function(hooks) {
  setupTest(hooks);

  test('disabled', function(assert) {
    const component = this.owner.factoryFor('component:json-editor').create();

    let options = component.get('options');

    assert.equal(component.get('disabled'), false);
    assert.equal(options.mode, 'tree');
    assert.deepEqual(options.modes.sort(), ['tree', 'view', 'form', 'text', 'code'].sort());

    component.set('disabled', true);
    options = component.get('options');

    assert.equal(component.get('disabled'), true);
    assert.equal(options.mode, 'view');
    assert.deepEqual(options.modes, ['view']);
  });
});
