---
title: Uptime Documentation
layout: api-page.html.ejs
---
<i id="">path: #</i>

&#36;schema: [http://json-schema.org/draft-06/schema#](http://json-schema.org/draft-06/schema#)

&#36;ref: [#/definitions/Uptime](#/definitions/Uptime)

# definitions

**_Uptime_**

 - ## Uptime
 - _A product in the catalog_
 - Type: `object`
 - <i id="/definitions/Uptime">path: #/definitions/Uptime</i>
 - This schema accepts additional properties.
 - **_Properties_**
	 - <b id="#/definitions/Uptime/properties/outage_excluded">outage_excluded</b> `required`
		 - _Total number of excluded outage minutes (including partial minutes)<br>for Port ID in uptime period or Report Year and Month.
(For NEVI or other Part 680 project, calculated
in accordance with CFR 23 § 680.116(b))._
		 - Type: `number`
		 - <i id="/definitions/Uptime/properties/outage_excluded">path: #/definitions/Uptime/properties/outage_excluded</i>
	 - <b id="#/definitions/Uptime/properties/outage_total">outage_total</b> `required`
		 - _Total number of outage minutes (including partial minutes)<br>for Port ID in in uptime period or Report Year and Month.
For NEVI or other Part 680 project, calculated
in accordance with CFR 23 § 680.116(b))._
		 - Type: `number`
		 - <i id="/definitions/Uptime/properties/outage_total">path: #/definitions/Uptime/properties/outage_total</i>
	 - <b id="#/definitions/Uptime/properties/port_id">port_id</b> `required`
		 - _Unique identifier for specified port. (For NEVI or other Part 680 project,<br>port_id must be same as the permanent station identifier provided
to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)_
		 - Type: `string`
		 - <i id="/definitions/Uptime/properties/port_id">path: #/definitions/Uptime/properties/port_id</i>
	 - <b id="#/definitions/Uptime/properties/report_yr_mon">report_yr_mon</b> `required`
		 - _Year and month of uptime summary in YYYYMM format<br>if reported monthly (as required by part 680)

Matches a string representing a \"year and month\" containing six digits.  There is a Y10K problem in that in the year 10,000 the regular expression will break.
_
		 - Type: `string`
		 - <i id="/definitions/Uptime/properties/report_yr_mon">path: #/definitions/Uptime/properties/report_yr_mon</i>
		 - The value must match this pattern: `^[0-9][0-9][0-9][0-9][0-9][0-9]$`
	 - <b id="#/definitions/Uptime/properties/station_id">station_id</b> `required`
		 - _Unique identifier for the station where specific port is located.<br>(For NEVI or other Part 680 project, station_id must be same as
the permanent station identifier provided to third parties pursuant
to CFR 23 § 680.116(c)(1))._
		 - Type: `string`
		 - <i id="/definitions/Uptime/properties/station_id">path: #/definitions/Uptime/properties/station_id</i>
	 - <b id="#/definitions/Uptime/properties/uptime_pct">uptime_pct</b> `required`
		 - _Uptime percentage (between 0-100) for Port ID in uptime period<br>or Report Year and Month. (For NEVI or other Part 680 project,
calculated in accordance with CFR 23 § 680.116(b))._
		 - Type: `number`
		 - <i id="/definitions/Uptime/properties/uptime_pct">path: #/definitions/Uptime/properties/uptime_pct</i>
	 - <b id="#/definitions/Uptime/properties/uptime_period_end">uptime_period_end</b> `required`
		 - _End date of uptime reporting period._
		 - Type: `string`
		 - <i id="/definitions/Uptime/properties/uptime_period_end">path: #/definitions/Uptime/properties/uptime_period_end</i>
		 - String format must be a "date-time"
	 - <b id="#/definitions/Uptime/properties/uptime_period_start">uptime_period_start</b> `required`
		 - _Start date of uptime reporting period._
		 - Type: `string`
		 - <i id="/definitions/Uptime/properties/uptime_period_start">path: #/definitions/Uptime/properties/uptime_period_start</i>
		 - String format must be a "date-time"


 _Mon Apr 22 2024 17:56:52 GMT+0300 (Eastern European Summer Time)_
