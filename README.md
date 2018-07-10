# config-merge

Deep merge configuration `.yml` files in directory trees into output file.

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

## Future

- Support `.json` JSON6 as input
- Support `.mjs` es6 module as input
- Support `.js` common-js as input

## License

MIT License