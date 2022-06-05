const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("[VotingPlatform] :: Contract Testing Suite ::", async function () {
  let votingPlatform = null;   // shared contract object
  let lastQuestionID = 0;

  beforeEach(async function () {
    // get initial signer
    const baseSigner = (await ethers.getSigners())[0].address;

    // setup base contract and wait for actuall deployment
    votingPlatform = await (await ethers.getContractFactory("VotingPlatform")).deploy("Test Platform", baseSigner);
    await votingPlatform.deployed();
  });

  it("Can initialize properly", async function() {
    expect(await votingPlatform.platformName()).to.equal("Test Platform");
  });

  it("Contains 0 questions and voters initially", async function() {
    expect(await votingPlatform.totalVoters()).to.equal(0);
    expect(await votingPlatform.totalQuestions()).to.equal(0);
  });

  it("Can add new question", async function() {
    // create simple question
    const questionOptions = [
      "Are you ready ?",
      "Are you trully ready ?",
      "Are you really really ready ?"
    ];

    //add new question to pool of questions
    const result = await votingPlatform.addQuestion("New poll", "Basic poll test", questionOptions);
    const totalCount = await votingPlatform.totalQuestions();
    
    // check for ID > 0 and increased total question count
    expect(result).to.equal(true);
    expect(totalCount).to.equal(1);

    //copy newely created pollID for future use
    lastQuestionID = result;
  });

  it("Can vote for specific question option", async function(){
    await votingPlatform.voteQuestionOption(lastQuestionID, 1);
  });
});