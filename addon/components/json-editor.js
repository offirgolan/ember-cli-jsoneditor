/* global JSONEditor */

import Ember from 'ember';

const {
  run,
  merge,
  isNone,
  computed,
  observer,
  defineProperty
} = Ember;

const possibleOptions = ['ace', 'ajv', 'escapeUnicode', 'history', 'modes', 'search', 'indentation', 'theme', 'disabled'];

export default Ember.Component.extend({
  classNames: ['ember-cli-jsoneditor'],

  name: 'JSONEditor',
  mode: 'tree',
  history: true,
  search: true,
  indentation: 2,
  escapeUnicode: false,
  theme: 'ace/theme/jsoneditor',
  modes: ['tree', 'view', 'form', 'text', 'code'],

  disabled: false,

  onChange: Ember.K,
  onError: Ember.K,
  onModeChange: Ember.K,
  onEditable: Ember.K,

  init() {
    this._super(...arguments);
    defineProperty(this, 'options', computed(...possibleOptions, this.getOptions));
  },

  didInsertElement() {
    this._super(...arguments);
    this._createEditorPid = run.scheduleOnce('afterRender', this, () => {
      this.createEditor();
    });
  },

  destroy() {
    this._super(...arguments);

    const editor = this.get('editor');

    if (!isNone(editor)) {
      editor.destroy();
    }

    run.cancel(this._createEditorPid);
  },

  createEditor: observer('options', function() {
    if (!this.notDestroyed()) {
      return;
    }

    const element = this.get('element');
    const editor = this.get('editor');

    if (isNone(element)) {
      return;
    }

    if (!isNone(editor)) {
      editor.destroy();
    }

    this.set('editor', new JSONEditor(element, this.get('options'), this.getJSON()));
  }),

  modeChanged: observer('mode', function() {
    if (this.notDestroyed()) {
      this.get('editor').setMode(this.get('mode'));
    }
  }),

  nameChanged: observer('name', function() {
    if (this.notDestroyed()) {
      this.get('editor').setName(this.get('name'));
    }
  }),

  schemaChanged: observer('schema', function() {
    if (this.notDestroyed()) {
      this.get('editor').setSchema(this.get('schema'));
    }
  }),

  jsonChanged: observer('json', function() {
    // Only update json if it was change programatically
    if (!this._isTyping && this.notDestroyed()) {
      this.get('editor').set(this.getJSON());
    }
  }),

  getOptions() {
    const options = this.getProperties(possibleOptions);
    merge(options, this.getProperties(['name', 'mode', 'schema']));

    if (options.disabled) {
      options.mode = 'view';
      options.modes = ['view'];
    }

    options.onChange = () => {
      this._isTyping = true;
      this.get('onChange')(this.get('editor').get());
      this._isTyping = false;
    };

    options.onError = this.get('onError');
    options.onModeChange = this.get('onModeChange');
    options.onEditable = this.get('onEditable');

    delete options.disabled;

    return options;
  },

  getJSON() {
    let json = this.get('json');
    if (typeof json === "string") {
      return JSON.parse(json);
    }
    return json;
  },

  notDestroyed() {
    return !this.get('isDestroyed') && !this.get('isDestroyed');
  }
});
