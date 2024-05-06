
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import Ajv, { JSONSchemaType, DefinedError } from "ajv";
import YAML from 'js-yaml';
import { generate, transform, stringify } from "csv/sync";
import { parse } from 'csv-parse';

import addFormats from "ajv-formats";
import { AccessType, OnsiteDERType, OperatingStatus } from '../types-evchargingspec/station.js';
import { ChargerType, ConnectorType, ValidPaymentType } from '../types-evchargingspec/port.js';
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

/**
 * Validate a year string
 */
export const validatorYear
    = ajv.compile(_schemaCommon.definitions.year);

/**
 * Validate a year+month string
 */
export const validatorYearMN
    = ajv.compile(_schemaCommon.definitions.yearmn);

/**
 * Validate an ISO8601 duration string
 */
export const validatorDuration
    = ajv.compile(_schemaCommon.definitions.duration);

/**
 * Validate that a number is a latitude
 */
export const validatorLatitude
    = ajv.compile(_schemaCommon.definitions.latitude);

/**
 * Validate that a number is a longitude
 */
export const validatorLongitude
    = ajv.compile(_schemaCommon.definitions.longitude);

/**
 * Validate a zip code string
 */
export const validatorZipCode
    = ajv.compile(_schemaCommon.definitions.zipCode);

/**
 * Validate a charger type string
 */
export const validatorChargerType
    = ajv.compile<ChargerType>(_schemaCommon.definitions.chargerType);

/**
 * Validate a connector type string
 */
export const validatorConnectorType
    = ajv.compile<ConnectorType>(_schemaCommon.definitions.connectorType);

/**
 * Validate a payment type string
 */
export const validatorValidPaymentType
    = ajv.compile<ValidPaymentType>(_schemaCommon.definitions.validPaymentType);

/**
 * Validate an onsite DER type string
 */
export const validatorOnsiteDERType
    = ajv.compile<OnsiteDERType>(_schemaCommon.definitions.onsiteDERType);

/**
 * Validate an access type string
 */
export const validatorAccessType
    = ajv.compile<AccessType>(_schemaCommon.definitions.accessType);

/**
 * Validate an operating status type string
 */
export const validatorOperatingStatus
    = ajv.compile<OperatingStatus>(_schemaCommon.definitions.operatingStatus);

/**
 * Convert a string to a Latitude, verifying the range
 * @param data 
 * @returns 
 */
export function parseLatitude(data: string | number): number {
    let _num: number | undefined
        = typeof data === 'string'
            ? Number.parseFloat(data)
            : (
                typeof data === 'number'
                ? data
                : undefined
            );
    if (typeof _num === 'undefined') {
        throw new Error(`Latitude is undefined`);
    }
    if (validatorLatitude(_num)) {
        return _num;
    } else {
        throw new Error(`Latitude ${data} out of range`);
    }
}

/**
 * Convert a string to a Longitude, verifying the range
 * @param data 
 * @returns 
 */
export function parseLongitude(data: string | number): number {
    let _num: number | undefined
        = typeof data === 'string'
            ? Number.parseFloat(data)
            : (
                typeof data === 'number'
                ? data
                : undefined
            );
    if (typeof _num === 'undefined') {
        throw new Error(`Longitude is undefined`);
    }
    if (validatorLongitude(_num)) {
        return _num;
    } else {
        throw new Error(`Longitude ${data} out of range`);
    }
}

/**
 * Convert a string to the ChargerType enum, while
 * validating its value
 * @param data 
 * @returns 
 */
export function parseChargerType(data: string): ChargerType {
    if (typeof data !== 'string') {
        throw new Error(`Charger Type is not a string ${data}`);
    }
    if (validatorChargerType(data)) {
        return data as ChargerType;
    } else {
        throw new Error(`Charger Type ${data} not valid`);
    }
}

/**
 * Convert a string to the ConnectorType enum, while
 * validating its value
 * @param data 
 * @returns 
 */
export function parseConnectorType(data: string): ChargerType {
    if (typeof data !== 'string') {
        throw new Error(`Connector Type is not a string ${data}`);
    }
    if (validatorConnectorType(data)) {
        return data as ChargerType;
    } else {
        throw new Error(`Connector Type ${data} not valid`);
    }
}

/**
 * Convert a string to the ValidPaymentType enum, while
 * validating its value
 * @param data 
 * @returns 
 */
export function parseValidPaymentType(data: string): ValidPaymentType {
    if (typeof data !== 'string') {
        throw new Error(`ValidPaymentType is not a string ${data}`);
    }
    if (validatorValidPaymentType(data)) {
        return data as ValidPaymentType;
    } else {
        throw new Error(`ValidPaymentType ${data} not valid`);
    }
}

/**
 * Convert a string to the OnSiteDERType enum, while
 * validating its value
 * @param data 
 * @returns 
 */
export function parseOnsiteDERType(data: string): OnsiteDERType {
    if (typeof data !== 'string') {
        throw new Error(`OnSiteDERType is not a string ${data}`);
    }
    if (validatorOnsiteDERType(data)) {
        return data as OnsiteDERType;
    } else {
        throw new Error(`OnSiteDERType ${data} not valid`);
    }
}

/**
 * Convert a string to the AccessType enum, while
 * validating its value
 * @param data 
 * @returns 
 */
export function parseAccessType(data: string): AccessType {
    if (typeof data !== 'string') {
        throw new Error(`AccessType is not a string ${data}`);
    }
    if (validatorAccessType(data)) {
        return data as AccessType;
    } else {
        throw new Error(`AccessType ${data} not valid`);
    }
}

/**
 * Convert a string to the OperatingStatus enum, while
 * validating its value
 * @param data 
 * @returns 
 */
export function parseOperatingStatus(data: string): OperatingStatus {
    if (typeof data !== 'string') {
        throw new Error(`OperatingStatus is not a string ${data}`);
    }
    if (validatorOperatingStatus(data)) {
        return data as OperatingStatus;
    } else {
        throw new Error(`OperatingStatus ${data} not valid`);
    }
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

    /**
     * The cast object for stringify
     */
    cast?: any;
}

/**
 * Serialize an object to a row based on the options provided.
 *
 * @param data The object to serialize
 * @param validator The function for validating objects
 * @param options Serialization options
 * @returns
 */
export function serializor<T>(
        data: T | Array<T>,
        validator: Ajv.ValidateFunction<T>,
        options: serializorOptions
): errorResult {
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
            if ('cast' in options) {
                _options.cast = options.cast;
            }
            // console.log('serializor', _options);
            return {
                result: stringify(
                    Array.isArray(data)
                    ? (data as any)
                    : [ data as any ],
                    _options)
            };
        } else if (options.format === 'JSON') {
            return {
                result: JSON.stringify(data, null, 4)
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

export function validator<T>(
    data: T | Array<T>, validator: Ajv.ValidateFunction<T>
): boolean {
    if (Array.isArray(data)) {
        for (const item of data) {
            if (!validator(item)) {
                // console.log(`validator array item ${YAML.dump({
                //     item
                // }, { indent: 4 })} failed`, validator.errors);
                return false;
            }
        }
        // console.log(`validation succeeds array ${YAML.dump({
        //     data
        // }, { indent: 4 })}`);
        return true;
    } else if (validator(data)) {
        // console.log(`validation succeeds item ${YAML.dump({
        //     data
        // }, { indent: 4 })}`);
        return true;
    } else {
        // console.log(validator.errors);
        // console.log(`validator item ${YAML.dump({
        //     data
        // }, { indent: 4 })} failed`, validator.errors);
        return false;
    }
}

export function parserJSON<T>(
    data: string, validator: Ajv.ValidateFunction<T>
): T | undefined {
    if (data && typeof data === 'string') {
        const ret: T = JSON.parse(data);
        if (Array.isArray(ret)) {
            for (const item of ret) {
                if (!validator(item)) {
                    // console.log(`validator item ${YAML.dump({
                    //     item
                    // }, { indent: 4 })} fail`, validator.errors)
                    return undefined;
                }
            }
            return ret;
        } else if (validator(ret)) {
            return ret as T;
        } else {
            // TODO how to indicate the errors
            return undefined;
        }
    } else {
        return undefined;
    }
}

export function parserYAML<T>(
    data: string, validator: Ajv.ValidateFunction<T>
): any {
    if (data && typeof data === 'string') {
        const ret: any = YAML.load(data) as any;
        // console.log(YAML.dump({
        //     title: 'parserYAML',
        //     data,
        //     ret
        // }, { indent: 4 }));
        if (Array.isArray(ret)) {
            for (const item of ret) {
                if (!validator(item)) {
                    console.log(`validator item ${YAML.dump({
                        item
                    }, { indent: 4 })} fail`, validator.errors)
                    return undefined;
                }
            }
            return ret;
        } else if (validator(ret)) {
            return ret as any;
        } else {
            // TODO how to indicate the errors
            console.log('validator fail', validator.errors)
            return undefined;
        }
    } else {
        console.log('data not string', data);
        return undefined;
    }
}

export async function parseCSV<T>(
    data: string | Readable,
    processRecord: (record?: any[]) => T | undefined,
    options?: any
)
    : Promise<Array<T> | undefined>
{

    // The csv-parse module works best with
    // data arriving through a REadable.
    // This block concocts a REadable
    // from a string as noted here:
    // https://stackoverflow.com/questions/12755997/how-to-create-streams-from-string-in-node-js
    
    let reader;
    if (data instanceof Readable) {
        reader = data;
    } else if (typeof data === 'string') {
        reader = Readable.from([ data ]);
    } else {
        throw new Error(`data parameter must be a string or a Readable`);
    }

    const records = [] as any[];
    await new Promise((resolve, reject) => {

        const parser = parse(options);
      
          parser.on('readable', function(){
              let record;
              while ((record = parser.read()) !== null) {
                  records.push(processRecord(record));
              }
        });
      
        parser.on('error', function(err: any){
            reject(err);
        });
    
        parser.on('end', function() {
            resolve(records);
        });

        reader.pipe(parser);
        // parser.write(data);
        // parser.end();

    });

    return records;
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

// Unneeded?

// export function getOperatingStatus(s: string)
//     : OperatingStatus | undefined
// {
//     if (s.toLowerCase() === "operational"
//      || s.toLowerCase() === "under_construction"
//      || s.toLowerCase() === "planned"
//      || s.toLowerCase() === "decommissioned") {
//         return s as OperatingStatus;
//     } else {
//         return undefined;
//     }
// }

export function getBoolean(b: string | boolean): boolean {
    if (typeof b === 'string') {
        if (b.toLowerCase() === 'false'
         || b === ''
         || b === '0') {
            return false;
        } else if (b.toLowerCase() === 'true'
         || b === '1') {
            return true;
        }
        // What other checks could be made?
    } else if (typeof b === 'boolean') {
        return b;
    }
    // This is a default 
    return false;
}