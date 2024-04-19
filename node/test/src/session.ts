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
    parseJSONSession
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

test('should validate simple Session read from file', async (t) => {
    const _session1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'session_good.yaml'),
        'utf-8');
    const session1 = YAML.load(_session1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     _session1,
    //     session1
    // }, { indent: 4 }));

    assert.equal(
        validateSession(session1 as Session),
        true);
});

test('should fail to validate Session with bad dates', async (t) => {
    const _sessionBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'session_bad_dates.yaml'),
        'utf-8');
    const sessionBD
        = YAML.load(_sessionBD) as Session;

    assert.equal(
        sessionBD['plug_start_datetime'] as any instanceof Date,
        true,
        'plug_start_datetime');

    assert.equal(
        sessionBD['plug_end_datetime'] as any instanceof Date,
        true,
        'plug_end_datetime');

    assert.equal(
        sessionBD['charge_start_datetime'] as any instanceof Date,
        true,
        'charge_start_datetime');

    assert.equal(
        sessionBD['charge_end_datetime'] as any instanceof Date,
        true,
        'charge_end_datetime');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validateSession(sessionBD),
        false,
        'not valid - bad dates');

    assert.deepEqual(validatorSession.errors
        ? validatorSession.errors[0]
        : {}, {
            instancePath: '/plug_start_datetime',
            schemaPath: '#/properties/plug_start_datetime/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string'
          }
        );
});

test('should fail to validate Session with bad durations', async (t) => {
    const _sessionBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'session_bad_duration.yaml'),
        'utf-8');
    const sessionBD
        = YAML.load(_sessionBD) as Session;

    assert.equal(
        typeof sessionBD['session_duration'],
        'string',
        'session_duration');

    assert.equal(
        typeof sessionBD['charging_duration'],
        'string',
        'charging_duration');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validateSession(sessionBD),
        false,
        'not valid - bad duration');
    
    assert.deepEqual(validatorSession.errors
        ? validatorSession.errors[0]
        : {}, {
            instancePath: '/session_duration',
            schemaPath: './common.json#/definitions/duration/pattern',
            keyword: 'pattern',
            params: {
              pattern: '^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$'
            },
            message: 'must match pattern "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"'
          }
        );
});

test('should fail to validate Session with bad payment type', async (t) => {
    const _sessionBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'session_bad_payment.yaml'),
        'utf-8');
    const sessionBD
        = YAML.load(_sessionBD) as Session;

    assert.equal(
        typeof sessionBD['payment_type'],
        'string',
        'payment_type');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validateSession(sessionBD),
        false,
        'not valid - bad payment type');
    
    assert.deepEqual(validatorSession.errors
        ? validatorSession.errors[0]
        : {}, {
            instancePath: '/payment_type',
            schemaPath: './common.json#/definitions/validPaymentType/enum',
            keyword: 'enum',
            params: { allowedValues: [
                'cash',
                'credit_card_terminal',
                'membership',
                'application',
                'phone',
                'plug-charge',
                'roaming',
                'other'
            ] },
            message: 'must be equal to one of the allowed values'
          }
        );
});


let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _session1 = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'session_good.yaml'),
        'utf-8');
    const session1 = YAML.load(_session1) as Session;

    const csv = serializeSession(session1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        csv.result.trim(),
        'statie-clabucet-1:34435546,statie-clabucet:1:23,2024-01-02T03:04:05Z,2024-01-02T05:06:07Z,2024-01-02T03:04:05Z,2024-01-02T05:06:07Z,PT1H,PT1H,34,50,1.2,0.2,0.78,0.2,th3133,1,success,0.2,0.6,success,credit_card_terminal'
    );

    csvSerialized = csv.result;
});

const sessionGood = {
    charge_end_datetime: '2024-01-02T05:06:07Z',
    charge_start_datetime: '2024-01-02T03:04:05Z',
    charging_duration: 'PT1H',
    end_soc: 0.6,
    ended_by: 'success',
    energy_fee: 0.2,
    energy_kwh: 34,
    error_code: 'success',
    payment_type: 'credit_card_terminal',
    peak_kw: 50,
    plug_end_datetime: '2024-01-02T05:06:07Z',
    plug_start_datetime: '2024-01-02T03:04:05Z',
    port_id: 'statie-clabucet:1:23',
    session_duration: 'PT1H',
    session_fee: 0.78,
    session_id: 'statie-clabucet-1:34435546',
    start_soc: 0.2,
    successful_completion: true,
    time_fee: 0.2,
    total_fee_charged: 1.2,
    user_id: 'th3133'
};

it('should parse from CSV to Session', async (t) => {

    const result = await parseCSVSession(csvSerialized, {
        delimiter: ','
    });
    // console.log(YAML.dump({
    //     title: 'parse from CSV to Session',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, [
        sessionGood
    ]);
});

let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _session1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'session_good_multiple.yaml'),
        'utf-8');
    const session1 = YAML.load(_session1) as Session[];

    const csv = serializeSession(session1, {
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
        'statie-clabucet-1:34435546|statie-clabucet:1:23|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|PT1H|PT1H|34|50|1.2|0.2|0.78|0.2|th3133|1|success|0.2|0.6|success|credit_card_terminal',

        'statie-clabucet-1:34435654|statie-clabucet:1:65|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|PT1H|PT1H|34|50|1.2|0.2|0.78|0.2|th3133|1|success|0.2|0.6|success|credit_card_terminal',

        'statie-clabucet-1:34435754|statie-clabucet:1:75|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|PT1H|PT1H|34|50|1.2|0.2|0.78|0.2|th3133|1|success|0.2|0.6|success|credit_card_terminal',

        'statie-clabucet-1:34435854|statie-clabucet:1:85|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|2024-01-02T03:04:05Z|2024-01-02T05:06:07Z|PT1H|PT1H|34|50|1.2|0.2|0.78|0.2|th3133|1|success|0.2|0.6|success|credit_card_terminal'
    ].join('\n').trim());

    csvSerializedMult = csv.result;
});


const fixtureSessionMany: Array<Session> = [
    {
        session_id: 'statie-clabucet-1:34435546',
        port_id: 'statie-clabucet:1:23',
        plug_start_datetime: '2024-01-02T03:04:05Z',
        plug_end_datetime: '2024-01-02T05:06:07Z',
        charge_start_datetime: '2024-01-02T03:04:05Z',
        charge_end_datetime: '2024-01-02T05:06:07Z',
        session_duration: 'PT1H',
        charging_duration: 'PT1H',
        energy_kwh: 34,
        peak_kw: 50,
        total_fee_charged: 1.2,
        energy_fee: 0.2,
        session_fee: 0.78,
        time_fee: 0.2,
        user_id: 'th3133',
        successful_completion: true,
        ended_by: 'success',
        start_soc: 0.2,
        end_soc: 0.6,
        error_code: 'success',
        payment_type: 'credit_card_terminal'
    },
    {
        session_id: 'statie-clabucet-1:34435654',
        port_id: 'statie-clabucet:1:65',
        plug_start_datetime: '2024-01-02T03:04:05Z',
        plug_end_datetime: '2024-01-02T05:06:07Z',
        charge_start_datetime: '2024-01-02T03:04:05Z',
        charge_end_datetime: '2024-01-02T05:06:07Z',
        session_duration: 'PT1H',
        charging_duration: 'PT1H',
        energy_kwh: 34,
        peak_kw: 50,
        total_fee_charged: 1.2,
        energy_fee: 0.2,
        session_fee: 0.78,
        time_fee: 0.2,
        user_id: 'th3133',
        successful_completion: true,
        ended_by: 'success',
        start_soc: 0.2,
        end_soc: 0.6,
        error_code: 'success',
        payment_type: 'credit_card_terminal'
    },
    {
        session_id: 'statie-clabucet-1:34435754',
        port_id: 'statie-clabucet:1:75',
        plug_start_datetime: '2024-01-02T03:04:05Z',
        plug_end_datetime: '2024-01-02T05:06:07Z',
        charge_start_datetime: '2024-01-02T03:04:05Z',
        charge_end_datetime: '2024-01-02T05:06:07Z',
        session_duration: 'PT1H',
        charging_duration: 'PT1H',
        energy_kwh: 34,
        peak_kw: 50,
        total_fee_charged: 1.2,
        energy_fee: 0.2,
        session_fee: 0.78,
        time_fee: 0.2,
        user_id: 'th3133',
        successful_completion: true,
        ended_by: 'success',
        start_soc: 0.2,
        end_soc: 0.6,
        error_code: 'success',
        payment_type: 'credit_card_terminal'
    },
    {
        session_id: 'statie-clabucet-1:34435854',
        port_id: 'statie-clabucet:1:85',
        plug_start_datetime: '2024-01-02T03:04:05Z',
        plug_end_datetime: '2024-01-02T05:06:07Z',
        charge_start_datetime: '2024-01-02T03:04:05Z',
        charge_end_datetime: '2024-01-02T05:06:07Z',
        session_duration: 'PT1H',
        charging_duration: 'PT1H',
        energy_kwh: 34,
        peak_kw: 50,
        total_fee_charged: 1.2,
        energy_fee: 0.2,
        session_fee: 0.78,
        time_fee: 0.2,
        user_id: 'th3133',
        successful_completion: true,
        ended_by: 'success',
        start_soc: 0.2,
        end_soc: 0.6,
        error_code: 'success',
        payment_type: 'credit_card_terminal'
    }
];

it('should parse multiple items from CSV to Session', async (t) => {

    const result = await parseCSVSession(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'parse multiple items from CSV to Session',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, fixtureSessionMany);
});

let session: Session;

it('should parse YAML single', async (t) => {

    const _session1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'session_good.yaml'),
        'utf-8');
    // console.log(_station1);

    const session1 = parseYAMLSession(_session1);
    // console.log(YAML.dump({
    //     title: 'parse YAML single',
    //     session1
    // }, { indent: 4 }));
    assert.equal(typeof session1 !== 'undefined', true);
    assert.deepEqual(session1, sessionGood);

    session = session1 as Session;
});


let sessionJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializeSession(session, {
        format: 'JSON'
    });

    // console.log(YAML.dump({
    //     title: 'serialize item to JSON',
    //     json
    // }, { indent: 4 }));

    assert.equal(json.result?.trim(), `{
    "session_id": "statie-clabucet-1:34435546",
    "port_id": "statie-clabucet:1:23",
    "plug_start_datetime": "2024-01-02T03:04:05Z",
    "plug_end_datetime": "2024-01-02T05:06:07Z",
    "charge_start_datetime": "2024-01-02T03:04:05Z",
    "charge_end_datetime": "2024-01-02T05:06:07Z",
    "session_duration": "PT1H",
    "charging_duration": "PT1H",
    "energy_kwh": 34,
    "peak_kw": 50,
    "total_fee_charged": 1.2,
    "energy_fee": 0.2,
    "session_fee": 0.78,
    "time_fee": 0.2,
    "user_id": "th3133",
    "successful_completion": true,
    "ended_by": "success",
    "start_soc": 0.2,
    "end_soc": 0.6,
    "error_code": "success",
    "payment_type": "credit_card_terminal"
}`);

    sessionJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const session: Session = parseJSONSession(sessionJSON) as Session;

    // console.log(YAML.dump({
    //     title: 'parse JSON single',
    //     statia
    // }, { indent: 4 }));

    assert.ok(typeof session !== 'undefined');
    assert.ok(validateSession(session));
});

let sessionMany: Array<Session>;

it('should parse YAML multi', async (t) => {

    const _sessionMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'session_good_multiple.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const sessionMulti = parseYAMLSession(_sessionMulti);
    // console.log(YAML.dump({
    //     title: 'parse YAML multi',
    //     stationMultiYAML: _stationMulti,
    //     stationMulti,
    //     fixtureStationMany
    // }, { indent: 4 }));
    assert.equal(
        typeof sessionMulti !== 'undefined',
        true,
        'sessionMulti not undefined');
    assert.ok(Array.isArray(sessionMulti), 'sessionMulti isArray');
    assert.deepEqual(
        sessionMulti,
        fixtureSessionMany /*,
        'sessionMulti deep equal'*/);

    sessionMany = sessionMulti as Array<Session>;
});

let sessionJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializeSession(sessionMany, {
        format: 'JSON'
    });

    // console.log(json.result?.trim());

    assert.equal(json.result?.trim(),
`[
    {
        "session_id": "statie-clabucet-1:34435546",
        "port_id": "statie-clabucet:1:23",
        "plug_start_datetime": "2024-01-02T03:04:05Z",
        "plug_end_datetime": "2024-01-02T05:06:07Z",
        "charge_start_datetime": "2024-01-02T03:04:05Z",
        "charge_end_datetime": "2024-01-02T05:06:07Z",
        "session_duration": "PT1H",
        "charging_duration": "PT1H",
        "energy_kwh": 34,
        "peak_kw": 50,
        "total_fee_charged": 1.2,
        "energy_fee": 0.2,
        "session_fee": 0.78,
        "time_fee": 0.2,
        "user_id": "th3133",
        "successful_completion": true,
        "ended_by": "success",
        "start_soc": 0.2,
        "end_soc": 0.6,
        "error_code": "success",
        "payment_type": "credit_card_terminal"
    },
    {
        "session_id": "statie-clabucet-1:34435654",
        "port_id": "statie-clabucet:1:65",
        "plug_start_datetime": "2024-01-02T03:04:05Z",
        "plug_end_datetime": "2024-01-02T05:06:07Z",
        "charge_start_datetime": "2024-01-02T03:04:05Z",
        "charge_end_datetime": "2024-01-02T05:06:07Z",
        "session_duration": "PT1H",
        "charging_duration": "PT1H",
        "energy_kwh": 34,
        "peak_kw": 50,
        "total_fee_charged": 1.2,
        "energy_fee": 0.2,
        "session_fee": 0.78,
        "time_fee": 0.2,
        "user_id": "th3133",
        "successful_completion": true,
        "ended_by": "success",
        "start_soc": 0.2,
        "end_soc": 0.6,
        "error_code": "success",
        "payment_type": "credit_card_terminal"
    },
    {
        "session_id": "statie-clabucet-1:34435754",
        "port_id": "statie-clabucet:1:75",
        "plug_start_datetime": "2024-01-02T03:04:05Z",
        "plug_end_datetime": "2024-01-02T05:06:07Z",
        "charge_start_datetime": "2024-01-02T03:04:05Z",
        "charge_end_datetime": "2024-01-02T05:06:07Z",
        "session_duration": "PT1H",
        "charging_duration": "PT1H",
        "energy_kwh": 34,
        "peak_kw": 50,
        "total_fee_charged": 1.2,
        "energy_fee": 0.2,
        "session_fee": 0.78,
        "time_fee": 0.2,
        "user_id": "th3133",
        "successful_completion": true,
        "ended_by": "success",
        "start_soc": 0.2,
        "end_soc": 0.6,
        "error_code": "success",
        "payment_type": "credit_card_terminal"
    },
    {
        "session_id": "statie-clabucet-1:34435854",
        "port_id": "statie-clabucet:1:85",
        "plug_start_datetime": "2024-01-02T03:04:05Z",
        "plug_end_datetime": "2024-01-02T05:06:07Z",
        "charge_start_datetime": "2024-01-02T03:04:05Z",
        "charge_end_datetime": "2024-01-02T05:06:07Z",
        "session_duration": "PT1H",
        "charging_duration": "PT1H",
        "energy_kwh": 34,
        "peak_kw": 50,
        "total_fee_charged": 1.2,
        "energy_fee": 0.2,
        "session_fee": 0.78,
        "time_fee": 0.2,
        "user_id": "th3133",
        "successful_completion": true,
        "ended_by": "success",
        "start_soc": 0.2,
        "end_soc": 0.6,
        "error_code": "success",
        "payment_type": "credit_card_terminal"
    }
]`);

    sessionJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(stationJSONMany);
    const sessionMany = parseJSONSession(sessionJSONMany);

    // console.log(statiaMany);

    assert.ok(typeof sessionMany !== 'undefined');
    assert.ok(Array.isArray(sessionMany));
    let allOk = true;
    for (const item of sessionMany) {
        if (!validatorSession(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
