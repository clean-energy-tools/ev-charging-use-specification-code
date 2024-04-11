import * as z from "zod";

export const ProjectSchema = z.object({
    "cost_share": z.number().positive(),
    "dac_proximate": z.boolean(),
    "dac_type": z.string(),
    "der_equipment_cost": z.number().positive(),
    "der_install_cost": z.number().positive(),
    "distribution_costs": z.number().positive(),
    "equipment_cost": z.number().positive(),
    "in_dac": z.boolean(),
    "install_cost": z.number().positive(),
    "org_address": z.string(),
    "org_city": z.string(),
    "org_name": z.string(),
    "org_state": z.string(),
    "org_zip": z.string(),
    "other_funding_other": z.number().positive(),
    "other_makeready": z.number().positive(),
    "poc_email": z.string().email(),
    "poc_first_name": z.string(),
    "poc_last_name": z.string(),
    "primary_funding": z.number().positive(),
    "primary_funding_source": z.string(),
    "project_award_date": z.coerce.date(),
    "project_id": z.string(),
    "property_cost": z.number().positive(),
    "service_costs": z.number().positive(),
    "station_id": z.string(),
    "total_power": z.number().positive(),
    "utility_funding_other": z.number().positive(),
    "utility_makeready": z.number().positive(),
});


import { Project } from '../types-evchargingspec/project.js';

export function parseProject(data: any): Project {
    return ProjectSchema.parse(data) as Project;
}

export function safeParseProject(data: any)
    : z.SafeParseReturnType<any, Project>
{
    return ProjectSchema.safeParse(data);
}
