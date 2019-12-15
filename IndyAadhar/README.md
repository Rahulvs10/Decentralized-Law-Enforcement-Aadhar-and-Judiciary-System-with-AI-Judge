# IndyAadhar

A New Aadhar System that provides Self-sovereign identity (SSI) rooted on blockchains and are interoperable with other Blockchains and Organizations.

### Disadvantages of the current Aadhar System
* Centralized Storage of Personal and Biometric Data of 1.2 Billion Citizens of India.
* Establishment and Maintanence Cost of Physical Centralized Storage.
* Chances of exploitation of Data by Government or Government Supported agencies.

IndyAadhar provides a solution for all of the above problems as it is distributed storage based and gives the control of User's data completely to the User. 


### Working
* IndyAadhar leverages [Hyperledger Indy](https://www.hyperledger.org/projects/hyperledger-indy) as the BLockchain Framework.
* The ledger is intended to store Identity Records that describe a Ledger Entity. Identity Records are public data and may include Public Keys, Service Endpoints, Credential Schemas, and Credential Definitions. Every Identity Record is associated with exactly one DID (Decentralized Identifier) that is globally unique and resolvable (via a ledger) without requiring any centralized resolution authority. To maintain privacy each Identity Owner can own multiple DIDs.
* A Trust Anchor is a person or organization that the ledger already knows about, that is able to help bootstrap others. 
* The Trust Anchor provides the User or Organization with the necessary certificates requested.
