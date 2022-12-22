import detectEthereumProvider from "@metamask/detect-provider";
import MetamaskOnboarding from '@metamask/onboarding';
import { ethers } from "ethers";
import { PlatformStore } from "$lib/UtilsStore";

// Static class used to perform basic provider tasks
class ProviderCommons {
    static beginMetamaskOnboarding() {
        const onboarder = new MetamaskOnboarding();
        onboarder.startOnboarding();
    }

    static async startMetamaskCheck() {
        const response = await detectEthereumProvider();
        if (response) {
            PlatformStore.metamaskDetected(true);
        } else {
            PlatformStore.metamaskDetected(false);
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
        console.log("<Provider> ProviderServices initialized.");
    }

    // MetaMask requires requesting permission to connect users accounts
    public async connectToMetamask(): Promise<boolean> {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const response = await _provider.send("eth_requestAccounts", []);
        if (response) {
            if(response.code != 4001) {
                this.signer = _provider.getSigner();
                PlatformStore.metamaskDetected(true);
                PlatformStore.connect(true);

                console.log("<Provider> Connected to Metamask provider, store updated...");
                return Promise.resolve(true);
            } else {
                PlatformStore.connect(true);
                console.log("<Provider> Error occured during Metamask connection. Reason: ");
                console.log(response.message); //user rejected the request
            }
        }

        return Promise.reject();
    }

    public connectLocally() {
        const _provider = new ethers.providers.JsonRpcProvider();
        this.signer = _provider.getSigner();
        PlatformStore.connect(true);
        console.log("<Provider> Connected to localhost (JSONRPC) provider, state updated...");
    }

    public disconnect(): void {
        PlatformStore.connect(false);
    }

    // public isConnected(): boolean {
    //     // signer object will be something if there's a connection
    //     return this.signer !== undefined;
    // }

    public fabricateContract(): ethers.Contract {
        if(this.signer === undefined) { throw new Error("SignerDoesNotExist"); }
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