import { BigNumber, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import MetamaskOnboarding from '@metamask/onboarding';
import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
import  MainPlatform from '../MainPlatform.json';
import { hasMetamaskProvider } from "$lib/UtilsStore";

class Provider {
    private signer?: ethers.providers.JsonRpcSigner;
    private hasConnected: boolean

    constructor() {
        this.signer = undefined;
        this.hasConnected = false;
    }

    // MetaMask requires requesting permission to connect users accounts
    public async connectToMetamask(): Promise<ethers.Contract> {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const response = await _provider.send("eth_requestAccounts", []);
        if (response) {
            if(response.code != 4001) {
                this.signer = _provider.getSigner();
                const contract = new ethers.Contract(PUBLIC_CONTRACT_ADDRESS, MainPlatform.abi, this.signer);
                this.hasConnected = true;
                console.log("Connected to Metamask provider. Contract initialized.");
                // console.log(await this.signer.getAddress());
                return Promise.resolve(contract);
            } else {
                console.log(response.message); //user rejected the request
                //fallback to rejecting the promise
            }
        }

        this.hasConnected = false;
        return Promise.reject();
    }

    public connectLocally(): ethers.Contract {
        const _provider = new ethers.providers.JsonRpcProvider();
        this.signer = _provider.getSigner();
        const contract = new ethers.Contract(PUBLIC_CONTRACT_ADDRESS, MainPlatform.abi, this.signer);
        this.hasConnected = true;
        console.log("Connected to localhost (JSONRPC) provider. Contract initialized.");
        return contract;
    }

    public disconnect(): void {
        this.hasConnected = false;
    }

    public isConnected(): boolean {
        return this.hasConnected;
    }

    public async nativeBalance(): Promise<number> {
        //check only if we're connected with Metamask
        if(this.hasConnected) {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _address = await _provider.getSigner().getAddress();
            const balanceBN = await _provider.getBalance(_address);
            console.log("Native balance: ", balanceBN);
            const balance = ethers.BigNumber.from(balanceBN).toNumber();
            return Promise.resolve(balance);
        }
        // reject by default
        return Promise.reject();
    }

    public async signerAddress(): Promise<string> {
        if(this.signer) {
            return await this.signer.getAddress();
        } else {
            return "N/A";
        }
    }

    // STATIC METHODS
    static beginMetamaskOnboarding() {
        const onboarder = new MetamaskOnboarding();
        onboarder.startOnboarding();
    }

    static async hasMetamaskProvider() {
        const response = await detectEthereumProvider();
        if (response) { 
            hasMetamaskProvider.set(true);
            return true
        } else {
            hasMetamaskProvider.set(false);
            return false
        }
    }
}

export default Provider;