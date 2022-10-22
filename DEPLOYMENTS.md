## Deploying web platform
To build the fronted:
```bash
npm run build #wait to complete...
```

## Deploying contracts

### Main net deployment info

> _Main-net **deployment comming soon**_

### TestNet deployment info
NetworkName: `Mumbai`  
ChainID: `80001`  
Token: `MATIC`
RPC: `https://rpc-mumbai.matic.today`

TestNet polygonscan: https://mumbai.polygonscan.com/  
Network Details: https://wiki.polygon.technology/docs/develop/network-details/network/

Valid address is needed to sign deployment of the contracts.

### Deployment testing
(_ADD HARDHAT test-deploy task_)
Execute the following to perform entire contract testing suite.
```
npx hardhat compile
npx hardhat test
```

Then, perform deployment to local network (spawn a node)
```
# deploy to local network to perform testing
npx hardhat node   #check docs
npx hardhat --network localhost scripts/migration.js
npx hardhat test --network localhost
```

Check the [`/scripts`](/scripts/) folder for more nerdy information.