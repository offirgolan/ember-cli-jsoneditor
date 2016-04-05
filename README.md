# Ember CLI JSON Editor

[![npm version](https://badge.fury.io/js/ember-cli-jsoneditor.svg)](http://badge.fury.io/js/ember-cli-jsoneditor)

This addon is an ember wrapper around [JSON Editor](https://github.com/josdejong/jsoneditor). 

Supported browsers: Chrome, Firefox, Safari, Opera, Internet Explorer 9+.

<img alt="json editor" src="https://raw.github.com/josdejong/jsoneditor/master/misc/jsoneditor.png"> &nbsp; <img alt="code editor" src="https://raw.github.com/josdejong/jsoneditor/master/misc/codeeditor.png">

## Documentation

- Documentation:
  - [Possible Options](https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options)
  - [Shortcut keys](https://github.com/josdejong/jsoneditor/tree/master/docs/shortcut_keys.md)
- [Examples](https://github.com/josdejong/jsoneditor/tree/master/examples)

## Install 

```bash
ember install ember-cli-jsoneditor
```

## Usage

```hbs
{{json-editor json=json onChange=(action (mut json))}}
```

## Possible Options

- ace
- ajv
- name: `'JSONEditor'`
- mode: `'tree'`
- history: `true`
- search: `true`
- disabled: `true`
- indentation: `2`
- escapeUnicode: `false`
- theme: `'ace/theme/jsoneditor'`
- modes: `['tree', 'view', 'form', 'text', 'code']`

`disabled` is an option that is only supported for this addon. If set to `true`, it will set __mode__ to `view` and __modes__ to `['view']`.


## Possible Actions

- onChange(json)
- onError(err)
- onModeChange(newMode, oldMode)
- onEditable(node)
