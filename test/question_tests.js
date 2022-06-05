const { expect } = require("chai");
const { parseBytes32String } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("[Question] :: Contract Testing Suite", async function() {
    let questionContract = null; //initially

    beforeEach(async function() {
        const baseSigner = (await ethers.getSigners())[0].address;
        const provider = await ethers.getContractFactory("PlatformQuestion");

        questionContract = await provider.deploy("New poll", "Description", ["item1", "item2"], baseSigner);
        await questionContract.deployed();
    });

    it("Can vote for a question", async function(){
        await questionContract.voteFor(1);
        expect(await questionContract.totalVotesCount()).to.equal(1);
    });
});