import test, { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { promises as fsp, default as fs } from 'node:fs';
import YAML from 'js-yaml';
import {
    serializeUptime, validateUptime, parseJSONUptime, Station,
    validatorStation,
    parseCSVUptime,
    parseYAMLUptime,
    validateStation,
    serializeStation,
    parseCSVStation,
    parseJSONStation,
    parseYAMLStation,
    validateSession,
    Session,
    validatorSession,
    serializeSession,
    parseCSVSession,
    parseYAMLSession,
    parseJSONSession,
    validateProject,
    Project,
    validatorProject,
    serializeProject,
    parseCSVProject,
    parseYAMLProject,
    parseJSONProject
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;


test('should validate simple Project read from file', async (t) => {
    const _project1 = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'project_good.yaml'),
        'utf-8');
    const project1 = YAML.load(_project1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     _project1,
    //     project1
    // }, { indent: 4 }));

    assert.equal(
        validateProject(project1 as Project),
        true);
});

test('should fail to validate Project with bad dates', async (t) => {
    const _projectBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'project_bad_dates.yaml'),
        'utf-8');
    const projectBD
        = YAML.load(_projectBD) as Project;

    assert.equal(
        projectBD['project_award_date'] as any instanceof Date,
        true,
        'project_award_date');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validateProject(projectBD),
        false,
        'not valid - bad dates');

    assert.deepEqual(validatorProject.errors
        ? validatorProject.errors[0]
        : {}, {
            instancePath: '/project_award_date',
            schemaPath: '#/properties/project_award_date/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string'
          }
        );
});

test('should fail to validate Project with bad email', async (t) => {
    const _projectBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'project_bad_email.yaml'),
        'utf-8');
    const projectBD
        = YAML.load(_projectBD) as Project;

    assert.equal(
        typeof projectBD['poc_email'],
        'string',
        'poc_email');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validateProject(projectBD),
        false,
        'not valid - bad email');

    assert.deepEqual(validatorProject.errors
        ? validatorProject.errors[0]
        : {}, {
            instancePath: '/poc_email',
            schemaPath: '#/properties/poc_email/format',
            keyword: 'format',
            params: { format: 'email' },
            message: 'must match format "email"'
          }
        );
});


let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _project1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'project_good.yaml'),
        'utf-8');
    const project1 = YAML.load(_project1) as Project;

    const csv = serializeProject(project1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        csv.result.trim(),
        'rendezvous-clean-earth,statie-clabucet-1:34435546,Happy EV Charging,129 Main St,New York,NY,01234,john@happyevcharging.com,John,John,2022-01-01T01:01:01Z,Bake sale,1000000000,100000,1000000,5000000,400300400,50000,10000000,1000000,100000,100020034,12003004,3002001,50200300,solar,1,1,1000000000000'
    );

    csvSerialized = csv.result;
});

const projectGood = {
    project_id: 'rendezvous-clean-earth',
    station_id: 'statie-clabucet-1:34435546',
    org_name: 'Happy EV Charging',
    org_address: '129 Main St',
    org_city: 'New York',
    org_state: 'NY',
    org_zip: '01234',
    poc_email: 'john@happyevcharging.com',
    poc_first_name: 'John',
    poc_last_name: 'John',
    project_award_date: '2022-01-01T01:01:01Z',
    primary_funding_source: 'Bake sale',
    primary_funding: 1000000000,
    utility_makeready: 100000,
    utility_funding_other: 1000000,
    other_makeready: 5000000,
    other_funding_other: 400300400,
    cost_share: 50000,
    equipment_cost: 10000000,
    install_cost: 1000000,
    property_cost: 100000,
    der_equipment_cost: 100020034,
    der_install_cost: 12003004,
    distribution_costs: 3002001,
    service_costs: 50200300,
    dac_type: 'solar',
    in_dac: true,
    dac_proximate: true,
    total_power: 1000000000000
};

it('should parse from CSV to Project', async (t) => {

    const result = await parseCSVProject(csvSerialized, {
        delimiter: ','
    });
    // console.log(YAML.dump({
    //     title: 'parse from CSV to Project',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, [
        projectGood
    ]);
});

let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _project1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'project_good_multiple.yaml'),
        'utf-8');
    const project1 = YAML.load(_project1) as Project[];

    const csv = serializeProject(project1, {
        format: 'CSV',
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'serialize multiple items to CSV',
    //     result: csv.result
    // }, { indent: 4 }));

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.deepEqual(csv.result.trim(),
    [
        'rendezvous-clean-earth1|statie-clabucet-1:34435546|Happy EV Charging|129 Main St|New York|NY|01234|john@happyevcharging.com|John|John|2022-01-01T01:01:01Z|Bake sale|1000000000|100000|1000000|5000000|400300400|50000|10000000|1000000|100000|100020034|12003004|3002001|50200300|solar|1|1|1000000000000',

        'rendezvous-clean-earth2|statie-clabucet-1:34435546|Happy EV Charging|129 Main St|New York|NY|01234|john@happyevcharging.com|John|John|2022-01-01T01:01:01Z|Bake sale|1000000000|100000|1000000|5000000|400300400|50000|10000000|1000000|100000|100020034|12003004|3002001|50200300|solar|1|1|1000000000000',

        'rendezvous-clean-earth3|statie-clabucet-1:34435546|Happy EV Charging|129 Main St|New York|NY|01234|john@happyevcharging.com|John|John|2022-01-01T01:01:01Z|Bake sale|1000000000|100000|1000000|5000000|400300400|50000|10000000|1000000|100000|100020034|12003004|3002001|50200300|solar|1|1|1000000000000',

        'rendezvous-clean-earth4|statie-clabucet-1:34435546|Happy EV Charging|129 Main St|New York|NY|01234|john@happyevcharging.com|John|John|2022-01-01T01:01:01Z|Bake sale|1000000000|100000|1000000|5000000|400300400|50000|10000000|1000000|100000|100020034|12003004|3002001|50200300|solar|1|1|1000000000000'
    ].join('\n').trim());

    csvSerializedMult = csv.result;
});

const fixtureProjectMany: Array<Project> = [
    {
        project_id: 'rendezvous-clean-earth1',
        station_id: 'statie-clabucet-1:34435546',
        org_name: 'Happy EV Charging',
        org_address: '129 Main St',
        org_city: 'New York',
        org_state: 'NY',
        org_zip: '01234',
        poc_email: 'john@happyevcharging.com',
        poc_first_name: 'John',
        poc_last_name: 'John',
        project_award_date: '2022-01-01T01:01:01Z',
        primary_funding_source: 'Bake sale',
        primary_funding: 1000000000,
        utility_makeready: 100000,
        utility_funding_other: 1000000,
        other_makeready: 5000000,
        other_funding_other: 400300400,
        cost_share: 50000,
        equipment_cost: 10000000,
        install_cost: 1000000,
        property_cost: 100000,
        der_equipment_cost: 100020034,
        der_install_cost: 12003004,
        distribution_costs: 3002001,
        service_costs: 50200300,
        dac_type: 'solar',
        in_dac: true,
        dac_proximate: true,
        total_power: 1000000000000
    },
    {
        project_id: 'rendezvous-clean-earth2',
        station_id: 'statie-clabucet-1:34435546',
        org_name: 'Happy EV Charging',
        org_address: '129 Main St',
        org_city: 'New York',
        org_state: 'NY',
        org_zip: '01234',
        poc_email: 'john@happyevcharging.com',
        poc_first_name: 'John',
        poc_last_name: 'John',
        project_award_date: '2022-01-01T01:01:01Z',
        primary_funding_source: 'Bake sale',
        primary_funding: 1000000000,
        utility_makeready: 100000,
        utility_funding_other: 1000000,
        other_makeready: 5000000,
        other_funding_other: 400300400,
        cost_share: 50000,
        equipment_cost: 10000000,
        install_cost: 1000000,
        property_cost: 100000,
        der_equipment_cost: 100020034,
        der_install_cost: 12003004,
        distribution_costs: 3002001,
        service_costs: 50200300,
        dac_type: 'solar',
        in_dac: true,
        dac_proximate: true,
        total_power: 1000000000000
    },
    {
        project_id: 'rendezvous-clean-earth3',
        station_id: 'statie-clabucet-1:34435546',
        org_name: 'Happy EV Charging',
        org_address: '129 Main St',
        org_city: 'New York',
        org_state: 'NY',
        org_zip: '01234',
        poc_email: 'john@happyevcharging.com',
        poc_first_name: 'John',
        poc_last_name: 'John',
        project_award_date: '2022-01-01T01:01:01Z',
        primary_funding_source: 'Bake sale',
        primary_funding: 1000000000,
        utility_makeready: 100000,
        utility_funding_other: 1000000,
        other_makeready: 5000000,
        other_funding_other: 400300400,
        cost_share: 50000,
        equipment_cost: 10000000,
        install_cost: 1000000,
        property_cost: 100000,
        der_equipment_cost: 100020034,
        der_install_cost: 12003004,
        distribution_costs: 3002001,
        service_costs: 50200300,
        dac_type: 'solar',
        in_dac: true,
        dac_proximate: true,
        total_power: 1000000000000
    },
    {
        project_id: 'rendezvous-clean-earth4',
        station_id: 'statie-clabucet-1:34435546',
        org_name: 'Happy EV Charging',
        org_address: '129 Main St',
        org_city: 'New York',
        org_state: 'NY',
        org_zip: '01234',
        poc_email: 'john@happyevcharging.com',
        poc_first_name: 'John',
        poc_last_name: 'John',
        project_award_date: '2022-01-01T01:01:01Z',
        primary_funding_source: 'Bake sale',
        primary_funding: 1000000000,
        utility_makeready: 100000,
        utility_funding_other: 1000000,
        other_makeready: 5000000,
        other_funding_other: 400300400,
        cost_share: 50000,
        equipment_cost: 10000000,
        install_cost: 1000000,
        property_cost: 100000,
        der_equipment_cost: 100020034,
        der_install_cost: 12003004,
        distribution_costs: 3002001,
        service_costs: 50200300,
        dac_type: 'solar',
        in_dac: true,
        dac_proximate: true,
        total_power: 1000000000000
    }
];

it('should parse multiple items from CSV to Project', async (t) => {

    const result = await parseCSVProject(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'parse multiple items from CSV to Project',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, fixtureProjectMany);
});

let project: Project;

it('should parse YAML single', async (t) => {

    const _project1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'project_good.yaml'),
        'utf-8');
    // console.log(_station1);

    const project1 = parseYAMLProject(_project1);
    // console.log(YAML.dump({
    //     title: 'parse YAML single',
    //     session1
    // }, { indent: 4 }));
    assert.equal(typeof project1 !== 'undefined', true);
    assert.deepEqual(project1, projectGood);

    project = project1 as Project;
});

let projectJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializeProject(project, {
        format: 'JSON'
    });

    // console.log(YAML.dump({
    //     title: 'serialize item to JSON',
    //     json
    // }, { indent: 4 }));

    assert.equal(json.result?.trim(), `{
    "project_id": "rendezvous-clean-earth",
    "station_id": "statie-clabucet-1:34435546",
    "org_name": "Happy EV Charging",
    "org_address": "129 Main St",
    "org_city": "New York",
    "org_state": "NY",
    "org_zip": "01234",
    "poc_email": "john@happyevcharging.com",
    "poc_first_name": "John",
    "poc_last_name": "John",
    "project_award_date": "2022-01-01T01:01:01Z",
    "primary_funding_source": "Bake sale",
    "primary_funding": 1000000000,
    "utility_makeready": 100000,
    "utility_funding_other": 1000000,
    "other_makeready": 5000000,
    "other_funding_other": 400300400,
    "cost_share": 50000,
    "equipment_cost": 10000000,
    "install_cost": 1000000,
    "property_cost": 100000,
    "der_equipment_cost": 100020034,
    "der_install_cost": 12003004,
    "distribution_costs": 3002001,
    "service_costs": 50200300,
    "dac_type": "solar",
    "in_dac": true,
    "dac_proximate": true,
    "total_power": 1000000000000
}`);

    projectJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const project: Project = parseJSONProject(projectJSON) as Project;

    // console.log(YAML.dump({
    //     title: 'parse JSON single',
    //     statia
    // }, { indent: 4 }));

    assert.ok(typeof project !== 'undefined');
    assert.ok(validateProject(project));
});

let projectMany: Array<Project>;

it('should parse YAML multi', async (t) => {

    const _projectMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'project_good_multiple.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const projectMulti = parseYAMLProject(_projectMulti);
    // console.log(YAML.dump({
    //     title: 'parse YAML multi',
    //     stationMultiYAML: _projectMulti,
    //     projectMulti,
    //     fixtureProjectMany
    // }, { indent: 4 }));
    assert.equal(
        typeof projectMulti !== 'undefined',
        true,
        'projectMulti not undefined');
    assert.ok(Array.isArray(projectMulti), 'projectMulti isArray');
    assert.deepEqual(
        projectMulti,
        fixtureProjectMany /*,
        'sessionMulti deep equal'*/);

        projectMany = projectMulti as Array<Project>;
});

let projectJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializeProject(projectMany, {
        format: 'JSON'
    });

    // console.log(json.result?.trim());

    assert.equal(json.result?.trim(),
`[
    {
        "project_id": "rendezvous-clean-earth1",
        "station_id": "statie-clabucet-1:34435546",
        "org_name": "Happy EV Charging",
        "org_address": "129 Main St",
        "org_city": "New York",
        "org_state": "NY",
        "org_zip": "01234",
        "poc_email": "john@happyevcharging.com",
        "poc_first_name": "John",
        "poc_last_name": "John",
        "project_award_date": "2022-01-01T01:01:01Z",
        "primary_funding_source": "Bake sale",
        "primary_funding": 1000000000,
        "utility_makeready": 100000,
        "utility_funding_other": 1000000,
        "other_makeready": 5000000,
        "other_funding_other": 400300400,
        "cost_share": 50000,
        "equipment_cost": 10000000,
        "install_cost": 1000000,
        "property_cost": 100000,
        "der_equipment_cost": 100020034,
        "der_install_cost": 12003004,
        "distribution_costs": 3002001,
        "service_costs": 50200300,
        "dac_type": "solar",
        "in_dac": true,
        "dac_proximate": true,
        "total_power": 1000000000000
    },
    {
        "project_id": "rendezvous-clean-earth2",
        "station_id": "statie-clabucet-1:34435546",
        "org_name": "Happy EV Charging",
        "org_address": "129 Main St",
        "org_city": "New York",
        "org_state": "NY",
        "org_zip": "01234",
        "poc_email": "john@happyevcharging.com",
        "poc_first_name": "John",
        "poc_last_name": "John",
        "project_award_date": "2022-01-01T01:01:01Z",
        "primary_funding_source": "Bake sale",
        "primary_funding": 1000000000,
        "utility_makeready": 100000,
        "utility_funding_other": 1000000,
        "other_makeready": 5000000,
        "other_funding_other": 400300400,
        "cost_share": 50000,
        "equipment_cost": 10000000,
        "install_cost": 1000000,
        "property_cost": 100000,
        "der_equipment_cost": 100020034,
        "der_install_cost": 12003004,
        "distribution_costs": 3002001,
        "service_costs": 50200300,
        "dac_type": "solar",
        "in_dac": true,
        "dac_proximate": true,
        "total_power": 1000000000000
    },
    {
        "project_id": "rendezvous-clean-earth3",
        "station_id": "statie-clabucet-1:34435546",
        "org_name": "Happy EV Charging",
        "org_address": "129 Main St",
        "org_city": "New York",
        "org_state": "NY",
        "org_zip": "01234",
        "poc_email": "john@happyevcharging.com",
        "poc_first_name": "John",
        "poc_last_name": "John",
        "project_award_date": "2022-01-01T01:01:01Z",
        "primary_funding_source": "Bake sale",
        "primary_funding": 1000000000,
        "utility_makeready": 100000,
        "utility_funding_other": 1000000,
        "other_makeready": 5000000,
        "other_funding_other": 400300400,
        "cost_share": 50000,
        "equipment_cost": 10000000,
        "install_cost": 1000000,
        "property_cost": 100000,
        "der_equipment_cost": 100020034,
        "der_install_cost": 12003004,
        "distribution_costs": 3002001,
        "service_costs": 50200300,
        "dac_type": "solar",
        "in_dac": true,
        "dac_proximate": true,
        "total_power": 1000000000000
    },
    {
        "project_id": "rendezvous-clean-earth4",
        "station_id": "statie-clabucet-1:34435546",
        "org_name": "Happy EV Charging",
        "org_address": "129 Main St",
        "org_city": "New York",
        "org_state": "NY",
        "org_zip": "01234",
        "poc_email": "john@happyevcharging.com",
        "poc_first_name": "John",
        "poc_last_name": "John",
        "project_award_date": "2022-01-01T01:01:01Z",
        "primary_funding_source": "Bake sale",
        "primary_funding": 1000000000,
        "utility_makeready": 100000,
        "utility_funding_other": 1000000,
        "other_makeready": 5000000,
        "other_funding_other": 400300400,
        "cost_share": 50000,
        "equipment_cost": 10000000,
        "install_cost": 1000000,
        "property_cost": 100000,
        "der_equipment_cost": 100020034,
        "der_install_cost": 12003004,
        "distribution_costs": 3002001,
        "service_costs": 50200300,
        "dac_type": "solar",
        "in_dac": true,
        "dac_proximate": true,
        "total_power": 1000000000000
    }
]`);

    projectJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(stationJSONMany);
    const projectMany = parseJSONProject(projectJSONMany);

    // console.log(statiaMany);

    assert.ok(typeof projectMany !== 'undefined');
    assert.ok(Array.isArray(projectMany));
    let allOk = true;
    for (const item of projectMany) {
        if (!validatorProject(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
