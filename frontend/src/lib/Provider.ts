import detectEthereumProvider from "@metamask/detect-provider";
import MetamaskOnboarding from '@metamask/onboarding';
import { ethers } from "ethers";
import { PlatformStore } from "$lib/UtilsStore";

// ENV DEFINITIONS
import { 
    PUBLIC_CONTRACT_ADDRESS,
    PUBLIC_CHAIN_ID,
    PUBLIC_CHAIN_NAME,
    PUBLIC_RPC_URL,
    PUBLIC_EXPLORER,
    PUBLIC_SYMBOL,
    PUBLIC_DECIMALS,
    PUBLIC_FAUCET
} from '$env/static/public';

// Static class used to perform basic provider tasks
class ProviderCommons {
    // Mumbai network parameters
    static mumbaiNetworkParams = {
        chainId: PUBLIC_CHAIN_ID,  //PUBLIC_CHAIN_ID,
        chainName: PUBLIC_CHAIN_NAME,
        rpcUrls: [PUBLIC_RPC_URL],
        blockExplorerUrls: [PUBLIC_EXPLORER],

        nativeCurrency: {
            name: PUBLIC_SYMBOL,
            symbol: PUBLIC_SYMBOL,
            decimals: PUBLIC_DECIMALS,
        },
    };

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

    static async configureMumbaiNetwork(): Promise<boolean> {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ProviderCommons.mumbaiNetworkParams.chainId }],
            });

            console.log("Switched to Mumbai network.");
            return Promise.resolve(true);
        } catch (switchError) {
            // check if we have no Mumbai network ?
            if(switchError.code === 4902 ) {
                const awaitResponse = await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [ ProviderCommons.mumbaiNetworkParams ]
                });

                if(awaitResponse === null) {
                    console.log("Mumbai network added and switched.");
                    return Promise.resolve(true);
                }
                // add Mumbai failed here...
            }
            // in any other case, just fallback and reject the promise
            // console.log("Add network original error: ", switchError);
        }

        return Promise.reject(false);
    }

    static async getTestMATIC() {
        window.open(PUBLIC_FAUCET, '_blank', 'noreferrer');
    }
}

export { ProviderCommons };

//--
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

                // console.log("<Provider> Connected to Metamask provider, store updated...");
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