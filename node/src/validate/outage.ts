
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

import { Outage } from '../types-evchargingspec/outage.js';
import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';

const _schema = await readJSONSchema('../schemas/outage.json');
const schema: JSONSchemaType<Outage> = _schema.definitions.Outage;
const validate = ajv.compile(schema);

export const serializeJSONOutage = (data: Outage) => {
    return serializerJSON<Outage>(data, validate);
};

export const validateOutage  = (data: Outage) => {
    return validator<Outage>(data, validate);
};

export const parseJSONOutage = (data: string) => {
    return parserJSON<Outage>(data, validate);
};
