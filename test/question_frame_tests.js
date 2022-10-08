const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Testing Suite :: [QuestionFrame contract]", async function() {
    let questionFrameContract = null; //initially
    let baseSigner = null;    //initially

    // adjust at will...
    let questionLabels = [ "Yes", "No", "Maybe" ];

    beforeEach(async function() {
        baseSigner = (await ethers.getSigners())[0].address;
        const provider = await ethers.getContractFactory("QuestionFrame");

        // wait for contract deployment
        questionFrameContract = await provider.deploy("Question title", questionLabels);
        await questionFrameContract.deployed();
    });

    context("# Scoring mechanics", async function() {
        it("Can accept question points", async function(){
            //TBD
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

            expect(questionOwner).to.equal(baseSigner);
        });
    });
});