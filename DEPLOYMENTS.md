## Prerequisities
In order to fully run this platform, following is a list of pre-requisities:
1. node/npm (node `v16.15` / npm `v8.5.5`)
2. `Solidity 0.8.*` (_check configs for exact versioning... may change in future_)
3. [hardhat](https://hardhat.org/getting-started/#installation) `v2.11.2`
4. [MetaMask](https://metamask.io/) wallet (or [Chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) (_right now only `MetaMask` wallets are supported_)
5. `MATIC` test token obtained from [Polygon faucet](https://faucet.polygon.technology/)
6. MetaMask configured to `Mumbai` test-net

MetaMask configuration: https://wiki.polygon.technology/docs/develop/metamask/config-polygon-on-metamask#add-the-polygon-network-manually  
MumbaiFaucet (Alchemy): https://mumbaifaucet.com/

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
npx hardhat run scripts/deploy.ts --network polygon    # may change in future
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
|RPC|`https://matic-mumbai.chainstacklabs.com`|
|TestNet polygonscan|https://mumbai.polygonscan.com/|
|Network Details|https://wiki.polygon.technology/docs/develop/network-details/network/|
|MetaMask configuration| _scroll to the bottom of the page and spot "Add Mumbai Network"_. URL: https://matic-mumbai.chainstacklabs.com|

## Deployment testing
(_ADD HARDHAT test-deploy task_)
Before deploying to the main-net, make sure you've `compiled` and `tested` entire contract suite.
```
npx hardhat compile
npx hardhat test

# wait to complete...
```

Then, perform deployment to local network by spawning a local node, like this:
```
npx hardhat node

# from another CLI
npx hardhat run scripts/deploy.js --network localhost
npx hardhat test --network localhost
```

After the test suite completes without errors, you can proceed with `main-net` deployment.

(_ADD FRONTEND tests - or local deployment procedure_)