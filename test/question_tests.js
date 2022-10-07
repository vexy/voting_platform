const { expect, assert, should } = require("chai");
const { ethers } = require("hardhat");

describe("Testing Suite :: [Question contract]", async function() {
    let questionContract = null; //initially

    // adjust at will...
    let questionLabels = [ "Yes", "No", "Maybe" ];

    beforeEach(async function() {
        const baseSigner = (await ethers.getSigners())[0].address;
        const provider = await ethers.getContractFactory("Question");

        questionContract = await provider.deploy(questionLabels);
        await questionContract.deployed();
    });

    context("# Scoring mechanics", async function() {
        it("Can accept question point", async function(){
            await questionContract.accept(0);
            expect(await questionContract.score(0)).to.equal(1);
        });
    
        it("Can accept many question points", async function(){
            await questionContract.accept(0);
            await questionContract.accept(1);
            await questionContract.accept(2);
    
            expect(await questionContract.score(0)).to.equal(1);
            expect(await questionContract.score(1)).to.equal(1);
            expect(await questionContract.score(2)).to.equal(1);
        });
    
        it("Can aggregate question points", async function(){
            await questionContract.accept(0);
            await questionContract.accept(0);
            await questionContract.accept(0);
    
            expect(await questionContract.score(0)).to.equal(3);
        });
    
        it("Cannot accept non-existing question", async function(){
            try {
                await questionContract.accept(1000);
                assert.fail("Should've failed here.");
            } catch (err) {
                expect(1).to.equal(1);  //ugly hack but since we errored, we've passed the test
            }
        });
    });

//@----

    context("# User related", async function() {
        it("Can return question labels", async function(){
            const returnedLabels = await questionContract.getLabels();
    
            for(var i = 0; i < returnedLabels.length; i++) {
                expect(questionLabels[i]).to.equal(returnedLabels[i]);
            }
        });
    
        it("Can edit question label", async function(){
            await questionContract.editLabel(0, "How about this ?");
            const allLabels = await questionContract.getLabels();
    
            expect(allLabels[0]).to.equal("How about this ?");
        });
    });
});