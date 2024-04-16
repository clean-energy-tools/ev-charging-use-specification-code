/**
 * A product in the catalog
 */
export interface Project {
    /**
     * Funding amount project has received from other (private,
     * non-utility) sources when combined with primary_funding
     * and utility_funding and other_public_funding equals
     * the total cost of the charging installation
     */
    cost_share: number;
    /**
     * Project is located within a program specified distance from disadvantaged community
     * as as specified by dac_type.
     */
    dac_proximate: boolean;
    /**
     * Method, model or program definition of disadvantaged community.
     * For example CEJST 1.0.
     */
    dac_type: string;
    /**
     * Cost (in USD) to acquire distributed energy resource equipment.
     */
    der_equipment_cost: number;
    /**
     * Cost (in USD) for all labor and materials costs (including electrical equipment)
     * necessary to install distributed energy resources equipment.
     */
    der_install_cost: number;
    /**
     * Cost (in USD) of contributions in aid of construction for line extensions
     * and upgrades necessary to install chargers.
     */
    distribution_costs: number;
    /**
     * Cost (in USD) to acquire funded charging equipment.
     */
    equipment_cost: number;
    /**
     * Project is located inside of disadvantaged community as specified by dac_type.
     */
    in_dac: boolean;
    /**
     * Cost (in USD) for all labor and materials costs (including electrical equipment)
     * necessary to necessary to install charging equipment.
     */
    install_cost: number;
    /**
     * Street address of obligated party.
     */
    org_address: string;
    /**
     * City of obligated party.
     */
    org_city: string;
    /**
     * Organization name of the obligated party.
     */
    org_name: string;
    /**
     * Valid state code of obligated party.
     */
    org_state: string;
    /**
     * Valid ZIP Code of entity responsible for operation
     * and maintenance of the of the funded charging station.
     */
    org_zip: string;
    /**
     * Amount of other public funding project received for equipment
     * or other non-make-ready costs (should not include any funding for operational costs)
     */
    other_funding_other: number;
    /**
     * Total funding (in USD) other public funding received dedicated to infrastructure
     * make-ready
     */
    other_makeready: number;
    /**
     * Obligated party point of contact valid email address
     */
    poc_email: string;
    /**
     * Obligated party point of contact first name
     */
    poc_first_name: string;
    /**
     * Obligated party point of contact last name
     */
    poc_last_name: string;
    /**
     * Total funding (in USD) station received from the primary funding source dedicated
     * to station deployment. (should not include any funding for station operation costs)
     */
    primary_funding: number;
    /**
     * Primary public funding source for the project/application
     */
    primary_funding_source: string;
    /**
     * Date when project funding was awarded
     */
    project_award_date: string;
    /**
     * Unique identification code specific to individual funding application or contract.
     * Project ID is supplied by [Department] upon approval of funding.
     */
    project_id: string;
    /**
     * Cost (in USD) to acquire real property on which to install funded chargers.
     */
    property_cost: number;
    /**
     * Cost (in USD) of contributions in aid of construction for service upgrade
     * costs for customer transformers, poles, meters, and other utility service
     * equipment necessary to install chargers.
     */
    service_costs: number;
    /**
     * Unique identity specific to the physical location of the station (site) funded by the
     * project. Station ID must be same as the permanent station identifier provided to third
     * parties pursuant to CFR 23 § 680.116(c)(1).
     */
    station_id: string;
    /**
     * The total charger power capacity (in kW) deployed by the project
     * - if charging equipment share power supplies, only the maximum
     * simulataneous power output should be reported.
     */
    total_power: number;
    /**
     * Total funding (in USD) the project received from utility for equipment
     * or other non-make-ready costs (should not include any funding for operational costs)
     */
    utility_funding_other: number;
    /**
     * Total funding (in USD) the project received from electric utilities
     * dedicated to infrastructure make-ready
     */
    utility_makeready: number;
    [property: string]: any;
}
