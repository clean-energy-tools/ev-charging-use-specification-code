
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

import { Session } from '../types-evchargingspec/session.js';
import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';

const _schema = await readJSONSchema('../schemas/session.json');
const schema: JSONSchemaType<Session> = _schema.definitions.Session;
const validate = ajv.compile(schema);

export const serializeJSONSession = (data: Session) => {
    return serializerJSON<Session>(data, validate);
};

export const validateSession  = (data: Session) => {
    return validator<Session>(data, validate);
};

export const parseJSONSession = (data: string) => {
    return parserJSON<Session>(data, validate);
};
