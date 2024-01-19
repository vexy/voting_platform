import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  console.log("\x1b[42m\x1b[37m:: Contract compilation\x1b[0m");
  console.log("- \x1b[33mCompiling contracts...\x1b[0m");
  await hre.run('compile');
  console.log(":: Contract compilation \x1b[32m\x1b[1mcompleted.\x1b[0m\n");

  const platformFactory = await ethers.getContractFactory("MainPlatform");
  const baseOwner = (await ethers.getSigners())[0].address;

  // setup deployment and transaction holder
  console.log("\x1b[42m\x1b[37m:: Contract deployment\x1b[0m");
  console.log("- \x1b[33mDeploying contract...\x1b[0m");
  const mainPlatform = await platformFactory.deploy(baseOwner);
  await mainPlatform.waitForDeployment()
  //
  const contractAddress = await mainPlatform.getAddress();
  const depTxHash = mainPlatform.deploymentTransaction();

  console.log("- Deployment completed, results:");
  console.log(`-- Contract [MainPlatform] address: \x1b[1m\x1b[34m${contractAddress}\x1b[0m`);
  console.log(`-- Deployment transaction  hash: \x1b[1m\x1b[34m${depTxHash?.hash}\x1b[0m`);
  console.log(":: Contract deployment \x1b[32m\x1b[1mcompleted.\x1b[0m");
}

// Execute the script...
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });