---
title: Station Documentation
layout: api-page.html.ejs
---
# Station

_A product in the catalog_

Type: `object`

<i id="./station.schema.json">path: #./station.schema.json</i>

<b id=".station.schema.json">&#36;id: ./station.schema.json</b>

**_Properties_**

 - <b id="#./station.schema.json/properties/station_id">station_id</b> `required`
	 - _Unique identity specific to the physical location of the station (site) funded by the project.<br>(For NEVI/Part 680 programs, Station ID must be same as the permanent station identifier
provided to third parties pursuant to CFR 23 § 680.116(c)(1).
_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/station_id">path: #./station.schema.json/properties/station_id</i>
 - <b id="#./station.schema.json/properties/station_name">station_name</b> `required`
	 - _Descriptive name of charging site (e.g., Mercy Hospital)<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/station_name">path: #./station.schema.json/properties/station_name</i>
 - <b id="#./station.schema.json/properties/station_address">station_address</b> `required`
	 - _Street address of charging station.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/station_address">path: #./station.schema.json/properties/station_address</i>
 - <b id="#./station.schema.json/properties/station_city">station_city</b> `required`
	 - _City where charging station is located.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/station_city">path: #./station.schema.json/properties/station_city</i>
 - <b id="#./station.schema.json/properties/station_state">station_state</b> `required`
	 - _Valid state code of state where station or territory where the station is located.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/station_state">path: #./station.schema.json/properties/station_state</i>
 - <b id="#./station.schema.json/properties/station_zip">station_zip</b> `required`
	 - _Valid ZIP code of where station is located.<br>_
	 - <i id="./station.schema.json/properties/station_zip">path: #./station.schema.json/properties/station_zip</i>
	 - &#36;ref: [./common.json#/definitions/zipCode](#.common.jsondefinitionszipcode)
 - <b id="#./station.schema.json/properties/station_county">station_county</b> `required`
	 - _Station county (or county analogue)<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/station_county">path: #./station.schema.json/properties/station_county</i>
 - <b id="#./station.schema.json/properties/station_lon">station_lon</b> `required`
	 - _Station center WSG84-encoded longitude in decimal degrees to at least 4 decimal places.<br>Valid longitudes are between -180 and 180
_
	 - <i id="./station.schema.json/properties/station_lon">path: #./station.schema.json/properties/station_lon</i>
	 - &#36;ref: [./common.json#/definitions/longitude](#.common.jsondefinitionslongitude)
 - <b id="#./station.schema.json/properties/station_lat">station_lat</b> `required`
	 - _Station center WSG84 encoded latitude in decimal degrees to at least 4 decimal places.<br>Valid latitudes are between -90 and 90.
_
	 - <i id="./station.schema.json/properties/station_lat">path: #./station.schema.json/properties/station_lat</i>
	 - &#36;ref: [./common.json#/definitions/latitude](#.common.jsondefinitionslatitude)
 - <b id="#./station.schema.json/properties/operator_name">operator_name</b> `required`
	 - _Name of entity responsible for operation and maintenance of the funded charging station.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/operator_name">path: #./station.schema.json/properties/operator_name</i>
 - <b id="#./station.schema.json/properties/operator_address">operator_address</b> `required`
	 - _Street address of entity responsible for operation and maintenance of the funded charging station.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/operator_address">path: #./station.schema.json/properties/operator_address</i>
 - <b id="#./station.schema.json/properties/operator_city">operator_city</b> `required`
	 - _City of entity responsible for operation and maintenance of the funded charging station.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/operator_city">path: #./station.schema.json/properties/operator_city</i>
 - <b id="#./station.schema.json/properties/operator_state">operator_state</b> `required`
	 - _Valid state code of entity responsible for operation and maintenance of the funded charging station.<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/operator_state">path: #./station.schema.json/properties/operator_state</i>
 - <b id="#./station.schema.json/properties/operator_zip">operator_zip</b>
	 - _Valid ZIP Code of entity responsible for operation and maintenance<br>of the of the funded charging station.
_
	 - <i id="./station.schema.json/properties/operator_zip">path: #./station.schema.json/properties/operator_zip</i>
	 - &#36;ref: [./common.json#/definitions/zipCode](#.common.jsondefinitionszipcode)
 - <b id="#./station.schema.json/properties/operating_status">operating_status</b> `required`
	 - _Valid Operating Status.<br>_
	 - <i id="./station.schema.json/properties/operating_status">path: #./station.schema.json/properties/operating_status</i>
	 - &#36;ref: [./common.json#/definitions/operatingStatus](#.common.jsondefinitionsoperatingstatus)
 - <b id="#./station.schema.json/properties/access_type">access_type</b> `required`
	 - _Valid Access Type.<br>_
	 - <i id="./station.schema.json/properties/access_type">path: #./station.schema.json/properties/access_type</i>
	 - &#36;ref: [./common.json#/definitions/accessType](#.common.jsondefinitionsaccesstype)
 - <b id="#./station.schema.json/properties/site_host_type">site_host_type</b> `required`
	 - _Type of site host for the charging station. (e.g. public, workplace, MUD)<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/site_host_type">path: #./station.schema.json/properties/site_host_type</i>
 - <b id="#./station.schema.json/properties/site_host_type_detail">site_host_type_detail</b> `required`
	 - _Additional detail on site host land use. (e.g. hospital, hotel, parking garage, etc.)<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/site_host_type_detail">path: #./station.schema.json/properties/site_host_type_detail</i>
 - <b id="#./station.schema.json/properties/host_first_name">host_first_name</b> `required`
	 - _Station host point of contact first name<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/host_first_name">path: #./station.schema.json/properties/host_first_name</i>
 - <b id="#./station.schema.json/properties/host_last_name">host_last_name</b> `required`
	 - _Station host point of contact last name<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/host_last_name">path: #./station.schema.json/properties/host_last_name</i>
 - <b id="#./station.schema.json/properties/host_email">host_email</b> `required`
	 - _Station host point of contact email address<br>_
	 - Type: `string`
	 - <i id="./station.schema.json/properties/host_email">path: #./station.schema.json/properties/host_email</i>
	 - String format must be a "email"
 - <b id="#./station.schema.json/properties/onsite_der">onsite_der</b> `required`
	 - _Station has distributed energy resource.<br>_
	 - Type: `boolean`
	 - <i id="./station.schema.json/properties/onsite_der">path: #./station.schema.json/properties/onsite_der</i>
 - <b id="#./station.schema.json/properties/onsite_der_type">onsite_der_type</b> `required`
	 - _Valid Distributed Energy Resource Type<br>_
	 - <i id="./station.schema.json/properties/onsite_der_type">path: #./station.schema.json/properties/onsite_der_type</i>
	 - &#36;ref: [./common.json#/definitions/onsiteDERType](#.common.jsondefinitionsonsitedertype)
 - <b id="#./station.schema.json/properties/der_power">der_power</b> `required`
	 - _Nameplate capacity of onsite energy generation in kW<br>_
	 - Type: `number`
	 - <i id="./station.schema.json/properties/der_power">path: #./station.schema.json/properties/der_power</i>
	 - Range:  &ge; 0
 - <b id="#./station.schema.json/properties/der_energy">der_energy</b> `required`
	 - _Combined nameplate capacity of onsite energy generation and/or<br>maximum battery discharge capacity in kilowatts (kW).
_
	 - Type: `number`
	 - <i id="./station.schema.json/properties/der_energy">path: #./station.schema.json/properties/der_energy</i>
	 - Range:  &ge; 0
 _Mon Apr 22 2024 15:13:24 GMT+0300 (Eastern European Summer Time)_
