# How to setup Insurance Product

![InsuranceArchitecture](images/InsuranceArchitecture.png?raw=true "InsuranceArchitecture")

Parts participating in insurance product for devices:

- Device having a unique identification  
- Device information provider API which supports real time and historical device data. This API will be trusted by the insurance provider.  
- [Web UI](https://github.com/AigangNetwork/aigang-platform-web) for insurance product allows blockchain integration
- [Blockchain contracts](https://github.com/AigangNetwork/aigang-contracts). These contracts stores all policies and other insurance related auditable data  
- [Insurance company API with DB](https://github.com/AigangNetwork/aigang-api)  - protects private data from public blockchain, gives integration for 3rd party and serves web UI.
- [Contracts executor API](https://github.com/AigangNetwork/aigang-contracts-executor-public). This api is responsible for communication between background services and blockchain contracts.
- [Policies listener service](https://github.com/AigangNetwork/aigang-policies-listener-public) - adds policies to blockchain and helps to maintain local Policies database.


## 1. Contracts Deployment
Clone contracts from [Contracts repository](https://github.com/AigangNetwork/aigang-contracts)  
Make flat versions of contracts (*sh ./make_flat.sh*)  
Create Ethereum wallet for Contracts Executor service and deposit this wallet with some ETH for transactions fees.

- Deploy **PremiumCalculator.sol** where premium calculation formulas are stored
  - call **initialize** function  
- Deploy **Product.sol** as main insurance contract
  - call **initialize** function 
  - call **initializePolicies** function  
  - call **transferExecutorOwnership** function and set Contract Executor wallet address
  - deposit this contract with AIX tokens as initial insurance pool. This pool can be collected from Pools product.
- Deploy or use existing **AddressManager.sol**
- Add Product address to AddressManager using function **Add** with type example: CONTRACT_TYPES.INSURANCE.ANDROID_BATTERY (3)

## 2. Contracts Executor API Deployment
Clone Api code from [repository](https://github.com/AigangNetwork/aigang-contracts-executor-public) and follow building instructions to get API.  
In API configuration update:  
- Executor wallet public and private keys  

## 3. Policies listener service Deployment
Clone service code from [repository](hhttps://github.com/AigangNetwork/aigang-policies-listener-publici) and follow building instructions to get running service.  
In serive configuration update:
- DB connection string: TODO:

## 4. API Deployment
Clone Api code from [repository](https://github.com/AigangNetwork/aigang-api) and follow building instructions to get running DB and API.  
In API configuration update:

- Device API address which fits [requirements](DeviceApi.md)
- DB connection string: TODO:
- Contracts Executor API address: TODO: 

## 5. Web Deployment
Clone UI from [Web repository](https://github.com/AigangNetwork/aigang-platform-web)
 - update web project configuration:
    - FEATURE_TOGGLE.INSURANCE - true  
    - CONTRACTS_ADDRESSES.ADDRESS_MANAGER - change to your contract manager contract  
    - CONTRACTS_ADDRESSES.TOKEN - use AIX token in test environment  
 - build (*npm install*) and run project (*npm run localdev*)
 
## 6. Test your web project in the browser  

# How Insurance works

![Insurance flow](images/InsuranceFlow.png?raw=true)

- User selects Insurance product and follow instructions  
- User enters device ID. Each device id is product specific and can be found differently.
- System connects device data provider API and validates device status
- If status is valid draft policy will be created and displayed for user
- User pay for policy and policy will be activated

How system activates policy:  
![Insurance flow](images/InsuranceActivation.png?raw=true)

- Policy listener casually checks policy status on blockchain.
- When payment is received, service give instructions to Contracts executor API activate policy.

Policy is activated


# How Claim works

![Insurance claim](images/InsuranceClaim.png?raw=true)

- User selects active policy  
- User enter his device Id  
- System connects to device data provider API and received data validates throw blockchain rules  
- If policy is valid for claim local db policy status is updated 

Policy listener service will execute claim in blockchain and payout will be sent.

# Return leftover tokens to the Pools

When product is over and initialized pool was created from Pools product, owner should return leftover tokens to the pool.

- in the main contract **Product.sol** owner calls function *transferToPool*

Tokens are sent to the Pool product.