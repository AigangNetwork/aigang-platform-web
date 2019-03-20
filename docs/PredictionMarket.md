# How to setup Prediction Market

## 1. Contracts Deployment
Clone contracts from [Contracts repository](https://github.com/AigangNetwork/aigang-contracts)  
Make flat versions of contracts (*sh ./make_flat.sh*)

- Deploy **Market.sol** main prediction market contract
  - call **initialize** function  
- Deploy **ResultStorage.sol** where prediction market results will be stored
- Deploy **PrizeCalculator.sol** reward distribution formula  
- Deploy or use existing **AddressManager.sol**
- Add market address to AddressManager using function **Add** with type PREDICTIONS (2)

## 2. Web Deployment
Clone UI from [Web repository](https://github.com/AigangNetwork/aigang-platform-web)
 - update web project configuration:
    - FEATURE_TOGGLE.PREDICTIONS - true  
    - CONTRACTS_ADDRESSES.ADDRESS_MANAGER - change to your contract manager contract  
    - CONTRACTS_ADDRESSES.TOKEN - use AIX token in test environment  
 - build (*npm install*) and run project (*npm run localdev*)
 
## 3. Test your web project in the browser  

# How to add prediction

In deployed main market contract **Market.sol**:  
- Call function *addPrediction*
- Transfer _initialTokens amount to this contract as initial tokens pool. Without initial pool people may not be interested in participating  
- [n times] Call function *updateOutcome* for each outcome
- Call function *changePredictionStatus* and set status Published (1)  

Now prediction should be visible in Web app  

# How to resolove prediction

- Owner submits result output to **ResultStorage** contract:  
  - resolution can be manual by Owner using function *setOutcome*  
  - resolution can be automatized using third party oracle from blockchain or centralized service  
- In Market main contract call function *resolve*

All users should be able to get they rewards
