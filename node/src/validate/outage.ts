
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

import { Outage } from '../types-evchargingspec/outage.js';
import {
        serializor, serializorOptions,
        validator,
        parserJSON,
        readJSONSchema
} from './common.js';

const _schema = await readJSONSchema('../schemas/outage.json');
const schema: JSONSchemaType<Outage> = _schema.definitions.Outage;
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
