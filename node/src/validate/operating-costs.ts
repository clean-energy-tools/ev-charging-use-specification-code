
import { promises as fsp } from 'node:fs';
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

const _json = await fsp.readFile('../schemas/operating-costs.json', 'utf-8');
const _schema = JSON.parse(_json);

const schema: JSONSchemaType<OperatingCosts> = _schema.definitions.OperatingCosts;

const validate = ajv.compile(schema);

type errorResult = {
    result?: string;
    errors?: any[];
}

export function serializeOperatingCosts(data: OperatingCosts): errorResult {
    if (validate(data)) {
        return { result: JSON.stringify(data) };
    } else {
        if (validate.errors) {
            return { errors: validate.errors };
        } else {
            return { errors: [ 'UNKNOWN ERROR' ]};
        }
    }
}

export function validateOperatingCosts(data: OperatingCosts): boolean {
    if (validate(data)) {
        return true;
    } else {
        return false;
    }
}

export function parseJSONOperatingCosts(data: string): OperatingCosts | undefined {
    if (data && typeof data === 'string') {
        const ret: OperatingCosts = JSON.parse(data);
        if (validate(ret)) {
            return ret;
        } else {
            // TODO how to indicate the errors
            return undefined;
        }
    } else {
        return undefined;
    }
}
