# Aigang Platform [WEB]
[![Chat](https://badges.gitter.im/org.png)](https://gitter.im/AigangNetwork/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

This repository is presentation layer of [aigang.network](https://aigang.network) Framework for Iot insurance.


Framework includes:
 - Centralized Data section, Wiki, Discusions. These featutes can be turned on in web project configuration.
 - Prediction Markets. [How to run](docs/PredictionMarket.md)
 - Pools. [How to run](docs/Pools.md)
 - Insurance Product. [How to run](docs/InsuranceProduct.md)

Full framework is composed from these parts:
 - [Vue.js] Web (this repository)
 - [Solidity] [Contracts](https://github.com/AigangNetwork/aigang-contracts)
 - [C#] [Insurance] [API](https://github.com/AigangNetwork/aigang-api)
 - [C#] [Insurance] [Contracts Executor API](https://github.com/AigangNetwork/aigang-contracts-executor-public)
 - [C#] [Insurance] [Policies listener service](https://github.com/AigangNetwork/aigang-policies-listener-public)

All architecture:
![Architecture](docs/images/Architecture.png?raw=true "Architecture")


# Development

Recommended IDE:

- Visual Studio Code for Web project and solidity  
- Jet Brains Rider or Visual studio for c# projects  
  
- Clone or download project to your machine
- Update configuration file in destination */build/config/*  
  - *dev.env.js* - for development environment  
  - *qa.env.js* - for qa environment  
  - *production.env.js* - for production environment  
- build project:  

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev - use qa environment api
npm run localdev - use local api
npm run windowsdev - use qa environment api for windows environment users
npm run windowslocaldev - use local environment api for windows environment users

# build for production with minification
npm run build - production configuration
npm run qabuild - qa configuration

# build for production and view the bundle analyzer report
npm run build --report
```
## Environments
**Production**

WEB (production branch) - [https://aigang.network](https://aigang.network)  
API (production branch) - [https://api.aigang.network/swagger](https://api.aigang.network/swagger)

**QA**  

WEB (qa branch) - [https://testplatform.aigang.network](https://testplatform.aigang.network)  
API (qa branch) - [https://testapi.aigang.network/swagger](https://testapi.aigang.network/swagger)  

## Backlog
Our github backlog can be found [here](https://github.com/AigangNetwork/aigang-platform-web/projects/1)


## Contributing

Everyone is welcome to contribute this repository, just make sure your code does not have validation issues and builds without errors. Create your feature branch and send us pull request to master branch.
