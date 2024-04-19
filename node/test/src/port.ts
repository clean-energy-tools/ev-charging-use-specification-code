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
    Port,
    validatePort,
    validatorPort,
    serializePort,
    parseCSVPort,
    parseYAMLPort,
    parseJSONPort
} from '../../dist/index.js';
// import { Uptime } from '../../dist/types-evchargingspec/uptime.js';

import * as path from 'path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

test('should validate simple Port read from file', async (t) => {
    const _port1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_good.yaml'),
        'utf-8');
    const port1 = YAML.load(_port1);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     _port1,
    //     port1
    // }, { indent: 4 }));

    assert.equal(
        validatePort(port1 as Port),
        true);
});

test('should fail to validate Port with bad dates', async (t) => {
    const _portBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_bad_dates.yaml'),
        'utf-8');
    const portBad
        = YAML.load(_portBad) as Port;

    assert.equal(
        portBad['station_activation_date'] as any instanceof Date,
        true,
        'station_activation_date');

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validatePort(portBad),
        false,
        'not valid - bad dates');

    assert.deepEqual(validatorPort.errors
        ? validatorPort.errors[0]
        : {}, {
            instancePath: '/station_activation_date',
            schemaPath: '#/properties/station_activation_date/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string'
          }
        );
});

test('should fail to validate Port with bad charger type', async (t) => {
    const _portBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_bad_charger_type.yaml'),
        'utf-8');
    const portBad
        = YAML.load(_portBad) as Port;

    assert.equal(
        typeof portBad['charger_type'],
        'string' /*,
        'charger_type' */);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validatePort(portBad),
        false,
        'not valid - bad charger_type');

    assert.deepEqual(validatorPort.errors
        ? validatorPort.errors[0]
        : {}, {
            instancePath: '/charger_type',
            schemaPath: './common.json#/definitions/chargerType/enum',
            keyword: 'enum',
            params: { allowedValues: [
                "level_1", "level_2", "DCFC"
            ] },
            message: 'must be equal to one of the allowed values'
          }
        );
});

test('should fail to validate Port with bad connector type', async (t) => {
    const _portBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_bad_connector_type.yaml'),
        'utf-8');
    const portBad
        = YAML.load(_portBad) as Port;

    assert.equal(
        typeof portBad['connector_type'],
        'string' /*,
        'connector_type' */);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validatePort(portBad),
        false,
        'not valid - bad connector_type');

    assert.deepEqual(validatorPort.errors
        ? validatorPort.errors[0]
        : {}, {
            instancePath: '/connector_type',
            schemaPath: './common.json#/definitions/connectorType/enum',
            keyword: 'enum',
            params: { allowedValues: [
                "CCS", "CHAdeMO", "J1772", "NACS"
            ] },
            message: 'must be equal to one of the allowed values'
          }
        );
});

test('should fail to validate Port with bad payment type', async (t) => {
    const _portBad = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_bad_payment.yaml'),
        'utf-8');
    const portBad
        = YAML.load(_portBad) as Port;

    assert.equal(
        typeof portBad['payments_accepted'],
        'string' /*,
        'payments_accepted' */);

    // console.log(YAML.dump({
    //     title: 'Before validate',
    //     sessionBD
    // }, { indent: 4 }));

    assert.equal(
        validatePort(portBad),
        false,
        'not valid - bad payments_accepted');

    assert.deepEqual(validatorPort.errors
        ? validatorPort.errors[0]
        : {}, {
            instancePath: '/payments_accepted',
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
            ]},
            message: 'must be equal to one of the allowed values'
          }
        );
});

let csvSerialized: string;

it('should serialize to CSV', async (t) => {

    const _port1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_good.yaml'),
        'utf-8');
    const port1 = YAML.load(_port1) as Port;

    const csv = serializePort(port1, {
        format: 'CSV'
    });
    // console.log(csv.result);

    assert.ok(typeof csv.result !== 'undefined');
    assert.ok(typeof csv.errors === 'undefined');

    assert.equal(
        csv.result.trim(),
        'statie-clabucet:1:23,rendezvous-clean-earth,statie-clabucet,Happy EV Charging,john@happyevcharging.com,1,6.6,-70,40,2024-01-02T03:04:05Z,level_2,J1772,0.29,0.1,0.05,0.1,0.5,24,Siemens,S1234,453895726294739,john,John,Happy EV Charging,John John,Siemens,,credit_card_terminal'
    );

    csvSerialized = csv.result;
});

const portGood = {
    port_id: 'statie-clabucet:1:23',
    project_id: 'rendezvous-clean-earth',
    station_id: 'statie-clabucet',
    data_provider_org: 'Happy EV Charging',
    data_provider_poc_email: 'john@happyevcharging.com',
    is_active: true,
    power_level_kw: 6.6,
    port_latitude: -70,
    port_longitude: 40,
    station_activation_date: '2024-01-02T03:04:05Z',
    charger_type: 'level_2',
    connector_type: 'J1772',
    energy_fee: 0.29,
    session_fee: 0.1,
    time_fee: 0.05,
    parking_fee: 0.1,
    idle_fee: 0.5,
    operating_hours: 24,
    equipment_manufacturer: 'Siemens',
    model_number: 'S1234',
    equipment_serial: '453895726294739',
    data_provider_poc_first: 'John',
    data_provider_poc_last: 'john',
    network: 'Happy EV Charging',
    network_contact: 'John John',
    evse_manufacturer: 'Siemens',
    trailer_accessible: false,
    payments_accepted: 'credit_card_terminal',
};

it('should parse from CSV to Port', async (t) => {

    // console.log(csvSerialized);

    const result = await parseCSVPort(csvSerialized, {
        delimiter: ','
    });
    // console.log(YAML.dump({
    //     title: 'parse from CSV to Port',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, [
        portGood
    ]);
});


let csvSerializedMult: string;

it('should serialize multiple items to CSV', async (t) => {

    const _port1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_good_multiple.yaml'),
        'utf-8');
    const port1 = YAML.load(_port1) as Port[];

    const csv = serializePort(port1, {
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
        'statie-clabucet:1:23|rendezvous-clean-earth|statie-clabucet|Happy EV Charging|john@happyevcharging.com|1|6.6|-70|40|2024-01-02T03:04:05Z|level_2|J1772|0.29|0.1|0.05|0.1|0.5|24|Siemens|S1234|453895726294739|john|John|Happy EV Charging|John John|Siemens||credit_card_terminal',

        'statie-clabucet:1:24|rendezvous-clean-earth|statie-clabucet|Happy EV Charging|john@happyevcharging.com|1|6.6|-70|40|2024-01-02T03:04:05Z|level_2|J1772|0.29|0.1|0.05|0.1|0.5|24|Siemens|S1234|453895726294739|john|John|Happy EV Charging|John John|Siemens||credit_card_terminal',

        'statie-clabucet:1:25|rendezvous-clean-earth|statie-clabucet|Happy EV Charging|john@happyevcharging.com|1|6.6|-70|40|2024-01-02T03:04:05Z|level_2|J1772|0.29|0.1|0.05|0.1|0.5|24|Siemens|S1234|453895726294739|john|John|Happy EV Charging|John John|Siemens||credit_card_terminal',

        'statie-clabucet:1:26|rendezvous-clean-earth|statie-clabucet|Happy EV Charging|john@happyevcharging.com|1|6.6|-70|40|2024-01-02T03:04:05Z|level_2|J1772|0.29|0.1|0.05|0.1|0.5|24|Siemens|S1234|453895726294739|john|John|Happy EV Charging|John John|Siemens||credit_card_terminal'
    ].join('\n').trim());

    csvSerializedMult = csv.result;
});

const fixturePortMany: Array<Port> = [
    {
        port_id: 'statie-clabucet:1:23',
        project_id: 'rendezvous-clean-earth',
        station_id: 'statie-clabucet',
        data_provider_org: 'Happy EV Charging',
        data_provider_poc_email: 'john@happyevcharging.com',
        is_active: true,
        power_level_kw: 6.6,
        port_latitude: -70,
        port_longitude: 40,
        station_activation_date: '2024-01-02T03:04:05Z',
        charger_type: 'level_2',
        connector_type: 'J1772',
        energy_fee: 0.29,
        session_fee: 0.1,
        time_fee: 0.05,
        parking_fee: 0.1,
        idle_fee: 0.5,
        operating_hours: 24,
        equipment_manufacturer: 'Siemens',
        model_number: 'S1234',
        equipment_serial: '453895726294739',
        data_provider_poc_last: 'john',
        data_provider_poc_first: 'John',
        network: 'Happy EV Charging',
        network_contact: 'John John',
        evse_manufacturer: 'Siemens',
        trailer_accessible: false,
        payments_accepted: 'credit_card_terminal'
    },
    {
        port_id: 'statie-clabucet:1:24',
        project_id: 'rendezvous-clean-earth',
        station_id: 'statie-clabucet',
        data_provider_org: 'Happy EV Charging',
        data_provider_poc_email: 'john@happyevcharging.com',
        is_active: true,
        power_level_kw: 6.6,
        port_latitude: -70,
        port_longitude: 40,
        station_activation_date: '2024-01-02T03:04:05Z',
        charger_type: 'level_2',
        connector_type: 'J1772',
        energy_fee: 0.29,
        session_fee: 0.1,
        time_fee: 0.05,
        parking_fee: 0.1,
        idle_fee: 0.5,
        operating_hours: 24,
        equipment_manufacturer: 'Siemens',
        model_number: 'S1234',
        equipment_serial: '453895726294739',
        data_provider_poc_last: 'john',
        data_provider_poc_first: 'John',
        network: 'Happy EV Charging',
        network_contact: 'John John',
        evse_manufacturer: 'Siemens',
        trailer_accessible: false,
        payments_accepted: 'credit_card_terminal'
    },
    {
        port_id: 'statie-clabucet:1:25',
        project_id: 'rendezvous-clean-earth',
        station_id: 'statie-clabucet',
        data_provider_org: 'Happy EV Charging',
        data_provider_poc_email: 'john@happyevcharging.com',
        is_active: true,
        power_level_kw: 6.6,
        port_latitude: -70,
        port_longitude: 40,
        station_activation_date: '2024-01-02T03:04:05Z',
        charger_type: 'level_2',
        connector_type: 'J1772',
        energy_fee: 0.29,
        session_fee: 0.1,
        time_fee: 0.05,
        parking_fee: 0.1,
        idle_fee: 0.5,
        operating_hours: 24,
        equipment_manufacturer: 'Siemens',
        model_number: 'S1234',
        equipment_serial: '453895726294739',
        data_provider_poc_last: 'john',
        data_provider_poc_first: 'John',
        network: 'Happy EV Charging',
        network_contact: 'John John',
        evse_manufacturer: 'Siemens',
        trailer_accessible: false,
        payments_accepted: 'credit_card_terminal'
    },
    {
        port_id: 'statie-clabucet:1:26',
        project_id: 'rendezvous-clean-earth',
        station_id: 'statie-clabucet',
        data_provider_org: 'Happy EV Charging',
        data_provider_poc_email: 'john@happyevcharging.com',
        is_active: true,
        power_level_kw: 6.6,
        port_latitude: -70,
        port_longitude: 40,
        station_activation_date: '2024-01-02T03:04:05Z',
        charger_type: 'level_2',
        connector_type: 'J1772',
        energy_fee: 0.29,
        session_fee: 0.1,
        time_fee: 0.05,
        parking_fee: 0.1,
        idle_fee: 0.5,
        operating_hours: 24,
        equipment_manufacturer: 'Siemens',
        model_number: 'S1234',
        equipment_serial: '453895726294739',
        data_provider_poc_last: 'john',
        data_provider_poc_first: 'John',
        network: 'Happy EV Charging',
        network_contact: 'John John',
        evse_manufacturer: 'Siemens',
        trailer_accessible: false,
        payments_accepted: 'credit_card_terminal'
    }
];

it('should parse multiple items from CSV to Port', async (t) => {

    const result = await parseCSVPort(csvSerializedMult, {
        delimiter: '|'
    });
    // console.log(YAML.dump({
    //     title: 'parse multiple items from CSV to Port',
    //     result
    // }, { indent: 4 }));
    assert.deepEqual(result, fixturePortMany);
});

let port: Port;

it('should parse YAML single', async (t) => {

    const _port1 = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_good.yaml'),
        'utf-8');
    // console.log(_station1);

    const port1 = parseYAMLPort(_port1);
    // console.log(YAML.dump({
    //     title: 'parse YAML single',
    //     port1
    // }, { indent: 4 }));
    assert.equal(typeof port1 !== 'undefined', true);
    assert.deepEqual(port1, portGood);

    port = port1 as Port;
});

let portJSON: string;

it('should serialize item to JSON', async (t) => {
    const json = serializePort(port, {
        format: 'JSON'
    });

    // console.log(YAML.dump({
    //     title: 'serialize item to JSON',
    //     json
    // }, { indent: 4 }));

    assert.equal(json.result?.trim(), `{
    "port_id": "statie-clabucet:1:23",
    "project_id": "rendezvous-clean-earth",
    "station_id": "statie-clabucet",
    "data_provider_org": "Happy EV Charging",
    "data_provider_poc_email": "john@happyevcharging.com",
    "is_active": true,
    "power_level_kw": 6.6,
    "port_latitude": -70,
    "port_longitude": 40,
    "station_activation_date": "2024-01-02T03:04:05Z",
    "charger_type": "level_2",
    "connector_type": "J1772",
    "energy_fee": 0.29,
    "session_fee": 0.1,
    "time_fee": 0.05,
    "parking_fee": 0.1,
    "idle_fee": 0.5,
    "operating_hours": 24,
    "equipment_manufacturer": "Siemens",
    "model_number": "S1234",
    "equipment_serial": "453895726294739",
    "data_provider_poc_first": "John",
    "data_provider_poc_last": "john",
    "network": "Happy EV Charging",
    "network_contact": "John John",
    "evse_manufacturer": "Siemens",
    "trailer_accessible": false,
    "payments_accepted": "credit_card_terminal"
}`);

    portJSON = json.result;
});

it('should parse JSON single', async (t) => {
    const port: Port = parseJSONPort(portJSON) as Port;

    // console.log(YAML.dump({
    //     title: 'parse JSON single',
    //     port
    // }, { indent: 4 }));

    assert.ok(typeof port !== 'undefined');
    assert.ok(validatePort(port));
});

let portMany: Array<Port>;

it('should parse YAML multi', async (t) => {

    const _portMulti = await fsp.readFile(
        path.join(
            __dirname, '..', 'fixtures', 'port_good_multiple.yaml'),
        'utf-8');
    // console.log(_uptime1);

    const portMulti = parseYAMLPort(_portMulti);
    // console.log(YAML.dump({
    //     title: 'parse YAML multi',
    //     portMulti: _portMulti,
    //     portMulti,
    //     fixturePortMany
    // }, { indent: 4 }));
    assert.equal(
        typeof portMulti !== 'undefined',
        true,
        'portMulti not undefined');
    assert.ok(Array.isArray(portMulti), 'portMulti isArray');
    assert.deepEqual(
        portMulti,
        fixturePortMany /*,
        'sessionMulti deep equal'*/);

    portMany = portMulti as Array<Port>;
});

let portJSONMany: string;

it('should serialize multiple items to JSON', async (t) => {
    const json = serializePort(portMany, {
        format: 'JSON'
    });

    // console.log(json.result?.trim());

    assert.equal(json.result?.trim(),
`[
    {
        "port_id": "statie-clabucet:1:23",
        "project_id": "rendezvous-clean-earth",
        "station_id": "statie-clabucet",
        "data_provider_org": "Happy EV Charging",
        "data_provider_poc_email": "john@happyevcharging.com",
        "is_active": true,
        "power_level_kw": 6.6,
        "port_latitude": -70,
        "port_longitude": 40,
        "station_activation_date": "2024-01-02T03:04:05Z",
        "charger_type": "level_2",
        "connector_type": "J1772",
        "energy_fee": 0.29,
        "session_fee": 0.1,
        "time_fee": 0.05,
        "parking_fee": 0.1,
        "idle_fee": 0.5,
        "operating_hours": 24,
        "equipment_manufacturer": "Siemens",
        "model_number": "S1234",
        "equipment_serial": "453895726294739",
        "data_provider_poc_first": "John",
        "data_provider_poc_last": "john",
        "network": "Happy EV Charging",
        "network_contact": "John John",
        "evse_manufacturer": "Siemens",
        "trailer_accessible": false,
        "payments_accepted": "credit_card_terminal"
    },
    {
        "port_id": "statie-clabucet:1:24",
        "project_id": "rendezvous-clean-earth",
        "station_id": "statie-clabucet",
        "data_provider_org": "Happy EV Charging",
        "data_provider_poc_email": "john@happyevcharging.com",
        "is_active": true,
        "power_level_kw": 6.6,
        "port_latitude": -70,
        "port_longitude": 40,
        "station_activation_date": "2024-01-02T03:04:05Z",
        "charger_type": "level_2",
        "connector_type": "J1772",
        "energy_fee": 0.29,
        "session_fee": 0.1,
        "time_fee": 0.05,
        "parking_fee": 0.1,
        "idle_fee": 0.5,
        "operating_hours": 24,
        "equipment_manufacturer": "Siemens",
        "model_number": "S1234",
        "equipment_serial": "453895726294739",
        "data_provider_poc_first": "John",
        "data_provider_poc_last": "john",
        "network": "Happy EV Charging",
        "network_contact": "John John",
        "evse_manufacturer": "Siemens",
        "trailer_accessible": false,
        "payments_accepted": "credit_card_terminal"
    },
    {
        "port_id": "statie-clabucet:1:25",
        "project_id": "rendezvous-clean-earth",
        "station_id": "statie-clabucet",
        "data_provider_org": "Happy EV Charging",
        "data_provider_poc_email": "john@happyevcharging.com",
        "is_active": true,
        "power_level_kw": 6.6,
        "port_latitude": -70,
        "port_longitude": 40,
        "station_activation_date": "2024-01-02T03:04:05Z",
        "charger_type": "level_2",
        "connector_type": "J1772",
        "energy_fee": 0.29,
        "session_fee": 0.1,
        "time_fee": 0.05,
        "parking_fee": 0.1,
        "idle_fee": 0.5,
        "operating_hours": 24,
        "equipment_manufacturer": "Siemens",
        "model_number": "S1234",
        "equipment_serial": "453895726294739",
        "data_provider_poc_first": "John",
        "data_provider_poc_last": "john",
        "network": "Happy EV Charging",
        "network_contact": "John John",
        "evse_manufacturer": "Siemens",
        "trailer_accessible": false,
        "payments_accepted": "credit_card_terminal"
    },
    {
        "port_id": "statie-clabucet:1:26",
        "project_id": "rendezvous-clean-earth",
        "station_id": "statie-clabucet",
        "data_provider_org": "Happy EV Charging",
        "data_provider_poc_email": "john@happyevcharging.com",
        "is_active": true,
        "power_level_kw": 6.6,
        "port_latitude": -70,
        "port_longitude": 40,
        "station_activation_date": "2024-01-02T03:04:05Z",
        "charger_type": "level_2",
        "connector_type": "J1772",
        "energy_fee": 0.29,
        "session_fee": 0.1,
        "time_fee": 0.05,
        "parking_fee": 0.1,
        "idle_fee": 0.5,
        "operating_hours": 24,
        "equipment_manufacturer": "Siemens",
        "model_number": "S1234",
        "equipment_serial": "453895726294739",
        "data_provider_poc_first": "John",
        "data_provider_poc_last": "john",
        "network": "Happy EV Charging",
        "network_contact": "John John",
        "evse_manufacturer": "Siemens",
        "trailer_accessible": false,
        "payments_accepted": "credit_card_terminal"
    }
]`);

    portJSONMany = json.result;
});

it('should parse JSON multiple', async (t) => {
    // console.log(stationJSONMany);
    const portMany = parseJSONPort(portJSONMany);

    // console.log(statiaMany);

    assert.ok(typeof portMany !== 'undefined');
    assert.ok(Array.isArray(portMany));
    let allOk = true;
    for (const item of portMany) {
        if (!validatorPort(item)) {
            allOk = false;
        }
    }
    assert.ok(allOk);
});
