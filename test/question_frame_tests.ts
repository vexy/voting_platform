import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, assert } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Testing Suite :: [QuestionFrame contract]", async function() {
    let questionFrameContract: Contract;
    let signer1: SignerWithAddress;    //initially
    let signer2: SignerWithAddress;
    let signer3: SignerWithAddress;

    // adjust at will...
    const questionTitle  = "Question test title";
    const questionLabels = [ "Yes", "No", "Maybe" ];

    beforeEach(async function() {
        //get signers
        const allSigners = await ethers.getSigners();
        signer1 = allSigners[0];
        signer2 = allSigners[1];
        signer3 = allSigners[2];

        // wait for contract deployment
        const provider = await ethers.getContractFactory("QuestionFrame");
        questionFrameContract = await provider.deploy(signer1.address, questionTitle, questionLabels);
        await questionFrameContract.deployed();
    });

    context("# Scoring mechanics", async function() {
        it("Can accept question points", async function(){
            await questionFrameContract.accept(0);
            const newScore = await questionFrameContract.score(0);

            expect(newScore).to.equal(1);
        });

        it("Can retreive all points", async function(){
            const newScore = await questionFrameContract.score(0);
            const noneCount = await questionFrameContract.noneCount();
            const malformedCount = await questionFrameContract.malformedCount();
            const reportCount = await questionFrameContract.reportCount();

            expect(newScore).to.equal(0);
            expect(noneCount).to.equal(0);
            expect(malformedCount).to.equal(0);
            expect(reportCount).to.equal(0);
        });

        it("Can vote none-of-above", async function(){
            await questionFrameContract.none();
            const noneCount = await questionFrameContract.noneCount();

            expect(noneCount).to.equal(1);
        });

        it("Can vote malformed question", async function(){
            await questionFrameContract.malformed();
            const malformedCount = await questionFrameContract.malformedCount();

            expect(malformedCount).to.equal(1);
        });

        it("Can vote report question", async function(){
            await questionFrameContract.report();
            const reportedCount = await questionFrameContract.reportCount();

            expect(reportedCount).to.equal(1);
        });

        it("Can accept question points from many accounts", async function(){
            // score one point as owner
            await questionFrameContract.accept(0);
            expect(await questionFrameContract.score(0)).to.equal(1);

            // change signer and repeat
            await questionFrameContract.connect(signer2).accept(0);
            expect(await questionFrameContract.score(0)).to.equal(2);

            await questionFrameContract.connect(signer3).accept(0);
            expect(await questionFrameContract.score(0)).to.equal(3);

            //finally, make sure we count 3 different users
            expect(await questionFrameContract.totalVoters()).to.equal(3);
        });
    });

//@----

    context("# Anti-Churchil check", async function() {
        it("Cannot score same question multiple times", async function(){
            await questionFrameContract.accept(0);
            const newScore = await questionFrameContract.score(0);
            // check scoring
            expect(newScore).to.equal(1);

            try {
                //make another score attempt with same question
                await questionFrameContract.accept(0);
                assert.fail("Should not accept another vote.");
            } catch (err) {
                // if we arrived here, make sure score is recorded but not increased
                expect(newScore).to.equal(1);
                expect(newScore).not.to.equal(2);
            }
        });

        it("Cannot score multiple questions", async function(){
            await questionFrameContract.accept(0);

            const newScore0 = await questionFrameContract.score(0);
            const newScore1 = await questionFrameContract.score(1);

            // check the scoring
            expect(newScore0).to.equal(1);
            expect(newScore1).to.equal(0);

            try {
                //make another score attempt with different question
                await questionFrameContract.accept(1);
                assert.fail("Should not accept another vote from same address.");
            } catch (err) {
                // make sure score didnt change
                expect(newScore0).to.equal(1);
                expect(newScore1).to.equal(0);
            }
        });

        it("Cannot not vote after a vote (trippy huh :)", async function(){
            await questionFrameContract.accept(0);
            const newScore = await questionFrameContract.score(0);
            const noneCount = await questionFrameContract.noneCount();

            expect(newScore).to.equal(1);
            expect(noneCount).to.equal(0);

            try {
                //make another score attempt with different question
                await questionFrameContract.none();
                assert.fail("Should not accept not vote after a vote");
            } catch (err) {
                // if we arrived here, the test is successfull
                expect(newScore).to.equal(1);
                expect(noneCount).to.equal(0);
            }
        });

        it("Cannot malform after score", async function(){
            await questionFrameContract.accept(0);
            const newScore = await questionFrameContract.score(0);
            const malformedCount = await questionFrameContract.malformedCount();

            expect(newScore).to.equal(1);
            expect(malformedCount).to.equal(0);

            try {
                //make another score attempt with different question
                await questionFrameContract.malformed();
                assert.fail("Should not accept report after a vote");
            } catch (err) {
                // if we arrived here, the test is successfull
                expect(newScore).to.equal(1);
                expect(malformedCount).to.equal(0);
            }
        });

        it("Cannot report after score", async function(){
            await questionFrameContract.accept(0);
            const newScore = await questionFrameContract.score(0);
            const reportCount = await questionFrameContract.reportCount();

            expect(newScore).to.equal(1);
            expect(reportCount).to.equal(0);

            try {
                //make another score attempt with different question
                await questionFrameContract.report();
                assert.fail("Should not accept report after a vote");
            } catch (err) {
                // if we arrived here, the test is successfull
                expect(newScore).to.equal(1);
                expect(reportCount).to.equal(0);
            }
        });
    });

//@----

    context("# Voted/Not-voted states", async function() {
        it("Can recognize voter", async function() {
            // accept question and check integrity
            await questionFrameContract.accept(0);

            const questionScore = await questionFrameContract.score(0);
            const totalVoters = await questionFrameContract.totalVoters();
            const hasVoted = await questionFrameContract.hasVoted();
            //
            expect(questionScore).to.equal(1);
            expect(totalVoters).to.equal(1);
            expect(hasVoted).to.equal(true);
        });

        it("Can distinct voter and non voter", async function() {
            // accept question and check integrity
            await questionFrameContract.accept(0);
            //
            const questionScore = await questionFrameContract.score(0);
            const totalVoters = await questionFrameContract.totalVoters();
            expect(questionScore).to.equal(1);
            expect(totalVoters).to.equal(1);

            // check hasVoted flag for all other accounts
            const hasVotedSigner1 = await questionFrameContract.hasVoted();
            const hasVotedSigner2 = await questionFrameContract.connect(signer2).hasVoted();
            const hasVotedSigner3 = await questionFrameContract.connect(signer3).hasVoted();

            expect(hasVotedSigner1).to.equal(true);
            expect(hasVotedSigner2).to.equal(false);
            expect(hasVotedSigner3).to.equal(false);
        });

        it("HasVoted flag changes according to the voting dynamics", async function() {
            // accept question and check integrity
            await questionFrameContract.accept(0);
            //
            let questionScore = await questionFrameContract.score(0);
            let totalVoters = await questionFrameContract.totalVoters();
            //
            expect(questionScore).to.equal(1);
            expect(totalVoters).to.equal(1);

            // check hasVoted flag for all accounts
            let hasVotedSigner1 = await questionFrameContract.hasVoted();
            let hasVotedSigner2 = await questionFrameContract.connect(signer2).hasVoted();
            let hasVotedSigner3 = await questionFrameContract.connect(signer3).hasVoted();
            expect(hasVotedSigner1).to.equal(true);
            expect(hasVotedSigner2).to.equal(false);
            expect(hasVotedSigner3).to.equal(false);

            // perform vote as signer2
            // check score, total count and has voted flag for all accounts
            await questionFrameContract.connect(signer2).accept(0);
            //
            for( let acc of [signer1, signer2, signer3]) {
                questionScore = await questionFrameContract.connect(acc).score(0);
                totalVoters = await questionFrameContract.connect(acc).totalVoters();

                expect(questionScore).to.equal(2);
                expect(totalVoters).to.equal(2);
            }
            
            // check hasVoted flag for all accounts
            hasVotedSigner1 = await questionFrameContract.hasVoted();
            hasVotedSigner2 = await questionFrameContract.connect(signer2).hasVoted();
            hasVotedSigner3 = await questionFrameContract.connect(signer3).hasVoted();
            expect(hasVotedSigner1).to.equal(true);
            expect(hasVotedSigner2).to.equal(true);
            expect(hasVotedSigner3).to.equal(false);

            // lastly, perform vote as signer3 and
            // check score, total count and has voted flag for all accounts
            await questionFrameContract.connect(signer3).accept(0);
            //
            for( let acc of [signer1, signer2, signer3]) {
                questionScore = await questionFrameContract.connect(acc).score(0);
                totalVoters = await questionFrameContract.connect(acc).totalVoters();
                const hasVoted = await questionFrameContract.connect(acc).hasVoted();

                expect(questionScore).to.equal(3);
                expect(totalVoters).to.equal(3);
                expect(hasVoted).to.equal(true);
            }
        });

        it("Initialized question has proper initial state logic", async function() {
            for( let acc of [signer1, signer2, signer3]) {
                const questionScore = await questionFrameContract.connect(acc).score(0);
                const totalVoters = await questionFrameContract.connect(acc).totalVoters();
                const hasVoted = await questionFrameContract.connect(acc).hasVoted();

                expect(questionScore).to.equal(0);
                expect(totalVoters).to.equal(0);
                expect(hasVoted).to.equal(false);
            }
        });
    });

//@----

    context("# Question meta actions", async function() {
        it("Can edit question title", async function(){
            await questionFrameContract.editTitle('New question title');
            const rerturnedTitle = await questionFrameContract.getTitle();
    
            expect(rerturnedTitle).to.equal('New question title');
        });
    
        it("Can edit question description", async function(){
            await questionFrameContract.editDescription('New description');
            const returnedDescription = await questionFrameContract.getDescription();
    
            expect(returnedDescription).to.equal('New description');
        });

        it("Can return question owner", async function(){
            const questionOwner = await questionFrameContract.getOwner();

            expect(questionOwner).to.equal(signer1.address);
        });
    });
});