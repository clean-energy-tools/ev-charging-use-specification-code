
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Port } from '../types-evchargingspec/port.js';
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
    path.join(__dirname, '..', 'schemas', 'port.yaml'));
const schema: JSONSchemaType<Port> = _schema;
const validate = ajv.compile<Port>(schema);

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
            _options.columns = [
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
        }
    }
    return serializor<Port>(data, validate, _options);
};

export const validatePort  = (data: Port) => {
    return validator<Port>(data, validate);
};

export const parseJSONPort = (data: string) => {
    return parserJSON<Port>(data, validate);
};
