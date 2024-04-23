---
title: Session Documentation
layout: api-page.html.ejs
---
# Operating Data

_A product in the catalog_

Type: `object`

<i id="./session.schema.json">path: #./session.schema.json</i>

<b id=".session.schema.json">&#36;id: ./session.schema.json</b>

**_Properties_**

 - <b id="#./session.schema.json/properties/session_id">session_id</b> `required`
	 - _Unique identifier for session record<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/session_id">path: #./session.schema.json/properties/session_id</i>
 - <b id="#./session.schema.json/properties/port_id">port_id</b> `required`
	 - _Unique identifier for specified port. (For NEVI or other Part 680 project, <br>port_id must be same as the permanent station identifier provided
to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/port_id">path: #./session.schema.json/properties/port_id</i>
 - <b id="#./session.schema.json/properties/plug_start_datetime">plug_start_datetime</b> `required`
	 - _Date and time of session initialization (plug in)<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/plug_start_datetime">path: #./session.schema.json/properties/plug_start_datetime</i>
	 - String format must be a "date-time"
 - <b id="#./session.schema.json/properties/plug_end_datetime">plug_end_datetime</b> `required`
	 - _Date and time of session termination (plug out)<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/plug_end_datetime">path: #./session.schema.json/properties/plug_end_datetime</i>
	 - String format must be a "date-time"
 - <b id="#./session.schema.json/properties/charge_start_datetime">charge_start_datetime</b> `required`
	 - _Date and time when charging began<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/charge_start_datetime">path: #./session.schema.json/properties/charge_start_datetime</i>
	 - String format must be a "date-time"
 - <b id="#./session.schema.json/properties/charge_end_datetime">charge_end_datetime</b> `required`
	 - _Charging end date time<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/charge_end_datetime">path: #./session.schema.json/properties/charge_end_datetime</i>
	 - String format must be a "date-time"
 - <b id="#./session.schema.json/properties/session_duration">session_duration</b> `required`
	 - _Total duration of session (plug in to plug out)<br>_
	 - <i id="./session.schema.json/properties/session_duration">path: #./session.schema.json/properties/session_duration</i>
	 - &#36;ref: [./common.json#/definitions/duration](#.common.jsondefinitionsduration)
 - <b id="#./session.schema.json/properties/charging_duration">charging_duration</b> `required`
	 - _Total duration of time when electricity was actively dispensed - may not<br>always be equal to the difference between charge_start_datetime
and charge_end_datetime due to charge interruptions or managed charging
_
	 - <i id="./session.schema.json/properties/charging_duration">path: #./session.schema.json/properties/charging_duration</i>
	 - &#36;ref: [./common.json#/definitions/duration](#.common.jsondefinitionsduration)
 - <b id="#./session.schema.json/properties/energy_kwh">energy_kwh</b> `required`
	 - _Electricity dispensed (in kilowatt-hours) during charging session<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/energy_kwh">path: #./session.schema.json/properties/energy_kwh</i>
	 - Range:  &ge; 0
 - <b id="#./session.schema.json/properties/peak_kw">peak_kw</b> `required`
	 - _Session maximum power delivery (in kilowatts)<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/peak_kw">path: #./session.schema.json/properties/peak_kw</i>
	 - Range:  &ge; 0
 - <b id="#./session.schema.json/properties/total_fee_charged">total_fee_charged</b> `required`
	 - _The amount charged to the EV driver (in USD) where applicable - zero<br>if driver was not charged for an otherwise paid charger, NULL if charger is not paid
_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/total_fee_charged">path: #./session.schema.json/properties/total_fee_charged</i>
	 - Range:  &ge; 0
 - <b id="#./session.schema.json/properties/energy_fee">energy_fee</b> `required`
	 - _Fee (in USD) charged to user per kilowatt-hour<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/energy_fee">path: #./session.schema.json/properties/energy_fee</i>
	 - Range:  &ge; 0
 - <b id="#./session.schema.json/properties/session_fee">session_fee</b> `required`
	 - _Fee (in USD) charged to user per session<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/session_fee">path: #./session.schema.json/properties/session_fee</i>
	 - Range:  &ge; 0
 - <b id="#./session.schema.json/properties/time_fee">time_fee</b> `required`
	 - _Fee (in USD) charged to users per minute<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/time_fee">path: #./session.schema.json/properties/time_fee</i>
	 - Range:  &ge; 0
 - <b id="#./session.schema.json/properties/user_id">user_id</b> `required`
	 - _Anonymized network-specific unique user ID<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/user_id">path: #./session.schema.json/properties/user_id</i>
 - <b id="#./session.schema.json/properties/successful_completion">successful_completion</b> `required`
	 - _Whether or not the session ended as expected<br>_
	 - Type: `boolean`
	 - <i id="./session.schema.json/properties/successful_completion">path: #./session.schema.json/properties/successful_completion</i>
 - <b id="#./session.schema.json/properties/ended_by">ended_by</b> `required`
	 - _Cause of the session to end (e.g., unplugged while charging).<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/ended_by">path: #./session.schema.json/properties/ended_by</i>
 - <b id="#./session.schema.json/properties/start_soc">start_soc</b> `required`
	 - _Battery state of charge at session start represented as a decimal between 0 and 1<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/start_soc">path: #./session.schema.json/properties/start_soc</i>
	 - Range: between 0 and 1
 - <b id="#./session.schema.json/properties/end_soc">end_soc</b> `required`
	 - _Battery state of charge at session end represented as a decimal between 0 and 1<br>_
	 - Type: `number`
	 - <i id="./session.schema.json/properties/end_soc">path: #./session.schema.json/properties/end_soc</i>
	 - Range: between 0 and 1
 - <b id="#./session.schema.json/properties/error_code">error_code</b> `required`
	 - _Session error code(s) if any. Separated by comma if multiple.<br>_
	 - Type: `string`
	 - <i id="./session.schema.json/properties/error_code">path: #./session.schema.json/properties/error_code</i>
 - <b id="#./session.schema.json/properties/payment_type">payment_type</b> `required`
	 - _Valid Payment Type<br>_
	 - <i id="./session.schema.json/properties/payment_type">path: #./session.schema.json/properties/payment_type</i>
	 - &#36;ref: [./common.json#/definitions/validPaymentType](#.common.jsondefinitionsvalidpaymenttype)
 _Mon Apr 22 2024 17:56:52 GMT+0300 (Eastern European Summer Time)_
