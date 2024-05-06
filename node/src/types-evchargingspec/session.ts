
import { ValidPaymentType } from './port.js';

/**
 * Supports reporting data for each charging session on a port at a station.  The reported
 * data covers the start/end of the session, energy consumption, fees charged, and whether
 * the session reached a successful conclusion.
 */
export interface Session {
    /**
     * Charging end date time
     */
    charge_end_datetime: string;
    /**
     * Date and time when charging began
     */
    charge_start_datetime: string;
    /**
     * Total duration of time when electricity was actively dispensed - may not
     * always be equal to the difference between charge_start_datetime
     * and charge_end_datetime due to charge interruptions or managed charging
     */
    charging_duration: string;
    /**
     * Battery state of charge at session end represented as a decimal between 0 and 1
     */
    end_soc: number;
    /**
     * Cause of the session to end (e.g., unplugged while charging).
     */
    ended_by: string;
    /**
     * Fee (in USD) charged to user per kilowatt-hour
     */
    energy_fee: number;
    /**
     * Electricity dispensed (in kilowatt-hours) during charging session
     */
    energy_kwh: number;
    /**
     * Session error code(s) if any. Separated by comma if multiple.
     */
    error_code: string;
    /**
     * Valid Payment Type
     */
    payment_type: ValidPaymentType;
    /**
     * Session maximum power delivery (in kilowatts)
     */
    peak_kw: number;
    /**
     * Date and time of session termination (plug out)
     */
    plug_end_datetime: string;
    /**
     * Date and time of session initialization (plug in)
     */
    plug_start_datetime: string;
    /**
     * Unique identifier for specified port. (For NEVI or other Part 680 project,
     * port_id must be same as the permanent station identifier provided
     * to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
     */
    port_id: string;
    /**
     * Total duration of session (plug in to plug out)
     */
    session_duration: string;
    /**
     * Fee (in USD) charged to user per session
     */
    session_fee: number;
    /**
     * Unique identifier for session record
     */
    session_id: string;
    /**
     * Battery state of charge at session start represented as a decimal between 0 and 1
     */
    start_soc: number;
    /**
     * Whether or not the session ended as expected
     */
    successful_completion: boolean;
    /**
     * Fee (in USD) charged to users per minute
     */
    time_fee: number;
    /**
     * The amount charged to the EV driver (in USD) where applicable - zero
     * if driver was not charged for an otherwise paid charger, NULL if charger is not paid
     */
    total_fee_charged: number;
    /**
     * Anonymized network-specific unique user ID
     */
    user_id: string;
    [property: string]: any;
}

/**
 * Valid Payment Type
 *
 *
 * Valid Payment Type.
 */
// export type ValidPaymentType = "cash" | "credit_card_terminal" | "membership" | "application" | "phone" | "plug-charge" | "roaming" | "other";
