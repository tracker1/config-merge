# @tracker1/config-merge

<span class="badge-travisci"><a href="http://travis-ci.org/tracker1/config-merge" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/tracker1/config-merge/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/@tracker1/config-merge" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@tracker1/config-merge.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@tracker1/config-merge" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@tracker1/config-merge.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/tracker1/config-merge" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/tracker1/config-merge.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/tracker1/config-merge?type=dev" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/tracker1/config-merge.svg" alt="Dev Dependency Status" /></a></span>

Deep merge configuration `.yml` files in directory trees into output files. 

## Installation

### Global

`npm i -g @tracker1/config-merge`

### Library

`npm i @tracker1/config-merge`

## Usage

### CLI

*Output directory must exist before calling*

`config-merge inputDirectory outputDirectory`

### API

```
// full input/output
const configMerge = require('config-merge');
...
  await configMerge('./config', './dist');


// input directory to object
const configMergeInput = require('config-merge/src/process-input');
...
  const configs = configMergeInput('./config');
```

## Structure

#### input

    inputDirectory/
      - !default/     <-- should have a ! in front of default(s), will strip from output.
        - strings/
          - !default.yaml
          - es.yaml
          - en-us.yaml
          - es-us.yaml
        - images/     <-- only brings in (png, jpg, gif, svg, webp)
          logo.png
        ui.yaml
        app.yaml
      - config1/
        - strings
          - en-us.yaml
        - images/
          logo.png
        ui.yaml
      - config1.environment/
        ui.yaml
      - config2/
        ...

#### output

    outputDirectory/
      default/ (compiled output for !default, no !)
        strings.json (output has all string options, with inheritance)
        images.json (output has inline URL format for images)
        config.json (output has {app,ui} based on input files)
      config1/  (deep merge of !default -> config1)
      config1.environment (deep merge  !default -> config1 -> config1.environment)
      config2/  (deep merge of !default -> config2)

## Intent

The purpose is to allow for configuration of software for multiple release configuration options. The input is intended to have a `!default` setting for features/flags/options, while allowing for release overrides.

There are multiple layers of releases with input directories like:

  - `!default` - default configuration
  - `config` - release configuration (basic, pro, client1, client2, ...)
  - `config.environment` - environment specific config (such as pro-development)

The `.yml` files in the config directory will be parsed, merged and outputted as `config.json` with each file name (without extension) serving
as a key without the output object.

### Images

Images, as a `config/images` directory, should be used sparingly.  It will only bring in images with the following extensions (`.png`, `.gif`, `.jpg`, `.svg`, `.webm`).  It will output `images.json` which will contain a collection based on original file name with extension, and will contain objects with the following properties:

  - `name`  - filename
  - `width` - width
  - `height` - height
  - `type` - image file extension/type
  - `data` - base64 encoded image file

### Strings

Strings, as a `config/strings` directory, will specifically inherit in a similar method to configurations themselves, with output to `strings.json` with each key being a rolled up result.

**String Inheritance**

String in heritance is as follows (example with `en-us`):

- `!default/!default.yaml`
- `config1/!default.yaml`
- `!default/strings/en.yaml`
- `config1/strings/en.yaml`
- `!default/strings/en-us.yaml`
- `config1/strings/en-us.yaml`

For a environment targets, the `!default` above would be replaced by the output of `config1`.

## TODO

- Flush out tests
- Integrate with TravisCI
- Support `.json` JSON6 as input
- Support `.mjs` es6 module as input
- Support `.js` common-js as input

## License

```
MIT License

Copyright (c) 2018 Michael J. Ryan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```