
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

import { Uptime } from '../types-evchargingspec/uptime.js';
import {
    serializor, serializorOptions,
    validator,
    parserJSON,
    readJSONSchema
} from './common.js';

const _schema = await readJSONSchema('../schemas/uptime.json');
const schema: JSONSchemaType<Uptime> = _schema.definitions.Uptime;
const validate = ajv.compile<Uptime>(schema);

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
            _options.columns = [
                { key: 'port_id' },
                { key: 'station_id' },
                { key: 'uptime_period_start' },
                { key: 'uptime_period_end' },
                { key: 'report_yr_mon' },
                { key: 'uptime_pct' },
                { key: 'outage_total' },
                { key: 'outage_excluded' },
            ];
        }
    }
    return serializor<Uptime>(data, validate, _options);
};

export const validateUptime  = (data: Uptime) => {
    return validator<Uptime>(data, validate);
};

export const parseJSONUptime = (data: string) => {
    return parserJSON<Uptime>(data, validate);
};
