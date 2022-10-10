import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.9",
};

task("accounts", "Prints the list of available accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  console.log("~~ Available signers ~~");
  for (const account of accounts) {
    console.log("Address: ", account.address);
  }
});

export default config;

// See more: https://hardhat.org/guides/create-task.html
