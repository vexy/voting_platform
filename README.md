# Simple Voting system
This repo contains source code for very simple online voting system.
It is based on smart-contracts written in `Solidity` and a frontent side written with `SvelteKit`.
  
_ENJOY !!_

## Contract features
Following features are supported:
  - [ ] creating new pool (_Minting a poll_)
    - poll name
    - description
    - poll options
        - up to 5 options (_string based_)
    - expiry date
  - [ ] preview poll details (_aka **Browsing**_)
  - [ ] selecting poll answer (_aka **Voting**_)
  - [ ] listing all polls
  - [ ] report/flag poll (_aka **Reporting Process**_)

### Voting
_Describe voting procedure here_

### Reporting a poll

## Structure
> Contracts structure: _WIP_
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

## Deployment info
Deployment is performed with [Truffle](https://trufflesuite.com/) CLI.

> _Currently, **only** test-nets are supported._  
_TBD_

---
Created by [Vexy](https://github.com/vexy). Copyright (c) 2022  
PGP: `6302D860 B74CBD34 6482DBA2 518766D0 8213DBC0`
