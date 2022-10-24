import MetamaskOnboarding from '@metamask/onboarding';
import { ethers } from "ethers";

export class Utilities {
    constructor() {
        //
    }

    // begins Metamask onboarding
    beginMetamaskOnboarding(): void {
        const mmOnboarding = new MetamaskOnboarding();
        mmOnboarding.startOnboarding();
    }

    // MetaMask requires requesting permission to connect users accounts
    async connectWallet() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const allAccounts = provider.send("eth_requestAccounts", []);
        allAccounts.then((response) => {
            if(response.code != 4001) { //user rejected the request
                console.log('Provider data');
                console.log('Network name: ', provider._network.name);
                console.log('ChainID: ', provider._network.chainId);
            } else {
                alert(response.message);
            }
        }).catch((err) => {
            console.log("User canceled the process.");
            console.log(err);
        });
    }
}