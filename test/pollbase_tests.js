const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("[PollBase] Contract Testing Suite", async function () {
  var pb_contract = null;   // shared contract object

  beforeEach(async function () {
    pb_contract = await (await ethers.getContractFactory("PollBase")).deploy("TEST_NAME");
    // wait for actual deployment
    await pb_contract.deployed();
  });

  it("Can initialize properly", async function() {
    expect(await pb_contract.publicName()).to.equal("TEST_NAME");
  });

  it("Can greet with correct static message", async function() {
    expect(await pb_contract.greet()).to.equal("Very simple poll");
  });

});