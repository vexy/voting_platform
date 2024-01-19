import { Contract } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";

describe("Testing Suite :: [Question contract]", async function() {
    let question_contract: Contract;
    let signer1: SignerWithAddress;    //initially
    let signer2: SignerWithAddress;
    let signer3: SignerWithAddress;

    // adjust at will...
    const questionTitle  = 'Are up for something ?'
    const questionLabels = [ 'Yes', 'No', 'Maybe' ];
    const contract_arguments = [questionTitle, questionLabels];

    beforeEach(async function() {
        const allSigners = await ethers.getSigners();
        signer1 = allSigners[0];
        signer2 = allSigners[1];
        signer3 = allSigners[2];

        // start contract deployment
        question_contract = await ethers.deployContract("Question", contract_arguments, signer1);
        const p = await ethers.deployContract("Question", contract_arguments, signer1);
    });

    context("# Correct initialization", async function() {
        it("Returns proper title", async function() {
            const response = await question_contract.constructMetaModel();

            expect(response.title).to.equal(questionTitle);
        });

        it("Returns proper question options", async function() {
            const response = await question_contract.constructMetaModel();

            expect(response.options[0]).to.equal(questionLabels[0]);
            expect(response.options[1]).to.equal(questionLabels[1]);
            expect(response.options[2]).to.equal(questionLabels[2]);
        });

        it("Returns initial score (0)", async function() {
            const response = await question_contract.constructMetaModel();

            expect(response.scores[0]).to.equal(0);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
        });

        it("Returns initial extras (0)", async function() {
            const response = await question_contract.constructMetaModel();

            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(0);
        });
    });

    context("# Basic scoring mechanics", async function() {
        it("Can accept vote", async function(){
            await question_contract.score(0);
            const response = await question_contract.constructMetaModel();

            expect(response.scores[0]).to.equal(1);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
        });

        it("Can accept extra::none-of-above", async function(){
            await question_contract.extra(0);
            const response = await question_contract.constructMetaModel();

            expect(response.scores[0]).to.equal(0);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
            expect(response.extras[0]).to.equal(1);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(0);
        });

        it("Can accept extra::malformed", async function(){
            await question_contract.extra(1);
            const response = await question_contract.constructMetaModel();

            expect(response.scores[0]).to.equal(0);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(1);
            expect(response.extras[2]).to.equal(0);
        });

        it("Can accept extra::report-question", async function(){
            await question_contract.extra(2);
            const response = await question_contract.constructMetaModel();

            expect(response.scores[0]).to.equal(0);
            expect(response.scores[1]).to.equal(0);
            expect(response.scores[2]).to.equal(0);
            expect(response.extras[0]).to.equal(0);
            expect(response.extras[1]).to.equal(0);
            expect(response.extras[2]).to.equal(1);
        });
    });

    context("# Sanity and overflow checks", async function() {
        it("Does not accept illegal vote option::CHECK 1", async function () {
            try {
                await question_contract.score(100);
                expect.fail("Illegal score accepted.");
            } catch { } // it's expected to fail so just proceed and pass the test
        });

        it("Does not accept illegal vote option::CHECK 2", async function () {
            try {
                await question_contract.score(-1);
                expect.fail("Illegal score accepted.");
            } catch { } // it's expected to fail so just proceed and pass the test
        });

        it("Does not accept illegal extra option::CHECK 1", async function () {
            try {
                await question_contract.extra(100);
                expect.fail("Illegal extra accepted");
            } catch { } // it's expected to fail so just proceed and pass the test
        });

        it("Does not accept illegal extra option::CHECK 2", async function () {
            try {
                await question_contract.extra(-1);
                expect.fail("Illegal score accepted");
            } catch { } // it's expected to fail so just proceed and pass the test
        });
    });

    context("# Multiple accounts access", async function() {
        it("Can accept points from many accounts", async function() {
            // perform vote as an owner (signer 1) and check results
            await question_contract.score(0);
            let signer1Start = await question_contract.constructMetaModel();
            //
            expect(signer1Start.scores[0]).to.equal(1);

            // connect signer 2, vote and compare starting and ending states
            let signer2Start = await question_contract.connect(signer2).constructMetaModel();
            await question_contract.connect(signer2).score(0);
            //
            let signer2End = await question_contract.connect(signer2).constructMetaModel();
            let signer1End = await question_contract.constructMetaModel();  // owner infor
            //
            expect(signer2Start.scores[0]).to.equal(1);
            expect(signer2End.scores[0]).to.equal(2);
            expect(signer1End.scores[0]).to.equal(2);

            // connect signer 3 and repeat the process
            let signer3Start = await question_contract.connect(signer3).constructMetaModel();
            //
            await question_contract.connect(signer3).score(0);
            //
            signer1End = await question_contract.constructMetaModel();
            signer2End = await question_contract.connect(signer2).constructMetaModel();
            let signer3End = await question_contract.connect(signer3).constructMetaModel();
            
            // check all accounts at this point
            expect(signer1End.scores[0]).to.equal(3);
            expect(signer2End.scores[0]).to.equal(3);
            expect(signer3Start.scores[0]).to.equal(2);
            expect(signer3End.scores[0]).to.equal(3);
        });

        it("Can accept extras from multiple accounts", async function() {
            // perform extra vote as an signer 1 and check results
            await question_contract.extra(0);
            let signer1Start = await question_contract.constructMetaModel();
            //
            expect(signer1Start.scores[0]).to.equal(0);
            expect(signer1Start.scores[1]).to.equal(0);
            expect(signer1Start.scores[2]).to.equal(0);
            expect(signer1Start.extras[0]).to.equal(1);
            expect(signer1Start.extras[1]).to.equal(0);
            expect(signer1Start.extras[2]).to.equal(0);

            // connect signer 2, vote and compare starting and ending states
            let signer2Start = await question_contract.connect(signer2).constructMetaModel();
            //
            await question_contract.connect(signer2).extra(0);
            //
            let signer2End = await question_contract.connect(signer2).constructMetaModel();
            //
            expect(signer2Start.scores[0]).to.equal(0);
            expect(signer2Start.scores[1]).to.equal(0);
            expect(signer2Start.scores[2]).to.equal(0);
            expect(signer2Start.extras[0]).to.equal(1); //from signer1
            expect(signer2Start.extras[1]).to.equal(0);
            expect(signer2Start.extras[2]).to.equal(0);
            expect(signer2End.scores[0]).to.equal(0);
            expect(signer2End.scores[1]).to.equal(0);
            expect(signer2End.scores[2]).to.equal(0);
            expect(signer2End.extras[0]).to.equal(2);   //signer2 extra score
            expect(signer2End.extras[1]).to.equal(0);
            expect(signer2End.extras[2]).to.equal(0);
            //
            // check signer at this point
            let signer1End = await question_contract.constructMetaModel();
            expect(signer1End.extras[0]).to.equal(2);   //signer1 confirms 2 points as well

            // connect signer 3 and repeat the process
            let signer3Start = await question_contract.connect(signer3).constructMetaModel();
            //
            await question_contract.connect(signer3).extra(0);
            //
            let signer3End = await question_contract.connect(signer3).constructMetaModel();
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
            expect(signer3End.extras[0]).to.equal(3);   //signer3 extra point
            expect(signer3End.extras[1]).to.equal(0);
            expect(signer3End.extras[2]).to.equal(0);
            //
            // check signer1 and signer2 at this point
            signer1End = await question_contract.constructMetaModel();
            signer2End = await question_contract.connect(signer2).constructMetaModel();
            expect(signer1End.extras[0]).to.equal(3);
            expect(signer2End.extras[0]).to.equal(3);
        });
    });
});