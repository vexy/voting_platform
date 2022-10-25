## Prerequisities
In order to fully run this platform, following is a list of pre-requisities:
1. node/npm (node `v16.15` / npm `v8.5.5`)
2. `Solidity 0.8.*` (_check configs for exact versioning... may change in future_)
3. [hardhat](https://hardhat.org/getting-started/#installation) `v2.11.2`
4. [MetaMask](https://metamask.io/) wallet (or [Chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) (_right now only `MetaMask` wallets are supported_)
5. `MATIC` test token obtained from [Polygon faucet](https://faucet.polygon.technology/)
6. MetaMask configured to `Mumbai` test-net

Make sure that each step is taken care of as missing items may cause unexpected issues or failure to compile and build the platform.

--- 
## Deploying web platform
To build the fronted:
```bash
npm run build #wait to complete...
```

To build the fronted locally:
```bash
npm run dev #wait to complete...
```

## Deploying contracts

After installing hardhat, make sure the following libraries are installed:
```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Finally, you can check if everything works well by typing:
```
npx hardhat compile
npx hardhat deploy --network polygon    # may change in future
```

> **NOTE**: Final deployment is in progress. Expect changes to this procedure.

Checkout open [issues](https://github.com/vexy/simple_voting/issues) or open another one if you run into trouble.

### Main net deployment info
Check the [`/scripts`](/scripts/) folder for more nerdy information.

> _Main-net **deployment comming soon**_

### TestNet deployment info
**Valid address** is needed to sign deployment of the contracts.  

Test-net configuration parameters

|Parameter|Value|
|-|-|
|NetworkName|`Mumbai`|
|ChainID|`80001`|
|Token|`MATIC`|
|RPC|`https://rpc-mumbai.matic.today`|
|TestNet polygonscan|https://mumbai.polygonscan.com/|
|Network Details|https://wiki.polygon.technology/docs/develop/network-details/network/|

## Deployment testing
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

(_ADD FRONTEND tests - or local deployment procedure_)