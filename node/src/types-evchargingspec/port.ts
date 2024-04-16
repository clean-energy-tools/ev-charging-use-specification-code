/**
 * A product in the catalog
 */
export interface Port {
    /**
     * Charging station type (level)
     */
    charger_type: ChargerType;
    /**
     * Valid Connector Type. Multiple connector types should be separated by commas.
     */
    connector_type: ConnectorType;
    /**
     * Data provider organization name.
     */
    data_provider_org: string;
    /**
     * Email address for data provider point of contact.
     */
    data_provider_poc_email: string;
    /**
     * First name of the data provider point of contact.
     */
    data_provider_poc_first: string;
    /**
     * Last name of the data provider point of contact.
     */
    data_provider_poc_last: string;
    /**
     * Fee charged to user per kWh (in USD).
     */
    energy_fee: number;
    /**
     * Charging equipment or system manufacturer name.
     */
    equipment_manufacturer: string;
    /**
     * serial number of charging equipment or system.
     */
    equipment_serial: string;
    /**
     * Charging equipment manufacturer name.
     */
    evse_manufacturer: string;
    /**
     * Fee charged for minutes not charging if separate from time fee (in USD).
     */
    idle_fee: number;
    /**
     * Port operational status.
     */
    is_active: boolean;
    /**
     * Charging equipment or system model number.
     */
    model_number: string;
    /**
     * Name of network service provider.
     */
    network: string;
    /**
     * Email address for network service provider.
     */
    network_contact: string;
    /**
     * Number of hours station is open per day—e.g., a station that is always open
     * has a value of 24 whereas a station that is open from 6 am to 6 pm has a value of 12.
     */
    operating_hours: number;
    /**
     * Fee charged for parking if separate from time_fee (in USD).
     */
    parking_fee: number;
    /**
     * Valid Payment Type.
     */
    payments_accepted: ValidPaymentType;
    /**
     * Unique identifier for specified port. (For NEVI or other Part 680 project,
     * port_id must be same as the permanent station identifier provided
     * to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
     */
    port_id: string;
    /**
     * Port WSG84-encoded longitude in decimal degrees to at least 4 decimal places.
     * Valid longitudes are between -180 and 180
     */
    port_latitude: number;
    /**
     * Port WSG84 encoded latitude in decimal degrees to at least 4 decimal places.
     * Valid latitudes are between -90 and 90.
     */
    port_longitude: number;
    /**
     * Maximum charging power level of the port (in kW)
     */
    power_level_kw: number;
    /**
     * Unique identification code specific to individual funding application or contract.
     * Project ID is supplied by administrator upon approval of funding.
     */
    project_id: string;
    /**
     * Fee charged to user per session (in USD).
     */
    session_fee: number;
    /**
     * The first (full or partial) day where the station is fully operable
     * and accessible for its intended purpose
     */
    station_activation_date: string;
    /**
     * Unique identifier for the station where specific port is located.
     * (For NEVI or other Part 680 project, station_id must be same as
     * the permanent station identifier provided to third parties pursuant
     * to CFR 23 § 680.116(c)(1)).
     */
    station_id: string;
    /**
     * Fee charged to users per minute (in USD).
     */
    time_fee: number;
    /**
     * Port located on pull through stall that can accommodate a vehicle and trailer
     */
    trailer_accessible: boolean;
    [property: string]: any;
}

/**
 * Charging station type (level)
 *
 *
 * Charging station type (level)
 */
export type ChargerType = "level_1" | "level_2" | "DCFC";

/**
 * Valid Connector Type. Multiple connector types should be separated by commas.
 *
 *
 * Valid Connector Type. Multiple connector types should be separated by commas.
 */
export type ConnectorType = "CCS" | "CHAdeMO" | "J1772" | "NACS";

/**
 * Valid Payment Type.
 *
 *
 * Valid Payment Type.
 */
export type ValidPaymentType = "cash" | "credit_card_terminal" | "membership" | "application" | "phone" | "plug-charge" | "roaming" | "other";
