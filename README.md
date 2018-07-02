# config-merge

Deep merge configuration `.yml` files in directory trees into output file.

## Installation

### Global

`npm i -g @tracker1/config-merge`

### Library

`npm i @tracker1/config-merge`

## Usage

### CLI

`config-merge default [...overrides] output-file`

### Library

```
import configMerge from '@tracker/config-merge';
...
configMerge(outputPath, defaultDirectoryPath, ...overridePaths);
```
