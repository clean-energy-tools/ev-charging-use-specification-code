
import test, { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { promises as fsp, default as fs } from 'node:fs';
import YAML from 'js-yaml';
import {
    serializeUptime, validateUptime, parseJSONUptime, Uptime,
    validatorUptime
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
        uptimeBD.uptime_period_start instanceof Date,
        true,
        'uptime_period_start');

    assert.equal(
            uptimeBD.uptime_period_end instanceof Date,
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




