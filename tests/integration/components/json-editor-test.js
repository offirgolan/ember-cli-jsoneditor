import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | json editor', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('json', { foo: 'bar'});
  });

  test('it renders', async function(assert) {
    await render(hbs `{{json-editor}}`);

    assert.ok(find('*').textContent.trim().indexOf('JSONEditor') > -1);
  });

  test('json loads', async function(assert) {
    await render(hbs `{{json-editor json=json}}`);
    assert.dom('.jsoneditor-tree tbody tr:nth-child(1) .jsoneditor-values tr').hasText('JSONEditor{1}');
    assert.dom('.jsoneditor-tree tbody tr:nth-child(2) .jsoneditor-values tr').hasText('foo:bar');
  });

  test('disabled', async function(assert) {
    this.set('disabled', false);

    await render(hbs `{{json-editor disabled=disabled}}`);

    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Tree') > -1);

    this.set('disabled', true);

    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('View') > -1);
  });

  test('json', async function(assert) {
    assert.expect(2);

    await render(hbs `{{json-editor json=json onChange=(action (mut json))}}`);

    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'bar');

    this.set('json', {
      foo: 'foo'
    });

    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'foo');
  });

  test('mode - tree', async function(assert) {
    await render(hbs `{{json-editor json=json mode='tree'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Tree') > -1);
    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'bar');
  });

  test('mode - view', async function(assert) {
    await render(hbs `{{json-editor json=json mode='view'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('View') > -1);
    assert.dom('.jsoneditor-tree > div[contenteditable="false"]').exists({ count: 3 });
  });

  test('mode - form', async function(assert) {
    await render(hbs `{{json-editor json=json mode='form'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Form') > -1);
    assert.dom('.jsoneditor-tree > div[contenteditable="true"]').exists({ count: 1 });
    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'bar');
  });

  test('mode - text', async function(assert) {
    await render(hbs `{{json-editor json=json mode='text'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Text') > -1);
  });

  test('mode - code', async function(assert) {
    await render(hbs `{{json-editor json=json mode='code'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Code') > -1);
  });
});
