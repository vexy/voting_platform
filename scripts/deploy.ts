import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  console.log(":: Compiling contracts");
  await hre.run('compile');
  console.log("- compilation completed\n");

  const platformFactory = await ethers.getContractFactory("MainPlatform");
  const baseOwner = (await ethers.getSigners())[0].address;

  // setup deployment and transaction holder
  const platform = await platformFactory.deploy(baseOwner);
  const depTxHash = platform.deployTransaction.hash;

  // wait for actual deployment
  console.log(":: Deploying contracts");
  await platform.deployed();
  console.log("- Deployment completed. Awaiting receipt...");
  const receipt = await ethers.provider.waitForTransaction(depTxHash);
  console.log("-- Receipt:");
  console.log("-- MainPlatform deployed to: ", receipt.contractAddress);
  console.log("-- Contract owner:\t", receipt.from);
}

// Execute the script...
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });