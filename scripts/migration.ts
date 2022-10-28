import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const platformFactory = await ethers.getContractFactory("MainPlatform");
  const baseOwner = (await ethers.getSigners())[0].address;

  const platform = await platformFactory.deploy(baseOwner);
  const depTxHash = platform.deployTransaction.hash;

  // wait for actual deployment
  console.log("Starting deployment....");
  await platform.deployed();
  console.log("Deplyoment completed. Awaiting receipt...");

  const receipt = await ethers.provider.waitForTransaction(depTxHash);
  console.log("MainPlatform deployed to address:", receipt.contractAddress);
  console.log("Contract owner: ", receipt.from);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });