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
      - !default/
        - strings/
          - !default.yaml
          - en-us.yaml
          - es-us.yaml
        - images/
          logo.png
        ui.yaml
        app.yaml
      - config1/
        - strings
          - en-us.yaml
        - images/
          logo.png
        ui.yaml
      - config1.development/
        ui.yaml
      - config2/
        ...

#### output

    outputDirectory/
      default/ (compiled output for !default, no !)
        strings.json (output has all string options)
        images.json (output has inline URL format for images)
        config.json (output has {app,ui} based on input files)
      config1/  (deep merge of !default -> config1)
      config1.development (deep merge  !default -> config1 -> config1.developmment)
      config2/  (deep merge of !default -> config2)

## Future

- Support  `.json` JSON6 as input
- Support `.mjs` es6 module as input
- Support `.js` common-js as input

## License

MIT License