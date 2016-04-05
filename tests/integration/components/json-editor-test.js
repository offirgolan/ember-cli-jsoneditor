import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('json-editor', 'Integration | Component | json editor', {
  integration: true,

  beforeEach() {
    this.set('json', { foo: 'bar'});
  }
});

test('it renders', function(assert) {
  this.render(hbs `{{json-editor}}`);

  assert.ok(this.$().text().trim().indexOf('JSONEditor') > -1);
});

test('json loads', function(assert) {
  this.render(hbs `{{json-editor json=json}}`);
  assert.equal(this.$('.jsoneditor-values tbody > tr').text().trim(), 'JSONEditor{1}foo:bar');
});

test('disabled', function(assert) {
  this.set('disabled', false);

  this.render(hbs `{{json-editor disabled=disabled}}`);

  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('Tree') > -1);

  this.set('disabled', true);

  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('View') > -1);
});

test('json', function(assert) {
  assert.expect(2);

  this.render(hbs `{{json-editor json=json onChange=(action (mut json))}}`);

  assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'bar');

  this.set('json', {
    foo: 'foo'
  });

  assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'foo');
});

test('mode - tree', function(assert) {
  this.render(hbs `{{json-editor json=json mode='tree'}}`);
  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('Tree') > -1);
  assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'bar');
});

test('mode - view', function(assert) {
  this.render(hbs `{{json-editor json=json mode='view'}}`);
  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('View') > -1);
  assert.equal(this.$('.jsoneditor-tree > div[contenteditable="false"]').length, 2);
});

test('mode - form', function(assert) {
  this.render(hbs `{{json-editor json=json mode='form'}}`);
  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('Form') > -1);
  assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]').length, 1);
  assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'bar');
});

test('mode - text', function(assert) {
  this.render(hbs `{{json-editor json=json mode='text'}}`);
  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('Text') > -1);
});

test('mode - code', function(assert) {
  this.render(hbs `{{json-editor json=json mode='code'}}`);
  assert.ok(this.$('.jsoneditor-modes button').text().trim().indexOf('Code') > -1);
});
