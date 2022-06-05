const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const pollBase = await ethers.getContractFactory("VotingPlatform");
  const questionBase = await ethers.getContractFactory("PlatformQuestion");
  const baseOwner = (await ethers.getSigners())[0].address;

  const platformContract = await pollBase.deploy("Simple Voting Platform", baseOwner);
  const questionContract = await questionBase.deploy("New poll", "Description", ["option1", "option2"], baseOwner);

  // wait for actual deployment
  await platformContract.deployed();
  await questionContract.deployed();

  console.log("VotingPlatform contract deployed to:", platformContract.address);
  console.log("PlatformQuestion contract deployed to:", questionContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });