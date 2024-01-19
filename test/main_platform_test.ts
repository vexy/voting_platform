import { ethers } from "hardhat";
import { expect, assert } from "chai";
import type { MainPlatform } from "../typechain-types";
import type { PlatformQuestionStructOutput } from "../typechain-types/MainPlatform";

describe("Testing Suite :: [MainPlatform contract]", async function () {
    let platformContract: MainPlatform;   // shared contract object

    const startingPoints = ethers.getBigInt(1_000_000);   //1 mil
    const testTitle = "Most peculiar way to understand universe ?";
    const testLabels = ["Coding", "Methaphysics", "Spirituality"];
    const questionHash_TEST = "0x4beaf07cffcbc86efbeb4efd38d3031735a4ad343505d95d1ff11fae4362d120";

    beforeEach(async function () {
      const [ owner ] = await ethers.getSigners(); // get basic signer
      
      // initialize contract and wait for deployment
      platformContract = await ethers.deployContract("MainPlatform", [owner], owner);
    });

    async function getSigner(signerID: number) {
      return (await ethers.getSigners())[signerID];
  }

    // GENERAL HELPERS:
    async function registerUser(user: HardhatEthersSigner) {
      const userCall = platformContract.connect(user);
      await userCall.register();
    }

    async function getAddedQuestion(): Promise<PlatformQuestionStructOutput> {
      // add new question and query the blochckain straight after
      await platformContract.addQuestion(testTitle, testLabels);
      //TODO: capture and parse result other than returned from the method

      //query the results
      const newQuestion = await platformContract.getQuestionInfo(questionHash_TEST);
      return newQuestion;
    }

    context("Initial setup", async function() {
      it("Can initialize properly", async function() {
          const platformSigner = await getSigner(0);
          const totalQuestions = await platformContract.totalQuestions();
          const totalUsers = await platformContract.totalUsers();
          const platformOwner = await platformContract.owner();

          expect(totalQuestions).to.equal(0);
          expect(totalUsers).to.equal(1);  // owner as first user included
          expect(platformOwner).to.equal(platformSigner.address);
      });

      it("Has proper voting points after initialization", async function() {
          expect(await platformContract.pointsBalance()).to.equal(startingPoints);
      });

      it("Can recognize registered users" , async function() {
        // check if platform recognizes owner as a user
        expect(await platformContract.isRegisteredUser()).to.equal(true);

        // perform signer1 registration and perform check
        const user1 = await getSigner(1);
        await registerUser(user1);
        expect(await platformContract.connect(user1).isRegisteredUser()).to.equal(true);
        expect(await platformContract.connect(user1).pointsBalance()).to.equal(startingPoints);
      });

      it("Can recognize non-registered users", async function() {
        const user1 = await getSigner(1);
        const user2 = await getSigner(2);
        expect(await platformContract.connect(user1).isRegisteredUser()).to.equal(false);
        expect(await platformContract.connect(user2).isRegisteredUser()).to.equal(false);
      });
    });

    context("Users management", async function() {
      it("Can register new users", async function() {
        const user1 = await getSigner(1);
        const user2 = await getSigner(2);
        await registerUser(user1);
        await registerUser(user2);

        expect(await platformContract.totalUsers()).to.equal(3);  // 2 new + owner
      });

      it("Users can query their balance", async function() {
        const user1 = await getSigner(1);
        const user2 = await getSigner(2);
        await registerUser(user1);
        await registerUser(user2);

        const ownerBalance = await platformContract.pointsBalance();
        const s1Balance = await platformContract.pointsBalance();
        const s2Balance = await platformContract.pointsBalance();

        expect(ownerBalance).to.equal(startingPoints);
        expect(s1Balance).to.equal(startingPoints);
        expect(s2Balance).to.equal(startingPoints);
      });

      it("No double registration", async function() {
        //at this point owner is automatically registered as fist user
        //attempt another registration and expect failure
        try {
          await platformContract.register();
          assert.fail("Should have not allowed double registration of this user.")
        } catch {
          const totalUsers = await platformContract.totalUsers();
          expect(totalUsers).to.equal(1);  // owner as first user included
        }
      });
    });

    context("Questions posting", async function() {
      it("Owner can add question", async function() {
        await platformContract.addQuestion(testTitle, testLabels);
        
        // check total number of questions on the platform
        expect(await platformContract.totalQuestions()).to.equal(1);
        
        const allQuestions = await platformContract.getAllQuestions();

        expect(allQuestions[0].questionHash).to.equal(questionHash_TEST);
        expect(allQuestions[0].totalVoters).to.equal(0);
        expect(allQuestions[0].hasVoted).to.equal(false);
      });

      it("Registered user can add question", async function() {
        const user1 = await getSigner(1);
        await registerUser(user1);

        // add question as user 1
        await platformContract.connect(user1).addQuestion(testTitle, testLabels);
        // console.log(resp);

        // check owner after addition
        expect(await platformContract.totalQuestions()).to.equal(1);
        //
        let newQuestion = (await platformContract.getAllQuestions())[0];
        //
        expect(newQuestion.questionHash).to.equal(questionHash_TEST);
        expect(newQuestion.totalVoters).to.equal(0);
        expect(newQuestion.hasVoted).to.equal(false);

        // check user1 after addition
        expect(await platformContract.connect(user1).totalQuestions()).to.equal(1);
        //
        newQuestion = (await platformContract.getAllQuestions())[0];
        //
        expect(newQuestion.questionHash).to.equal(questionHash_TEST);
        expect(newQuestion.totalVoters).to.equal(0);
        expect(newQuestion.hasVoted).to.equal(false);
      });

      it("Non-registered users cannot add questions", async function() {
        const user1 = await getSigner(1);

        // try to add question as user 1 which is not registered
        try {
          await platformContract.connect(user1).addQuestion(testTitle, testLabels);
          assert.fail("Should have not allowed unregistred user to add questions.")
        } catch {
          // make sure no questions were added
          const totalQuestions = await platformContract.totalQuestions();
          const totalUsers = await platformContract.totalUsers();

          expect(totalQuestions).to.equal(0);
          expect(totalUsers).to.equal(1);  // owner as first user included
        }
      });
    });

    context("# Anti-Churchil check", async function() {
      it("Cannot score same option more than once - [aka \"NO DOUBLE VOTES\"]", async function(){
          const newQuestion = await getAddedQuestion();
          //
          // check initial state
          expect(newQuestion.questionHash).to.equal(questionHash_TEST);
          expect(newQuestion.question.scores[0]).to.equal(0);
          expect(newQuestion.question.scores[1]).to.equal(0);
          expect(newQuestion.question.scores[2]).to.equal(0);
          expect(newQuestion.totalVoters).to.equal(0);
          expect(newQuestion.hasVoted).to.equal(false);

          // now perform vote and check state
          await platformContract.vote(questionHash_TEST, 0);
          //
          let resp = await platformContract.getQuestionInfo(questionHash_TEST);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);

          // now perform vote and expect failure
          try {
              await platformContract.vote(questionHash_TEST, 0);
              // this is where it should fail
              assert.fail("Shouldn't accept another vote.");
          } catch {
            // make sure score isn't changed
            //
            resp = await platformContract.getQuestionInfo(questionHash_TEST);
            expect(resp.question.scores[0]).to.equal(1);
            expect(resp.question.scores[1]).to.equal(0);
            expect(resp.question.scores[2]).to.equal(0);
            expect(resp.totalVoters).to.equal(1);
            expect(resp.hasVoted).to.equal(true);
          }
      });

      it("Cannot score different option after a vote", async function(){
        // create question and check initial state
        const newQuestion = await getAddedQuestion();
        //
        expect(newQuestion.questionHash).to.equal(questionHash_TEST);
        expect(newQuestion.question.scores[0]).to.equal(0);
        expect(newQuestion.question.scores[1]).to.equal(0);
        expect(newQuestion.question.scores[2]).to.equal(0);
        expect(newQuestion.totalVoters).to.equal(0);
        expect(newQuestion.hasVoted).to.equal(false);

        // perform vote and check initial state
        await platformContract.vote(questionHash_TEST, 0);
        //
        let resp = await platformContract.getQuestionInfo(questionHash_TEST);
        expect(resp.questionHash).to.equal(questionHash_TEST);
        expect(resp.question.scores[0]).to.equal(1);
        expect(resp.question.scores[1]).to.equal(0);
        expect(resp.question.scores[2]).to.equal(0);
        expect(resp.totalVoters).to.equal(1);
        expect(resp.hasVoted).to.equal(true);

        // try scoring different option now
        try {
            await platformContract.vote(questionHash_TEST, 1);
            assert.fail("Should not accept different vote after a vote.");
        } catch (err) {
          resp = await platformContract.getQuestionInfo(questionHash_TEST);
          expect(resp.questionHash).to.equal(questionHash_TEST);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);
        }
      });

      it("Cannot score extra::none_option after a vote", async function(){
        // create question and check initial state
        const newQuestion = await getAddedQuestion();
        //
        expect(newQuestion.questionHash).to.equal(questionHash_TEST);
        expect(newQuestion.question.scores[0]).to.equal(0);
        expect(newQuestion.question.scores[1]).to.equal(0);
        expect(newQuestion.question.scores[2]).to.equal(0);
        expect(newQuestion.totalVoters).to.equal(0);
        expect(newQuestion.hasVoted).to.equal(false);

        // perform vote and check initial state
        await platformContract.vote(questionHash_TEST, 0);
        //
        let resp = await platformContract.getQuestionInfo(questionHash_TEST);
        expect(resp.questionHash).to.equal(questionHash_TEST);
        expect(resp.question.scores[0]).to.equal(1);
        expect(resp.question.scores[1]).to.equal(0);
        expect(resp.question.scores[2]).to.equal(0);
        expect(resp.question.extras[0]).to.equal(0);
        expect(resp.question.extras[1]).to.equal(0);
        expect(resp.question.extras[2]).to.equal(0);
        expect(resp.totalVoters).to.equal(1);
        expect(resp.hasVoted).to.equal(true);

        // try scoring extra option now
        try {
            await platformContract.voteExtra(questionHash_TEST, 0);
            assert.fail("Should not accept extra vote after regular vote.");
        } catch (err) {
          resp = await platformContract.getQuestionInfo(questionHash_TEST);
          expect(resp.questionHash).to.equal(questionHash_TEST);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.question.extras[0]).to.equal(0);
          expect(resp.question.extras[1]).to.equal(0);
          expect(resp.question.extras[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);
        }
      });

      it("Cannot provide extra::malformed after a vote", async function(){
        // create question and check initial state
        const newQuestion = await getAddedQuestion();
        //
        expect(newQuestion.questionHash).to.equal(questionHash_TEST);
        expect(newQuestion.question.scores[0]).to.equal(0);
        expect(newQuestion.question.scores[1]).to.equal(0);
        expect(newQuestion.question.scores[2]).to.equal(0);
        expect(newQuestion.totalVoters).to.equal(0);
        expect(newQuestion.hasVoted).to.equal(false);

        // perform vote and check initial state
        await platformContract.vote(questionHash_TEST, 0);
        //
        let resp = await platformContract.getQuestionInfo(questionHash_TEST);
        expect(resp.questionHash).to.equal(questionHash_TEST);
        expect(resp.question.scores[0]).to.equal(1);
        expect(resp.question.scores[1]).to.equal(0);
        expect(resp.question.scores[2]).to.equal(0);
        expect(resp.question.extras[0]).to.equal(0);
        expect(resp.question.extras[1]).to.equal(0);
        expect(resp.question.extras[2]).to.equal(0);
        expect(resp.totalVoters).to.equal(1);
        expect(resp.hasVoted).to.equal(true);

        // try scoring different option now
        try {
            await platformContract.voteExtra(questionHash_TEST, 2);
            assert.fail("Should not accept different vote after a vote.");
        } catch (err) {
          resp = await platformContract.getQuestionInfo(questionHash_TEST);
          expect(resp.questionHash).to.equal(questionHash_TEST);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.question.extras[0]).to.equal(0);
          expect(resp.question.extras[1]).to.equal(0);
          expect(resp.question.extras[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);
        }
      });

      it("Cannot provide extra::report after a vote", async function() {
        // create question and check initial state
        const newQuestion = await getAddedQuestion();
        //
        expect(newQuestion.questionHash).to.equal(questionHash_TEST);
        expect(newQuestion.question.scores[0]).to.equal(0);
        expect(newQuestion.question.scores[1]).to.equal(0);
        expect(newQuestion.question.scores[2]).to.equal(0);
        expect(newQuestion.totalVoters).to.equal(0);
        expect(newQuestion.hasVoted).to.equal(false);

        // perform vote and check initial state
        await platformContract.vote(questionHash_TEST, 0);
        //
        let resp = await platformContract.getQuestionInfo(questionHash_TEST);
        expect(resp.questionHash).to.equal(questionHash_TEST);
        expect(resp.question.scores[0]).to.equal(1);
        expect(resp.question.scores[1]).to.equal(0);
        expect(resp.question.scores[2]).to.equal(0);
        expect(resp.question.extras[0]).to.equal(0);
        expect(resp.question.extras[1]).to.equal(0);
        expect(resp.question.extras[2]).to.equal(0);
        expect(resp.totalVoters).to.equal(1);
        expect(resp.hasVoted).to.equal(true);

        // try scoring different option now
        try {
            await platformContract.voteExtra(questionHash_TEST, 0);
            assert.fail("Should not accept different vote after a vote.");
        } catch (err) {
          resp = await platformContract.getQuestionInfo(questionHash_TEST);
          expect(resp.questionHash).to.equal(questionHash_TEST);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.question.extras[0]).to.equal(0);
          expect(resp.question.extras[1]).to.equal(0);
          expect(resp.question.extras[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);
        }
      });
    });
});