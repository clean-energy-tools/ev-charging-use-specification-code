
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

import { Project } from '../types-evchargingspec/project.js';

import { serializerJSON, validator, parserJSON, readJSONSchema } from './common.js';
const _schema = await readJSONSchema('../schemas/project.json');
const schema: JSONSchemaType<Project> = _schema.definitions.Project;
const validate = ajv.compile(schema);

export const serializeJSONProject = (data: Project) => {
    return serializerJSON<Project>(data, validate);
};

export const validateProject  = (data: Project) => {
    return validator<Project>(data, validate);
};

export const parseJSONProject = (data: string) => {
    return parserJSON<Project>(data, validate);
};
