import { BigNumber, ethers } from "ethers";
import { QuestionInfo } from './Models'
import Provider from "./Provider";
import { isProviderConnected, isRegisteredUser } from "$lib/UtilsStore";

class ContractUtilities {
    private platformContract!: ethers.Contract;
    private bcProvider: Provider;

    constructor() {
        this.bcProvider = new Provider();
        isProviderConnected.set(false);
        isRegisteredUser.set(false);
        console.log("Contract works initialized, no default provider yet.");
    }

    /// Tries to connect to MetaMask provider
    public async connect(): Promise<boolean> {
        try {
            // try to initialize the contract
            this.platformContract = await this.bcProvider.connectToMetamask();
            isProviderConnected.set(true);
            return Promise.resolve(true);
        } catch (e) {
            console.log("Error during MetamaskConnection.");
            console.log(e);
            isProviderConnected.set(false);
            return Promise.reject(false);
        }
    }

    public disconnect() {
        this.bcProvider.disconnect();
        isProviderConnected.set(false);
    }

    public connectLocally() {
        // try to initialize the contract using localhost provider
        this.platformContract = this.bcProvider.connectLocally();
        isProviderConnected.set(true);
    }

    public hasProviderConnected(): boolean {
        return this.bcProvider.isConnected();
    }

    public async nativeTokenBalance(): Promise<number> {
        return this.bcProvider.nativeBalance();
    }

    public async signerAddress(): Promise<string> {
        return await this.bcProvider.signerAddress();
    }

//  --- PRIVATE HELPERS
    private extractNumber(_bigNumber: BigNumber): number {
        return ethers.BigNumber.from(_bigNumber).toNumber();
    }

//  --- PLATFORM API IMP
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
            isRegisteredUser.set(true);
            return Promise.resolve(true);
        } catch (err) {
            ethers.logger.info("Error during registration. Reason: \n");
            ethers.logger.info(err);
            isRegisteredUser.set(false);
            return Promise.reject(err);
        }
    }

    async getUserBalance(): Promise<number> {
        const _address = this.bcProvider.signerAddress();
        const balanceBN = await this.platformContract.userBalance(_address);
        return Promise.resolve(this.extractNumber(balanceBN));
    }

    async addNewQuestion(questionTitle: string, labels: string[]): Promise<boolean> {
        try {
            await this.platformContract.addQuestion(questionTitle, labels);
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
        return Promise.reject(false);
    }
}

// setup shared service
const Utilities = new ContractUtilities();
export default Utilities;