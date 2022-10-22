_PLEASE NOTE: **PROJECT IS IN ACTIVE DEVELOPMENT**_  

# Simple Voting platform
This is an example of blockchain based voting platform consisting of following components:
  - `Solidity` based smart-contracts
  - user facing side, written in `TypeScript/JavaScript` using `SvelteKit`.

|Component|Version|
|-|-|
|`contracts`|`0.6 test-net`|
|`frontend`|`0.0.2`|

[![wakatime](https://wakatime.com/badge/github/vexy/simple_voting.svg)](https://wakatime.com/badge/github/vexy/simple_voting?style=for-the-badge)

> _Follow the progress on [project board](https://github.com/vexy/simple_voting/projects/1) or report an [issue](https://github.com/vexy/simple_voting/issues) if you run into trouble_  

## Feature set
Following is the set of supported features:
  - easy setup and self hosting
  - free user registration
  - free content posting
  - browsing the list of platform content
    - preview content details
    - report inapropriate content
  - vote for specific options

### Prerequisities
In order to fully run this platform, following is a list of pre-requisities:
1. node/npm (node `v16.15` / npm `v8.5.5`)
2. `Solidity 0.8.*` (_check configs for exact versioning... may change in future_)
3. [hardhat](https://hardhat.org/getting-started/#installation) `v2.11.2`
4. [MetaMask](https://metamask.io/) wallet (or [Chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)) (_right now only `MetaMask` wallets are supported_)
5. `MATIC` test token obtained from [Polygon faucet](https://faucet.polygon.technology/)
6. MetaMask configured to `Mumbai` test-net

After installing hardhat, make sure the following libraries are installed:
```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Finally, you can check if everything works well by typing:
```
npx hardhat compile
```

Checkout open [issues](https://github.com/vexy/simple_voting/issues) or open another one if you run into trouble.

## Deployment info
Checkout [deployment details](DEPLOYMENTS.md) for more instructions.

# Contributing guide
PRs and any sort of contribution is **more than welcome**. 🙌  
Just check the [project board](https://github.com/vexy/simple_voting/projects/1) and help yourself with a nice little task suited to your needs :)  

> **!! THANK YOU IN ADVANCE !!**

---  

<div align="center">
  <a href="https://stackexchange.com/users/215166">
    <img src="https://stackexchange.com/users/flair/215166.png?theme=clean" width="208" height="58" alt="Profile for Vexy on Stack Exchange" title="profile for Vexy on Stack Exchange, a network of free, community-driven Q&amp;A sites">
  </a>
  <br>
  <code>PGP: 6302D860 B74CBD34 6482DBA2 518766D0 8213DBC0</code>
  <br>
  <div>Copyright (C) 2022 <a href="https://github.com/vexy">Vexy</a></div>
</div>
