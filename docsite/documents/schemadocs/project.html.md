---
title: Project Documentation
layout: api-page.html.ejs
---
# Project

_A product in the catalog_

Type: `object`

<i id="./project.schema.json">path: #./project.schema.json</i>

<b id=".project.schema.json">&#36;id: ./project.schema.json</b>

**_Properties_**

 - <b id="#./project.schema.json/properties/project_id">project_id</b> `required`
	 - _Unique identification code specific to individual funding application or contract. Project ID is supplied by [Department] upon approval of funding._
	 - Type: `string`
	 - <i id="./project.schema.json/properties/project_id">path: #./project.schema.json/properties/project_id</i>
 - <b id="#./project.schema.json/properties/station_id">station_id</b> `required`
	 - _Unique identity specific to the physical location of the station (site) funded by the project. Station ID must be same as the permanent station identifier provided to third parties pursuant to CFR 23 § 680.116(c)(1)._
	 - Type: `string`
	 - <i id="./project.schema.json/properties/station_id">path: #./project.schema.json/properties/station_id</i>
 - <b id="#./project.schema.json/properties/org_name">org_name</b> `required`
	 - _Organization name of the obligated party._
	 - Type: `string`
	 - <i id="./project.schema.json/properties/org_name">path: #./project.schema.json/properties/org_name</i>
 - <b id="#./project.schema.json/properties/org_address">org_address</b> `required`
	 - _Street address of obligated party._
	 - Type: `string`
	 - <i id="./project.schema.json/properties/org_address">path: #./project.schema.json/properties/org_address</i>
 - <b id="#./project.schema.json/properties/org_city">org_city</b> `required`
	 - _City of obligated party._
	 - Type: `string`
	 - <i id="./project.schema.json/properties/org_city">path: #./project.schema.json/properties/org_city</i>
 - <b id="#./project.schema.json/properties/org_state">org_state</b> `required`
	 - _Valid state code of obligated party._
	 - Type: `string`
	 - <i id="./project.schema.json/properties/org_state">path: #./project.schema.json/properties/org_state</i>
 - <b id="#./project.schema.json/properties/org_zip">org_zip</b> `required`
	 - _Valid ZIP Code of entity responsible for operation <br>and maintenance of the of the funded charging station.
_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/org_zip">path: #./project.schema.json/properties/org_zip</i>
	 - &#36;ref: [./common.json#/definitions/zipCode](#.common.jsondefinitionszipcode)
 - <b id="#./project.schema.json/properties/poc_email">poc_email</b> `required`
	 - _Obligated party point of contact valid email address_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/poc_email">path: #./project.schema.json/properties/poc_email</i>
	 - String format must be a "email"
 - <b id="#./project.schema.json/properties/poc_first_name">poc_first_name</b> `required`
	 - _Obligated party point of contact first name_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/poc_first_name">path: #./project.schema.json/properties/poc_first_name</i>
 - <b id="#./project.schema.json/properties/poc_last_name">poc_last_name</b> `required`
	 - _Obligated party point of contact last name_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/poc_last_name">path: #./project.schema.json/properties/poc_last_name</i>
 - <b id="#./project.schema.json/properties/project_award_date">project_award_date</b> `required`
	 - _Date when project funding was awarded_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/project_award_date">path: #./project.schema.json/properties/project_award_date</i>
	 - String format must be a "date-time"
 - <b id="#./project.schema.json/properties/primary_funding_source">primary_funding_source</b> `required`
	 - _Primary public funding source for the project/application_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/primary_funding_source">path: #./project.schema.json/properties/primary_funding_source</i>
 - <b id="#./project.schema.json/properties/primary_funding">primary_funding</b> `required`
	 - _Total funding (in USD) station received from the primary funding source dedicated<br>to station deployment. (should not include any funding for station operation costs)
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/primary_funding">path: #./project.schema.json/properties/primary_funding</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/utility_makeready">utility_makeready</b> `required`
	 - _Total funding (in USD) the project received from electric utilities<br>dedicated to infrastructure make-ready
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/utility_makeready">path: #./project.schema.json/properties/utility_makeready</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/utility_funding_other">utility_funding_other</b> `required`
	 - _Total funding (in USD) the project received from utility for equipment<br>or other non-make-ready costs (should not include any funding for operational costs)
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/utility_funding_other">path: #./project.schema.json/properties/utility_funding_other</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/other_makeready">other_makeready</b> `required`
	 - _Total funding (in USD) other public funding received dedicated to infrastructure make-ready<br>_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/other_makeready">path: #./project.schema.json/properties/other_makeready</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/other_funding_other">other_funding_other</b> `required`
	 - _Amount of other public funding project received for equipment<br>or other non-make-ready costs (should not include any funding for operational costs)
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/other_funding_other">path: #./project.schema.json/properties/other_funding_other</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/cost_share">cost_share</b> `required`
	 - _Funding amount project has received from other (private,<br>non-utility) sources when combined with primary_funding
and utility_funding and other_public_funding equals
the total cost of the charging installation
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/cost_share">path: #./project.schema.json/properties/cost_share</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/equipment_cost">equipment_cost</b> `required`
	 - _Cost (in USD) to acquire funded charging equipment._
	 - Type: `number`
	 - <i id="./project.schema.json/properties/equipment_cost">path: #./project.schema.json/properties/equipment_cost</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/install_cost">install_cost</b> `required`
	 - _Cost (in USD) for all labor and materials costs (including electrical equipment)<br>necessary to necessary to install charging equipment.
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/install_cost">path: #./project.schema.json/properties/install_cost</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/property_cost">property_cost</b> `required`
	 - _Cost (in USD) to acquire real property on which to install funded chargers.<br>_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/property_cost">path: #./project.schema.json/properties/property_cost</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/der_equipment_cost">der_equipment_cost</b> `required`
	 - _Cost (in USD) to acquire distributed energy resource equipment.<br>_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/der_equipment_cost">path: #./project.schema.json/properties/der_equipment_cost</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/der_install_cost">der_install_cost</b> `required`
	 - _Cost (in USD) for all labor and materials costs (including electrical equipment)<br>necessary to install distributed energy resources equipment.
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/der_install_cost">path: #./project.schema.json/properties/der_install_cost</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/distribution_costs">distribution_costs</b> `required`
	 - _Cost (in USD) of contributions in aid of construction for line extensions<br>and upgrades necessary to install chargers.
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/distribution_costs">path: #./project.schema.json/properties/distribution_costs</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/service_costs">service_costs</b> `required`
	 - _Cost (in USD) of contributions in aid of construction for service upgrade<br>costs for customer transformers, poles, meters, and other utility service
equipment necessary to install chargers.
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/service_costs">path: #./project.schema.json/properties/service_costs</i>
	 - Range:  &ge; 0
 - <b id="#./project.schema.json/properties/dac_type">dac_type</b> `required`
	 - _Method, model or program definition of disadvantaged community.<br>For example CEJST 1.0.
_
	 - Type: `string`
	 - <i id="./project.schema.json/properties/dac_type">path: #./project.schema.json/properties/dac_type</i>
 - <b id="#./project.schema.json/properties/in_dac">in_dac</b> `required`
	 - _Project is located inside of disadvantaged community as specified by dac_type._
	 - Type: `boolean`
	 - <i id="./project.schema.json/properties/in_dac">path: #./project.schema.json/properties/in_dac</i>
 - <b id="#./project.schema.json/properties/dac_proximate">dac_proximate</b> `required`
	 - _Project is located within a program specified distance from disadvantaged community<br>as as specified by dac_type.
_
	 - Type: `boolean`
	 - <i id="./project.schema.json/properties/dac_proximate">path: #./project.schema.json/properties/dac_proximate</i>
 - <b id="#./project.schema.json/properties/total_power">total_power</b> `required`
	 - _The total charger power capacity (in kW) deployed by the project <br>- if charging equipment share power supplies, only the maximum
simulataneous power output should be reported.
_
	 - Type: `number`
	 - <i id="./project.schema.json/properties/total_power">path: #./project.schema.json/properties/total_power</i>
	 - Range:  &ge; 0
 _Mon Apr 22 2024 15:13:24 GMT+0300 (Eastern European Summer Time)_
