
import { JSONSchemaType, DefinedError } from "ajv";
import { ajv } from './common.js';

import { Project } from '../types-evchargingspec/project.js';
import {
    serializor, serializorOptions,
    validator,
    parserJSON,
    parserYAML,
    parseCSV,
    readJSONSchema,
    readYAMLSchema,
    getBoolean
} from './common.js';

import * as path from 'path';
import { Readable } from "stream";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const _schema = await readYAMLSchema(
        path.join(__dirname, '..', 'schemas', 'project.yaml'));
const schema: JSONSchemaType<Project> = _schema;
const validatorProject = ajv.compile<Project>(schema);

const project_columns = [
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
            _options.columns = project_columns;
        }
    }
    return serializor<Project>(data, validatorProject, _options);
};

export const validateProject  = (data: Project) => {
    return validator<Project>(data, validatorProject);
};

export const parseCSVProject = async (
    data: string | Readable, options?: any
): Promise<Array<Project> | undefined> => {

    const _options = options ? options : {} as any;

    const records = await parseCSV(data,
        // The record will be like this:[
        //       '8080',
        //       'statia-clabucet',
        //       '2024-01-02T03:04:05Z',
        //       '2024-01-02T05:06:07Z',
        //       '202401',
        //       '0.99',
        //       '1',
        //       '1'
        //     ]
        (record?: Array<string>) => {
            // console.log(`parseCSVProject ${record}`);
            if (!Array.isArray(record)) {
                throw new Error(`record must be an array`);
            }
            if (record.length < 29) {
                throw new Error(`record must have 8 entries`);
            }
            const ret: Project = {
                project_id: record[0],
                station_id: record[1],
                org_name: record[2],
                org_address: record[3],
                org_city: record[4],
                org_state: record[5],
                org_zip: record[6],
                poc_email: record[7],
                poc_first_name: record[8],
                poc_last_name: record[9],
                project_award_date: record[10],
                primary_funding_source: record[11],
                primary_funding: Number.parseFloat(record[12]),
                utility_makeready: Number.parseFloat(record[13]),
                utility_funding_other: Number.parseFloat(record[14]),
                other_makeready: Number.parseFloat(record[15]),
                other_funding_other: Number.parseFloat(record[16]),
                cost_share: Number.parseFloat(record[17]),
                equipment_cost: Number.parseFloat(record[18]),
                install_cost: Number.parseFloat(record[19]),
                property_cost: Number.parseFloat(record[20]),
                der_equipment_cost: Number.parseFloat(record[21]),
                der_install_cost: Number.parseFloat(record[22]),
                distribution_costs: Number.parseFloat(record[23]),
                service_costs: Number.parseFloat(record[24]),
                dac_type: record[25],
                in_dac: getBoolean(record[26]),
                dac_proximate: getBoolean(record[27]),
                total_power: Number.parseFloat(record[28]),
            };
            if (validatorProject(ret)) {
                return ret;
            } else {
                throw new Error(`invalid CSV data for Project`);
            }
        },
        _options);

    return records;

};
export const parseJSONProject = (data: string) => {
    return parserJSON<Project>(data, validatorProject);
};

export const parseYAMLProject = (data: string) => {
    return parserYAML<Project>(data, validatorProject);
};
