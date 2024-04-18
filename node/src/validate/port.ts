
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { ChargerType, ConnectorType, Port, ValidPaymentType } from '../types-evchargingspec/port.js';
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
    path.join(__dirname, '..', 'schemas', 'port.yaml'));
const schema: JSONSchemaType<Port> = _schema;
export const validatorPort = ajv.compile<Port>(schema);

const port_columns = [
    { key: 'port_id' },
    { key: 'project_id' },
    { key: 'station_id' },
    { key: 'data_provider_org' },
    { key: 'data_provider_poc_email' },
    { key: 'is_active' },
    { key: 'power_level_kw' },
    { key: 'port_latitude' },
    { key: 'port_longitude' },
    { key: 'station_activation_date' },
    { key: 'charger_type' },
    { key: 'connector_type' },
    { key: 'energy_fee' },
    { key: 'session_fee' },
    { key: 'time_fee' },
    { key: 'parking_fee' },
    { key: 'idle_fee' },
    { key: 'operating_hours' },
    { key: 'equipment_manufacturer' },
    { key: 'model_number' },
    { key: 'equipment_serial' },
    { key: 'data_provider_poc_last' },
    { key: 'data_provider_poc_first' },
    { key: 'network' },
    { key: 'network_contact' },
    { key: 'evse_manufacturer' },
    { key: 'trailer_accessible' },
    { key: 'payments_accepted' },
];

export const serializePort = (
    data: Port | Array<Port>, options?: serializorOptions
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
            _options.columns = port_columns;
        }
    }
    return serializor<Port>(data, validatorPort, _options);
};

export const parseCSVPort = async (
    data: string | Readable, options?: any
): Promise<Array<Port> | undefined> => {

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
            // console.log(`parseCSVUptime ${record}`);
            if (!Array.isArray(record)) {
                throw new Error(`record must be an array`);
            }
            if (record.length < 8) {
                throw new Error(`record must have 8 entries`);
            }
            const ret: Port = {
                port_id: record[0],
                project_id: record[1],
                station_id: record[2],
                data_provider_org: record[3],
                data_provider_poc_email: record[4],
                is_active: getBoolean(record[5]),
                power_level_kw: Number.parseFloat(record[6]),
                port_latitude: Number.parseFloat(record[7]),
                port_longitude: Number.parseFloat(record[8]),
                station_activation_date: record[9],
                charger_type: record[10] as ChargerType,
                connector_type: record[11] as ConnectorType,
                energy_fee: Number.parseFloat(record[12]),
                session_fee: Number.parseFloat(record[13]),
                time_fee: Number.parseFloat(record[14]),
                parking_fee: Number.parseFloat(record[15]),
                idle_fee: Number.parseFloat(record[16]),
                operating_hours: Number.parseFloat(record[17]),
                equipment_manufacturer: record[18],
                model_number: record[19],
                equipment_serial: record[20],
                data_provider_poc_last: record[21],
                data_provider_poc_first: record[22],
                network: record[23],
                network_contact: record[24],
                evse_manufacturer: record[25],
                trailer_accessible: getBoolean(record[26]),
                payments_accepted: record[26] as ValidPaymentType,
            };
            if (validatorPort(ret)) {
                return ret;
            } else {
                throw new Error(`invalid CSV data for Port`);
            }
        },
        _options);

    return records;

};

export const validatePort  = (data: Port) => {
    return validator<Port>(data, validatorPort);
};

export const parseJSONPort = (data: string) => {
    return parserJSON<Port>(data, validatorPort);
};

export const parseYAMLPort = (data: string) => {
    return parserYAML<Port>(data, validatorPort);
};
