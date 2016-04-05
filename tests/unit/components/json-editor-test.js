import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('json-editor', 'Unit | Component | json editor', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('disabled', function(assert) {

  const component = this.subject();

  this.render();

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
