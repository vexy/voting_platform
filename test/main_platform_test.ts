import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";

describe("Testing Suite :: [MainPlatform contract]", async function () {
    let platformContract: Contract;   // shared contract object
    let owner: SignerWithAddress, signer1: SignerWithAddress, signer2: SignerWithAddress; //3 signers

    const startingPoints = ethers.BigNumber.from(1000000);   //1 mil
    const testTitle = "New Question";
    const testLabels = ['one', 'two', 'three'];

    beforeEach(async function () {
      // assign basic signers
      const allSigners = await ethers.getSigners();
      owner = allSigners[0];
      signer1 = allSigners[1];
      signer2 = allSigners[2];
      
      // initialize contract and wait for deployment
      const factory = await ethers.getContractFactory("MainPlatform");
      platformContract = await factory.deploy(owner.address);
      await platformContract.deployed();
    });

    // GENERAL HELPERS:
    async function registerUsers(user: SignerWithAddress) {
      await platformContract.connect(user).register();
      // console.log("\t-- User registered: ", user.address);
    }

    async function createTestQuestion(as?: SignerWithAddress): Promise<number> {
      let platformResponse;
      if(as) {
        platformResponse = await platformContract.connect(as).addQuestion(testTitle, testLabels);
      } else {
        platformResponse = await platformContract.addQuestion(testTitle, testLabels);
      }
      
      const newQuestionID = platformResponse.value.toNumber();  //this is attached method by BigNumber
      return Promise.resolve(newQuestionID);
    }

    context("Initial setup", async function() {
      it("Can initialize properly", async function() {
          expect(await platformContract.totalQuestions()).to.equal(0);
          expect(await platformContract.totalUsers()).to.equal(1);  // owner included
          expect(await platformContract.owner()).to.equal(owner.address);
      });

      it("Has proper voting points after initialization", async function() {
          expect(await platformContract.userBalance(owner.address)).to.equal(startingPoints);
      });

      it("Can recognize registered users" , async function() {
        // check if platform recognizes owner as a user
        expect(await platformContract.isRegisteredUser()).to.equal(true);

        // perform signer1 registration and perform check
        await registerUsers(signer1);
        expect(await platformContract.connect(signer1).isRegisteredUser()).to.equal(true);
        expect(await platformContract.connect(signer1).userBalance(signer1.address)).to.equal(startingPoints);
      });

      it("Can recognize non-registered users", async function() {
        expect(await platformContract.connect(signer1).isRegisteredUser()).to.equal(false);
        expect(await platformContract.connect(signer2).isRegisteredUser()).to.equal(false);
      });
    });

    context("Users management", async function() {
      it("Can register new users", async function() {
        await registerUsers(signer1);
        await registerUsers(signer2);

        expect(await platformContract.totalUsers()).to.equal(3);  // 2 new + owner
      });

      it("Users can query their balance", async function() {
        await registerUsers(signer1);
        await registerUsers(signer2);

        const ownerBalance = await platformContract.userBalance(owner.address);
        const s1Balance = await platformContract.userBalance(signer1.address);
        const s2Balance = await platformContract.userBalance(signer2.address);

        expect(ownerBalance).to.equal(startingPoints);
        expect(s1Balance).to.equal(startingPoints);
        expect(s2Balance).to.equal(startingPoints);
      });
    });

    context("Questions posting", async function() {
      it("Owner can add question", async function() {
        const expectedID = 0;
        const expectedTotalQuestions = 1;

        const id = await createTestQuestion(); // this returns number
        
        expect(id).to.equal(expectedID);
        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);
      });

      it("Registered users can add question", async function() {
        let expectedTotalQuestions = 1;
        for(let acc of [signer1, signer2]) {
          await registerUsers(acc);
          await createTestQuestion(acc);
          const totalQuestions = await platformContract.connect(acc).totalQuestions();

          expect(totalQuestions).to.equal(expectedTotalQuestions);
          expectedTotalQuestions += 1;
        }
      });

      it("Question description can be edited", async function() {
        const expectedID = 0;
        const expectedTotalQuestions = 1;

        // create test question
        const questionID = await createTestQuestion();
        const totalQuestions = await platformContract.totalQuestions();

        // mark intial state and perform description edit
        const qInfoStart = await platformContract.getQuestionInfo(questionID);
        //
        await platformContract.editDescription(questionID, 'New description');
        //
        // mark ending state
        const qInfoAfter = await platformContract.getQuestionInfo(questionID);

        // check outcome
        expect(questionID).to.equal(expectedID);
        expect(totalQuestions).to.equal(expectedTotalQuestions);
        expect(qInfoStart.description).to.equal("");
        expect(qInfoAfter.description).to.equal('New description');
      });
    });

    context("Questions answering/voting", async function() {
      it("Owner can vote", async function() {
        const qID = await createTestQuestion();
        expect(await platformContract.totalQuestions()).to.equal(1);

        // perform voting
        await platformContract.vote(qID,0);
        const expectedScore = ethers.BigNumber.from(1);

        // get question info
        const qInfoResponse = (await platformContract.getQuestionInfo(qID));
        
        expect(qInfoResponse.id).to.equal(qID);
        expect(qInfoResponse.owner).to.equal(owner.address);
        expect(qInfoResponse.scores[0]).to.equal(expectedScore);
        expect(qInfoResponse.totalVoters).to.equal(ethers.BigNumber.from(1));
        expect(qInfoResponse.hasVoted).to.equal(true);
      });
    
      it("Registered users can vote owner's questions", async function(){
          const qID = await createTestQuestion();
          
          // register signer1, vote for first option
          await registerUsers(signer1);
          await platformContract.connect(signer1).vote(qID, 0);
          expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

          // get scores for first option
          let expectedScore = ethers.BigNumber.from(1);
          const qInfoResponse = (await platformContract.connect(signer1).getQuestionInfo(qID));
          expect(qInfoResponse.id).to.equal(qID);
          expect(qInfoResponse.owner).to.equal(owner.address);
          expect(qInfoResponse.scores[0]).to.equal(expectedScore);
          expect(qInfoResponse.totalVoters).to.equal(ethers.BigNumber.from(1));
          expect(qInfoResponse.hasVoted).to.equal(true);
      });

      it("Registered users can vote their own questions", async function(){
        // register signer1 and create a question
        await registerUsers(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        // perform voting for own question
        await platformContract.connect(signer1).vote(qID, 0);

        // get scores for first option
        const expectedScore = ethers.BigNumber.from(1);
        const qInfoResponse = (await platformContract.connect(signer1).getQuestionInfo(qID));
        //
        expect(qInfoResponse.id).to.equal(qID);
        expect(qInfoResponse.owner).to.equal(signer1.address);
        expect(qInfoResponse.scores[0]).to.equal(expectedScore);
        expect(qInfoResponse.totalVoters).to.equal(ethers.BigNumber.from(1));
        expect(qInfoResponse.hasVoted).to.equal(true);
      });

      it("Registered user can provide extra:none", async function() {
        // register signer1 and create a question
        await registerUsers(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        await platformContract.connect(signer1).extraVote(qID, 0);
        const qiResp = await platformContract.connect(signer1).getQuestionInfo(qID);

        expect(qiResp.extras[0]).to.equal(1);
      });

      it("Registered user can provide extra:malformed", async function() {
        // register signer1 and create a question
        await registerUsers(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        await platformContract.connect(signer1).extraVote(qID, 1);
        const qiResp = await platformContract.connect(signer1).getQuestionInfo(qID);

        expect(qiResp.extras[1]).to.equal(1);
      });

      it("Registered user can provide extra:report", async function() {
        // register signer1 and create a question
        await registerUsers(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        await platformContract.connect(signer1).extraVote(qID, 2);
        const qiResp = await platformContract.connect(signer1).getQuestionInfo(qID);

        expect(qiResp.extras[2]).to.equal(1);
      });
    });

    context("Questions visibility and correctness", async function() {
      it("Created question can be seen by owner", async function () {
        // create question as owner and check integrity
        const questionID = await createTestQuestion();
        //
        const qInfoResponse = (await platformContract.getQuestionInfo(questionID));
        const totalUsers = await platformContract.totalUsers();
        const totalQuestions = await platformContract.totalQuestions();
        //
        expect(totalUsers).to.equal(1);
        expect(totalQuestions).to.equal(1);
        expect(qInfoResponse.id).to.equal(questionID);
        expect(qInfoResponse.owner).to.equal(owner.address);
        expect(qInfoResponse.title).to.equal("New Question");
        expect(qInfoResponse.description).to.equal('');
        expect(qInfoResponse.labels[0]).to.equal('one');
        expect(qInfoResponse.labels[1]).to.equal('two');
        expect(qInfoResponse.labels[2]).to.equal('three');
        expect(qInfoResponse.scores[0]).to.equal(0);
        expect(qInfoResponse.scores[1]).to.equal(0);
        expect(qInfoResponse.scores[2]).to.equal(0);
        expect(qInfoResponse.extras[0]).to.equal(0);
        expect(qInfoResponse.extras[1]).to.equal(0);
        expect(qInfoResponse.extras[2]).to.equal(0);
        expect(qInfoResponse.totalVoters).to.equal(0);
        expect(qInfoResponse.hasVoted).to.equal(false);
      });

      it("Created question can be seen by their creators", async function () {
        // create test question and perform vote as an owner
        const questionID = await createTestQuestion();

        await registerUsers(signer1);
        await registerUsers(signer2);

        for(const acc of [owner, signer1, signer2]) {
          const totalUsers = await platformContract.connect(acc).totalUsers();
          const totalQuestions = await platformContract.connect(acc).totalQuestions();
          const questionInfo   = await platformContract.connect(acc).getQuestionInfo(questionID);

          expect(totalUsers).to.equal(3);
          expect(totalQuestions).to.equal(1);
          //
          expect(questionInfo.id).to.equal(questionID);
          expect(questionInfo.owner).to.equal(owner.address);
          expect(questionInfo.scores[0]).to.equal(0);
          expect(questionInfo.totalVoters).to.equal(0);
          expect(questionInfo.hasVoted).to.equal(false);
        }
      });

      it("Owner has proper 'hasVoted' dynamics", async function() {
        const questionID = await createTestQuestion();

        let qInfo = await platformContract.getQuestionInfo(questionID);
        //
        expect(qInfo.id).to.equal(questionID);
        expect(qInfo.owner).to.equal(owner.address);
        expect(qInfo.scores[0]).to.equal(0);
        expect(qInfo.totalVoters).to.equal(0);
        expect(qInfo.hasVoted).to.equal(false);

        // perform vote
        await platformContract.vote(questionID, 0);

        // check results
        qInfo = await platformContract.getQuestionInfo(questionID);
        //
        expect(qInfo.id).to.equal(questionID);
        expect(qInfo.owner).to.equal(owner.address);
        expect(qInfo.scores[0]).to.equal(1);
        expect(qInfo.totalVoters).to.equal(1);
        expect(qInfo.hasVoted).to.equal(true);
      });

      it("Registered users observe voting dynamics properly", async function() {
        // create question and vote as owner
        const questionID = await createTestQuestion();
        await platformContract.vote(questionID, 0);

        // register signer1
        await registerUsers(signer1);
        let qInfo = await platformContract.connect(signer1).getQuestionInfo(questionID);
        //
        console.log(qInfo);
        expect(qInfo.id).to.equal(questionID);
        expect(qInfo.owner).to.equal(owner.address);
        expect(qInfo.scores[0]).to.equal(1);
        expect(qInfo.totalVoters).to.equal(1);
        expect(qInfo.hasVoted).to.equal(false);
      });
    });
});