import { BigNumber, ethers } from "ethers";
import { QuestionInfoOutput } from './Models'
import { Provider } from "./Provider";
import { PlatformStore } from "./UtilsStore";

class PlatformContract {
    private platformContract!: ethers.Contract;

    constructor() {
        // this.prepareContract();
        console.log("<Platform contract> initialized.");
    }

//  --- PRIVATE HELPERS
    private extractNumber(_bigNumber: BigNumber): number {
        return ethers.BigNumber.from(_bigNumber).toNumber();
    }

//  --- PLATFORM API IMP
    async totalUsers(): Promise<number> {
        try {
            this.platformContract = Provider.fabricateContract();
            const resultBN = await this.platformContract.totalUsers();
            const totalU = this.extractNumber(resultBN);

            // inform store
            PlatformStore.updateUserCount(totalU);

            return Promise.resolve(totalU);
        } catch (err) {
            console.log("Errored: ", err);
        }
        return Promise.reject();
    }

    async questionsCount(): Promise<number> {
        try {
            this.platformContract = Provider.fabricateContract();
            const response = await this.platformContract.totalQuestions();
            const totalQ = this.extractNumber(response);
            PlatformStore.updateQuestionsCount(totalQ);
            return Promise.resolve(totalQ);
        } catch (err) {
            console.log("Errored: ", err);
        }
        return Promise.reject();
    }

    async getUserBalance(): Promise<number> {
        try {
            this.platformContract = Provider.fabricateContract();
            const _address = Provider.signerAddress();
            const balanceBN = await this.platformContract.balanceOf(_address);
            const balance = this.extractNumber(balanceBN);
            return Promise.resolve(balance);
        } catch (err) {
            console.log("Errored: ", err);
        }
        return Promise.reject();
    }

    async isRegisteredUser(): Promise<boolean> {
        this.platformContract = Provider.fabricateContract();
        const response = await this.platformContract.isRegisteredUser();
        // update the store on the fly
        PlatformStore.registered(response);
        return Promise.resolve(response);
    }

    /// Returns true if user successfully registers
    async registerNewUser(): Promise<boolean> {
        try {
            this.platformContract = Provider.fabricateContract();
            await this.platformContract.register();
            console.log("New user registered, informing store.");
            // update the store on the fly
            PlatformStore.registered(true);
            return Promise.resolve(true);
        } catch (err) {
            console.log("Error during registration. Reason:");
            console.log(err);
        }

        PlatformStore.registered(false);
        return Promise.reject(false);
    }

    async addNewQuestion(questionTitle: string, labels: string[]): Promise<boolean> {
        try {
            this.platformContract = Provider.fabricateContract();
            await this.platformContract.addQuestion(questionTitle, labels);
            return Promise.resolve(true);
        } catch (err) {
            console.log("Creating new question errored. Reason:");
            console.log(err);
        }

        return Promise.reject(false);
    }

    async getAllQuestions(): Promise<(QuestionInfoOutput[])> {
        const returnSet: QuestionInfoOutput[] = [];

        try {
            this.platformContract = Provider.fabricateContract();
            const qInfoArray = await this.platformContract.getAllQuestions();
            console.log(qInfoArray);
            // const questionInfoArray = response[0];
            for(const qInfo of qInfoArray) {
                returnSet.push(new QuestionInfoOutput(
                    qInfo.id,
                    qInfo.question,
                    this.extractNumber(qInfo.totalVoters),
                    qInfo.hasVoted
                ));
            }

            // update questions count on the fly
            PlatformStore.updateQuestionsCount(qInfoArray.length);
            return Promise.resolve(returnSet);
        } catch (err) {
            console.log("Getting questions errored");
            console.log(err);
        }

        return Promise.reject();
    }

    async getQuestionInfo(id: number): Promise<QuestionInfoOutput> {
        try{
            this.platformContract = Provider.fabricateContract();
            const qInfo: QuestionInfoOutput = await this.platformContract.getQuestionInfo(id);
            return Promise.resolve(qInfo);
        } catch (err) {
            console.log("Errored: ");
            console.log(err);
        }
        
        return Promise.reject();
    }

    async vote(questionID: number, score: number): Promise<boolean> {
        try {
            this.platformContract = Provider.fabricateContract();
            await this.platformContract.vote(questionID, score);
            console.log(`Successfull vote for ${questionID}, score: ${score}`);
            return Promise.resolve(true);
        } catch (e) {
            console.log("Error occured: ", e.reason);
        }

        return Promise.reject();
    }

    async provideExtra(questionID: number, extraScore: number): Promise<boolean> {
        try {
            this.platformContract = Provider.fabricateContract();
            await this.platformContract.voteExtra(questionID, extraScore);
            return Promise.resolve(true);
        } catch (e) {
            console.log("Error during providing extra options");
        }

        return Promise.reject();
    }
}

const Contract = new PlatformContract();
export default Contract;