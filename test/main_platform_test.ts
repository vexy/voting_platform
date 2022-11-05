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
      // get some signers
      const allSigners = await ethers.getSigners();
      owner = allSigners[0]; //console.log("Owner: ", owner);
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
    }

    async function createTestQuestion() {
      // add test question
      return await platformContract.addQuestion(testTitle, testLabels);
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
        // await platformContract.connect(signer1).register();
        // await platformContract.connect(signer2).register();
        await registerUsers(signer1);
        await registerUsers(signer2);

        expect(await platformContract.totalUsers()).to.equal(3);  // 2 new + owner
      });

      it("Users can query their balance", async function() {
        // await platformContract.connect(signer1).register();
        // await platformContract.connect(signer2).register();
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
        const expectedID = ethers.BigNumber.from(0);
        const expectedTotalQuestions = 1;

        const id = await createTestQuestion(); // this returns BigNumber
        
        expect(id.value).to.equal(expectedID);
        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);
      });

      it("Registered users can add question", async function() {
        let expectedTotalQuestions = 0;

        // signer 1
        registerUsers(signer1);
        await createTestQuestion();
        expectedTotalQuestions += 1;
        //
        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);

        // signer 2
        registerUsers(signer2);
        await createTestQuestion();
        expectedTotalQuestions += 1;

        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);
      });

      it("Questions can be seen/listed", async function () {
        // register user and add question
        registerUsers(signer1);
        await createTestQuestion();
        expect(await platformContract.totalQuestions()).to.equal(1); // check quesiton number integrity

        const allQuestions = await platformContract.getAllQuestions();
        const idArray = allQuestions[0];
        const titles = allQuestions[1];

        expect(idArray[0]).to.equal(0);
        expect(titles[0]).to.equal("New Question");
      });
    });

    context("Questions answering/voting", async function() {
      it("Owner can vote", async function() {
        await createTestQuestion();
        expect(await platformContract.totalQuestions()).to.equal(1);

        // perform voting
        await platformContract.vote(0,0);

        // check score result
        const option1Score = (await platformContract.scoresFor(0))[1][0];
        const expectedScore = ethers.BigNumber.from(1);
        /**
         * scoreTable is in following format:
         * [
              [ 'one', 'two', 'three' ],
              [
                  BigNumber { value: "1" },
                  BigNumber { value: "0" },
                  BigNumber { value: "0" }
              ]
           ]
        */ 
        expect(option1Score).to.equal(expectedScore);
      });
    
      it("Registered users can vote", async function(){
          let option1Score = 0;
          let expectedScore = ethers.BigNumber.from(1);
          const qID = await createTestQuestion(); //as an owner

          // register signer1 and vote first option
          registerUsers(signer1);
          await platformContract.vote(qID.value, 0); //.connect(signer1)
          // get scores for first option
          option1Score = (await platformContract.connect(signer1).scoresFor(qID.value))[1][0];
          expect(option1Score).to.equal(expectedScore);
      });
    });

    context("Questions visibility and correctness", async function() {
      
    });
});