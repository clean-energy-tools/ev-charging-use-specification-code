
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { OperatingCosts } from '../types-evchargingspec/operating-costs.js';
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
    path.join(__dirname, '..', 'schemas', 'operating-costs.yaml'));
const schema: JSONSchemaType<OperatingCosts> = _schema;
export const validatorCosts = ajv.compile<OperatingCosts>(schema);

const costs_columns = [
    { key: 'station_id' },
    { key: 'oc_period_start' },
    { key: 'oc_period_end' },
    { key: 'oc_year' },
    { key: 'station_mr' },
    { key: 'maintenance_cost' },
    { key: 'repair_cost' },
    { key: 'electricity_cost' },
    { key: 'network_costs' },
];

export const serializeOperatingCosts = (
        data: OperatingCosts | Array<OperatingCosts>,
        options?: serializorOptions
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
            _options.columns = costs_columns;
        }
    }
    return serializor<OperatingCosts>(data, validatorCosts, _options);
};

export const validateOperatingCosts  = (data: OperatingCosts) => {
    return validator<OperatingCosts>(data, validatorCosts);
};

export const parseCSVOperatingCosts = async (
    data: string | Readable, options?: any
): Promise<Array<OperatingCosts> | undefined> => {

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
            if (record.length < 11) {
                throw new Error(`record must have 8 entries`);
            }
            const ret: OperatingCosts = {
                station_id: record[0],
                oc_period_start: record[1],
                oc_period_end: record[2],
                oc_year: record[3],
                station_mr: Number.parseFloat(record[4]),
                maintenance_cost: Number.parseFloat(record[6]),
                repair_cost: Number.parseFloat(record[8]),
                electricity_cost: Number.parseFloat(record[9]),
                network_costs: Number.parseFloat(record[10]),
            };
            if (validatorCosts(ret)) {
                return ret;
            } else {
                throw new Error(`invalid CSV data for OperatingCosts`);
            }
        },
        _options);

    return records;

};

export const parseJSONOperatingCosts = (data: string) => {
    return parserJSON<OperatingCosts>(data, validatorCosts);
};

export const parseYAMLOperatingCosts = (data: string) => {
    return parserYAML<OperatingCosts>(data, validatorCosts);
};