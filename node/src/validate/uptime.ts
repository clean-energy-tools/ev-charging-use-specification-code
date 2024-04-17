
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Uptime } from '../types-evchargingspec/uptime.js';
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
import YAML from 'js-yaml';

import * as path from 'path';
import { Readable } from "stream";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await readYAMLSchema(
    path.join(
        __dirname, '..', 'schemas', 'uptime.yaml'));
const schema: JSONSchemaType<Uptime> = _schema;
export const validatorUptime = ajv.compile<Uptime>(schema);

const uptime_columns = [
    { key: 'port_id' },
    { key: 'station_id' },
    { key: 'uptime_period_start' },
    { key: 'uptime_period_end' },
    { key: 'report_yr_mon' },
    { key: 'uptime_pct' },
    { key: 'outage_total' },
    { key: 'outage_excluded' },
];

export const serializeUptime = (
    data: Uptime | Array<Uptime>, options?: serializorOptions
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
            _options.columns = uptime_columns;
        }
    }
    return serializor<Uptime>(data, validatorUptime, _options);
};

export const validateUptime  = (
    data: Uptime | Array<Uptime>
) => {
    // console.log(`validateUptime ${YAML.dump({
    //     data: data
    // }, { indent: 4 })}`);
    const ret = validator<Uptime>(data, validatorUptime);
    return ret;
};

export const parseCSVUptime = async (
    data: string | Readable, options?: any
): Promise<Array<Uptime> | undefined> => {

    const _options = options ? options : {} as any;

    // if (!('columns' in _options)) {
    //     _options.columns = uptime_columns;
    // }
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
            // console.log(`parseCSVUptime ${record}`);
            if (!Array.isArray(record)) {
                throw new Error(`record must be an array`);
            }
            if (record.length < 8) {
                throw new Error(`record must have 8 entries`);
            }
            if (typeof record[2] !== 'string') {
                throw new Error(`uptime_period_start must be a string`);
            }
            if (typeof record[3] !== 'string') {
                throw new Error(`uptime_period_end must be a string`);
            }
            const ret: Uptime = {
                port_id: record[0],
                station_id: record[1],
                uptime_period_start: record[2],
                uptime_period_end: record[3],
                report_yr_mon: record[4],
                uptime_pct: Number.parseFloat(record[5]),
                outage_total: Number.parseFloat(record[6]),
                outage_excluded: Number.parseFloat(record[7])
            };
            if (validatorUptime(ret)) {
                return ret;
            } else {
                throw new Error(`invalid CSV data for Uptime`);
            }
        },
        _options);

    return records;

};

export const parseJSONUptime = (data: string) => {
    return parserJSON<Uptime>(data, validatorUptime);
};

export const parseYAMLUptime = (data: string) => {
    return parserYAML<Uptime>(data, validatorUptime);
};
