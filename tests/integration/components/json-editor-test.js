import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
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
    var nodes = findAll('.jsoneditor-values tbody > tr');
    assert.equal(nodes[0].textContent, 'JSONEditor{1}');
    assert.equal(nodes[1].textContent, 'foo:bar');
    // assert.dom('.jsoneditor-values tbody > tr').hasText('JSONEditor{1}foo:bar');
  });

  test('is disabled', async function(assert) {
    assert.expect(2);
    this.set('isDisabled', false);

    await render(hbs `{{json-editor disabled=isDisabled}}`);

    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Tree') > -1);

    this.set('isDisabled', true);

    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('View') > -1);
  });

  test('json', async function(assert) {
    assert.expect(2);

    await render(hbs `{{json-editor json=json onChange=(action (mut json))}}`);
    var chk = findAll('.jsoneditor-tree > div[contenteditable="true"]')[1].textContent;
    assert.equal(chk.trim(), 'bar');

    this.set('json', {
      foo: 'foo'
    });
    chk = findAll('.jsoneditor-tree > div[contenteditable="true"]')[1].textContent;
    assert.equal(chk.trim(), 'foo');
  });

  test('mode - tree', async function(assert) {
    await render(hbs `{{json-editor json=json mode='tree'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Tree') > -1);
    var chk = findAll('.jsoneditor-tree > div[contenteditable="true"]')[1].textContent;
    assert.equal(chk.trim(), 'bar');
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
    var nodes = findAll('.jsoneditor-tree > div[contenteditable="true"]');
    var last = nodes[nodes.length -1];
    assert.equal(last.textContent.trim(), 'bar');
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
