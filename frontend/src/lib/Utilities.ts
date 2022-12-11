import { BigNumber, ethers } from "ethers";
import { QuestionInfo } from './Models'
import { Provider } from "./Provider";
import { isRegisteredUser } from "$lib/UtilsStore";

class PlatformContract {
    private platformContract!: ethers.Contract;

    constructor() {
        console.log("PlatformContract initialized");
        this.prepareContract();
    }

//  --- PRIVATE HELPERS
    private extractNumber(_bigNumber: BigNumber): number {
        return ethers.BigNumber.from(_bigNumber).toNumber();
    }

    private prepareContract() {
        // make sure we're connected
        if(Provider.isConnected()) {
            this.platformContract = Provider.fabricateContract();
        }
    }

//  --- PLATFORM API IMP
    async totalUsers(): Promise<number> {
        this.prepareContract();
        try {
            const resultBN = await this.platformContract.totalUsers();
            const totalU = this.extractNumber(resultBN);
            return Promise.resolve(totalU);
        } catch (err) {
            console.log("Errored: ", err);
        }
        return Promise.reject();
    }

    async questionsCount(): Promise<number> {
        this.prepareContract();
        try {
            const response = await this.platformContract.totalQuestions();
            const totalQ = this.extractNumber(response);
            return Promise.resolve(totalQ);
        } catch (err) {
            console.log("Errored: ", err);
        }
        return Promise.reject();
    }

    async getUserBalance(): Promise<number> {
        this.prepareContract();
        try {
            const _address = Provider.signerAddress();
            const balanceBN = await this.platformContract.userBalance(_address);
            const balance = this.extractNumber(balanceBN);
            return Promise.resolve(balance);
        } catch (err) {
            console.log("Errored: ", err);
        }
        return Promise.reject();
    }

    async isRegisteredUser(): Promise<boolean> {
        this.prepareContract();

        const response = await this.platformContract.isRegisteredUser();
        return Promise.resolve(response);
    }

    /// Returns true if user successfully registrers
    async registerNewUser(): Promise<boolean> {
        this.prepareContract();
        try {
            console.log("Registering new user...");
            await this.platformContract.register();
            isRegisteredUser.set(true);
            return Promise.resolve(true);
        } catch (err) {
            ethers.logger.info("Error during registration. Reason: \n");
            ethers.logger.info(err);
            isRegisteredUser.set(false);
        }
        return Promise.reject(false);
    }

    async addNewQuestion(questionTitle: string, labels: string[]): Promise<boolean> {
        this.prepareContract();
        try {
            await this.platformContract.addQuestion(questionTitle, labels);
            return Promise.resolve(true);
        } catch (err) {
            console.log("Creating new question errored. Reason:");
            console.log(err);
        }

        return Promise.reject(false);
    }

    async getAllQuestions(): Promise<(QuestionInfo[])> {
        this.prepareContract();
        const returnSet: QuestionInfo[] = [];

        try {
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
        } catch (err) {
            console.log("Getting questions errored");
            console.log(err);
        }

        return Promise.reject();
    }

    async getQuestionInfo(id: number): Promise<QuestionInfo> {
        this.prepareContract();
        try{
            const qInfo = await this.platformContract.getQuestionInfo(id);
            return Promise.resolve(qInfo);
        } catch (err) {
            console.log("Errored: ");
            console.log(err);
        }
        
        return Promise.reject();
    }

    async vote(questionID: number, score: number): Promise<boolean> {
        this.prepareContract();
        try {
            console.log(`Voting for ${questionID}, score: ${score}`);
            await this.platformContract.vote(questionID, score);
            return Promise.resolve(true);
        } catch (e) {
            console.log("Error occured: ", e.reason);
        }

        return Promise.reject();
    }

    async provideExtra(questionID: number, extraScore: number): Promise<boolean> {
        this.prepareContract();
        try {
            await this.platformContract.extraVote(questionID, extraScore);
            return Promise.resolve(true);
        } catch (e) {
            console.log("Error during providing extra options");
        }

        return Promise.reject();
    }
}

const Contract = new PlatformContract();
export default Contract;