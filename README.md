# Simple Voting platform
This repo represents basic blockchain based voting platform, based on smart-contracts written in `Solidity` and client side written in `JavaScript`. Simple companion website was made using `SvelteKit`.

Check the current progress of the [project](https://github.com/vexy/simple_voting/projects/1) or report and [issue](https://github.com/vexy/simple_voting/issues) if you run into trouble.

_PLEASE NOTE: **PROJECT IS STILL IN HEAVY DEVELOPMENT**_

## Main feature-set
Voting platform supports following features:
  - Obtaining voting token from the platform (_aka Minting_)
  - Browsing the list of available polls
    - preview poll details (_aka **Browsing**_)
    - preview closed/expired polls (_TBD_)
    - report inapropriate polls (_aka **Reporting**_)
  - Selecting poll answer (_aka **Voting**_)
  - Posting new poll (_aka **Creating Poll**_)

### Prerequisities
In order to fully run this platform, following is a list of pre-requisities:
1. node/npm (node `v16.15` / npm `v8.5.5`)
2. [hardhat](https://hardhat.org/getting-started/#installation) `v2.9.7`
3. [MetaMask](https://metamask.io/) wallet or (browser extension [chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en))
(_right now only Metamask is supported, more wallets comming soon_)

After installing hardhat, make sure the following libraries are installed:
```
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

Finally, you can check if everything works well by typing:
```
npx hardhat compile
```

Checkout open [issues](https://github.com/vexy/simple_voting/issues) or open another one if you run into trouble.

## Deployment info
> _Currently, **only** test-nets are supported. TBD_

Deployment is performed using [Hardhat CLI](https://hardhat.org/).  

In order to run local test, first setup local development network of your choice (_will work with Truffle suite soon_).

```
npx hardhat compile
npx hardhat test

# deploy to local network
npx hardhat --network localhost scripts/migration.js
```

Check the [`/scripts`](/scripts/) folder for more information.

> _Main-net **deployment comming soon**_

# Platform structure
> Contracts is _WIP_. Following structure may change in future.

```mermaid
flowchart LR
    subgraph wallet
    o((address))
    end

    subgraph contract
    name
    description
    exipry
    subgraph options
    direction TB
    option_1--xoption_2
    option_2--xoption_3
    option_3
    end
    end

    wallet((wallet))-->|interacts|contract
    contract-->|deployed on|B(blockchains)
```

# Contributing guide
PRs and any sort of contribution is **more than welcome**. Just check the [project board](https://github.com/vexy/simple_voting/projects/1) and help yourself with a nice little task suited to your needs :)  

**!! THANK YOU IN ADVANCE !!**

---
Copyright (C) 2022 [Vexy](https://github.com/vexy)  
<a href="https://stackexchange.com/users/215166">
  <img src="https://stackexchange.com/users/flair/215166.png?theme=clean" width="208" height="58" alt="profile for Vexy on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Vexy on Stack Exchange, a network of free, community-driven Q&amp;A sites">
</a><br>
**PGP**: `6302D860 B74CBD34 6482DBA2 518766D0 8213DBC0`
