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

      // console.log("\t-- New Question created:");
      // console.log("\t-- Owner: ", platformResponse.from);
      // console.log("\t-- ID value: ", platformResponse.value.toNumber());
      
      const newQuestionID = platformResponse.value.toNumber();  //this is attached method by NigNumber
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
        await registerUsers(signer1);
        await createTestQuestion(signer1);
        let expectedTotalQuestions = 1;
        //
        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);

        // signer 2
        await registerUsers(signer2);
        await createTestQuestion(signer2);
        expectedTotalQuestions += 1;

        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);
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
          expect(await platformContract.totalQuestions()).to.equal(1);

          // register signer1, vote for first option
          await registerUsers(signer1);
          await platformContract.connect(signer1).vote(qID, 0);

          // get scores for first option
          let expectedScore = ethers.BigNumber.from(1);
          const qInfoResponse = (await platformContract.connect(signer1).getQuestionInfo(0));
          //
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
    });

    context("Questions visibility and correctness", async function() {
      it("Questions can be seen/listed", async function () {
        // register user and add question
        await registerUsers(signer1);
        await createTestQuestion(signer1);

        expect(await platformContract.totalUsers()).to.equal(2); // check users number integrity
        expect(await platformContract.totalQuestions()).to.equal(1); // check quesiton number integrity

        const qInfoResponse = (await platformContract.connect(signer1).getQuestionInfo(0));
        //
        expect(qInfoResponse.id).to.equal(0);
        expect(qInfoResponse.owner).to.equal(signer1.address);
        expect(qInfoResponse.title).to.equal("New Question");
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
    });
});