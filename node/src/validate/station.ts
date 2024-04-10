
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

import { Station } from '../types-evchargingspec/station.js';
import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';
const _schema = await readJSONSchema('../schemas/station.json');
const schema: JSONSchemaType<Station> = _schema.definitions.Station;
const validate = ajv.compile(schema);

export const serializeJSONStation = (data: Station) => {
    return serializerJSON<Station>(data, validate);
};

export const validateStation  = (data: Station) => {
    return validator<Station>(data, validate);
};

export const parseJSONStation = (data: string) => {
    return parserJSON<Station>(data, validate);
};
