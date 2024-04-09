
import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

import { OperatingCosts } from '../types-evchargingspec/operating-costs.js';

import _schema from '../schemas/operating-costs.json' with { type: "json" };

const schema: JSONSchemaType<OperatingCosts> = _schema.definitions.OperatingCosts;

// validate is a type guard for MyData - type is inferred from schema type
const validate = ajv.compile(schema);

