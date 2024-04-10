
import Ajv, { JSONSchemaType, DefinedError } from "ajv";
import addFormats from "ajv-formats";
import addKeywords from 'ajv-keywords';

// These two lines throw compiler errors if `.default` is not used
const ajv = new Ajv.default({
    // strict: true,
    // allowUnionTypes: true,
    validateFormats: true
});
// addFormats.default(ajv);
// addKeywords.default(ajv);

import { Port } from '../types-evchargingspec/port.js';

import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';

const _schema = await readJSONSchema('../schemas/port.json');
const schema: JSONSchemaType<Port> = _schema.definitions.Port;
const validate = ajv.compile(schema);

export const serializeJSONPort = (data: Port) => {
    return serializerJSON<Port>(data, validate);
};

export const validatePort  = (data: Port) => {
    return validator<Port>(data, validate);
};

export const parseJSONPort = (data: string) => {
    return parserJSON<Port>(data, validate);
};
