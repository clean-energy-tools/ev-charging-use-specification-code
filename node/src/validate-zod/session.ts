import * as z from "zod";

// Valid Payment Type

export const PaymentTypeSchema = z.enum([
    "application",
    "cash",
    "credit_card_terminal",
    "membership",
    "other",
    "phone",
    "plug-charge",
    "roaming",
]);


export const SessionSchema = z.object({
    "charge_end_datetime": z.coerce.date(),
    "charge_start_datetime": z.coerce.date(),
    "charging_duration": z.string().regex(/(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/),
    "end_soc": z.number().min(0).max(1),
    "ended_by": z.string(),
    "energy_fee": z.number().positive(),
    "energy_kwh": z.number().positive(),
    "error_code": z.string(),
    "payment_type": PaymentTypeSchema,
    "peak_kw": z.number().positive().optional(),
    "plug_end_datetime": z.coerce.date(),
    "plug_start_datetime": z.coerce.date(),
    "port_id": z.string(),
    "session_duration": z.string().regex(/(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/),
    "session_fee": z.number().positive(),
    "session_id": z.string(),
    "start_soc": z.number().min(0).max(1),
    "successful_completion": z.boolean(),
    "time_fee": z.number().positive(),
    "total_fee_charged": z.number().positive(),
    "user_id": z.string(),
    "peak_kwh": z.number().positive(),
});


import { Session } from '../types-evchargingspec/session.js';

export function parseSession(data: any): Session {
    return SessionSchema.parse(data) as Session;
}

export function safeParseSession(data: any)
    : z.SafeParseReturnType<any, Session>
{
    return SessionSchema.safeParse(data);
}
