JSON Schema definitions corresponding to the [EV Charging Use Data Specification](https://evchargingspec.org/), as well as scripts for building code for the Node.js package.

The JSON Schema's were created by reading the specification documents in [the EV Charging Use Data Specification GitHub repository](https://github.com/AtlasPublicPolicy/charging-use-spec).  The Schema's are in YAML format because that is easier to edit.

[Quicktype](https://quicktype.io/) is used for converting JSON Schema's into TypeScript type definitions, to populate a Node.js module.

Since Quicktype supports other programming languages, code for those other languages can be generated using the same approach.

Any programming language can be targeted by using corresponding code generation tools.

It is necessary that generated code carry over all attributes defined in the schema's.  The schema declares acceptable string patterns and numerical ranges for each field.  Generated type declarations, and data validation code, must reflect what is defined in the schema.  This is key in selecting a code generation tool.

Unfortunately, while Quicktype seemed to be an excellent choice, the code it generates does not have the format or keyword attributes declared in the schema.  That meant we are limiting its usage to generating type declarations.

# Generating code for a TypeScript package running on Node.js

As of this writing the sole target is TypeScript on Node.js.  This section discusses autogenerating code for that platform.  This may be useful as an outline of autogenerating code for packages for other programming languages.

The plan is:

* Autogenerate TypeScript type definitions into the package.
    * Because Quicktype makes some errors, these files are generated into `generated/types-evchargingspec` and the corresponding files in the Node.js package are copied from those files.
* Autogenerate JSON-formatted schema definitions from the YAML-formatted schema.
    * Because quicktype loses the formats/keywords when converting YAML-formatted schema to JSON, this conversion uses `yq`
* Creating small modules using AJV for validating and serializing, using the schema definitions
* OPTIONAL: Autogenerate Zod validation code in TypeScript
    * As with the Schema files, this cannot be directly used in the package
    * Manually massage the Zod code in the package
    * It was intended to instead use AJV for validation, using the JSON-formatted schema files, but that is difficult to get to work


# Generation of TypeScript type definitions

The `schema` directory contains `YAML` formatted JSON Schema's.  In TypeScript code it's useful to have type definitions.

```shell
$ npx quicktype \
    -s schema ./project.yaml \
    --out ${npm_package_config_genNodeTypes}/project.ts \
    --lang ts --just-types --prefer-unions
```

The _target language_ could be assumed from the file extension, but the `--lang` option lets us explicitly declare the target.  This tool supports the following languages:

```
LANG ... cs|go|rs|cr|cjson|c++|objc|java|ts|js|javascript-prop-               
  types|flow|swift|scala3|Smithy|kotlin|elm|schema|ruby|dart|py|pike|haskell|typescript- 
  zod|typescript-effect-schema|php
```

The `-s` option specifies the `--src-lang`, or source language, in this case declaring the input file to be a JSON Schema.

The `--just-types` option says to only generate type specifications.  The code generated if that option is missing included a lot of unnecessary extra stuff.

The `--prefer-unions` option says to, rather than use an `enum` for a field with several specific allowed values, to use this style:

```js
export type AccessType = "public" | "private"
      | "semi_public" | "commercial_only";
```

Unfortunately, Quicktype makes at least one error in generating the types.  Namely, some schema fields with format `date-time`, and in the generated TypeScript type are declared as `Date`.  The schema clearly says the field is a `string` whose format is an ISO8160 date/time string.  When AJV uses the schema to validate objects it looks for a string rather than a Date, and therefore fails because a Date is not a string.

To resolve this, the `gen` commands generate TypeScript code into `schema/generated/types-evchargingspec` rather than `node/src/types-evchargingspec`.  The files in the latter directory are created by copying, and modifying, the files from the former directory.

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

Both the `--src-lang` and `--lang` are `schema`, meaning the input and output files are JSON schema.  The difference is that the input file has the `.yaml` extension which Quicktype recognizes, while the output file has the `.json` extension.  Hence, this tells Quicktype to convert from YAML to JSON.

But, using Quicktype for this creates a problem in that the attributes (formats and keywords) are stripped out in some cases.

For example, consider this declaration in `station.yaml`:

```yaml
    station_lon:
        description: |
            Station center WSG84-encoded longitude in decimal degrees to at least 4 decimal places.
            Valid longitudes are between -180 and 180
        $ref: './common.json#/definitions/longitude'

    station_lat:
        description: |
            Station center WSG84 encoded latitude in decimal degrees to at least 4 decimal places.
            Valid latitudes are between -90 and 90.
        $ref: './common.json#/definitions/latitude'
```

Latitude and Longitude are numbers with strictly defined allowed values.  It's an error for a field to not have those values.  Enforcing this is handled with these entries in `common.yaml`

```yaml
    latitude:
        $id: 'common.json#/definitions/latitude'
        description: "Matches the latitude of a latitude/longitude"
        type: "number"
        minimum: -180
        maximum: 180

    longitude:
        $id: 'common.json#/definitions/longitude'
        description: "Matches the longitude of a latitude/longitude"
        type: "number"
        minimum: -90
        maximum: 90
```

Each are correctly specified.  But, this is what Quicktype generates:

```json
    "station_lat": {
        "type": "number",
        "description": "Station center WSG84 encoded latitude in decimal degrees to at least 4 decimal places.\nValid latitudes are between -90 and 90.\n\nMatches the latitude of a latitude/longitude"
    },
    "station_lon": {
        "type": "number",
        "description": "Station center WSG84-encoded longitude in decimal degrees to at least 4 decimal places.\nValid longitudes are between -180 and 180\n\nMatches the longitude of a latitude/longitude"
    },
```

The `type` attribute is copied, but the `minimum` and `maximum` values are not.

An issue has been filed: https://github.com/glideapps/quicktype/issues/2557

Because YAML is functionally equivalent to JSON, the conversion from a YAML-formatted schema to a JSON-formatted schema requires a simple conversion.

```shell
$ yq common.yaml -o json >./common.json
```

The [`yq`](https://github.com/mikefarah/yq) command is a tool for querying and processing YAML files.  This YAML-to-JSON conversion is a rather trivial use of a powerful tool.

# Schema `$id` values, and referencing common definitions

The file `common.yaml` contains schema definitions for use in the other schema files.  It is also converted to the file name `common.json` as discussed in the previous section.

At the head of this file is `$id: "./common.json"`, declaring that items in this file have an ID where the last segment of the URL is replaced with `common.json`.

The schema definitions are located at `definitions/DEFINITION-NAME` in this file.  Each of them has this attribute:  `$id: 'common.json#/definitions/year'`.  Hence, each definition has an ID where the last segment of the URL is replaced with `common.json#/definitions/DEFINITION-NAME`.

In the implementation in the Node.js, in `node/src/validate/common.ts`, each of the definitions in `common.yaml` are added to the schema used by AJV.

Hence, a property of a schema object can refer to a definition as so:

```yaml
$ref: './common.json#/definitions/zipCode'
```

# Zod validation versus AJV

AJV is a validation package for data types defined by JSON Schema.  Initially it was tricky getting it to work correctly.  Zod is an alternative because there are tools, like Quicktype, which can generate Zod schema's.

The command line to use is:

```shell
$ npx quicktype \
    -s schema ./project.yaml \
    --out ${npm_package_config_genNodeZod}/project.ts \
    --lang typescript-zod
```

While this is straight-forward, it unfortunately strips off the keywords and formats while generating Zod validation code.  That makes this a useless path to take.

## Validation using AJV

Instead of Zod, AJV validation is used in the Node.js package.

In `node/src/validate/common.ts` is common code for the AJV validation.

It configures an Ajv instance with the `ajv-formats` package to handle the commonly-used schema formats.  Next, the YAML version of `common.json` is read, and each of the _definitions_ are added to the AJV schema configuration.

In each of module implementing one of the EV Charging Use Specification data types, this Ajv instance is referenced.

The YAML version of the schema is loaded, and a _validator_ function is generated using `ajv.compile`.

A set of functions, `serializeObjectName`, `validateObjectName`, and `parseJSONObjectName`, deal with those operations on these data types.






