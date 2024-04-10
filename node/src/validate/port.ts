
import Ajv, { JSONSchemaType, DefinedError } from "ajv";
import addFormats from "ajv-formats";
import addKeywords from 'ajv-keywords';

// These two lines throw compiler errors if `.default` is not used
const ajv = new Ajv.default({
    // strict: true,
    // allowUnionTypes: true,
    validateFormats: true
});
// addFormats.default(ajv);
// addKeywords.default(ajv);

import { Port } from '../types-evchargingspec/port.js';
import {
    serializor, serializorOptions,
    validator,
    parserJSON,
    readJSONSchema
} from './common.js';

const _schema = await readJSONSchema('../schemas/port.json');
const schema: JSONSchemaType<Port> = _schema.definitions.Port;
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
