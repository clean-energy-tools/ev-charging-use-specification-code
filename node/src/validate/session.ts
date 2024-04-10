
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

import { Session } from '../types-evchargingspec/session.js';
import {
        serializor, serializorOptions,
        validator,
        parserJSON,
        readJSONSchema
} from './common.js';

const _schema = await readJSONSchema('../schemas/session.json');
const schema: JSONSchemaType<Session> = _schema.definitions.Session;
const validate = ajv.compile<Session>(schema);

export const serializeSession = (
    data: Session, options?: serializorOptions
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
