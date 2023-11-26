## Prerequisities
In order to fully run this platform, following is a list of pre-requisities:
1. node/npm (node `v16.15` / npm `v8.5.5`)
2. `Solidity 0.8.*` (_check configs for exact versioning... may change in future_)
3. [hardhat](https://hardhat.org/getting-started/#installation) `v2.11.2`
4. [MetaMask](https://metamask.io/) wallet (or [Chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) (_right now only `MetaMask` wallets are supported_)
5. `MATIC` test token obtained from [Polygon faucet](https://faucet.polygon.technology/)
6. MetaMask configured to `Mumbai` test-net

MetaMask configuration: https://wiki.polygon.technology/docs/develop/metamask/config-polygon-on-metamask#add-the-polygon-network-manually  

Make sure that each step is taken care of as missing items may cause unexpected issues or failure to compile and build the platform.

## Additional dependencies
After `hardhat` has been installed, make sure the following libraries are installed:
```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Finally, you can check if everything works well by typing:

Checkout open [issues](https://github.com/vexy/simple_voting/issues) or open another one if you run into trouble.

### Main net deployment info
To easily deploy to `polygon` network, use the following command:
```
npx hardhat run scripts/deploy.ts --network polygon    # may change in future
```

> _Main-net deployment details will be published soon..._

### TestNet deployment info
So far `MainPlatform` contract has been deployed to the following:
|Network name|Deployment parameter|Contract address|
|-|-|-|
|Polygon Mumbai (Polygonscan)|`--network polygon-mumbai`|`0x8FF5f9Fa43bb9201902E091902Df80BC1b1EAFe4` and `0x0D9abe98233ECaAC3a2f0E3a229dc9268825FC54`|
|Polygon Mymbai (Alchemy)|`--network alchemy_polygon_mumbai`|`0x922242c7124752B620b5E87D7c19A93CfD3C22dC`|

MumbaiFaucet (Alchemy): https://mumbaifaucet.com/

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