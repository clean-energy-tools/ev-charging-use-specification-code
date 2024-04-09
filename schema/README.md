JSON Schema definitions corresponding to the [EV Charging Use Data Specification](https://evchargingspec.org/), as well as scripts for building TypeScript type definitions.

The JSON Schema's were created by reading the specification documents in [the EV Charging Use Data Specification GitHub repository](https://github.com/AtlasPublicPolicy/charging-use-spec).  The Schema's are in YAML format because that is easier to edit.

[Quicktype](https://quicktype.io/) is used for

* Converting YAML-formatted JSON Schema's into JSON format
* Converting JSON Schema's into TypeScript type definitions, to populate a Node.js module

Since Quicktype supports other programming languages, support for those other languages can be generated using the same approach.

# Generation of TypeScript type definitions

```shell
$ npx quicktype \
    -s schema ./operating-costs.yaml \
    --out ../node/src/types-evchargingspec/operating-costs.ts \
    --just-types
```

The _target language_ is assumed from the file extension.  This tool supports the following languages:

```
LANG ... cs|go|rs|cr|cjson|c++|objc|java|ts|js|javascript-prop-               
  types|flow|swift|scala3|Smithy|kotlin|elm|schema|ruby|dart|py|pike|haskell|typescript- 
  zod|typescript-effect-schema|php
```

The `-s` option specifies the `--src-lang`, or source language, in this case declaring the input file to be a JSON Schema.

The `--just-types` option says to only generate type specifications.  The code generated if that option is missing included a lot of unnecessary extra stuff.

Bottom line is that anyone targeting a different language can easily generate type definitions for that language by using the `--lang` argument.

# Conversion of YAML-formatted schema's to JSON

Normally JSON Schema's are written in JSON format.  But, YAML is much easier to read and edit than JSON, while being functionally the same as JSON.

Quicktype supports conversion using this command:

```shell
$ npx quicktype \
    --src-lang schema operating-costs.yaml \
    --lang schema \
    --out ../node/src/schemas/operating-costs.json
```

Both the `--src-lang` and `--lang` are `schema`, meaning the output file is also a JSON schema.

