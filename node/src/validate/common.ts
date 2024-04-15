
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import Ajv, { JSONSchemaType, DefinedError } from "ajv";
import YAML from 'js-yaml';
import { generate, parse, transform, stringify } from "csv/sync";

import addFormats from "ajv-formats";
export const ajv = new Ajv.default({
    // strict: true,
    // allowUnionTypes: true,
    validateFormats: true
});
addFormats.default(ajv);

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schemaCommon = await readYAMLSchema(
    path.join(__dirname, '..', 'schemas', 'common.yaml')
);

// ajv.addSchema(_schemaCommon);
for (const schemaKey in _schemaCommon.definitions) {
    ajv.addSchema(_schemaCommon.definitions[schemaKey]);
}

type errorResult = {
    result?: string;
    errors?: any[];
}

export type serializorOptions = {
    /**
     * Specifies the output format
     */
    format?: 'CSV' | 'JSON' | 'YAML';

    /**
     * On CSV output, whether to make the first row contain headers
     */
    headers?: boolean;

    /**
     * On CSV output, mapping for the field names to columns
     */
    columns?: any[];

    /**
     * On CSV output, the delimiter to use between columns
     */
    delimiter?: string;

    /**
     * On CSV output, the delimiter to use between records
     */
    record_delimiter?: string;
}

/**
 * Serialize an object to a row based on the options provided.
 *
 * @param data The object to serialize
 * @param validator The function for validating objects
 * @param options Serialization options
 * @returns
 */
export function serializor<T>(data: T | Array<T>, validator: Ajv.ValidateFunction<T>, options: serializorOptions): errorResult {
    let validated = false;
    if (Array.isArray(data)) {
        for (const datum of data) {
            if (!validator(datum)) {
                validated = false;
                break;
            }
        }
        validated = true;
    } else {
        if (validator(data)) {
            validated = true;
        }
    }
    if (validated) {
        if (options.format === 'CSV') {
            const _options: any = {};
            if ('headers' in options && options.headers === true) {
                _options.header = true;
            }
            if ('columns' in options && Array.isArray(options.columns)) {
                _options.columns = options.columns;
            }
            if ('delimiter' in options && typeof options.delimiter === 'string') {
                _options.delimiter = options.delimiter;
            }
            if ('record_delimiter' in options && typeof options.record_delimiter === 'string') {
                _options.record_delimiter = options.record_delimiter;
            }
            return {
                result: stringify(data as any, _options)
            };
        } else if (options.format === 'JSON') {
            return {
                result: JSON.stringify(data)
            };
        } else if (options.format === 'YAML') {
            return {
                result: YAML.dump(data, { indent: 4 })
            };
        } else {
            return {
                errors: [ `UNKNOWN FORMAT ${options.format}` ]
            };
        }
    } else {
        if (validator.errors) {
            return { errors: validator.errors };
        } else {
            return { errors: [ 'UNKNOWN ERROR' ]};
        }
    }
}

export function validator<T>(data: T, validator: Ajv.ValidateFunction<T>): boolean {
    if (validator(data)) {
        return true;
    } else {
        // console.log(validator.errors);
        return false;
    }
}

export function parserJSON<T>(data: string, validator: Ajv.ValidateFunction<T>): T | undefined {
    if (data && typeof data === 'string') {
        const ret: T = JSON.parse(data);
        if (validator(ret)) {
            return ret;
        } else {
            // TODO how to indicate the errors
            return undefined;
        }
    } else {
        return undefined;
    }
}

/**
 * Read a JSON schema, in JSON format, from the named file.
 *
 * @param fn The file name for the schema
 * @returns The schema object, or undefined if parsing failed
 */
export async function readJSONSchema(fn: string): Promise<any | undefined> {

    const _json = await fsp.readFile(fn, 'utf-8');
    try {
        const _schema = JSON.parse(_json);

        return _schema;
    } catch (err) {
        return undefined;
    }

}

export async function readYAMLSchema(fn: string): Promise<any | undefined> {

    const _yaml = await fsp.readFile(fn, 'utf-8');
    try {
        const _schema = YAML.load(_yaml);

        return _schema;
    } catch (err) {
        return undefined;
    }
}