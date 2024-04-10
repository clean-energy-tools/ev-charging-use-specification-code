
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

import { OperatingCosts } from '../types-evchargingspec/operating-costs.js';
import {
        serializor, serializorOptions,
        validator,
        parserJSON,
        readJSONSchema
} from './common.js';

const _schema = await readJSONSchema('../schemas/operating-costs.json');
const schema: JSONSchemaType<OperatingCosts> = _schema.definitions.OperatingCosts;
const validate = ajv.compile<OperatingCosts>(schema);

export const serializeOperatingCosts = (
        data: OperatingCosts | Array<OperatingCosts>,
        options?: serializorOptions
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
                { key: 'oc_period_start' },
                { key: 'oc_period_end' },
                { key: 'oc_year' },
                { key: 'station_mr' },
                { key: 'maintenance_cost' },
                { key: 'repair_cost' },
                { key: 'electricity_cost' },
                { key: 'network_costs' },
            ];
        }
    }
    return serializor<OperatingCosts>(data, validate, _options);
};

export const validateOperatingCosts  = (data: OperatingCosts) => {
    return validator<OperatingCosts>(data, validate);
};

export const parseJSONOperatingCosts = (data: string) => {
    return parserJSON<OperatingCosts>(data, validate);
};
