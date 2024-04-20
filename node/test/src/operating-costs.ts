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
    parseJSONProject,
    Outage,
    validateOutage,
    validatorOutage,
    serializeOutage,
    parseCSVOutage,
    parseYAMLOutage,
    parseJSONOutage,
    validateOperatingCosts,
    OperatingCosts,
    validatorCosts,
    serializeOperatingCosts,
    parseCSVOperatingCosts,
    parseYAMLOperatingCosts,
    parseJSONOperatingCosts
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;


test('should validate simple OperatingCosts read from file', async (t) => {
    const _costs1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_good.yaml'),
        'utf-8');
    const costs1 = YAML.load(_costs1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     _costs1,
    //     costs1
    // }, { indent: 4 }));

    assert.equal(
        validateOperatingCosts(costs1 as OperatingCosts),
        true);
});

test('should fail to validate Operating Costs with bad dates', async (t) => {
    const _costsBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_bad_dates.yaml'),
        'utf-8');
    const costsBad
        = YAML.load(_costsBad) as OperatingCosts;

    assert.equal(
        costsBad['oc_period_start'] as any instanceof Date,
        true,
        'oc_period_start');

    assert.equal(
        costsBad['oc_period_end'] as any instanceof Date,
        true,
        'oc_period_end');
    
    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     costsBad
    // }, { indent: 4 }));

    assert.equal(
        validateOperatingCosts(costsBad),
        false,
        'not valid - bad dates');

    assert.deepEqual(validatorCosts.errors
        ? validatorCosts.errors[0]
        : {}, {
            instancePath: '/oc_period_start',
            schemaPath: '#/properties/oc_period_start/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string'
          }
        );
});

test('should fail to validate Operating Costs with bad year', async (t) => {
    const _costsBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_bad_year.yaml'),
        'utf-8');
    const costsBad
        = YAML.load(_costsBad) as OperatingCosts;

    assert.equal(
        typeof costsBad['oc_year'],
        'number',
        'oc_year');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     costsBad
    // }, { indent: 4 }));

    assert.equal(
        validateOperatingCosts(costsBad),
        false,
        'not valid - bad year');

    assert.deepEqual(validatorCosts.errors
        ? validatorCosts.errors[0]
        : {}, {
            instancePath: '/oc_year',
            schemaPath: './common.json#/definitions/year/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string'
          }
        );
});

test('should fail to validate Operating Costs with bad year #2', async (t) => {
    const _costsBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_bad_year-2.yaml'),
        'utf-8');
    const costsBad
        = YAML.load(_costsBad) as OperatingCosts;

    assert.equal(
        typeof costsBad['oc_year'],
        'string',
        'oc_year');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     costsBad
    // }, { indent: 4 }));

    assert.equal(
        validateOperatingCosts(costsBad),
        false,
        'not valid - bad year');

    assert.deepEqual(validatorCosts.errors
        ? validatorCosts.errors[0]
        : {}, {
            instancePath: '/oc_year',
            schemaPath: './common.json#/definitions/year/pattern',
            keyword: 'pattern',
            params: { pattern: '^[0-9][0-9][0-9][0-9]$' },
            message: 'must match pattern "^[0-9][0-9][0-9][0-9]$"'
          }
        );
});

let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _costs1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_good.yaml'),
        'utf-8');
    const costs1 = YAML.load(_costs1) as OperatingCosts;

    const csv = serializeOperatingCosts(costs1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        csv.result.trim(),
        'statie-clabucet,2024-01-01T00:00:00Z,2024-02-01T00:00:00Z,2024,22330,1120,2230,3391,2203'
    );

    csvSerialized = csv.result;
});

const costsGood = {
    station_id: 'statie-clabucet',
    oc_period_start: '2024-01-01T00:00:00Z',
    oc_period_end: '2024-02-01T00:00:00Z',
    oc_year: '2024',
    station_mr: 22330,
    maintenance_cost: 1120,
    repair_cost: 2230,
    electricity_cost: 3391,
    network_costs: 2203
};

it('should parse from CSV to OperatingCosts', async (t) => {

    const result = await parseCSVOperatingCosts(csvSerialized, {
        delimiter: ','
    });
    // console.log(YAML.dump({
    //     title: 'parse from CSV to OperatingCosts',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, [
        costsGood
    ]);
});

let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _costs1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_good_multiple.yaml'),
        'utf-8');
    const costs1 = YAML.load(_costs1) as OperatingCosts[];

    const csv = serializeOperatingCosts(costs1, {
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
        'statie-clabucet-1|2024-01-01T00:00:00Z|2024-02-01T00:00:00Z|2024|22330|1120|2230|3391|2203',

        'statie-clabucet-2|2024-01-01T00:00:00Z|2024-02-01T00:00:00Z|2024|22330|1120|2230|3391|2203',

        'statie-clabucet-3|2024-01-01T00:00:00Z|2024-02-01T00:00:00Z|2024|22330|1120|2230|3391|2203',

        'statie-clabucet-4|2024-01-01T00:00:00Z|2024-02-01T00:00:00Z|2024|22330|1120|2230|3391|2203'
    ].join('\n').trim());

    csvSerializedMult = csv.result;
});

const fixtureOperatingCostsMany: Array<OperatingCosts> = [
    {
        station_id: 'statie-clabucet-1',
        oc_period_start: '2024-01-01T00:00:00Z',
        oc_period_end: '2024-02-01T00:00:00Z',
        oc_year: '2024',
        station_mr: 22330,
        maintenance_cost: 1120,
        repair_cost: 2230,
        electricity_cost: 3391,
        network_costs: 2203
    },
    {
        station_id: 'statie-clabucet-2',
        oc_period_start: '2024-01-01T00:00:00Z',
        oc_period_end: '2024-02-01T00:00:00Z',
        oc_year: '2024',
        station_mr: 22330,
        maintenance_cost: 1120,
        repair_cost: 2230,
        electricity_cost: 3391,
        network_costs: 2203
    },
    {
        station_id: 'statie-clabucet-3',
        oc_period_start: '2024-01-01T00:00:00Z',
        oc_period_end: '2024-02-01T00:00:00Z',
        oc_year: '2024',
        station_mr: 22330,
        maintenance_cost: 1120,
        repair_cost: 2230,
        electricity_cost: 3391,
        network_costs: 2203
    },
    {
        station_id: 'statie-clabucet-4',
        oc_period_start: '2024-01-01T00:00:00Z',
        oc_period_end: '2024-02-01T00:00:00Z',
        oc_year: '2024',
        station_mr: 22330,
        maintenance_cost: 1120,
        repair_cost: 2230,
        electricity_cost: 3391,
        network_costs: 2203
    },
];

it('should parse multiple items from CSV to OperatingCosts', async (t) => {

    const result = await parseCSVOperatingCosts(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'parse multiple items from CSV to OperatingCosts',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, fixtureOperatingCostsMany);
});

let costs: OperatingCosts;

it('should parse YAML single', async (t) => {

    const _costs1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_good.yaml'),
        'utf-8');
    // console.log(_station1);

    const costs1 = parseYAMLOperatingCosts(_costs1);
    // console.log(YAML.dump({
    //     title: 'parse YAML single',
    //     outage1
    // }, { indent: 4 }));
    assert.equal(typeof costs1 !== 'undefined', true);
    assert.deepEqual(costs1, costsGood);

    costs = costs1 as OperatingCosts;
});

let costsJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializeOperatingCosts(costs, {
        format: 'JSON'
    });

    // console.log(YAML.dump({
    //     title: 'serialize item to JSON',
    //     json
    // }, { indent: 4 }));

    assert.equal(json.result?.trim(), `{
    "station_id": "statie-clabucet",
    "oc_period_start": "2024-01-01T00:00:00Z",
    "oc_period_end": "2024-02-01T00:00:00Z",
    "oc_year": "2024",
    "station_mr": 22330,
    "maintenance_cost": 1120,
    "repair_cost": 2230,
    "electricity_cost": 3391,
    "network_costs": 2203
}`);

    costsJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const costs: OperatingCosts = parseJSONOperatingCosts(costsJSON) as OperatingCosts;

    // console.log(YAML.dump({
    //     title: 'parse JSON single',
    //     costs
    // }, { indent: 4 }));

    assert.ok(typeof costs !== 'undefined');
    assert.ok(validateOperatingCosts(costs));
});

let costsMany: Array<OperatingCosts>;

it('should parse YAML multi', async (t) => {

    const _costsMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'costs_good_multiple.yaml'),
        'utf-8');
    // console.log(_costsMulti);

    const costsMulti = parseYAMLOperatingCosts(_costsMulti);
    // console.log(YAML.dump({
    //     title: 'parse YAML multi',
    //     costsMulti: _costsMulti,
    //     costsMulti,
    //     fixtureOperatingCostsMany
    // }, { indent: 4 }));
    assert.equal(
        typeof costsMulti !== 'undefined',
        true,
        'costsMulti not undefined');
    assert.ok(Array.isArray(costsMulti), 'costsMulti isArray');
    assert.deepEqual(
        costsMulti,
        fixtureOperatingCostsMany /*,
        'outageMulti deep equal'*/);

    costsMany = fixtureOperatingCostsMany as Array<OperatingCosts>;
});

let costsJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializeOperatingCosts(costsMany, {
        format: 'JSON'
    });

    // console.log(json.result?.trim());

    assert.equal(json.result?.trim(),
`[
    {
        "station_id": "statie-clabucet-1",
        "oc_period_start": "2024-01-01T00:00:00Z",
        "oc_period_end": "2024-02-01T00:00:00Z",
        "oc_year": "2024",
        "station_mr": 22330,
        "maintenance_cost": 1120,
        "repair_cost": 2230,
        "electricity_cost": 3391,
        "network_costs": 2203
    },
    {
        "station_id": "statie-clabucet-2",
        "oc_period_start": "2024-01-01T00:00:00Z",
        "oc_period_end": "2024-02-01T00:00:00Z",
        "oc_year": "2024",
        "station_mr": 22330,
        "maintenance_cost": 1120,
        "repair_cost": 2230,
        "electricity_cost": 3391,
        "network_costs": 2203
    },
    {
        "station_id": "statie-clabucet-3",
        "oc_period_start": "2024-01-01T00:00:00Z",
        "oc_period_end": "2024-02-01T00:00:00Z",
        "oc_year": "2024",
        "station_mr": 22330,
        "maintenance_cost": 1120,
        "repair_cost": 2230,
        "electricity_cost": 3391,
        "network_costs": 2203
    },
    {
        "station_id": "statie-clabucet-4",
        "oc_period_start": "2024-01-01T00:00:00Z",
        "oc_period_end": "2024-02-01T00:00:00Z",
        "oc_year": "2024",
        "station_mr": 22330,
        "maintenance_cost": 1120,
        "repair_cost": 2230,
        "electricity_cost": 3391,
        "network_costs": 2203
    }
]`);

    costsJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(stationJSONMany);
    const costsMany = parseJSONOperatingCosts(costsJSONMany);

    // console.log(statiaMany);

    assert.ok(typeof costsMany !== 'undefined');
    assert.ok(Array.isArray(costsMany));
    let allOk = true;
    for (const item of costsMany) {
        if (!validatorCosts(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
