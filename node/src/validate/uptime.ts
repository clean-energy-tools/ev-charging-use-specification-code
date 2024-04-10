
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

import { Uptime } from '../types-evchargingspec/uptime.js';

import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';
const _schema = await readJSONSchema('../schemas/uptime.json');
const schema: JSONSchemaType<Uptime> = _schema.definitions.Uptime;
const validate = ajv.compile(schema);

export const serializeJSONUptime = (data: Uptime) => {
    return serializerJSON<Uptime>(data, validate);
};

export const validateUptime  = (data: Uptime) => {
    return validator<Uptime>(data, validate);
};

export const parseJSONUptime = (data: string) => {
    return parserJSON<Uptime>(data, validate);
};
