---
title: Common definitions Documentation
layout: api-page.html.ejs
---
_A product in the catalog_

<i id="./common.json">path: #./common.json</i>

<b id=".common.json">&#36;id: ./common.json</b>

# definitions

**_year_**

 - _Matches a string representing a "year" containing four digits.  There is a Y10K problem in that in the year 10,000 the regular expression will break."<br>_
 - Type: `string`
 - <i id="common.json#/definitions/year">path: #common.json#/definitions/year</i>
 - <b id="common.jsondefinitionsyear">&#36;id: common.json#/definitions/year</b>
 - String format must be a "regex"
 - The value must match this pattern: `^[0-9][0-9][0-9][0-9]$`


**_yearmn_**

 - _Matches a string representing a \"year and month\" containing six digits.  There is a Y10K problem in that in the year 10,000 the regular expression will break.<br>_
 - Type: `string`
 - <i id="common.json#/definitions/yearmn">path: #common.json#/definitions/yearmn</i>
 - <b id="common.jsondefinitionsyearmn">&#36;id: common.json#/definitions/yearmn</b>
 - String format must be a "regex"
 - The value must match this pattern: `^[0-9][0-9][0-9][0-9][0-9][0-9]$`


**_duration_**

 - _Matches an ISO8166 duration string._
 - Type: `string`
 - <i id="common.json#/definitions/duration">path: #common.json#/definitions/duration</i>
 - <b id="common.jsondefinitionsduration">&#36;id: common.json#/definitions/duration</b>
 - String format must be a "regex"
 - The value must match this pattern: `^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$`


**_latitude_**

 - _Matches the latitude of a latitude/longitude_
 - Type: `number`
 - <i id="common.json#/definitions/latitude">path: #common.json#/definitions/latitude</i>
 - <b id="common.jsondefinitionslatitude">&#36;id: common.json#/definitions/latitude</b>
 - Range: between -180 and 180


**_longitude_**

 - _Matches the longitude of a latitude/longitude_
 - Type: `number`
 - <i id="common.json#/definitions/longitude">path: #common.json#/definitions/longitude</i>
 - <b id="common.jsondefinitionslongitude">&#36;id: common.json#/definitions/longitude</b>
 - Range: between -90 and 90


**_zipCode_**

 - Type: `string`
 - <i id="common.json#/definitions/zipCode">path: #common.json#/definitions/zipCode</i>
 - <b id="common.jsondefinitionszipcode">&#36;id: common.json#/definitions/zipCode</b>
 - The value must match this pattern: `^[0-9][0-9][0-9][0-9][0-9]$`
 - Length: between 5 and 5


**_chargerType_**

 - _Charging station type (level)_
 - <i id="common.json#/definitions/chargerType">path: #common.json#/definitions/chargerType</i>
 - <b id="common.jsondefinitionschargertype">&#36;id: common.json#/definitions/chargerType</b>
 - The value is restricted to the following: 
	 1. _"level_1"_
	 2. _"level_2"_
	 3. _"DCFC"_


**_connectorType_**

 - _Valid Connector Type. Multiple connector types should be separated by commas._
 - <i id="common.json#/definitions/connectorType">path: #common.json#/definitions/connectorType</i>
 - <b id="common.jsondefinitionsconnectortype">&#36;id: common.json#/definitions/connectorType</b>
 - The value is restricted to the following: 
	 1. _"CCS"_
	 2. _"CHAdeMO"_
	 3. _"J1772"_
	 4. _"NACS"_


**_validPaymentType_**

 - _Valid Payment Type._
 - <i id="common.json#/definitions/validPaymentType">path: #common.json#/definitions/validPaymentType</i>
 - <b id="common.jsondefinitionsvalidpaymenttype">&#36;id: common.json#/definitions/validPaymentType</b>
 - The value is restricted to the following: 
	 1. _"cash"_
	 2. _"credit_card_terminal"_
	 3. _"membership"_
	 4. _"application"_
	 5. _"phone"_
	 6. _"plug-charge"_
	 7. _"roaming"_
	 8. _"other"_


**_onsiteDERType_**

 - _Valid Distributed Energy Resource Type_
 - <i id="common.json#/definitions/onsiteDERType">path: #common.json#/definitions/onsiteDERType</i>
 - <b id="common.jsondefinitionsonsitedertype">&#36;id: common.json#/definitions/onsiteDERType</b>
 - The value is restricted to the following: 
	 1. _"solar"_
	 2. _"stationary_battery"_
	 3. _"wind"_
	 4. _"fuel_cell"_
	 5. _"other"_


**_accessType_**

 - _Valid Access Type._
 - <i id="common.json#/definitions/accessType">path: #common.json#/definitions/accessType</i>
 - <b id="common.jsondefinitionsaccesstype">&#36;id: common.json#/definitions/accessType</b>
 - The value is restricted to the following: 
	 1. _"public"_
	 2. _"private"_
	 3. _"semi_public"_
	 4. _"commercial_only"_


**_operatingStatus_**

 - _Valid Operating Status._
 - <i id="common.json#/definitions/operatingStatus">path: #common.json#/definitions/operatingStatus</i>
 - <b id="common.jsondefinitionsoperatingstatus">&#36;id: common.json#/definitions/operatingStatus</b>
 - The value is restricted to the following: 
	 1. _"operational"_
	 2. _"under_construction"_
	 3. _"planned"_
	 4. _"decommissioned"_


 _Mon Apr 22 2024 15:13:24 GMT+0300 (Eastern European Summer Time)_
