---
title: Outage Documentation
layout: api-page.html.ejs
---
_A product in the catalog_

Type: `object`

<i id="./outage.schema.json">path: #./outage.schema.json</i>

<b id=".outage.schema.json">&#36;id: ./outage.schema.json</b>

**_Properties_**

 - <b id="#./outage.schema.json/properties/outage_id">outage_id</b> `required`
	 - _Unique identifier for an individual outage on an individual port.<br>_
	 - Type: `string`
	 - <i id="./outage.schema.json/properties/outage_id">path: #./outage.schema.json/properties/outage_id</i>
 - <b id="#./outage.schema.json/properties/port_id">port_id</b> `required`
	 - _Unique identifier for specified port. (For NEVI or other Part 680 project, <br>port_id must be same as the permanent station identifier provided
to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
_
	 - Type: `string`
	 - <i id="./outage.schema.json/properties/port_id">path: #./outage.schema.json/properties/port_id</i>
 - <b id="#./outage.schema.json/properties/station_id">station_id</b> `required`
	 - _Unique identifier for the station where specific port is located.<br>(For NEVI or other Part 680 project, station_id must be same as
the permanent station identifier provided to third parties pursuant
to CFR 23 § 680.116(c)(1)).
_
	 - Type: `string`
	 - <i id="./outage.schema.json/properties/station_id">path: #./outage.schema.json/properties/station_id</i>
 - <b id="#./outage.schema.json/properties/outage_start">outage_start</b> `required`
	 - _Date and time when outage started or was first detected.<br>_
	 - Type: `string`
	 - <i id="./outage.schema.json/properties/outage_start">path: #./outage.schema.json/properties/outage_start</i>
	 - String format must be a "date-time"
 - <b id="#./outage.schema.json/properties/outage_end">outage_end</b> `required`
	 - _Date and time when outage was resolved.<br>_
	 - Type: `string`
	 - <i id="./outage.schema.json/properties/outage_end">path: #./outage.schema.json/properties/outage_end</i>
	 - String format must be a "date-time"
 - <b id="#./outage.schema.json/properties/outage_duration">outage_duration</b> `required`
	 - _Duration of outage in minutes (including partial minutes)<br>_
	 - <i id="./outage.schema.json/properties/outage_duration">path: #./outage.schema.json/properties/outage_duration</i>
	 - &#36;ref: [common.json#/definitions/duration](#common.jsondefinitionsduration)
 - <b id="#./outage.schema.json/properties/outage_cause">outage_cause</b> `required`
	 - _Cause of outage (e.g. equipment failure, power failure, vandalism).<br>_
	 - Type: `string`
	 - <i id="./outage.schema.json/properties/outage_cause">path: #./outage.schema.json/properties/outage_cause</i>
 - <b id="#./outage.schema.json/properties/exempted_outage">exempted_outage</b> `required`
	 - _Is outage exempted under program rules?<br>_
	 - Type: `boolean`
	 - <i id="./outage.schema.json/properties/exempted_outage">path: #./outage.schema.json/properties/exempted_outage</i>
 _Mon Apr 22 2024 17:56:52 GMT+0300 (Eastern European Summer Time)_
