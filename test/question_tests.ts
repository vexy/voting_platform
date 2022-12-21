import { Contract } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";


describe("Testing Suite :: [Question contract]", async function() {
    let questionContract: Contract;
    let signer1: SignerWithAddress;    //initially
    let signer2: SignerWithAddress;
    let signer3: SignerWithAddress;

    // adjust at will...
    const questionTitle  = 'Are up for something ?'
    const questionLabels = [ 'Yes', 'No', 'Maybe' ];

    beforeEach(async function() {
        //get signers
        const allSigners = await ethers.getSigners();
        signer1 = allSigners[0];
        signer2 = allSigners[1];
        signer3 = allSigners[2];

        // wait for contract deployment
        const factory = await ethers.getContractFactory("Question");
        questionContract = await factory.deploy(signer1.address, questionTitle, questionLabels);
        await questionContract.deployed();
    });

    context("# Proper initialization", async function() {
        it("Returns output after initialization", async function() {
            const response = await questionContract.produceQuestionMeta();

            expect(response.owner).to.equal(signer1.address);
            expect(response.title).to.equal(questionTitle);
            expect(response.description).to.equal('');
            expect(response.labels[0]).to.equal(questionLabels[0]);
            expect(response.labels[1]).to.equal(questionLabels[1]);
            expect(response.labels[2]).to.equal(questionLabels[2]);
            expect(response.scores[0]).to.equal(0);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(0);
        });

        it("Can edit description", async function() {
            const start = await questionContract.produceQuestionMeta();
            //
            await questionContract.editDescription('New description')
            //
            const end = await questionContract.produceQuestionMeta();

            expect(start.owner).to.equal(signer1.address);
            expect(start.title).to.equal(questionTitle);
            expect(start.description).to.equal('');
            expect(start.labels[0]).to.equal(questionLabels[0]);
            expect(start.labels[1]).to.equal(questionLabels[1]);
            expect(start.labels[2]).to.equal(questionLabels[2]);
            expect(start.scores[0]).to.equal(0);
            expect(start.scores[1]).to.equal(0);
            expect(start.scores[2]).to.equal(0);
            expect(start.extras[0]).to.equal(0);
            expect(start.extras[1]).to.equal(0);
            expect(start.extras[2]).to.equal(0);
            //
            expect(end.owner).to.equal(signer1.address);
            expect(end.title).to.equal(questionTitle);
            expect(end.description).to.equal('New description');
            expect(end.labels[0]).to.equal(questionLabels[0]);
            expect(end.labels[1]).to.equal(questionLabels[1]);
            expect(end.labels[2]).to.equal(questionLabels[2]);
            expect(end.scores[0]).to.equal(0);
            expect(end.scores[1]).to.equal(0);
            expect(end.scores[2]).to.equal(0);
            expect(end.extras[0]).to.equal(0);
            expect(end.extras[1]).to.equal(0);
            expect(end.extras[2]).to.equal(0);
        });
    });

    context("# Basic scoring mechanics", async function() {
        it("Can accept points", async function(){
            await questionContract.accept(0);

            const response = await questionContract.produceQuestionMeta();
            expect(response.scores[0]).to.equal(1);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
        });

        it("Can accept extra::none-of-above", async function(){
            await questionContract.acceptExtra(0);
            const response = await questionContract.produceQuestionMeta();

            expect(response.extras[0]).to.equal(1);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(0);
        });

        it("Can accept extra::malformed", async function(){
            await questionContract.acceptExtra(1);
            const response = await questionContract.produceQuestionMeta();

            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(1);
            expect(response.extras[2]).to.equal(0);
        });

        it("Can accept extra::report-question", async function(){
            await questionContract.acceptExtra(2);
            const response = await questionContract.produceQuestionMeta();

            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(1);
        });
    });

    context("# Multiple accounts access", async function() {
        it("Can accept points from many accounts", async function() {
            // perform vote as an owner (signer 1) and check results
            await questionContract.accept(0);
            let signer1Start = await questionContract.produceQuestionMeta();
            //
            expect(signer1Start.scores[0]).to.equal(1);

            // connect signer 2, vote and compare starting and ending states
            let signer2Start = await questionContract.connect(signer2).produceQuestionMeta();
            //
            await questionContract.connect(signer2).accept(0);
            //
            let signer2End = await questionContract.connect(signer2).produceQuestionMeta();
            let signer1End = await questionContract.produceQuestionMeta();  // owner infor
            //
            expect(signer2Start.scores[0]).to.equal(1);
            expect(signer2End.scores[0]).to.equal(2);
            expect(signer1End.scores[0]).to.equal(2);

            // connect signer 3 and repeat the process
            let signer3Start = await questionContract.connect(signer3).produceQuestionMeta();
            //
            await questionContract.connect(signer3).accept(0);
            //
            signer1End = await questionContract.produceQuestionMeta();
            signer2End = await questionContract.connect(signer2).produceQuestionMeta();
            let signer3End = await questionContract.connect(signer3).produceQuestionMeta();
            
            // check all accounts at this point
            expect(signer1End.scores[0]).to.equal(3);
            expect(signer2End.scores[0]).to.equal(3);
            expect(signer3Start.scores[0]).to.equal(2);
            expect(signer3End.scores[0]).to.equal(3);
        });

        it("Can accept extras from multiple accounts", async function() {
            // perform extra vote as an owner (signer 1) and check results
            await questionContract.acceptExtra(0);
            let signer1Start = await questionContract.produceQuestionMeta();
            //
            expect(signer1Start.scores[0]).to.equal(0);
            expect(signer1Start.scores[1]).to.equal(0);
            expect(signer1Start.scores[2]).to.equal(0);
            expect(signer1Start.extras[0]).to.equal(1);
            expect(signer1Start.extras[1]).to.equal(0);
            expect(signer1Start.extras[2]).to.equal(0);

            // connect signer 2, vote and compare starting and ending states
            let signer2Start = await questionContract.connect(signer2).produceQuestionMeta();
            //
            await questionContract.connect(signer2).acceptExtra(0);
            //
            let signer2End = await questionContract.connect(signer2).produceQuestionMeta();
            //
            expect(signer2Start.scores[0]).to.equal(0);
            expect(signer2Start.scores[1]).to.equal(0);
            expect(signer2Start.scores[2]).to.equal(0);
            expect(signer2Start.extras[0]).to.equal(1); //from owner
            expect(signer2Start.extras[1]).to.equal(0);
            expect(signer2Start.extras[2]).to.equal(0);
            expect(signer2End.scores[0]).to.equal(0);
            expect(signer2End.scores[1]).to.equal(0);
            expect(signer2End.scores[2]).to.equal(0);
            expect(signer2End.extras[0]).to.equal(2);  // signer2 extra score
            expect(signer2End.extras[1]).to.equal(0);
            expect(signer2End.extras[2]).to.equal(0);
            //
            // check owner at this point
            let signer1End = await questionContract.produceQuestionMeta();
            expect(signer1End.extras[0]).to.equal(2);

            // connect signer 3 and repeat the process
            let signer3Start = await questionContract.connect(signer3).produceQuestionMeta();
            //
            await questionContract.connect(signer3).acceptExtra(0);
            //
            let signer3End = await questionContract.connect(signer3).produceQuestionMeta();
            //
            expect(signer3Start.scores[0]).to.equal(0);
            expect(signer3Start.scores[1]).to.equal(0);
            expect(signer3Start.scores[2]).to.equal(0);
            expect(signer3Start.extras[0]).to.equal(2); //signer1 & 2
            expect(signer3Start.extras[1]).to.equal(0);
            expect(signer3Start.extras[2]).to.equal(0);
            expect(signer3End.scores[0]).to.equal(0);
            expect(signer3End.scores[1]).to.equal(0);
            expect(signer3End.scores[2]).to.equal(0);
            expect(signer3End.extras[0]).to.equal(3);
            expect(signer3End.extras[1]).to.equal(0);
            expect(signer3End.extras[2]).to.equal(0);
            //
            // check owner and signer 1 at this point
            signer1End = await questionContract.produceQuestionMeta();
            signer2End = await questionContract.connect(signer2).produceQuestionMeta();
            expect(signer1End.extras[0]).to.equal(3);
            expect(signer2End.extras[0]).to.equal(3);
        });
    });

// //@----

    context("# Voted/Not-voted states", async function() {
        it("Can recognize voter", async function() {
            // accept question and check integrity
            await questionContract.accept(0);
            const response = await questionContract.produceQuestionMeta()
            //
            expect(response.scores[0]).to.equal(1);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(0);
        });

        it("Initialized, non-voted question appears same for users all users", async function() {
            const signer1Resp = await questionContract.connect(signer1).produceQuestionMeta()
            const signer2Resp = await questionContract.connect(signer2).produceQuestionMeta()
            const signer3Resp = await questionContract.connect(signer3).produceQuestionMeta()
            
            // signer1
            expect(signer1Resp.scores[0]).to.equal(0);
            expect(signer1Resp.scores[1]).to.equal(0);
            expect(signer1Resp.scores[2]).to.equal(0);
            
            // signer2
            expect(signer2Resp.scores[0]).to.equal(0);
            expect(signer2Resp.scores[1]).to.equal(0);
            expect(signer2Resp.scores[2]).to.equal(0);

            // signer3
            expect(signer3Resp.scores[0]).to.equal(0);
            expect(signer3Resp.scores[1]).to.equal(0);
            expect(signer3Resp.scores[2]).to.equal(0);
        });
    });

// //@----

//     context("# Question meta actions", async function() {
//         it("Can edit question title", async function(){
//             await questionContract.editTitle('New question title');
//             const rerturnedTitle = await questionContract.getTitle();
    
//             expect(rerturnedTitle).to.equal('New question title');
//         });
    
//         it("Can edit question description", async function(){
//             await questionContract.editDescription('New description');
//             const returnedDescription = await questionContract.getDescription();
    
//             expect(returnedDescription).to.equal('New description');
//         });

//         it("Can return question owner", async function(){
//             const questionOwner = await questionContract.getOwner();

//             expect(questionOwner).to.equal(signer1.address);
//         });
//     });
});