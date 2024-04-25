---
title: Schemas, TypeScript Types, and data validation for the EV Charging Use Data Specification
layout: home.html.ejs
---

The [EV Charging Use Data Specification](https://evchargingspec.org/) is a set of data types for "provisioning, collecting, validating and reporting on data related to electric vehicle (EV) charger deployment and use."  The goal is simplifying those reporting processes by having commonly accepted data types.

However, the specification website simply documents data types.  It does not provide schema's from which coders can auto-generate code and other programming assets.  This project aims to fill that hole by providing the following:

* JSON Schema's in both JSON and YAML format corresponding to the types published by the _EV Charging Use Data Specification_ specification
* A Node.js package containing
    * TypeScript types corresponding to those schema's
    * Data validation code for each of the data types
    * Serialization into JSON, YAML or CSV
    * Deserialization from JSON, YAML or CSV


Type name | Schema files | Documentation
----------|--------------|--------------
Operating Costs | [JSON](/schemas/operating-costs.json) [YAML](/schemas/operating-costs.yaml) | [](./schemadocs/operating-costs.html)
Outage | [JSON](/schemas/outage.json) [YAML](/schemas/outages.yaml) | [](./schemadocs/outage.html)
Port | [JSON](/schemas/port.json) [YAML](/schemas/port.yaml) | [](./schemadocs/port.html)
Project | [JSON](/schemas/project.json) [YAML](/schemas/project.yaml) | [](./schemadocs/project.html)
Session | [JSON](/schemas/session.json) [YAML](/schemas/session.yaml) | [](./schemadocs/session.html)
Station | [JSON](/schemas/station.json) [YAML](/schemas/station.yaml) | [](./schemadocs/station.html)
Uptime | [JSON](/schemas/uptime.json) [YAML](/schemas/uptime.yaml) | [](./schemadocs/uptime.html)

