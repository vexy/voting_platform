import MetamaskOnboarding from '@metamask/onboarding';
import { BigNumber, ethers } from "ethers";
import  MainPlatform from "../MainPlatform.json";

export class Utilities {
    private mmOnboarder!: MetamaskOnboarding;
    private platformContract!: ethers.Contract;
    private signer?: ethers.providers.JsonRpcSigner;
    //
    private readonly contractAddress: string;
    //TODO: Exchange with main-net addr
    //TODO: READ from env or smlr

    constructor() {
        this.contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        //
        this.connectLocally();
    }

    // begins Metamask onboarding
    beginMetamaskOnboarding(): void {
        this.mmOnboarder = new MetamaskOnboarding();
        this.mmOnboarder.startOnboarding();
    }

    // MetaMask requires requesting permission to connect users accounts
    async connectWallet() {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        _provider.send("eth_requestAccounts", [])
            .then((response) => {
                if(response.code != 4001) {
                    this.signer = _provider.getSigner();
                    this.platformContract = new ethers.Contract(this.contractAddress, MainPlatform.abi, this.signer);
                    console.log("Platform contract prepared for Metamask usage");
                } else {
                    alert(response.message); //user rejected the request
                }
            }).catch((err) => {
                console.log("ERROR OCCURED\n", err);
            });
    }

    private connectLocally() {
        const _provider = new ethers.providers.JsonRpcProvider();
        this.signer = _provider.getSigner();
        this.platformContract = new ethers.Contract(this.contractAddress, MainPlatform.abi, this.signer);
        console.log("Platform contract prepared with local node provider.");
    }

    private extractNumber(_bigNumber: BigNumber): number {
        return ethers.BigNumber.from(_bigNumber).toNumber();
    }

    // PLATFORM API IMP

    async totalUsers(): Promise<number> {
        ethers.logger.info("Executing totalUsers()...");
        const totalQ = await this.platformContract.totalUsers();
        ethers.logger.debug(totalQ);
        return Promise.resolve(this.extractNumber(totalQ));
    }

    /// Returns true if user successfully registrers
    async registerNewUser(): Promise<boolean> {
        try {
            ethers.logger.info("Registering...");
            await this.platformContract.register();
            return Promise.resolve(true);
        } catch (err) {
            ethers.logger.info("Error during registration. Reason: \n");
            ethers.logger.info(err);
            return Promise.reject(err);
        }
    }

    async getUserBalance(): Promise<number> {
        const _sgnr = await this.signer?.getAddress();
        ethers.logger.info("Executing balance request with: ", _sgnr);
        const balanceBN = await this.platformContract.userBalance(_sgnr);
        return Promise.resolve(this.extractNumber(balanceBN));
    }

    async addNewQuestion(questionTitle: string, labels: string[]): Promise<boolean> {
        try {
            const response = await this.platformContract.addQuestion(questionTitle, labels);
            console.log("*BCResponse*");
            console.log(response);
            return Promise.resolve(true);
        } catch(err) {
            console.log("AddQuestion: Error happened.");
            console.log(err);
            return Promise.reject(false);
        }
    }

    async getAllQuestions() {
        const qFrameArray = await this.platformContract.getAllQuestions();
        ethers.logger.info("All questions: ");        
        for(const question of qFrameArray) {
            // const _title = await question.getTitle();
            ethers.logger.info(question);
            // ethers.logger.info(_title);
        }
    }

    async vote(questionID: number, score: number): Promise<number> {
        const response = await this.platformContract.vote(questionID, score);
        ethers.logger.info(`Voted for qID = ${questionID}`);
        ethers.logger.info(response);
        //
        const questionScore = await this.platformContract.scoresFor(questionID);
        ethers.logger.info(questionScore);
        return Promise.resolve(questionScore);
    }
}