
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Session } from '../types-evchargingspec/session.js';
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
import { ValidPaymentType } from "../types-evchargingspec/port.js";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await readYAMLSchema(
    path.join(__dirname, '..', 'schemas', 'session.yaml'));
const schema: JSONSchemaType<Session> = _schema;
const validatorSession = ajv.compile<Session>(schema);

const session_columns = [
    { key: 'session_id' },
    { key: 'port_id' },
    { key: 'plug_start_datetime' },
    { key: 'plug_end_datetime' },
    { key: 'charge_start_datetime' },
    { key: 'charge_end_datetime' },
    { key: 'session_duration' },
    { key: 'charging_duration' },
    { key: 'energy_kwh' },
    { key: 'peak_kwh' },
    { key: 'total_fee_charged' },
    { key: 'energy_fee' },
    { key: 'session_fee' },
    { key: 'time_fee' },
    { key: 'user_id' },
    { key: 'successful_completion' },
    { key: 'ended_by' },
    { key: 'start_soc' },
    { key: 'end_soc' },
    { key: 'error_code' },
    { key: 'payment_type' },
];

export const serializeSession = (
    data: Session | Array<Session>, options?: serializorOptions
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
            _options.columns = session_columns;
        }
    }
    return serializor<Session>(data, validatorSession, _options);
};

export const validateSession  = (
    data: Session | Array<Session>
) => {
    return validator<Session>(data, validatorSession);
};

export const parseCSVSession = async (
    data: string | Readable, options?: any
): Promise<Array<Session> | undefined> => {

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
            if (record.length < 21) {
                throw new Error(`record must have 8 entries`);
            }
            const ret: Session = {
                session_id: record[0],
                port_id: record[1],
                plug_start_datetime: record[2],
                plug_end_datetime: record[3],
                charge_start_datetime: record[4],
                charge_end_datetime: record[5],
                session_duration: record[6],
                charging_duration: record[7],
                energy_kwh: Number.parseFloat(record[8]),
                peak_kw: Number.parseFloat(record[9]),
                total_fee_charged: Number.parseFloat(record[10]),
                energy_fee: Number.parseFloat(record[11]),
                session_fee: Number.parseFloat(record[12]),
                time_fee: Number.parseFloat(record[13]),
                user_id: record[14],
                successful_completion: getBoolean(record[15]),
                ended_by: record[16],
                start_soc: Number.parseFloat(record[17]),
                end_soc: Number.parseFloat(record[18]),
                error_code: record[19],
                payment_type: record[20] as ValidPaymentType,
            };
            if (validatorSession(ret)) {
                return ret;
            } else {
                throw new Error(`invalid CSV data for Session`);
            }
        },
        _options);

    return records;

};

export const parseJSONSession = (data: string) => {
    return parserJSON<Session>(data, validatorSession);
};

export const parseYAMLSession = (data: string) => {
    return parserYAML<Session>(data, validatorSession);
};
