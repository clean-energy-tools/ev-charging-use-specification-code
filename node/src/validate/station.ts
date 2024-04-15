
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Station } from '../types-evchargingspec/station.js';
import {
        serializor, serializorOptions,
        validator,
        parserJSON,
        readJSONSchema,
        readYAMLSchema
} from './common.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await readYAMLSchema(
    path.join(
        __dirname, '..', 'schemas', 'station.yaml'
    ));
const schema: JSONSchemaType<Station> = _schema;
const validate = ajv.compile<Station>(schema);

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
            _options.columns = [
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
                { key: 'der_energy' },
            ];
        }
    }
    return serializor<Station>(data, validate, _options);
};

export const validateStation  = (data: Station) => {
    return validator<Station>(data, validate);
};

export const parseJSONStation = (data: string) => {
    return parserJSON<Station>(data, validate);
};
