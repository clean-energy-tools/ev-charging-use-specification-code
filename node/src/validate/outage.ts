
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Outage } from '../types-evchargingspec/outage.js';
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
    path.join(__dirname, '..', 'schemas', 'outage.yaml'));
const schema: JSONSchemaType<Outage> = _schema;
const validate = ajv.compile<Outage>(schema);

export const serializeOutage = (
    data: Outage | Array<Outage>, options?: serializorOptions
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
                { key: 'outage_id' },
                { key: 'port_id' },
                { key: 'station_id' },
                { key: 'outage_start' },
                { key: 'outage_end' },
                { key: 'outage_duration' },
                { key: 'outage_cause' },
                { key: 'exempted_outage' },
            ];
        }
    }
    return serializor<Outage>(data, validate, _options);
};

export const validateOutage  = (data: Outage) => {
    return validator<Outage>(data, validate);
};

export const parseJSONOutage = (data: string) => {
    return parserJSON<Outage>(data, validate);
};
