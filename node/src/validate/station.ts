
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';
import YAML from 'js-yaml';

import {
    AccessType,
    OnsiteDERType,
    OperatingStatus,
    Station
} from '../types-evchargingspec/station.js';
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
    path.join(
        __dirname, '..', 'schemas', 'station.yaml'
    ));
const schema: JSONSchemaType<Station> = _schema;
export const validatorStation = ajv.compile<Station>(schema);

const station_columns = [
    { key: 'station_id' },
    { key: 'station_name' },
    { key: 'station_address' },
    { key: 'station_city' },
    { key: 'station_state' },
    { key: 'station_zip' },
    { key: 'station_county' },
    { key: 'station_lon' },
    { key: 'station_lat' },
    { key: 'operator_name' },
    { key: 'operator_address' },
    { key: 'operator_city' },
    { key: 'operator_state' },
    { key: 'operator_zip' },
    { key: 'operating_status' },
    { key: 'access_type' },
    { key: 'site_host_type' },
    { key: 'site_host_type_detail' },
    { key: 'host_first_name' },
    { key: 'host_last_name' },
    { key: 'host_email' },
    { key: 'onsite_der' },
    { key: 'onsite_der_type' },
    { key: 'der_power' },
    { key: 'der_energy' }
];

export const serializeStation = (
    data: Station | Array<Station>, options?: serializorOptions
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
            _options.columns = station_columns;
        }

        // _options.cast = {
        //     onsite_der: function(value: any) {
        //         if (typeof value !== 'undefined') {
        //             if (value === false) {
        //                 return 'false';
        //             } else {
        //                 return 'true';
        //             }
        //         } else {
        //             return 'undefined';
        //         }
        //     }
        // }
    }
    return serializor<Station>(data, validatorStation, _options);
};

export const validateStation  = (
    data: Station | Array<Station>
) => {
    return validator<Station>(data, validatorStation);
};

const csvProcessor = (record?: any[] | undefined) =>  {
    // console.log(`parseCSVStation ${record}`);
    if (!Array.isArray(record)) {
        throw new Error(`record must be an array`);
    }
    if (record.length < 25) {
        throw new Error(`record must have 24 entries`);
    }
    const ret: Station = {
        station_id: record[0],
        station_name: record[1],
        station_address: record[2],
        station_city: record[3],
        station_state: record[4],
        station_zip: record[5],
        station_county: record[6],
        station_lon: Number.parseFloat(record[7]),
        station_lat: Number.parseFloat(record[8]),
        operator_name: record[9],
        operator_address: record[10],
        operator_city: record[11],
        operator_state: record[12],
        operator_zip: record[13],
        operating_status: record[14] as OperatingStatus,
        access_type: record[15] as AccessType,
        site_host_type: record[16],
        site_host_type_detail: record[17],
        host_first_name: record[18],
        host_last_name: record[19],
        host_email: record[20],
        onsite_der: getBoolean(record[21]),
        onsite_der_type: record[22] as OnsiteDERType,
        der_power: Number.parseFloat(record[23]),
        der_energy: Number.parseFloat(record[24]),
    };
    // console.log(YAML.dump({
    //     title: 'parseCSVStation',
    //     record,
    //     ret
    // }, { indent: 4 }));
    if (validatorStation(ret)) {
        return ret;
    } else {
        // console.log(validatorStation.errors)
        // throw new Error(`invalid CSV data for Station`);
        return undefined;
    }
}

export const parseCSVStation = async (
    data: string | Readable, options?: any
): Promise<Array<Station> | undefined> => {

    const _options = options ? options : {} as any;

    // if (!('columns' in _options)) {
    //     _options.columns = uptime_columns;
    // }
    const records = await parseCSV<Station>(data,
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
        csvProcessor,
        _options);

    return records;

};

export const parseJSONStation = (data: string) => {
    return parserJSON<Station>(data, validatorStation);
};

export const parseYAMLStation = (data: string) => {
    return parserYAML<Station>(data, validatorStation);
};
