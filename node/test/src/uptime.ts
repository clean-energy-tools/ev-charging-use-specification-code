
import test, { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { promises as fsp, default as fs } from 'node:fs';
import YAML from 'js-yaml';
import {
    serializeUptime, validateUptime, parseJSONUptime, Uptime,
    validatorUptime,
    parseCSVUptime,
    parseYAMLUptime
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

test('should validate simple Uptime read from file', async (t) => {
    const _uptime1 = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'uptime_good.yaml'),
        'utf-8');
    const uptime1 = YAML.load(_uptime1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     uptime1
    // }, { indent: 4 }));

    assert.equal(validateUptime(uptime1 as Uptime), true);
});

test('should fail to validate Uptime with bad dates', async (t) => {
    const _uptimeBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'uptime_bad_dates.yaml'),
        'utf-8');
    const uptimeBD
        = YAML.load(_uptimeBD) as Uptime;

    assert.equal(
        uptimeBD['uptime_period_start'] as any instanceof Date,
        true,
        'uptime_period_start');

    assert.equal(
            uptimeBD['uptime_period_end'] as any instanceof Date,
            true,
            'uptime_period_end');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     uptimeBD
    // }, { indent: 4 }));

    assert.equal(
            validateUptime(uptimeBD),
            false,
            'isValid');
});

test('should fail to validate Uptime with bad port_id', async (t) => {
    const _uptimeBP = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'uptime_bad_port.yaml'),
        'utf-8');
    const uptimeBP
        = YAML.load(_uptimeBP) as Uptime;

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     uptimeBP
    // }, { indent: 4 }));

    assert.equal(
        typeof uptimeBP.port_id,
        'number',
        `port ${typeof uptimeBP.port_id} not number`);


    assert.equal(
            validateUptime(uptimeBP),
            false,
            'isValid');
});


test('should fail to validate Uptime with bad percent and totals values', async (t) => {
    const _uptimeBP = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'uptime_bad_pct_totals.yaml'),
        'utf-8');
    const uptimeBP
        = YAML.load(_uptimeBP) as Uptime;

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     uptimeBP
    // }, { indent: 4 }));

    assert.equal(
        typeof uptimeBP.uptime_pct,
        'number',
        `uptime_pct ${typeof uptimeBP.uptime_pct} not number`);

    assert.equal(
        typeof uptimeBP.outage_total,
        'number',
        `outage_total ${typeof uptimeBP.outage_total} not number`);
    
    assert.equal(
        typeof uptimeBP.outage_excluded,
        'number',
        `outage_excluded ${typeof uptimeBP.outage_excluded} not number`);

    assert.equal(
            validateUptime(uptimeBP),
            false,
            'isValid');

    // console.log(validatorUptime.errors);

    assert.equal(
        Array.isArray(validatorUptime.errors),
        true,
        'isArray');
    
    assert.equal(
        validatorUptime.errors?.length,
        1,
        'number of errors');
});

let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _uptime1 = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'uptime_good.yaml'),
        'utf-8');
    const uptime1 = YAML.load(_uptime1) as Uptime;

    const csv = serializeUptime(uptime1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        '8080,statia-clabucet,2024-01-02T03:04:05Z,2024-01-02T05:06:07Z,202401,0.99,1,1',
        csv.result.trim()
    );

    csvSerialized = csv.result;
});

const uptimeGood: Uptime = {
    port_id: '8080',
    station_id: 'statia-clabucet',
    uptime_period_start: '2024-01-02T03:04:05Z',
    uptime_period_end: '2024-01-02T05:06:07Z',
    report_yr_mon: '202401',
    uptime_pct: 0.99,
    outage_total: 1,
    outage_excluded: 1
} as Uptime;

it('should parse from CSV to Uptime', async (t) => {

    const result = await parseCSVUptime(csvSerialized, {
        delimiter: ','
    });
    // console.log(result);
    assert.deepEqual(result, [
        uptimeGood
    ]);
});


let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _uptime1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'uptime_good_multiple.yaml'),
        'utf-8');
    const uptime1 = YAML.load(_uptime1) as Uptime;

    const csv = serializeUptime(uptime1, {
        format: 'CSV',
        delimiter: '|'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.deepEqual(csv.result.trim(),
`1080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.19|1|1
2080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.29|1|1
3080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.39|1|1
4080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.49|1|1
5080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.59|1|1
6080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.69|1|1
7080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.79|1|1
8080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.89|1|1
9080|statia-clabucet|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|202401|0.99|1|1
`.trim());

    csvSerializedMult = csv.result;
});

const fixtureUptimeMany: Array<Uptime> = [
    {
      port_id: '1080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.19,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '2080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.29,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '3080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.39,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '4080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.49,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '5080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.59,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '6080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.69,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '7080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.79,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '8080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.89,
      outage_total: 1,
      outage_excluded: 1
    },
    {
      port_id: '9080',
      station_id: 'statia-clabucet',
      uptime_period_start: '2024-01-02T03:04:05Z',
      uptime_period_end: '2024-01-02T05:06:07Z',
      report_yr_mon: '202401',
      uptime_pct: 0.99,
      outage_total: 1,
      outage_excluded: 1
    }
];

it('should parse multiple items from CSV to Uptime', async (t) => {

    const result = await parseCSVUptime(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(result);
    assert.deepEqual(result, fixtureUptimeMany);
});

let uptime: Uptime;

it('should parse YAML single', async (t) => {

    const _uptime1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'uptime_good.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const uptime1 = parseYAMLUptime(_uptime1);
    // console.log(uptime1);
    assert.equal(typeof uptime1 !== 'undefined', true);
    assert.deepEqual(uptime1, uptimeGood);

    uptime = uptime1 as Uptime;
});

let uptimeJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializeUptime(uptime, {
        format: 'JSON'
    });

    // console.log(json);

    assert.equal(json.result?.trim(), '{\n' +
    '    "port_id": "8080",\n' +
    '    "station_id": "statia-clabucet",\n' +
    '    "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '    "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '    "report_yr_mon": "202401",\n' +
    '    "uptime_pct": 0.99,\n' +
    '    "outage_total": 1,\n' +
    '    "outage_excluded": 1\n' +
    '}');

    uptimeJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const up: Uptime = parseJSONUptime(uptimeJSON) as Uptime;

    // console.log(up);

    assert.ok(typeof up !== 'undefined');
    assert.ok(validateUptime(up));
});

let uptimeMany: Array<Uptime>;

it('should parse YAML multi', async (t) => {

    const _uptimeMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'uptime_good_multiple.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const uptimeMulti = parseYAMLUptime(_uptimeMulti);
    // console.log(uptimeMulti);
    assert.equal(typeof uptimeMulti !== 'undefined', true, 'uptimeMulti not undefined');
    assert.ok(Array.isArray(uptimeMulti), 'uptimeMulti isArray');
    assert.deepEqual(uptimeMulti, fixtureUptimeMany, 'uptimeMulti deep equal');

    uptimeMany = uptimeMulti as Array<Uptime>;
});

let uptimeJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializeUptime(uptimeMany, {
        format: 'JSON'
    });

    // console.log(json);

    assert.equal(json.result?.trim(), '[\n' +
    '    {\n' +
    '        "port_id": "1080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.19,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "2080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.29,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "3080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.39,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "4080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.49,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "5080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.59,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "6080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.69,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "7080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.79,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "8080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.89,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    },\n' +
    '    {\n' +
    '        "port_id": "9080",\n' +
    '        "station_id": "statia-clabucet",\n' +
    '        "uptime_period_start": "2024-01-02T03:04:05Z",\n' +
    '        "uptime_period_end": "2024-01-02T05:06:07Z",\n' +
    '        "report_yr_mon": "202401",\n' +
    '        "uptime_pct": 0.99,\n' +
    '        "outage_total": 1,\n' +
    '        "outage_excluded": 1\n' +
    '    }\n' +
    ']');

    uptimeJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(uptimeJSONMany);
    const upMany = parseJSONUptime(uptimeJSONMany);

    // console.log(upMany);

    assert.ok(typeof upMany !== 'undefined');
    assert.ok(Array.isArray(upMany));
    let allOk = true;
    for (const item of upMany) {
        if (!validatorUptime(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
