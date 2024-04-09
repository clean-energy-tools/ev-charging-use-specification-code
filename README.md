
This project implements JSON Schema's, TypeScript types and data validation corresponding to the types defined in the [EV Charging Use Data Specification](https://evchargingspec.org/).  That specification defines a common format, and data types, for for provisioning, collecting, validating and reporting on data related to electric vehicle (EV) charger deployment and use.

The goal is to simplify data collection and processing of usage data for electric vehicle charging equipment.

The problem being solved by the _EV Charging Use Data Specification_ is the various data formats used by various organizations overseeing deployment and compliance of electric vehicle charging systems.  Government oversight, especially when charging networks receive government funding, requires collecting data from charging networks.  The charging networks might be required to produce reports in 50 different formats, one for each State in the USA.

A common reporting standard means each reporting agency can require reports in the standard format, and the charging networks need only support one reporting format.

# Project Contents

[`schema/`](./schema/README.md) - JSON Schema definition
