---
title: Operating Costs Documentation
layout: api-page.html.ejs
---
# Operating Costs

_A product in the catalog_

Type: `object`

<i id="./operating-costs.schema.json">path: #./operating-costs.schema.json</i>

<b id=".operating-costs.schema.json">&#36;id: ./operating-costs.schema.json</b>

This schema accepts additional properties.

**_Properties_**

 - <b id="#./operating-costs.schema.json/properties/station_id">station_id</b> `required`
	 - _Unique identifier for the station where specific port is located.<br>(For NEVI or other Part 680 project, station_id must be same as
the permanent station identifier provided to third parties pursuant
to CFR 23 § 680.116(c)(1)).
_
	 - Type: `string`
	 - <i id="./operating-costs.schema.json/properties/station_id">path: #./operating-costs.schema.json/properties/station_id</i>
 - <b id="#./operating-costs.schema.json/properties/oc_period_start">oc_period_start</b> `required`
	 - _Start date of operations costs reporting period<br>_
	 - Type: `string`
	 - <i id="./operating-costs.schema.json/properties/oc_period_start">path: #./operating-costs.schema.json/properties/oc_period_start</i>
	 - String format must be a "date-time"
 - <b id="#./operating-costs.schema.json/properties/oc_period_end">oc_period_end</b> `required`
	 - _End date of operations costs reporting period<br>_
	 - Type: `string`
	 - <i id="./operating-costs.schema.json/properties/oc_period_end">path: #./operating-costs.schema.json/properties/oc_period_end</i>
	 - String format must be a "date-time"
 - <b id="#./operating-costs.schema.json/properties/oc_year">oc_year</b> `required`
	 - _Year of operating cost (if reported annually)<br>_
	 - <i id="./operating-costs.schema.json/properties/oc_year">path: #./operating-costs.schema.json/properties/oc_year</i>
	 - &#36;ref: [./common.json#/definitions/year](#.common.jsondefinitionsyear)
 - <b id="#./operating-costs.schema.json/properties/station_mr">station_mr</b> `required`
	 - _Total maintanence and repair cost incurred (in USD) in reporting period or year<br>_
	 - Type: `number`
	 - <i id="./operating-costs.schema.json/properties/station_mr">path: #./operating-costs.schema.json/properties/station_mr</i>
	 - Range:  &ge; 0
 - <b id="#./operating-costs.schema.json/properties/maintenance_cost">maintenance_cost</b> `required`
	 - _Total amount paid (in USD) for maintenance costs during reporting period or year<br>_
	 - Type: `number`
	 - <i id="./operating-costs.schema.json/properties/maintenance_cost">path: #./operating-costs.schema.json/properties/maintenance_cost</i>
	 - Range:  &ge; 0
 - <b id="#./operating-costs.schema.json/properties/repair_cost">repair_cost</b> `required`
	 - _Total amount paid (in USD) for repair costs during reporting period of year<br>_
	 - Type: `number`
	 - <i id="./operating-costs.schema.json/properties/repair_cost">path: #./operating-costs.schema.json/properties/repair_cost</i>
	 - Range:  &ge; 0
 - <b id="#./operating-costs.schema.json/properties/electricity_cost">electricity_cost</b> `required`
	 - _Total amount paid (in USD) for station electricity use during reporting period<br>(estimated if station is not individually metered)
_
	 - Type: `number`
	 - <i id="./operating-costs.schema.json/properties/electricity_cost">path: #./operating-costs.schema.json/properties/electricity_cost</i>
	 - Range:  &ge; 0
 - <b id="#./operating-costs.schema.json/properties/network_costs">network_costs</b> `required`
	 - _Total amount paid (in USD) associated with network access,<br>including network service fees, communications costs,
transaction fees, etc.
_
	 - Type: `number`
	 - <i id="./operating-costs.schema.json/properties/network_costs">path: #./operating-costs.schema.json/properties/network_costs</i>
	 - Range:  &ge; 0
 _Mon Apr 22 2024 17:56:52 GMT+0300 (Eastern European Summer Time)_
