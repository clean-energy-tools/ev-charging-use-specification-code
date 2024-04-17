
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Outage } from '../types-evchargingspec/outage.js';
import {
    serializor, serializorOptions,
    validator,
    parserJSON,
    parserYAML,
    parseCSV,
    readJSONSchema,
    readYAMLSchema,
    getBoolean
} from './common.js';

import * as path from 'path';
import { Readable } from "stream";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await readYAMLSchema(
    path.join(__dirname, '..', 'schemas', 'outage.yaml'));
const schema: JSONSchemaType<Outage> = _schema;
const validatorOutage = ajv.compile<Outage>(schema);

const outage_columns = [
    { key: 'outage_id' },
    { key: 'port_id' },
    { key: 'station_id' },
    { key: 'outage_start' },
    { key: 'outage_end' },
    { key: 'outage_duration' },
    { key: 'outage_cause' },
    { key: 'exempted_outage' },
];

export const serializeOutage = (
    data: Outage | Array<Outage>, options?: serializorOptions
) => {

    const _options: serializorOptions =
        (typeof options !== 'undefined')
        ? options
        : {} as any;

    if (typeof _options.format === 'undefined') _options.format = 'JSON';

    if (_options.format === 'CSV') {
        if (!('columns' in _options
            && Array.isArray(_options.columns))
        ) {
            _options.columns = outage_columns;
        }
    }
    return serializor<Outage>(data, validatorOutage, _options);
};

export const validateOutage  = (data: Outage) => {
    return validator<Outage>(data, validatorOutage);
};

export const parseCSVOutage = async (
    data: string | Readable, options?: any
): Promise<Array<Outage> | undefined> => {

    const _options = options ? options : {} as any;

    const records = await parseCSV(data,
        // The record will be like this:[
        //       '8080',
        //       'statia-clabucet',
        //       '2024-01-02T03:04:05Z',
        //       '2024-01-02T05:06:07Z',
        //       '202401',
        //       '0.99',
        //       '1',
        //       '1'
        //     ]
        (record?: Array<string>) => {
            if (!Array.isArray(record)) {
                throw new Error(`record must be an array`);
            }
            if (record.length < 8) {
                throw new Error(`record must have 8 entries`);
            }
            const ret: Outage = {
                outage_id: record[0],
                port_id: record[1],
                station_id: record[2],
                outage_start: record[3],
                outage_end: record[4],
                outage_duration: record[5],
                outage_cause: record[6],
                exempted_outage: getBoolean(record[7]),
            };
            if (validatorOutage(ret)) {
                return ret;
            } else {
                throw new Error(`invalid CSV data for Outage`);
            }
        },
        _options);

    return records;

};

export const parseJSONOutage = (data: string) => {
    return parserJSON<Outage>(data, validatorOutage);
};

export const parseYAMLOutage = (data: string) => {
    return parserYAML<Outage>(data, validatorOutage);
};
