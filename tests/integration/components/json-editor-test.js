import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('json-editor', 'Integration | Component | json editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{json-editor}}`);

  assert.ok(this.$().text().trim().indexOf('JSONEditor'));
});

test('json loads', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('json', {
    foo: 'bar'
  });

  this.render(hbs`{{json-editor json=json}}`);

  assert.ok(this.$('.jsoneditor-values tbody > tr').text().trim(), 'foo: bar');
});
