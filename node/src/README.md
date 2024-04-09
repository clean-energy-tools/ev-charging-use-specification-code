Node.js/TypeScript package implementing data types from the [EV Charging Use Data Specification](https://evchargingspec.org/).

Included are the following types plus associated code for data validation and serializing to/from JSON, YAML and CSV.

Data objects related to **Program Registry and Onboarding Process**

* _Project_ -- Describes EV charging station projects, the organization in charge, and various costs related to the project.
* _Station_ -- Describes an EV charging station, its location, and characteristics.
* _Port_ -- Describes a single port on an EV charging station.

Data objects related to **Operating Data Collection**

* _Session_ -- Describes a charging session
* _OperatingCosts_ -- Describes the operating costs for a set of charging stations, collected by either by the "obligated party" or other data provider.
* _Uptime_ -- Describes the time periods during which each charging station was "up", meaning operational and available for use by customers.
* _Outage_ -- Describes the time periods during which each charging station was "down".




