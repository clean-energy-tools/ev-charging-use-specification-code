import * as z from "zod";

// Charging station type (level)

export const ChargerTypeSchema = z.enum([
    "DCFC",
    "level_1",
    "level_2",
]);

// Valid Connector Type. Multiple connector types should be separated by commas.

export const ConnectorTypeSchema = z.enum([
    "CCS",
    "CHAdeMO",
    "J1772",
    "NACS",
]);

// Valid Payment Type.

export const PaymentsAcceptedSchema = z.enum([
    "application",
    "cash",
    "credit_card_terminal",
    "membership",
    "other",
    "phone",
    "plug-charge",
    "roaming",
]);

export const PortSchema = z.object({
    "charger_type": ChargerTypeSchema,
    "connector_type": ConnectorTypeSchema,
    "data_provider_org": z.string(),
    "data_provider_poc_email": z.string().email(),
    "data_provider_poc_first": z.string(),
    "data_provider_poc_last": z.string(),
    "energy_fee": z.number().positive(),
    "equipment_manufacturer": z.string(),
    "equipment_serial": z.string(),
    "evse_manufacturer": z.string(),
    "idle_fee": z.number().positive(),
    "is_active": z.boolean(),
    "model_number": z.string(),
    "network": z.string(),
    "network_contact": z.string(),
    "operating_hours": z.number(),
    "parking_fee": z.number().positive(),
    "payments_accepted": PaymentsAcceptedSchema,
    "port_id": z.string(),
    "port_latitude": z.number().min(-180).max(180),
    "port_longitude": z.number().min(-90).max(90),
    "power_level_kw": z.number().positive(),
    "project_id": z.string(),
    "session_fee": z.number().positive(),
    "station_activation_date": z.coerce.date(),
    "station_id": z.string(),
    "time_fee": z.number().positive(),
    "trailer_accessible": z.boolean(),
});

import { Port } from '../types-evchargingspec/port.js';

export function parsePort(data: any): Port {
    return PortSchema.parse(data) as Port;
}

export function safeParsePort(data: any)
    : z.SafeParseReturnType<any, Port>
{
    return PortSchema.safeParse(data);
}
