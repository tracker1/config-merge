# config-merge

Deep merge configuration `.yml` files in directory trees into output file.  The purpose is to allow for configuration of software for multiple release configuration options. The input is intended to have a `!default` setting for features/flags/options, while allowing for release overrides.

There are multiple layers of releases with input directories like:

  - `!default` - default configuration
  - `config` - release configuration (basic, pro, client1, client2, ...)
  - `config.environment` - environment specific config (such as pro-development)

The `.yml` files in the config directory will be parsed, merged and outputted as `config.json` with each file name (without extension) serving
as a key without the output object.

Strings, as a `config/strings` directory, will specifically inherit in a similar method outlined below, 
with output going to `strings.json` with each key being a rolled up 
result.

Images, as a `config/images` directory, should be used sparingly.  It will only bring in images with the following extensions (`.png`, `.gif`, `.jpg`, `.svg`, `.webm`).  It will output `images.json` which will contain a collection based on original file name with extension, and will contain objects with the following properties:

  - `height`
  - `width`
  - `src` - encoded for use in an `image` html element (not `.svg`)
  - `svg` - actual xml for `.svg` images only

## Installation

### Global

`npm i -g @tracker1/config-merge`

### Library

`npm i @tracker1/config-merge`

## Usage

### CLI

`config-merge inputDirectory outputDirectory`

### Structure

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

**String Inheritance**

For a given key in input of, as an example config1 for strings/en-us.yaml the inheritance chain would be as follows...

- `!default/!default.yaml`
- `config1/!default.yaml`
- `!default/strings/en.yaml`
- `config1/strings/en.yaml`
- `!default/strings/en-us.yaml`
- `config1/strings/en-us.yaml`

For a given target for config1.environment, the `!default` above would be replaced by the output of `config1`.

## Future

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