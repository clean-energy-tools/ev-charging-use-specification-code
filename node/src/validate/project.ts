
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

import { Project } from '../types-evchargingspec/project.js';
import {
    serializor, serializorOptions,
    validator,
    parserJSON,
    readJSONSchema
} from './common.js';

const _schema = await readJSONSchema('../schemas/project.json');
const schema: JSONSchemaType<Project> = _schema.definitions.Project;
const validate = ajv.compile<Project>(schema);

export const serializeProject = (
    data: Project | Array<Project>, options?: serializorOptions
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
                { key: 'project_id' },
                { key: 'station_id' },
                { key: 'org_name' },
                { key: 'org_address' },
                { key: 'org_city' },
                { key: 'org_state' },
                { key: 'org_zip' },
                { key: 'poc_email' },
                { key: 'poc_first_name' },
                { key: 'poc_last_name' },
                { key: 'project_award_date' },
                { key: 'primary_funding_source' },
                { key: 'primary_funding' },
                { key: 'utility_makeready' },
                { key: 'utility_funding_other' },
                { key: 'other_makeready' },
                { key: 'other_funding_other' },
                { key: 'cost_share' },
                { key: 'equipment_cost' },
                { key: 'install_cost' },
                { key: 'property_cost' },
                { key: 'der_equipment_cost' },
                { key: 'der_install_cost' },
                { key: 'distribution_costs' },
                { key: 'service_costs' },
                { key: 'dac_type' },
                { key: 'in_dac' },
                { key: 'dac_proximate' },
                { key: 'total_power' }
            ];
        }
    }
    return serializor<Project>(data, validate, _options);
};

export const validateProject  = (data: Project) => {
    return validator<Project>(data, validate);
};

export const parseJSONProject = (data: string) => {
    return parserJSON<Project>(data, validate);
};
