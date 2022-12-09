import detectEthereumProvider from "@metamask/detect-provider";
import MetamaskOnboarding from '@metamask/onboarding';
import { ethers } from "ethers";
import { hasMetamaskProvider, isProviderConnected } from "$lib/UtilsStore";

// Static class used to perform basic provider tasks
class ProviderCommons {
    static beginMetamaskOnboarding() {
        const onboarder = new MetamaskOnboarding();
        onboarder.startOnboarding();
    }

    static async startMetamaskCheck() {
        const response = await detectEthereumProvider();
        if (response) { 
            hasMetamaskProvider.set(true);
        } else {
            hasMetamaskProvider.set(false);
        }
    }
}

export { ProviderCommons };

//--
import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
import  MainPlatform from '../MainPlatform.json';

class ProviderServices {
    private signer?: ethers.providers.JsonRpcSigner;

    constructor() {
        this.signer = undefined;
        console.log("ProviderServices initialized.");
    }

    // MetaMask requires requesting permission to connect users accounts
    public async connectToMetamask(): Promise<boolean> {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const response = await _provider.send("eth_requestAccounts", []);
        if (response) {
            if(response.code != 4001) {
                this.signer = _provider.getSigner();
                hasMetamaskProvider.set(true);  //indirectly
                isProviderConnected.set(true);
                console.log("Connected to Metamask provider, state updated...");
                return Promise.resolve(true);
            } else {
                isProviderConnected.set(false);
                console.log("Error occured during Metamask connection. Reason: ");
                console.log(response.message); //user rejected the request
            }
        }

        return Promise.reject();
    }

    public connectLocally() {
        const _provider = new ethers.providers.JsonRpcProvider();
        this.signer = _provider.getSigner();
        isProviderConnected.set(true);
        console.log("Connected to localhost (JSONRPC) provider, state updated...");
    }

    public disconnect(): void {
        isProviderConnected.set(false);
    }

    public isConnected(): boolean {
        // signer object will be something else if there's a connection
        return this.signer !== undefined;
    }

    public fabricateContract(): ethers.Contract {
        return new ethers.Contract(PUBLIC_CONTRACT_ADDRESS, MainPlatform.abi, this.signer);
    }

    public async signerAddress(): Promise<string> {
        if(this.signer) {
            return await this.signer.getAddress();
        } else {
            return "N/A";
        }
    }
}

// initialize as shared singleton
const Provider = new ProviderServices();
export { Provider };