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
    parseJSONOutage
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;


test('should validate simple Outage read from file', async (t) => {
    const _outage1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'outage_good.yaml'),
        'utf-8');
    const outage1 = YAML.load(_outage1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     _outage1,
    //     outage1
    // }, { indent: 4 }));

    assert.equal(
        validateOutage(outage1 as Outage),
        true);
});

test('should fail to validate Outage with bad dates', async (t) => {
    const _outageBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'outage_bad_dates.yaml'),
        'utf-8');
    const outageBad
        = YAML.load(_outageBad) as Outage;

    assert.equal(
        outageBad['outage_start'] as any instanceof Date,
        true,
        'outage_start');

    assert.equal(
        outageBad['outage_end'] as any instanceof Date,
        true,
        'outage_end');
    
    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     outageBad
    // }, { indent: 4 }));

    assert.equal(
        validateOutage(outageBad),
        false,
        'not valid - bad dates');

    assert.deepEqual(validatorOutage.errors
        ? validatorOutage.errors[0]
        : {}, {
            instancePath: '/outage_start',
            schemaPath: '#/properties/outage_start/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string'
          }
        );
});

let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _outage1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'outage_good.yaml'),
        'utf-8');
    const outage1 = YAML.load(_outage1) as Outage;

    const csv = serializeOutage(outage1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        csv.result.trim(),
        '2024-01-01-3435892,statie-clabucet:1:23,statie-clabucet,2024-01-22T01:02:03Z,2024-01-22T03:04:05Z,PT2H2M3S,smoking,1'
    );

    csvSerialized = csv.result;
});

const outageGood = {
    outage_id: '2024-01-01-3435892',
    port_id: 'statie-clabucet:1:23',
    station_id: 'statie-clabucet',
    outage_cause: 'smoking',
    outage_duration: 'PT2H2M3S',
    outage_end: '2024-01-22T03:04:05Z',
    outage_start: '2024-01-22T01:02:03Z',
    exempted_outage: true,
};

it('should parse from CSV to Outage', async (t) => {

    // console.log(csvSerialized);

    const result = await parseCSVOutage(csvSerialized, {
        delimiter: ','
    });
    // console.log(YAML.dump({
    //     title: 'parse from CSV to Outage',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, [
        outageGood
    ]);
});

let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _outage1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'outage_good_multiple.yaml'),
        'utf-8');
    const outage1 = YAML.load(_outage1) as Outage[];

    const csv = serializeOutage(outage1, {
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
        '2024-01-01-3435892|statie-clabucet:1:23|statie-clabucet|2024-01-22T01:02:03Z|2024-01-22T03:04:05Z|PT2H2M3S|smoking|1',

        '2024-01-01-3435893|statie-clabucet:1:23|statie-clabucet|2024-01-22T01:02:03Z|2024-01-22T03:04:05Z|PT2H2M3S|smoking|1',

        '2024-01-01-3435894|statie-clabucet:1:23|statie-clabucet|2024-01-22T01:02:03Z|2024-01-22T03:04:05Z|PT2H2M3S|smoking|1',

        '2024-01-01-3435895|statie-clabucet:1:23|statie-clabucet|2024-01-22T01:02:03Z|2024-01-22T03:04:05Z|PT2H2M3S|smoking|1'
    ].join('\n').trim());

    csvSerializedMult = csv.result;
});

const fixtureOutageMany: Array<Outage> = [
    {
        outage_id: '2024-01-01-3435892',
        port_id: 'statie-clabucet:1:23',
        station_id: 'statie-clabucet',
        outage_start: '2024-01-22T01:02:03Z',
        outage_end: '2024-01-22T03:04:05Z',
        outage_duration: 'PT2H2M3S',
        outage_cause: 'smoking',
        exempted_outage: true
    },
    {
        outage_id: '2024-01-01-3435893',
        port_id: 'statie-clabucet:1:23',
        station_id: 'statie-clabucet',
        outage_start: '2024-01-22T01:02:03Z',
        outage_end: '2024-01-22T03:04:05Z',
        outage_duration: 'PT2H2M3S',
        outage_cause: 'smoking',
        exempted_outage: true
    },
    {
        outage_id: '2024-01-01-3435894',
        port_id: 'statie-clabucet:1:23',
        station_id: 'statie-clabucet',
        outage_start: '2024-01-22T01:02:03Z',
        outage_end: '2024-01-22T03:04:05Z',
        outage_duration: 'PT2H2M3S',
        outage_cause: 'smoking',
        exempted_outage: true
    },
    {
        outage_id: '2024-01-01-3435895',
        port_id: 'statie-clabucet:1:23',
        station_id: 'statie-clabucet',
        outage_start: '2024-01-22T01:02:03Z',
        outage_end: '2024-01-22T03:04:05Z',
        outage_duration: 'PT2H2M3S',
        outage_cause: 'smoking',
        exempted_outage: true
    }
];

it('should parse multiple items from CSV to Outage', async (t) => {

    const result = await parseCSVOutage(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'parse multiple items from CSV to Outage',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, fixtureOutageMany);
});

let outage: Outage;

it('should parse YAML single', async (t) => {

    const _outage1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'outage_good.yaml'),
        'utf-8');
    // console.log(_station1);

    const outage1 = parseYAMLOutage(_outage1);
    // console.log(YAML.dump({
    //     title: 'parse YAML single',
    //     outage1
    // }, { indent: 4 }));
    assert.equal(typeof outage1 !== 'undefined', true);
    assert.deepEqual(outage1, outageGood);

    outage = outage1 as Outage;
});

let outageJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializeOutage(outage, {
        format: 'JSON'
    });

    // console.log(YAML.dump({
    //     title: 'serialize item to JSON',
    //     json
    // }, { indent: 4 }));

    assert.equal(json.result?.trim(), `{
    "outage_id": "2024-01-01-3435892",
    "port_id": "statie-clabucet:1:23",
    "station_id": "statie-clabucet",
    "outage_start": "2024-01-22T01:02:03Z",
    "outage_end": "2024-01-22T03:04:05Z",
    "outage_duration": "PT2H2M3S",
    "outage_cause": "smoking",
    "exempted_outage": true
}`);

    outageJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const outage: Outage = parseJSONOutage(outageJSON) as Outage;

    // console.log(YAML.dump({
    //     title: 'parse JSON single',
    //     outage
    // }, { indent: 4 }));

    assert.ok(typeof outage !== 'undefined');
    assert.ok(validateOutage(outage));
});

let outageMany: Array<Outage>;

it('should parse YAML multi', async (t) => {

    const _outageMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'outage_good_multiple.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const outageMulti = parseYAMLOutage(_outageMulti);
    // console.log(YAML.dump({
    //     title: 'parse YAML multi',
    //     outageMulti: _outageMulti,
    //     outageMulti,
    //     fixtureOutageMany
    // }, { indent: 4 }));
    assert.equal(
        typeof outageMulti !== 'undefined',
        true,
        'outageMulti not undefined');
    assert.ok(Array.isArray(outageMulti), 'outageMulti isArray');
    assert.deepEqual(
        outageMulti,
        fixtureOutageMany /*,
        'outageMulti deep equal'*/);

    outageMany = fixtureOutageMany as Array<Outage>;
});

let outageJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializeOutage(outageMany, {
        format: 'JSON'
    });

    // console.log(json.result?.trim());

    assert.equal(json.result?.trim(),
`[
    {
        "outage_id": "2024-01-01-3435892",
        "port_id": "statie-clabucet:1:23",
        "station_id": "statie-clabucet",
        "outage_start": "2024-01-22T01:02:03Z",
        "outage_end": "2024-01-22T03:04:05Z",
        "outage_duration": "PT2H2M3S",
        "outage_cause": "smoking",
        "exempted_outage": true
    },
    {
        "outage_id": "2024-01-01-3435893",
        "port_id": "statie-clabucet:1:23",
        "station_id": "statie-clabucet",
        "outage_start": "2024-01-22T01:02:03Z",
        "outage_end": "2024-01-22T03:04:05Z",
        "outage_duration": "PT2H2M3S",
        "outage_cause": "smoking",
        "exempted_outage": true
    },
    {
        "outage_id": "2024-01-01-3435894",
        "port_id": "statie-clabucet:1:23",
        "station_id": "statie-clabucet",
        "outage_start": "2024-01-22T01:02:03Z",
        "outage_end": "2024-01-22T03:04:05Z",
        "outage_duration": "PT2H2M3S",
        "outage_cause": "smoking",
        "exempted_outage": true
    },
    {
        "outage_id": "2024-01-01-3435895",
        "port_id": "statie-clabucet:1:23",
        "station_id": "statie-clabucet",
        "outage_start": "2024-01-22T01:02:03Z",
        "outage_end": "2024-01-22T03:04:05Z",
        "outage_duration": "PT2H2M3S",
        "outage_cause": "smoking",
        "exempted_outage": true
    }
]`);

    outageJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(stationJSONMany);
    const outageMany = parseJSONOutage(outageJSONMany);

    // console.log(statiaMany);

    assert.ok(typeof outageMany !== 'undefined');
    assert.ok(Array.isArray(outageMany));
    let allOk = true;
    for (const item of outageMany) {
        if (!validatorOutage(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
