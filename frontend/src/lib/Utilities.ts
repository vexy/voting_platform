import MetamaskOnboarding from '@metamask/onboarding';
import { BigNumber, ethers } from "ethers";
import  MainPlatform from '../MainPlatform.json';
import { QuestionInfo } from './Models'
import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';

class ContractUtilities {
    private mmOnboarder!: MetamaskOnboarding;
    private platformContract!: ethers.Contract;
    public signer?: ethers.providers.JsonRpcSigner;

    constructor() {
        //Add what's needed...
        console.log("Contract works initialized.");
    }

    // begins Metamask onboarding
    beginMetamaskOnboarding(): void {
        this.mmOnboarder = new MetamaskOnboarding();
        this.mmOnboarder.startOnboarding();
    }

    // MetaMask requires requesting permission to connect users accounts
    async connectToMetamask(): Promise<boolean> {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const response =  await _provider.send("eth_requestAccounts", []);
        if (response) {
            if(response.code != 4001) {
                this.signer = _provider.getSigner();
                this.platformContract = new ethers.Contract(PUBLIC_CONTRACT_ADDRESS, MainPlatform.abi, this.signer);

                console.log("Platform contract prepared for Metamask usage");
                return Promise.resolve(true);
            } else {
                alert(response.message); //user rejected the request
                //fallback to rejecting the promise
            }
        }

        return Promise.reject();
    }

    public connectLocally() {
        const _provider = new ethers.providers.JsonRpcProvider();
        this.signer = _provider.getSigner();
        this.platformContract = new ethers.Contract(PUBLIC_CONTRACT_ADDRESS, MainPlatform.abi, this.signer);
        console.log("PlatformContract created using LOCAL BC provider");
    }

    private extractNumber(_bigNumber: BigNumber): number {
        return ethers.BigNumber.from(_bigNumber).toNumber();
    }

    // PLATFORM API IMP

    async totalUsers(): Promise<number> {
        //TODO add try catch here
        const totalQ = await this.platformContract.totalUsers();
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
        const balanceBN = await this.platformContract.userBalance(_sgnr);
        return Promise.resolve(this.extractNumber(balanceBN));
    }

    async addNewQuestion(questionTitle: string, labels: string[]): Promise<boolean> {
        try {
            await this.platformContract.addQuestion(questionTitle, labels);
            console.log("New question successfuly added !");
            return Promise.resolve(true);
        } catch(err) {
            console.log("Creating new question errored. Reason:");
            console.log(err);
            return Promise.reject(false);
        }
    }

    async getAllQuestions(): Promise<(QuestionInfo[])> {
        const returnSet: QuestionInfo[] = [];
        const qInfoSet = await this.platformContract.getPlatformQuestions();
        // console.log(qInfoSet);
        // const questionInfoArray = response[0];
        for(const qInfo of qInfoSet) {
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
        try {
            await this.platformContract.extraVote(questionID, extraScore);
        } catch (e) {
            console.log("Error during providing extra options");
        }
    }

    async questionsCount(): Promise<number> {
        const response = await this.platformContract.totalQuestions();
        return Promise.resolve(this.extractNumber(response));
    }

    async isRegisteredUser(): Promise<boolean> {
        const response = await this.platformContract.isRegisteredUser();
        if(response) { return Promise.resolve(true); }
        else { return Promise.reject(false); }
    }
}

// setup shared service
const Utilities = new ContractUtilities();
export default Utilities;