
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Uptime } from '../types-evchargingspec/uptime.js';
import {
    serializor, serializorOptions,
    validator,
    parserJSON,
    readJSONSchema,
    readYAMLSchema
} from './common.js';
import YAML from 'js-yaml';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await readYAMLSchema(
    path.join(__dirname, '..', 'schemas', 'uptime.yaml'));
const schema: JSONSchemaType<Uptime> = _schema;
export const validatorUptime = ajv.compile<Uptime>(schema);


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
    return serializor<Uptime>(data, validatorUptime, _options);
};

export const validateUptime  = (data: Uptime) => {
    // console.log(`validateUptime ${YAML.dump({
    //     data: data
    // }, { indent: 4 })}`);
    const ret = validator<Uptime>(data, validatorUptime);
    return ret;
};

export const parseJSONUptime = (data: string) => {
    return parserJSON<Uptime>(data, validatorUptime);
};
