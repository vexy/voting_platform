import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect, assert } from "chai";

describe("Testing Suite :: [MainPlatform contract]", async function () {
    let platformContract: Contract;   // shared contract object
    let owner: SignerWithAddress, signer1: SignerWithAddress, signer2: SignerWithAddress; //3 signers

    const startingPoints = ethers.BigNumber.from(1000000);   //1 mil
    const testTitle = 'New Question';
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
    async function registerUser(user: SignerWithAddress) {
      await platformContract.connect(user).register();
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
          expect(await platformContract.balanceOf(owner.address)).to.equal(startingPoints);
      });

      it("Can recognize registered users" , async function() {
        // check if platform recognizes owner as a user
        expect(await platformContract.isRegisteredUser()).to.equal(true);

        // perform signer1 registration and perform check
        await registerUser(signer1);
        expect(await platformContract.connect(signer1).isRegisteredUser()).to.equal(true);
        expect(await platformContract.connect(signer1).balanceOf(signer1.address)).to.equal(startingPoints);
      });

      it("Can recognize non-registered users", async function() {
        expect(await platformContract.connect(signer1).isRegisteredUser()).to.equal(false);
        expect(await platformContract.connect(signer2).isRegisteredUser()).to.equal(false);
      });
    });

    context("Users management", async function() {
      it("Can register new users", async function() {
        await registerUser(signer1);
        await registerUser(signer2);

        expect(await platformContract.totalUsers()).to.equal(3);  // 2 new + owner
      });

      it("Users can query their balance", async function() {
        await registerUser(signer1);
        await registerUser(signer2);

        const ownerBalance = await platformContract.balanceOf(owner.address);
        const s1Balance = await platformContract.balanceOf(signer1.address);
        const s2Balance = await platformContract.balanceOf(signer2.address);

        expect(ownerBalance).to.equal(startingPoints);
        expect(s1Balance).to.equal(startingPoints);
        expect(s2Balance).to.equal(startingPoints);
      });
    });

    context("Questions posting", async function() {
      it("Owner can add question", async function() {
        const expectedTotalQuestions = 1;

        const id = await createTestQuestion(); // this returns number
        const response = await platformContract.getQuestionInfo(id);
        
        expect(response.question.owner).to.equal(owner.address);
        expect(response.question.title).to.equal(testTitle);
        expect(response.question.labels[0]).to.equal(testLabels[0]);
        expect(response.question.labels[1]).to.equal(testLabels[1]);
        expect(response.question.labels[2]).to.equal(testLabels[2]);
        expect(response.question.scores[0]).to.equal(0);
        expect(response.question.scores[1]).to.equal(0);
        expect(response.question.scores[2]).to.equal(0);
        expect(response.question.extras[0]).to.equal(0);
        expect(response.question.extras[1]).to.equal(0);
        expect(response.question.extras[2]).to.equal(0);
        expect(response.totalVoters).to.equal(0);
        expect(response.hasVoted).to.equal(false);

        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);
      });

      it("Owner can add multiple question", async function() {
        const expectedTotalQuestions = 3;

        // check first question
        let qIDBig1 = await platformContract.addQuestion("Question1", ['one', 'two', 'three']);
        let qIDBig2 = await platformContract.addQuestion("Question2", ['one1', 'two2', 'three3']);
        let qIDBig3 = await platformContract.addQuestion("Question3", ['one11', 'two22', 'three333']);

        // const respAll = await platformContract.getAllQuestions();
        // console.log(respAll);
        let response1 = await platformContract.getQuestionInfo(0);
        let response2 = await platformContract.getQuestionInfo(1);
        let response3 = await platformContract.getQuestionInfo(2);

        expect(response1.question.owner).to.equal(owner.address);
        expect(response1.question.title).to.equal("Question1");
        expect(response1.question.labels[0]).to.equal('one');
        expect(response1.question.labels[1]).to.equal('two');
        expect(response1.question.labels[2]).to.equal('three');
        expect(response1.question.scores[0]).to.equal(0);
        expect(response1.question.scores[1]).to.equal(0);
        expect(response1.question.scores[2]).to.equal(0);
        expect(response1.question.extras[0]).to.equal(0);
        expect(response1.question.extras[1]).to.equal(0);
        expect(response1.question.extras[2]).to.equal(0);
        expect(response1.totalVoters).to.equal(0);
        expect(response1.hasVoted).to.equal(false);

        // Question2
        expect(response2.question.owner).to.equal(owner.address);
        expect(response2.question.title).to.equal("Question2");
        expect(response2.question.labels[0]).to.equal('one1');
        expect(response2.question.labels[1]).to.equal('two2');
        expect(response2.question.labels[2]).to.equal('three3');
        expect(response2.question.scores[0]).to.equal(0);
        expect(response2.question.scores[1]).to.equal(0);
        expect(response2.question.scores[2]).to.equal(0);
        expect(response2.question.extras[0]).to.equal(0);
        expect(response2.question.extras[1]).to.equal(0);
        expect(response2.question.extras[2]).to.equal(0);
        expect(response2.totalVoters).to.equal(0);
        expect(response2.hasVoted).to.equal(false);

        // Question 3
        expect(response3.question.owner).to.equal(owner.address);
        expect(response3.question.title).to.equal("Question3");
        expect(response3.question.labels[0]).to.equal('one11');
        expect(response3.question.labels[1]).to.equal('two22');
        expect(response3.question.labels[2]).to.equal('three333');
        expect(response3.question.scores[0]).to.equal(0);
        expect(response3.question.scores[1]).to.equal(0);
        expect(response3.question.scores[2]).to.equal(0);
        expect(response3.question.extras[0]).to.equal(0);
        expect(response3.question.extras[1]).to.equal(0);
        expect(response3.question.extras[2]).to.equal(0);
        expect(response3.totalVoters).to.equal(0);
        expect(response3.hasVoted).to.equal(false);

        expect(await platformContract.totalQuestions()).to.equal(expectedTotalQuestions);
      });

      it("Registered users can add question", async function() {
        let expectedTotalQuestions = 1;

        for(const acc of [signer1, signer2]) {
          await registerUser(acc);

          const qID = await createTestQuestion(acc);
          const response = await platformContract.connect(acc).getQuestionInfo(qID)

          expect(response.question.title).to.equal(testTitle);
          expect(response.question.labels[0]).to.equal(testLabels[0]);
          expect(response.question.labels[1]).to.equal(testLabels[1]);
          expect(response.question.labels[2]).to.equal(testLabels[2]);
          expect(response.question.scores[0]).to.equal(0);
          expect(response.question.scores[1]).to.equal(0);
          expect(response.question.scores[2]).to.equal(0);
          expect(response.question.extras[0]).to.equal(0);
          expect(response.question.extras[1]).to.equal(0);
          expect(response.question.extras[2]).to.equal(0);
          expect(response.totalVoters).to.equal(0);
          expect(response.hasVoted).to.equal(false);

          const totalQuestions = await platformContract.connect(acc).totalQuestions();
          expect(totalQuestions).to.equal(expectedTotalQuestions);
          expectedTotalQuestions += 1;
        }
      });

      // it("Question description can be edited", async function() {
      //   const expectedID = 0;
      //   const expectedTotalQuestions = 1;

      //   // create test question
      //   const questionID = await createTestQuestion();
      //   const totalQuestions = await platformContract.totalQuestions();

      //   // mark intial state and perform description edit
      //   const qInfoStart = await platformContract.getQuestionInfo(questionID);
      //   //
      //   await platformContract.editDescription(questionID, 'New description');
      //   //
      //   // mark ending state
      //   const qInfoAfter = await platformContract.getQuestionInfo(questionID);

      //   // check outcome
      //   expect(questionID).to.equal(expectedID);
      //   expect(totalQuestions).to.equal(expectedTotalQuestions);
      //   expect(qInfoStart.description).to.equal("");
      //   expect(qInfoAfter.description).to.equal('New description');
      // });
    });

    context("Questions answering/voting", async function() {
      it("Owner can vote", async function() {
        const qID = await createTestQuestion();

        // perform voting
        await platformContract.vote(qID, 0);

        // get question info
        const qInfo = await platformContract.getQuestionInfo(qID);
        
        expect(qInfo.question.owner).to.equal(owner.address);
        expect(qInfo.question.scores[0]).to.equal(1);
        expect(qInfo.question.scores[1]).to.equal(0);
        expect(qInfo.question.scores[2]).to.equal(0);
        expect(qInfo.totalVoters).to.equal(1);
        expect(qInfo.hasVoted).to.equal(true);

        expect(await platformContract.totalQuestions()).to.equal(1);
      });
    
      it("Registered users can vote owner's questions", async function(){
          const qID = await createTestQuestion(); //as owner
          
          // register signer1, vote for first option
          await registerUser(signer1);
          await platformContract.connect(signer1).vote(qID, 0);
          expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

          // get scores for first option
          const qInfo = await platformContract.connect(signer1).getQuestionInfo(qID);

          expect(qInfo.question.owner).to.equal(owner.address);
          expect(qInfo.question.scores[0]).to.equal(1);
          expect(qInfo.question.scores[1]).to.equal(0);
          expect(qInfo.question.scores[2]).to.equal(0);
          expect(qInfo.totalVoters).to.equal(1);
          expect(qInfo.hasVoted).to.equal(true);
      });

      it("Registered users can vote their own questions", async function(){
        // register signer1 and create a question
        await registerUser(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        // perform voting for own question
        await platformContract.connect(signer1).vote(qID, 0);

        // get scores for first option
        const qInfo = await platformContract.connect(signer1).getQuestionInfo(qID);
        //
        expect(qInfo.question.owner).to.equal(signer1.address);
        expect(qInfo.question.scores[0]).to.equal(1);
        expect(qInfo.question.scores[1]).to.equal(0);
        expect(qInfo.question.scores[2]).to.equal(0);
        expect(qInfo.totalVoters).to.equal(1);
        expect(qInfo.hasVoted).to.equal(true);
      });

      it("Registered user can provide extra:none", async function() {
        // register signer1 and create a question
        await registerUser(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        await platformContract.connect(signer1).voteExtra(qID, 0);
        const qiResp = await platformContract.connect(signer1).getQuestionInfo(qID);

        expect(qiResp.question.extras[0]).to.equal(1);
      });

      it("Registered user can provide extra:malformed", async function() {
        // register signer1 and create a question
        await registerUser(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        await platformContract.connect(signer1).voteExtra(qID, 1);
        const qiResp = await platformContract.connect(signer1).getQuestionInfo(qID);

        expect(qiResp.question.extras[1]).to.equal(1);
      });

      it("Registered user can provide extra:report", async function() {
        // register signer1 and create a question
        await registerUser(signer1);
        const qID = await createTestQuestion(signer1);
        expect(await platformContract.connect(signer1).totalQuestions()).to.equal(1);

        await platformContract.connect(signer1).voteExtra(qID, 2);
        const qiResp = await platformContract.connect(signer1).getQuestionInfo(qID);

        expect(qiResp.question.extras[2]).to.equal(1);
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
        expect(qInfoResponse.question.owner).to.equal(owner.address);
        expect(qInfoResponse.question.title).to.equal("New Question");
        expect(qInfoResponse.question.description).to.equal('');
        expect(qInfoResponse.question.labels[0]).to.equal('one');
        expect(qInfoResponse.question.labels[1]).to.equal('two');
        expect(qInfoResponse.question.labels[2]).to.equal('three');
        expect(qInfoResponse.question.scores[0]).to.equal(0);
        expect(qInfoResponse.question.scores[1]).to.equal(0);
        expect(qInfoResponse.question.scores[2]).to.equal(0);
        expect(qInfoResponse.question.extras[0]).to.equal(0);
        expect(qInfoResponse.question.extras[1]).to.equal(0);
        expect(qInfoResponse.question.extras[2]).to.equal(0);
        expect(qInfoResponse.totalVoters).to.equal(0);
        expect(qInfoResponse.hasVoted).to.equal(false);
      });

      it("Created question can be seen by their creators", async function () {
        // create test question and perform vote as an owner
        const questionID = await createTestQuestion();

        await registerUser(signer1);
        await registerUser(signer2);

        for(const acc of [owner, signer1, signer2]) {
          const totalUsers = await platformContract.connect(acc).totalUsers();
          const totalQuestions = await platformContract.connect(acc).totalQuestions();
          const questionInfo   = await platformContract.connect(acc).getQuestionInfo(questionID);

          expect(totalUsers).to.equal(3);
          expect(totalQuestions).to.equal(1);
          //
          expect(questionInfo.question.owner).to.equal(owner.address);
          expect(questionInfo.question.scores[0]).to.equal(0);
          expect(questionInfo.totalVoters).to.equal(0);
          expect(questionInfo.hasVoted).to.equal(false);
        }
      });

      it("Owner has proper 'hasVoted' dynamics", async function() {
        const questionID = await createTestQuestion();

        let qInfo = await platformContract.getQuestionInfo(questionID);
        //
        expect(qInfo.question.owner).to.equal(owner.address);
        expect(qInfo.question.scores[0]).to.equal(0);
        expect(qInfo.totalVoters).to.equal(0);
        expect(qInfo.hasVoted).to.equal(false);

        // perform vote
        await platformContract.vote(questionID, 0);

        // check results
        qInfo = await platformContract.getQuestionInfo(questionID);
        //
        expect(qInfo.question.owner).to.equal(owner.address);
        expect(qInfo.question.scores[0]).to.equal(1);
        expect(qInfo.totalVoters).to.equal(1);
        expect(qInfo.hasVoted).to.equal(true);
      });

      it("Registered users observe voting dynamics properly", async function() {
        // register all users
        await registerUser(signer1);
        await registerUser(signer2);

        // create question and vote as owner
        const qID = await createTestQuestion();
        //
        await platformContract.vote(qID, 0);

        // check states
        let ownerResp = await platformContract.connect(owner).getQuestionInfo(qID);
        let signer1Resp = await platformContract.connect(signer1).getQuestionInfo(qID);
        let signer2Resp = await platformContract.connect(signer2).getQuestionInfo(qID);
        // owner
        expect(ownerResp.question.scores[0]).to.equal(1);
        expect(ownerResp.question.scores[1]).to.equal(0);
        expect(ownerResp.question.scores[2]).to.equal(0);
        expect(ownerResp.totalVoters).to.equal(1);
        expect(ownerResp.hasVoted).to.equal(true);
        // signer1
        expect(signer1Resp.question.scores[0]).to.equal(1);
        expect(signer1Resp.question.scores[1]).to.equal(0);
        expect(signer1Resp.question.scores[2]).to.equal(0);
        expect(signer1Resp.totalVoters).to.equal(1);
        expect(signer1Resp.hasVoted).to.equal(false);
        // signer2
        expect(signer2Resp.question.scores[0]).to.equal(1);
        expect(signer2Resp.question.scores[1]).to.equal(0);
        expect(signer2Resp.question.scores[2]).to.equal(0);
        expect(signer2Resp.totalVoters).to.equal(1);
        expect(signer2Resp.hasVoted).to.equal(false);
      });

      it("Users correctly see old and new voted questions dynamically", async function() {
        // SCENARIO:
        // 1. register all
        // 2. create question as signer 2
        // 3. vote as signer 1
        //  - after check vote as owner and signer 2
        // 4. create new question as owner
        // 5. vote as signer 2 and owner
        //   - check all resutls

        // (1) register all users
        await registerUser(signer1);
        await registerUser(signer2);

        // (2) create question and vote as signer 2
        let qID = await createTestQuestion(signer2);
        // (3)
        await platformContract.connect(signer1).vote(0, 0); //ID should be 0

        // (3-) check states
        let ownerResp = await platformContract.connect(owner).getQuestionInfo(0);
        let signer1Resp = await platformContract.connect(signer1).getQuestionInfo(0);
        let signer2Resp = await platformContract.connect(signer2).getQuestionInfo(0);

        // owner
        expect(ownerResp.question.owner).to.equal(signer2.address);
        expect(ownerResp.question.scores[0]).to.equal(1);
        expect(ownerResp.question.scores[1]).to.equal(0);
        expect(ownerResp.question.scores[2]).to.equal(0);
        expect(ownerResp.totalVoters).to.equal(1);
        expect(ownerResp.hasVoted).to.equal(false);
        // signer1
        expect(signer1Resp.question.owner).to.equal(signer2.address);
        expect(signer1Resp.question.scores[0]).to.equal(1);
        expect(signer1Resp.question.scores[1]).to.equal(0);
        expect(signer1Resp.question.scores[2]).to.equal(0);
        expect(signer1Resp.totalVoters).to.equal(1);
        expect(signer1Resp.hasVoted).to.equal(true);
        // signer2
        expect(signer2Resp.question.owner).to.equal(signer2.address);
        expect(signer2Resp.question.scores[0]).to.equal(1);
        expect(signer2Resp.question.scores[1]).to.equal(0);
        expect(signer2Resp.question.scores[2]).to.equal(0);
        expect(signer2Resp.totalVoters).to.equal(1);
        expect(signer2Resp.hasVoted).to.equal(false);

        // (4) create new question as owner
        qID = await createTestQuestion(owner);  //ID should be 1

        // // (5) vote as singer 2 and owner (option 3)
        await platformContract.vote(1, 2);
        await platformContract.connect(signer2).vote(1, 2);

        // (5-) check results
        ownerResp = await platformContract.connect(owner).getQuestionInfo(1);
        signer1Resp = await platformContract.connect(signer1).getQuestionInfo(1);
        signer2Resp = await platformContract.connect(signer2).getQuestionInfo(1);

        // // owner
        expect(ownerResp.question.owner).to.equal(owner.address);
        expect(ownerResp.question.scores[0]).to.equal(0);
        expect(ownerResp.question.scores[1]).to.equal(0);
        expect(ownerResp.question.scores[2]).to.equal(2);
        expect(ownerResp.totalVoters).to.equal(2);
        expect(ownerResp.hasVoted).to.equal(true);
        // // signer1
        expect(signer1Resp.question.owner).to.equal(owner.address);
        expect(signer1Resp.question.scores[0]).to.equal(0);
        expect(signer1Resp.question.scores[1]).to.equal(0);
        expect(signer1Resp.question.scores[2]).to.equal(2);
        expect(signer1Resp.totalVoters).to.equal(2);
        expect(signer1Resp.hasVoted).to.equal(false);
        // // signer2
        expect(signer2Resp.question.owner).to.equal(owner.address);
        expect(signer2Resp.question.scores[0]).to.equal(0);
        expect(signer2Resp.question.scores[1]).to.equal(0);
        expect(signer2Resp.question.scores[2]).to.equal(2);
        expect(signer2Resp.totalVoters).to.equal(2);
        expect(signer2Resp.hasVoted).to.equal(true);
      });
    });

    context("# Anti-Churchil check", async function() {
      it("Cannot score same question more than once", async function(){
          const qID = await createTestQuestion();
          let resp = await platformContract.getQuestionInfo(qID);
          //
          // check initial state
          expect(resp.question.owner).to.equal(owner.address);
          expect(resp.question.scores[0]).to.equal(0);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(0);
          expect(resp.hasVoted).to.equal(false);

          // now perform vote and check state
          await platformContract.vote(qID, 0);
          //
          resp = await platformContract.getQuestionInfo(qID);
          expect(resp.question.owner).to.equal(owner.address);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);

          // now perform vote and expect failure
          try {
              await platformContract.vote(qID, 0);
              // this is where it should fail
              assert.fail("Shouldn't accept another vote.");
          } catch {
            // make sure score isn't changed
            //
            resp = await platformContract.getQuestionInfo(qID);
            expect(resp.question.owner).to.equal(owner.address);
            expect(resp.question.scores[0]).to.equal(1);
            expect(resp.question.scores[1]).to.equal(0);
            expect(resp.question.scores[2]).to.equal(0);
            expect(resp.totalVoters).to.equal(1);
            expect(resp.hasVoted).to.equal(true);
          }
      });

      it("Cannot provide another vote after vote", async function(){
          const qID = await createTestQuestion();

          // perform vote and check initial state
          await platformContract.vote(qID, 0);
          //
          let resp = await platformContract.getQuestionInfo(qID);
          expect(resp.question.owner).to.equal(owner.address);
          expect(resp.question.scores[0]).to.equal(1);
          expect(resp.question.scores[1]).to.equal(0);
          expect(resp.question.scores[2]).to.equal(0);
          expect(resp.totalVoters).to.equal(1);
          expect(resp.hasVoted).to.equal(true);

          // try scoring different option now
          try {
              await platformContract.accept(1);
              assert.fail("Should not accept different vote after a vote.");
          } catch (err) {
            resp = await platformContract.getQuestionInfo(qID);
            expect(resp.question.owner).to.equal(owner.address);
            expect(resp.question.scores[0]).to.equal(1);
            expect(resp.question.scores[1]).to.equal(0);
            expect(resp.question.scores[2]).to.equal(0);
            expect(resp.totalVoters).to.equal(1);
            expect(resp.hasVoted).to.equal(true);
          }
      });

      it("Cannot provide extra::none after a vote", async function(){
          const qID = await createTestQuestion();

          // perform vote and check initial state
          await platformContract.vote(qID, 0);
          //
          let resp = await platformContract.getQuestionInfo(qID);
          expect(resp.question.owner).to.equal(owner.address);
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
              await platformContract.voteExtra(0);
              assert.fail("Should not accept different vote after a vote.");
          } catch (err) {
            resp = await platformContract.getQuestionInfo(qID);
            expect(resp.question.owner).to.equal(owner.address);
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
        const qID = await createTestQuestion();

        // perform vote and check initial state
        await platformContract.vote(qID, 0);
        //
        let resp = await platformContract.getQuestionInfo(qID);
        expect(resp.question.owner).to.equal(owner.address);
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
            await platformContract.voteExtra(1);
            assert.fail("Should not accept different vote after a vote.");
        } catch (err) {
          resp = await platformContract.getQuestionInfo(qID);
          expect(resp.question.owner).to.equal(owner.address);
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
        const qID = await createTestQuestion();

          // perform vote and check initial state
          await platformContract.vote(qID, 0);
          //
          let resp = await platformContract.getQuestionInfo(qID);
          expect(resp.question.owner).to.equal(owner.address);
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
              await platformContract.voteExtra(0);
              assert.fail("Should not accept different vote after a vote.");
          } catch (err) {
            resp = await platformContract.getQuestionInfo(qID);
            expect(resp.question.owner).to.equal(owner.address);
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