
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

import { OperatingCosts } from '../types-evchargingspec/operating-costs.js';
import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';

const _schema = await readJSONSchema('../schemas/operating-costs.json');
const schema: JSONSchemaType<OperatingCosts> = _schema.definitions.OperatingCosts;
const validate = ajv.compile(schema);

export const serializeJSONOperatingCosts = (data: OperatingCosts) => {
    return serializerJSON<OperatingCosts>(data, validate);
};

export const validateOperatingCosts  = (data: OperatingCosts) => {
    return validator<OperatingCosts>(data, validate);
};

export const parseJSONOperatingCosts = (data: string) => {
    return parserJSON<OperatingCosts>(data, validate);
};
