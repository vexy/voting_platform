const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const pollBase = await ethers.getContractFactory("PollBase");
  const pb_contract = await pollBase.deploy("Simple Voting");

  // wait for actual deployment
  await pb_contract.deployed();

  console.log("PollBase contract deployed to:", pb_contract.address);
  console.log("PollBase blockchain name:", await pb_contract.publicName());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });