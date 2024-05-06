import test, { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
    validatorYear,
    validatorYearMN,
    validatorDuration,
    validatorLatitude,
    validatorLongitude,
    validatorZipCode,
    validatorChargerType,
    validatorConnectorType,
    validatorValidPaymentType,
    validatorOnsiteDERType,
    validatorAccessType,
    validatorOperatingStatus,
    parseLatitude,
    parseLongitude,
    parseChargerType,
    parseConnectorType,
    parseValidPaymentType,
    parseOnsiteDERType,
    parseAccessType,
    parseOperatingStatus
} from '../../dist/validate/common.js';


test('should validate year string', async (t) => {
    assert.equal(validatorYear('2233'), true);
    assert.equal(validatorYear('0000'), true);
    assert.equal(validatorYear('9999'), true);
    assert.equal(validatorYear('999900'), false);
    assert.equal(validatorYear('-9999'), false);
    assert.equal(validatorYear('zasd'), false);
});

test('should validate yearmn string', async (t) => {
    assert.equal(validatorYearMN('223312'), true);
    assert.equal(validatorYearMN('000012'), true);
    assert.equal(validatorYearMN('999912'), true);
    assert.equal(validatorYearMN('999900'), true);
    assert.equal(validatorYearMN('-999912'), false);
    assert.equal(validatorYearMN('zasd12'), false);
});

test('should validate duration string', async (t) => {
    assert.equal(validatorDuration('P10Y'), true);
    assert.equal(validatorDuration('P10M'), true);
    assert.equal(validatorDuration('P10D'), true);
    assert.equal(validatorDuration('PT10M'), true);
    assert.equal(validatorDuration('PT10S'), true);
    assert.equal(validatorDuration('P10MT10S'), true);
    assert.equal(validatorDuration('-P10MT10S'), true);
    assert.equal(validatorDuration('+P10MT10S'), false);
    assert.equal(validatorDuration('zasd12'), false);
});

test('should validate latitude', async (t) => {
    assert.equal(validatorLatitude(-10), true);
    assert.equal(validatorLatitude(-100), true);
    assert.equal(validatorLatitude(-180), true);
    assert.equal(validatorLatitude(-180.01), false);
    assert.equal(validatorLatitude(-1000), false);
    assert.equal(validatorLatitude(10), true);
    assert.equal(validatorLatitude(100), true);
    assert.equal(validatorLatitude(180), true);
    assert.equal(validatorLatitude(180.01), false);
    assert.equal(validatorLatitude(1000), false);
});

test('should parse latitude values', async (t) => {
    assert.equal(parseLatitude(-10), -10);
    assert.equal(parseLatitude('-10'), -10);
    assert.equal(parseLatitude(-100), -100);
    assert.equal(parseLatitude('-100'), -100);
    assert.equal(parseLatitude(-180), -180);
    assert.equal(parseLatitude('-180'), -180);
    try {
        assert.equal(parseLatitude(-180.01), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Latitude -180.01 out of range');
    }
    try {
        assert.equal(parseLatitude('-180.01'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Latitude -180.01 out of range');
    }
    try {
        assert.equal(parseLatitude(-1000), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Latitude -1000 out of range');
    }
    assert.equal(parseLatitude(10), 10);
    assert.equal(parseLatitude('10'), 10);
    assert.equal(parseLatitude(100), 100);
    assert.equal(parseLatitude('100'), 100);
    assert.equal(parseLatitude(180), 180);
    assert.equal(parseLatitude('180'), 180);
    try {
        assert.equal(parseLatitude(180.01), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Latitude 180.01 out of range');
    }
    try {
        assert.equal(parseLatitude('180.01'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Latitude 180.01 out of range');
    }
    try {
        assert.equal(parseLatitude(1000), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Latitude 1000 out of range');
    }
});

test('should validate longitude', async (t) => {
    assert.equal(validatorLongitude(-10), true);
    assert.equal(validatorLongitude(-50), true);
    assert.equal(validatorLongitude(-90), true);
    assert.equal(validatorLongitude(-90.01), false);
    assert.equal(validatorLongitude(-1000), false);
    assert.equal(validatorLongitude(10), true);
    assert.equal(validatorLongitude(50), true);
    assert.equal(validatorLongitude(90), true);
    assert.equal(validatorLongitude(90.01), false);
    assert.equal(validatorLongitude(1000), false);
});

test('should parse longitude values', async (t) => {
    assert.equal(parseLongitude(-10), -10);
    assert.equal(parseLongitude('-10'), -10);
    assert.equal(parseLongitude(-50), -50);
    assert.equal(parseLongitude('-50'), -50);
    assert.equal(parseLongitude(-90), -90);
    assert.equal(parseLongitude('-90'), -90);
    try {
        assert.equal(parseLongitude(-90.01), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude -90.01 out of range');
    }
    try {
        assert.equal(parseLongitude('-90.01'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude -90.01 out of range');
    }
    try {
        assert.equal(parseLongitude(-1000), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude -1000 out of range');
    }
    try {
        assert.equal(parseLongitude('-1000'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude -1000 out of range');
    }
    assert.equal(parseLongitude(10), 10);
    assert.equal(parseLongitude('10'), 10);
    assert.equal(parseLongitude(50), 50);
    assert.equal(parseLongitude('50'), 50);
    assert.equal(parseLongitude(90), 90);
    assert.equal(parseLongitude('90'), 90);
    try {
        assert.equal(parseLongitude(90.01), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude 90.01 out of range');
    }
    try {
        assert.equal(parseLongitude('90.01'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude 90.01 out of range');
    }
    try {
        assert.equal(parseLongitude(1000), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude 1000 out of range');
    }
    try {
        assert.equal(parseLongitude('1000'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message.trim(), 'Longitude 1000 out of range');
    }
});

test('should validate zip code string', async (t) => {
    assert.equal(validatorZipCode('01234'), true);
    assert.equal(validatorZipCode('00000'), true);
    assert.equal(validatorZipCode('99999'), true);
    assert.equal(validatorZipCode('0123'), false);
    assert.equal(validatorZipCode('0000'), false);
    assert.equal(validatorZipCode('9999'), false);
    assert.equal(validatorZipCode('012300'), false);
    assert.equal(validatorZipCode('000000'), false);
    assert.equal(validatorZipCode('999900'), false);
});

test('should validate chargerType string', async (t) => {
    assert.equal(validatorChargerType('level_1'), true);
    assert.equal(validatorChargerType('level_2'), true);
    assert.equal(validatorChargerType('DCFC'), true);
    assert.equal(validatorConnectorType('level1'), false);
    assert.equal(validatorConnectorType('level2'), false);
    assert.equal(validatorConnectorType('level3'), false);
    assert.equal(validatorConnectorType('DC Fast Charge'), false);
});

test('should parse chargerType string', async (t) => {
    assert.equal(parseChargerType('level_1'), 'level_1');
    assert.equal(parseChargerType('level_2'), 'level_2');
    assert.equal(parseChargerType('DCFC'), 'DCFC');
    try {
        assert.equal(parseChargerType('level1'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'Charger Type level1 not valid')
    }
    try {
        assert.equal(parseChargerType('level2'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'Charger Type level2 not valid')
    }
});

test('should validate connectorType string', async (t) => {
    assert.equal(validatorConnectorType('CCS'), true);
    assert.equal(validatorConnectorType('CHAdeMO'), true);
    assert.equal(validatorConnectorType('J1772'), true);
    assert.equal(validatorConnectorType('NACS'), true);
    assert.equal(validatorConnectorType('ccs'), false);
    assert.equal(validatorConnectorType('chaDEmo'), false);
    assert.equal(validatorConnectorType('j1772'), false);
    assert.equal(validatorConnectorType('nacks'), false);
});

test('should parse connectorType string', async (t) => {
    assert.equal(parseConnectorType('CCS'), 'CCS');
    assert.equal(parseConnectorType('CHAdeMO'), 'CHAdeMO');
    assert.equal(parseConnectorType('J1772'), 'J1772');
    assert.equal(parseConnectorType('NACS'), 'NACS');
    try {
        assert.equal(parseConnectorType('ccs'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'Connector Type ccs not valid');
    }
    try {
        assert.equal(parseConnectorType('chaDEmo'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'Connector Type chaDEmo not valid');
    }
    try {
        assert.equal(parseConnectorType('j1772'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'Connector Type j1772 not valid');
    }
    try {
        assert.equal(parseConnectorType('nacks'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'Connector Type nacks not valid');
    }
});

test('should validate validPaymentType string', async (t) => {
    assert.equal(validatorValidPaymentType('cash'), true);
    assert.equal(validatorValidPaymentType('credit_card_terminal'), true);
    assert.equal(validatorValidPaymentType('membership'), true);
    assert.equal(validatorValidPaymentType('application'), true);
    assert.equal(validatorValidPaymentType('phone'), true);
    assert.equal(validatorValidPaymentType('plug-charge'), true);
    assert.equal(validatorValidPaymentType('roaming'), true);
    assert.equal(validatorValidPaymentType('other'), true);
    assert.equal(validatorValidPaymentType('ROAMING'), false);
    assert.equal(validatorValidPaymentType('OTHER'), false);
});

test('should parse validPaymentType string', async (t) => {
    assert.equal(parseValidPaymentType('cash'), 'cash');
    assert.equal(parseValidPaymentType('credit_card_terminal'), 'credit_card_terminal');
    assert.equal(parseValidPaymentType('membership'), 'membership');
    assert.equal(parseValidPaymentType('application'), 'application');
    assert.equal(parseValidPaymentType('phone'), 'phone');
    assert.equal(parseValidPaymentType('plug-charge'), 'plug-charge');
    assert.equal(parseValidPaymentType('roaming'), 'roaming');
    assert.equal(parseValidPaymentType('other'), 'other');
    try {
        assert.equal(parseValidPaymentType('ROAMING'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'ValidPaymentType ROAMING not valid');
    }
    try {
        assert.equal(parseValidPaymentType('OTHER'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'ValidPaymentType OTHER not valid');
    }
});

test('should validate onsiteDERType string', async (t) => {
    assert.equal(validatorOnsiteDERType('solar'), true);
    assert.equal(validatorOnsiteDERType('stationary_battery'), true);
    assert.equal(validatorOnsiteDERType('wind'), true);
    assert.equal(validatorOnsiteDERType('fuel_cell'), true);
    assert.equal(validatorOnsiteDERType('other'), true);
    assert.equal(validatorOnsiteDERType('SOLAR'), false);
    assert.equal(validatorOnsiteDERType('Stationary_Battery'), false);
    assert.equal(validatorOnsiteDERType('WIND'), false);
});

test('should parse onsiteDERType string', async (t) => {
    assert.equal(parseOnsiteDERType('solar'), 'solar');
    assert.equal(parseOnsiteDERType('stationary_battery'), 'stationary_battery');
    assert.equal(parseOnsiteDERType('wind'), 'wind');
    assert.equal(parseOnsiteDERType('fuel_cell'), 'fuel_cell');
    assert.equal(parseOnsiteDERType('other'), 'other');
    try {
        assert.equal(parseOnsiteDERType('SOLAR'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OnSiteDERType SOLAR not valid');
    }
    try {
        assert.equal(parseOnsiteDERType('Stationary_Battery'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OnSiteDERType Stationary_Battery not valid');
    }
    try {
        assert.equal(parseOnsiteDERType('WIND'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OnSiteDERType WIND not valid');
    }
});

test('should validate accessType string', async (t) => {
    assert.equal(validatorAccessType('public'), true);
    assert.equal(validatorAccessType('private'), true);
    assert.equal(validatorAccessType('semi_public'), true);
    assert.equal(validatorAccessType('commercial_only'), true);
    assert.equal(validatorAccessType('Public'), false);
    assert.equal(validatorAccessType('Private'), false);
    assert.equal(validatorAccessType('semi_Public'), false);
    assert.equal(validatorAccessType('Commercial_only'), false);
});

test('should parse accessType string', async (t) => {
    assert.equal(parseAccessType('public'), 'public');
    assert.equal(parseAccessType('private'), 'private');
    assert.equal(parseAccessType('semi_public'), 'semi_public');
    assert.equal(parseAccessType('commercial_only'), 'commercial_only');
    try {
        assert.equal(parseAccessType('Public'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'AccessType Public not valid');
    }
    try {
        assert.equal(parseAccessType('Private'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'AccessType Private not valid');
    }
    try {
        assert.equal(parseAccessType('semi_Public'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'AccessType semi_Public not valid');
    }
    try {
        assert.equal(parseAccessType('Commercial_only'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'AccessType Commercial_only not valid');
    }
});

test('should validate operatingStatus string', async (t) => {
    assert.equal(validatorOperatingStatus('operational'), true);
    assert.equal(validatorOperatingStatus('under_construction'), true);
    assert.equal(validatorOperatingStatus('planned'), true);
    assert.equal(validatorOperatingStatus('decommissioned'), true);
    assert.equal(validatorOperatingStatus('Operational'), false);
    assert.equal(validatorOperatingStatus('Under_construction'), false);
    assert.equal(validatorOperatingStatus('Planned'), false);
    assert.equal(validatorOperatingStatus('Decommissioned'), false);
});

test('should validate operatingStatus string', async (t) => {
    assert.equal(parseOperatingStatus('operational'), 'operational');
    assert.equal(parseOperatingStatus('under_construction'), 'under_construction');
    assert.equal(parseOperatingStatus('planned'), 'planned');
    assert.equal(parseOperatingStatus('decommissioned'), 'decommissioned');
    try {
        assert.equal(parseOperatingStatus('Operational'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OperatingStatus Operational not valid');
    }
    try {
        assert.equal(parseOperatingStatus('Under_construction'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OperatingStatus Under_construction not valid');
    }
    try {
        assert.equal(parseOperatingStatus('Planned'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OperatingStatus Planned not valid');
    }
    try {
        assert.equal(parseOperatingStatus('Decommissioned'), 'should not execute');
    } catch (err: any) {
        assert.equal(err.message, 'OperatingStatus Decommissioned not valid');
    }
});
