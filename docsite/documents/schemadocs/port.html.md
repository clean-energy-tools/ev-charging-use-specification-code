---
title: Charging port documentation
layout: api-page.html.ejs
---
# Port

_A product in the catalog_

Type: `object`

<i id="./port.schema.json">path: #./port.schema.json</i>

<b id=".port.schema.json">&#36;id: ./port.schema.json</b>

**_Properties_**

 - <b id="#./port.schema.json/properties/port_id">port_id</b> `required`
	 - _Unique identifier for specified port. (For NEVI or other Part 680 project, <br>port_id must be same as the permanent station identifier provided
to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/port_id">path: #./port.schema.json/properties/port_id</i>
 - <b id="#./port.schema.json/properties/project_id">project_id</b> `required`
	 - _Unique identification code specific to individual funding application or contract.<br>Project ID is supplied by administrator upon approval of funding.
_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/project_id">path: #./port.schema.json/properties/project_id</i>
 - <b id="#./port.schema.json/properties/station_id">station_id</b> `required`
	 - _Unique identifier for the station where specific port is located.<br>(For NEVI or other Part 680 project, station_id must be same as
the permanent station identifier provided to third parties pursuant
to CFR 23 § 680.116(c)(1)).
_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/station_id">path: #./port.schema.json/properties/station_id</i>
 - <b id="#./port.schema.json/properties/data_provider_org">data_provider_org</b> `required`
	 - _Data provider organization name.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/data_provider_org">path: #./port.schema.json/properties/data_provider_org</i>
 - <b id="#./port.schema.json/properties/data_provider_poc_email">data_provider_poc_email</b> `required`
	 - _Email address for data provider point of contact.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/data_provider_poc_email">path: #./port.schema.json/properties/data_provider_poc_email</i>
	 - String format must be a "email"
 - <b id="#./port.schema.json/properties/is_active">is_active</b> `required`
	 - _Port operational status.<br>_
	 - Type: `boolean`
	 - <i id="./port.schema.json/properties/is_active">path: #./port.schema.json/properties/is_active</i>
 - <b id="#./port.schema.json/properties/power_level_kw">power_level_kw</b> `required`
	 - _Maximum charging power level of the port (in kW)<br>_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/power_level_kw">path: #./port.schema.json/properties/power_level_kw</i>
 - <b id="#./port.schema.json/properties/port_latitude">port_latitude</b> `required`
	 - _Port WSG84-encoded longitude in decimal degrees to at least 4 decimal places.<br>Valid longitudes are between -180 and 180
_
	 - <i id="./port.schema.json/properties/port_latitude">path: #./port.schema.json/properties/port_latitude</i>
	 - &#36;ref: [./common.json#/definitions/latitude](#.common.jsondefinitionslatitude)
 - <b id="#./port.schema.json/properties/port_longitude">port_longitude</b> `required`
	 - _Port WSG84 encoded latitude in decimal degrees to at least 4 decimal places.<br>Valid latitudes are between -90 and 90.
_
	 - <i id="./port.schema.json/properties/port_longitude">path: #./port.schema.json/properties/port_longitude</i>
	 - &#36;ref: [./common.json#/definitions/longitude](#.common.jsondefinitionslongitude)
 - <b id="#./port.schema.json/properties/station_activation_date">station_activation_date</b> `required`
	 - _The first (full or partial) day where the station is fully operable<br>and accessible for its intended purpose
_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/station_activation_date">path: #./port.schema.json/properties/station_activation_date</i>
	 - String format must be a "date-time"
 - <b id="#./port.schema.json/properties/charger_type">charger_type</b> `required`
	 - _Charging station type (level)<br>_
	 - <i id="./port.schema.json/properties/charger_type">path: #./port.schema.json/properties/charger_type</i>
	 - &#36;ref: [./common.json#/definitions/chargerType](#.common.jsondefinitionschargertype)
 - <b id="#./port.schema.json/properties/connector_type">connector_type</b> `required`
	 - _Valid Connector Type. Multiple connector types should be separated by commas.<br>_
	 - <i id="./port.schema.json/properties/connector_type">path: #./port.schema.json/properties/connector_type</i>
	 - &#36;ref: [./common.json#/definitions/connectorType](#.common.jsondefinitionsconnectortype)
 - <b id="#./port.schema.json/properties/energy_fee">energy_fee</b> `required`
	 - _Fee charged to user per kWh (in USD).<br>_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/energy_fee">path: #./port.schema.json/properties/energy_fee</i>
	 - Range:  &ge; 0
 - <b id="#./port.schema.json/properties/session_fee">session_fee</b> `required`
	 - _Fee charged to user per session (in USD).<br>_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/session_fee">path: #./port.schema.json/properties/session_fee</i>
	 - Range:  &ge; 0
 - <b id="#./port.schema.json/properties/time_fee">time_fee</b> `required`
	 - _Fee charged to users per minute (in USD).<br>_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/time_fee">path: #./port.schema.json/properties/time_fee</i>
	 - Range:  &ge; 0
 - <b id="#./port.schema.json/properties/parking_fee">parking_fee</b> `required`
	 - _Fee charged for parking if separate from time_fee (in USD).<br>_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/parking_fee">path: #./port.schema.json/properties/parking_fee</i>
	 - Range:  &ge; 0
 - <b id="#./port.schema.json/properties/idle_fee">idle_fee</b> `required`
	 - _Fee charged for minutes not charging if separate from time fee (in USD).<br>_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/idle_fee">path: #./port.schema.json/properties/idle_fee</i>
	 - Range:  &ge; 0
 - <b id="#./port.schema.json/properties/operating_hours">operating_hours</b> `required`
	 - _Number of hours station is open per day—e.g., a station that is always open<br>has a value of 24 whereas a station that is open from 6 am to 6 pm has a value of 12.
_
	 - Type: `number`
	 - <i id="./port.schema.json/properties/operating_hours">path: #./port.schema.json/properties/operating_hours</i>
	 - Range: between 0 and 24
 - <b id="#./port.schema.json/properties/equipment_manufacturer">equipment_manufacturer</b> `required`
	 - _Charging equipment or system manufacturer name.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/equipment_manufacturer">path: #./port.schema.json/properties/equipment_manufacturer</i>
 - <b id="#./port.schema.json/properties/model_number">model_number</b> `required`
	 - _Charging equipment or system model number.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/model_number">path: #./port.schema.json/properties/model_number</i>
 - <b id="#./port.schema.json/properties/equipment_serial">equipment_serial</b> `required`
	 - _serial number of charging equipment or system.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/equipment_serial">path: #./port.schema.json/properties/equipment_serial</i>
 - <b id="#./port.schema.json/properties/data_provider_poc_last">data_provider_poc_last</b> `required`
	 - _Last name of the data provider point of contact.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/data_provider_poc_last">path: #./port.schema.json/properties/data_provider_poc_last</i>
 - <b id="#./port.schema.json/properties/data_provider_poc_first">data_provider_poc_first</b> `required`
	 - _First name of the data provider point of contact.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/data_provider_poc_first">path: #./port.schema.json/properties/data_provider_poc_first</i>
 - <b id="#./port.schema.json/properties/network">network</b> `required`
	 - _Name of network service provider.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/network">path: #./port.schema.json/properties/network</i>
 - <b id="#./port.schema.json/properties/network_contact">network_contact</b> `required`
	 - _Email address for network service provider.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/network_contact">path: #./port.schema.json/properties/network_contact</i>
	 - String format must be a "email"
 - <b id="#./port.schema.json/properties/evse_manufacturer">evse_manufacturer</b> `required`
	 - _Charging equipment manufacturer name.<br>_
	 - Type: `string`
	 - <i id="./port.schema.json/properties/evse_manufacturer">path: #./port.schema.json/properties/evse_manufacturer</i>
 - <b id="#./port.schema.json/properties/trailer_accessible">trailer_accessible</b> `required`
	 - _Port located on pull through stall that can accommodate a vehicle and trailer<br>_
	 - Type: `boolean`
	 - <i id="./port.schema.json/properties/trailer_accessible">path: #./port.schema.json/properties/trailer_accessible</i>
 - <b id="#./port.schema.json/properties/payments_accepted">payments_accepted</b> `required`
	 - _Valid Payment Type.<br>_
	 - <i id="./port.schema.json/properties/payments_accepted">path: #./port.schema.json/properties/payments_accepted</i>
	 - &#36;ref: [./common.json#/definitions/validPaymentType](#.common.jsondefinitionsvalidpaymenttype)
 _Mon Apr 22 2024 15:13:24 GMT+0300 (Eastern European Summer Time)_
