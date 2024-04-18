
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
    parseYAMLStation
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

test('should validate simple Station read from file', async (t) => {
    const _station1 = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'station_good.yaml'),
        'utf-8');
    const station1 = YAML.load(_station1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     station1
    // }, { indent: 4 }));

    assert.equal(
        validateStation(station1 as Station),
        true);
});

test('should fail to validate Station with bad coordinates', async (t) => {
    const _stationBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'station_bad_coords.yaml'),
        'utf-8');
    const stationBD
        = YAML.load(_stationBD) as Station;

    assert.equal(
        typeof stationBD['station_lon'] as any === 'string',
        true,
        'station_lon');

    assert.equal(
        typeof stationBD['station_lat'] as any === 'string',
        true,
        'station_lat');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     uptimeBD
    // }, { indent: 4 }));

    assert.equal(
        validateStation(stationBD),
        false,
        'isValid');
});

test('should fail to validate Station with bad id', async (t) => {
    const _stationBD = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'station_bad_id.yaml'),
        'utf-8');
    const stationBD
        = YAML.load(_stationBD) as Station;

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     stationBD
    // }, { indent: 4 }));

    assert.equal(
        typeof stationBD.station_id,
        'number',
        `port ${typeof stationBD.station_id} not number`);

    assert.equal(
        validateStation(stationBD),
        false,
        'isValid');

    assert.equal(
        Array.isArray(validatorStation.errors),
        true,
        'isArray');
    
    assert.equal(
        validatorStation.errors?.length,
        1,
        'number of errors');
    
    assert.deepEqual(validatorStation.errors[0], {
        instancePath: '/station_id',
        schemaPath: '#/properties/station_id/type',
        keyword: 'type',
        params: { type: 'string' },
        message: 'must be string'
    });
});


test('should fail to validate Station with bad zip code', async (t) => {
    const _stationBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'station_bad_zip.yaml'),
        'utf-8');
    const stationBD
        = YAML.load(_stationBD) as Station;

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     stationBD
    // }, { indent: 4 }));

    assert.equal(
        typeof stationBD.operator_zip,
        'number',
        `operator_zip ${typeof stationBD.operator_zip} not number`);

    assert.equal(
        typeof stationBD.operator_zip,
        'number',
        `operator_zip ${typeof stationBD.operator_zip} not number`);

    assert.equal(
        validateStation(stationBD),
        false,
        'isValid');

    assert.equal(
        Array.isArray(validatorStation.errors),
        true,
        'isArray');
    
    assert.equal(
        validatorStation.errors?.length,
        1,
        'number of errors');
});

test('should fail to validate Station with bad access type', async (t) => {
    const _stationBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'station_bad_access.yaml'),
        'utf-8');
    const stationBD
        = YAML.load(_stationBD) as Station;

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     stationBD
    // }, { indent: 4 }));

    assert.equal(
        typeof stationBD.access_type,
        'string',
        `access_type ${typeof stationBD.access_type} string`);

    assert.equal(
        validateStation(stationBD),
        false,
        'isValid');

    assert.equal(
        Array.isArray(validatorStation.errors),
        true,
        'isArray');
    
    assert.equal(
        validatorStation.errors?.length,
        1,
        'number of errors');
    
    assert.deepEqual(validatorStation.errors[0], {
        instancePath: '/access_type',
        schemaPath: './common.json#/definitions/accessType/enum',
        keyword: 'enum',
        params: { allowedValues: [
            "public", "private", "semi_public", "commercial_only"
        ]},
        message: 'must be equal to one of the allowed values'
      });
});

test('should fail to validate Station with bad der', async (t) => {
    const _stationBD = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'station_bad_der.yaml'),
        'utf-8');
    const stationBD
        = YAML.load(_stationBD) as Station;

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     stationBD
    // }, { indent: 4 }));

    assert.equal(
        typeof stationBD.onsite_der,
        'string',
        `onsite_der ${typeof stationBD.onsite_der} string`);

    assert.equal(
        typeof stationBD.onsite_der_type,
        'string',
        `onsite_der_type ${typeof stationBD.onsite_der_type} string`);

    assert.equal(
        typeof stationBD.der_energy,
        'string',
        `der_energy ${typeof stationBD.der_energy} not number`);
    
    assert.equal(
        typeof stationBD.der_power,
        'string',
        `der_power ${typeof stationBD.der_power} not number`);
        
    assert.equal(
        validateStation(stationBD),
        false,
        'isValid');

    assert.equal(
        Array.isArray(validatorStation.errors),
        true,
        'isArray');
    
    assert.equal(
        validatorStation.errors?.length,
        1,
        'number of errors');
});

let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _station1 = await fsp.readFile(
        path.join(__dirname, '..', 'fixtures', 'station_good.yaml'),
        'utf-8');
    const station1 = YAML.load(_station1) as Station;

    const csv = serializeStation(station1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        csv.result.trim(),
        'statie-clabucet,Statia Clabucet,129 Strada Clabucet,New York,NY,01234,Manhattan,-40,70,Happy EV Charging,129 Main St,New York,NY,01234,operational,public,public,street,John,John,john@happyevcharging.com,,other,0,0'
    );

    csvSerialized = csv.result;
});

const stationGood: Station = {
    station_id: 'statie-clabucet',
    station_name: 'Statia Clabucet',
    station_address: '129 Strada Clabucet',
    station_city: 'New York',
    station_state: 'NY',
    station_zip: '01234',
    station_county: 'Manhattan',
    station_lon: -40,
    station_lat: 70,
    operator_name: 'Happy EV Charging',
    operator_address: '129 Main St',
    operator_city: 'New York',
    operator_state: 'NY',
    operator_zip: '01234',
    operating_status: 'operational',
    access_type: 'public',
    site_host_type: 'public',
    site_host_type_detail: 'street',
    host_first_name: 'John',
    host_last_name: 'John',
    host_email: 'john@happyevcharging.com',
    onsite_der: false,
    onsite_der_type: 'other',
    der_power: 0,
    der_energy: 0
} as Station;

it('should parse from CSV to Station', async (t) => {

    const result = await parseCSVStation(csvSerialized, {
        delimiter: ','
    });
    // console.log(YAML.dump({
    //     title: 'parse from CSV to Station',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, [
        stationGood
    ]);
});


let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _station1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'station_good_multiple.yaml'),
        'utf-8');
    const station1 = YAML.load(_station1) as Station;

    const csv = serializeStation(station1, {
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
        'statie-clabucet-1|Statia Clabucet #1|129 Strada Clabucet|New York|NY|01234|Manhattan|-40|70|Happy EV Charging|129 Main St|New York|NY|01234|operational|public|public|street|John|John|john@happyevcharging.com||other|0|0',

        'statie-clabucet-2|Statia Clabucet #2|129 Strada Clabucet|New York|NY|01234|Manhattan|-40|70|Happy EV Charging|129 Main St|New York|NY|01234|operational|public|public|street|John|John|john@happyevcharging.com||other|0|0',

        'statie-clabucet-3|Statia Clabucet #3|129 Strada Clabucet|New York|NY|01234|Manhattan|-40|70|Happy EV Charging|129 Main St|New York|NY|01234|operational|public|public|street|John|John|john@happyevcharging.com||other|0|0',

        'statie-clabucet-4|Statia Clabucet #4|129 Strada Clabucet|New York|NY|01234|Manhattan|-40|70|Happy EV Charging|129 Main St|New York|NY|01234|operational|public|public|street|John|John|john@happyevcharging.com||other|0|0'
    ].join('\n').trim());

    csvSerializedMult = csv.result;
});

const fixtureStationMany: Array<Station> = [
    {
        station_id: 'statie-clabucet-1',
        station_name: 'Statia Clabucet #1',
        station_address: '129 Strada Clabucet',
        station_city: 'New York',
        station_state: 'NY',
        station_zip: '01234',
        station_county: 'Manhattan',
        station_lon: -40,
        station_lat: 70,
        operator_name: 'Happy EV Charging',
        operator_address: '129 Main St',
        operator_city: 'New York',
        operator_state: 'NY',
        operator_zip: '01234',
        operating_status: 'operational',
        access_type: 'public',
        site_host_type: 'public',
        site_host_type_detail: 'street',
        host_first_name: 'John',
        host_last_name: 'John',
        host_email: 'john@happyevcharging.com',
        onsite_der: false,
        onsite_der_type: 'other',
        der_power: 0,
        der_energy: 0
    },
    {
        station_id: 'statie-clabucet-2',
        station_name: 'Statia Clabucet #2',
        station_address: '129 Strada Clabucet',
        station_city: 'New York',
        station_state: 'NY',
        station_zip: '01234',
        station_county: 'Manhattan',
        station_lon: -40,
        station_lat: 70,
        operator_name: 'Happy EV Charging',
        operator_address: '129 Main St',
        operator_city: 'New York',
        operator_state: 'NY',
        operator_zip: '01234',
        operating_status: 'operational',
        access_type: 'public',
        site_host_type: 'public',
        site_host_type_detail: 'street',
        host_first_name: 'John',
        host_last_name: 'John',
        host_email: 'john@happyevcharging.com',
        onsite_der: false,
        onsite_der_type: 'other',
        der_power: 0,
        der_energy: 0
    },
    {
        station_id: 'statie-clabucet-3',
        station_name: 'Statia Clabucet #3',
        station_address: '129 Strada Clabucet',
        station_city: 'New York',
        station_state: 'NY',
        station_zip: '01234',
        station_county: 'Manhattan',
        station_lon: -40,
        station_lat: 70,
        operator_name: 'Happy EV Charging',
        operator_address: '129 Main St',
        operator_city: 'New York',
        operator_state: 'NY',
        operator_zip: '01234',
        operating_status: 'operational',
        access_type: 'public',
        site_host_type: 'public',
        site_host_type_detail: 'street',
        host_first_name: 'John',
        host_last_name: 'John',
        host_email: 'john@happyevcharging.com',
        onsite_der: false,
        onsite_der_type: 'other',
        der_power: 0,
        der_energy: 0
    },
    {
        station_id: 'statie-clabucet-4',
        station_name: 'Statia Clabucet #4',
        station_address: '129 Strada Clabucet',
        station_city: 'New York',
        station_state: 'NY',
        station_zip: '01234',
        station_county: 'Manhattan',
        station_lon: -40,
        station_lat: 70,
        operator_name: 'Happy EV Charging',
        operator_address: '129 Main St',
        operator_city: 'New York',
        operator_state: 'NY',
        operator_zip: '01234',
        operating_status: 'operational',
        access_type: 'public',
        site_host_type: 'public',
        site_host_type_detail: 'street',
        host_first_name: 'John',
        host_last_name: 'John',
        host_email: 'john@happyevcharging.com',
        onsite_der: false,
        onsite_der_type: 'other',
        der_power: 0,
        der_energy: 0
    },
];

it('should parse multiple items from CSV to Station', async (t) => {

    const result = await parseCSVStation(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'parse multiple items from CSV to Station',
    //     result
    // }, { indent: 4 });
    assert.deepEqual(result, fixtureStationMany);
});

let station: Station;

it('should parse YAML single', async (t) => {

    const _station1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'station_good.yaml'),
        'utf-8');
    // console.log(_station1);

    const station1 = parseYAMLStation(_station1);
    // console.log(YAML.dump({
    //     title: 'parse YAML single',
    //     station1
    // }, { indent: 4 }));
    assert.equal(typeof station1 !== 'undefined', true);
    assert.deepEqual(station1, stationGood);

    station = station1 as Station;
});

let stationJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializeStation(station, {
        format: 'JSON'
    });

    // console.log(YAML.dump({
    //     title: 'serialize item to JSON',
    //     json
    // }, { indent: 4 });

    assert.equal(json.result?.trim(), `{
    "station_id": "statie-clabucet",
    "station_name": "Statia Clabucet",
    "station_address": "129 Strada Clabucet",
    "station_city": "New York",
    "station_state": "NY",
    "station_zip": "01234",
    "station_county": "Manhattan",
    "station_lon": -40,
    "station_lat": 70,
    "operator_name": "Happy EV Charging",
    "operator_address": "129 Main St",
    "operator_city": "New York",
    "operator_state": "NY",
    "operator_zip": "01234",
    "operating_status": "operational",
    "access_type": "public",
    "site_host_type": "public",
    "site_host_type_detail": "street",
    "host_first_name": "John",
    "host_last_name": "John",
    "host_email": "john@happyevcharging.com",
    "onsite_der": false,
    "onsite_der_type": "other",
    "der_power": 0,
    "der_energy": 0
}`);

    stationJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const statia: Station = parseJSONStation(stationJSON) as Station;

    // console.log(YAML.dump({
    //     title: 'parse JSON single',
    //     statia
    // }, { indent: 4 }));

    assert.ok(typeof statia !== 'undefined');
    assert.ok(validateStation(statia));
});

let stationMany: Array<Station>;

it('should parse YAML multi', async (t) => {

    const _stationMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'station_good_multiple.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const stationMulti = parseYAMLStation(_stationMulti);
    // console.log(YAML.dump({
    //     title: 'parse YAML multi',
    //     stationMultiYAML: _stationMulti,
    //     stationMulti,
    //     fixtureStationMany
    // }, { indent: 4 }));
    assert.equal(
        typeof stationMulti !== 'undefined',
        true,
        'stationMulti not undefined');
    assert.ok(Array.isArray(stationMulti), 'stationMulti isArray');
    assert.deepEqual(
        stationMulti,
        fixtureStationMany /*,
        'stationMulti deep equal'*/);

    stationMany = stationMulti as Array<Station>;
});

let stationJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializeStation(stationMany, {
        format: 'JSON'
    });

    // console.log(json.result?.trim());

    assert.equal(json.result?.trim(),
`[
    {
        "station_id": "statie-clabucet-1",
        "station_name": "Statia Clabucet #1",
        "station_address": "129 Strada Clabucet",
        "station_city": "New York",
        "station_state": "NY",
        "station_zip": "01234",
        "station_county": "Manhattan",
        "station_lon": -40,
        "station_lat": 70,
        "operator_name": "Happy EV Charging",
        "operator_address": "129 Main St",
        "operator_city": "New York",
        "operator_state": "NY",
        "operator_zip": "01234",
        "operating_status": "operational",
        "access_type": "public",
        "site_host_type": "public",
        "site_host_type_detail": "street",
        "host_first_name": "John",
        "host_last_name": "John",
        "host_email": "john@happyevcharging.com",
        "onsite_der": false,
        "onsite_der_type": "other",
        "der_power": 0,
        "der_energy": 0
    },
    {
        "station_id": "statie-clabucet-2",
        "station_name": "Statia Clabucet #2",
        "station_address": "129 Strada Clabucet",
        "station_city": "New York",
        "station_state": "NY",
        "station_zip": "01234",
        "station_county": "Manhattan",
        "station_lon": -40,
        "station_lat": 70,
        "operator_name": "Happy EV Charging",
        "operator_address": "129 Main St",
        "operator_city": "New York",
        "operator_state": "NY",
        "operator_zip": "01234",
        "operating_status": "operational",
        "access_type": "public",
        "site_host_type": "public",
        "site_host_type_detail": "street",
        "host_first_name": "John",
        "host_last_name": "John",
        "host_email": "john@happyevcharging.com",
        "onsite_der": false,
        "onsite_der_type": "other",
        "der_power": 0,
        "der_energy": 0
    },
    {
        "station_id": "statie-clabucet-3",
        "station_name": "Statia Clabucet #3",
        "station_address": "129 Strada Clabucet",
        "station_city": "New York",
        "station_state": "NY",
        "station_zip": "01234",
        "station_county": "Manhattan",
        "station_lon": -40,
        "station_lat": 70,
        "operator_name": "Happy EV Charging",
        "operator_address": "129 Main St",
        "operator_city": "New York",
        "operator_state": "NY",
        "operator_zip": "01234",
        "operating_status": "operational",
        "access_type": "public",
        "site_host_type": "public",
        "site_host_type_detail": "street",
        "host_first_name": "John",
        "host_last_name": "John",
        "host_email": "john@happyevcharging.com",
        "onsite_der": false,
        "onsite_der_type": "other",
        "der_power": 0,
        "der_energy": 0
    },
    {
        "station_id": "statie-clabucet-4",
        "station_name": "Statia Clabucet #4",
        "station_address": "129 Strada Clabucet",
        "station_city": "New York",
        "station_state": "NY",
        "station_zip": "01234",
        "station_county": "Manhattan",
        "station_lon": -40,
        "station_lat": 70,
        "operator_name": "Happy EV Charging",
        "operator_address": "129 Main St",
        "operator_city": "New York",
        "operator_state": "NY",
        "operator_zip": "01234",
        "operating_status": "operational",
        "access_type": "public",
        "site_host_type": "public",
        "site_host_type_detail": "street",
        "host_first_name": "John",
        "host_last_name": "John",
        "host_email": "john@happyevcharging.com",
        "onsite_der": false,
        "onsite_der_type": "other",
        "der_power": 0,
        "der_energy": 0
    }
]`);

    stationJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(stationJSONMany);
    const statiaMany = parseJSONStation(stationJSONMany);

    // console.log(statiaMany);

    assert.ok(typeof statiaMany !== 'undefined');
    assert.ok(Array.isArray(statiaMany));
    let allOk = true;
    for (const item of statiaMany) {
        if (!validatorStation(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
