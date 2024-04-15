
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Session } from '../types-evchargingspec/session.js';
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
    path.join(__dirname, '..', 'schemas', 'session.yaml'));
const schema: JSONSchemaType<Session> = _schema;
const validate = ajv.compile<Session>(schema);

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
            _options.columns = [
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
        }
    }
    return serializor<Session>(data, validate, _options);
};

export const validateSession  = (data: Session) => {
    return validator<Session>(data, validate);
};

export const parseJSONSession = (data: string) => {
    return parserJSON<Session>(data, validate);
};
