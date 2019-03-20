# How to setup Pool

## 1. Contracts Deployment
Clone contracts from [Contracts repository](https://github.com/AigangNetwork/aigang-contracts)  
Make flat versions of contracts (*sh ./make_flat.sh*)

- Deploy **Pools.sol** main prediction market contract
  - call **initialize** function  
- Deploy **PrizeCalculator.sol** reward distribution formula  
- Deploy or use existing **AddressManager.sol**
- Add Pools address to AddressManager using function **Add** with type POOLS (1)

## 2. Web Deployment
Clone UI from [Web repository](https://github.com/AigangNetwork/aigang-platform-web)
 - update web project configuration:
    - FEATURE_TOGGLE.POOLS - true  
    - CONTRACTS_ADDRESSES.ADDRESS_MANAGER - change to your contract manager contract  
    - CONTRACTS_ADDRESSES.TOKEN - use AIX token in test environment  
 - build (*npm install*) and run project (*npm run localdev*)
 
## 3. Test your web project in the browser  

# How to add Pool  

In deployed main pools contract **Pools.sol**:  
- Call function *addPool*  

Now Pool should be visible in Web app  

# Transfer tokens to destination

When pool is collected and destination are ready to accept  
- In the main Pools contract call function *transferToDestination* 

Now pool are in Funding state and tokens are transferred to the destination

# Distribute received tokens from destination

When pool destination returns leftover tokens then they should be distributed for contributors
- In the main Pools contract call function *setPoolAmountDistributing* 

Now pool contributors can take rewards