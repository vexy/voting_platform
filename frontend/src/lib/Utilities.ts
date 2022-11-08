import MetamaskOnboarding from '@metamask/onboarding';
import { BigNumber, ethers } from "ethers";
import  MainPlatform from '../MainPlatform.json';
import { Question, QuestionInfo } from './Models'

export class Utilities {
    private mmOnboarder!: MetamaskOnboarding;
    private platformContract!: ethers.Contract;
    private signer?: ethers.providers.JsonRpcSigner;
    //
    private readonly contractAddress: string;

    constructor() {
        //TODO: Exchange with main-net addr
        //TODO: READ from env or smlr
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
        console.log("Executing totalUsers()...");
        const totalQ = await this.platformContract.totalUsers();
        ethers.logger.info(totalQ);
        return Promise.resolve(this.extractNumber(totalQ));
    }

    /// Returns true if user successfully registrers
    async registerNewUser(): Promise<boolean> {
        console.log("Registering new user...");
        try {
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
            console.log("New question added, raw ID: ", response.value);
            return Promise.resolve(true);
        } catch(err) {
            console.log("AddQuestion: Error happened.");
            console.log(err);
            return Promise.reject(false);
        }
    }

    async getAllQuestions(): Promise<(QuestionInfo[])> {
        const returnSet: QuestionInfo[] = [];
        const qInfoSet = await this.platformContract.getPlatformQuestions();
        // console.log(qInfoSet);
        // const questionInfoArray = response[0];
        for(let qInfo of qInfoSet) {
            returnSet.push(new QuestionInfo(
                this.extractNumber(qInfo.id),
                qInfo.owner,
                qInfo.title,
                qInfo.labels,
                qInfo.scores,
                qInfo.extras,
                this.extractNumber(qInfo.totalVoters),
                qInfo.hasVoted
            ));
        }

        return Promise.resolve(returnSet);
    }

    async getQuestionInfo(id: number): Promise<QuestionInfo> {
        console.log("Getting question info, ID:", id);
        const qInfo = await this.platformContract.getQuestionInfo(id);
        return Promise.resolve(qInfo);
    }

    async vote(questionID: number, score: number): Promise<boolean> {
        console.log(`Voting for ${questionID}, score: ${score}`);
        try {
            await this.platformContract.vote(questionID, score);
            return Promise.resolve(true);
        } catch (e) {
            // console.log("Error occured: ", e.reason);
            return Promise.reject(false);
        }
    }

    async provideExtra(questionID: number, extraScore: number) {
        // const response = await this.platformContract.TODO
        // complete this
        console.log("Will arive soon !");
    }

    async questionsCount(): Promise<number> {
        const response = await this.platformContract.totalQuestions();
        return Promise.resolve(this.extractNumber(response));
    }
}