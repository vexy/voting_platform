import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  // defaultNetwork: "mumbai", //used for testing
  networks: {
    hardhat: {},
    // mumbai: {
    //   url: "some.url.goes.here",
    //   accounts: ["some.accounts.go.here"]
    // }
  }
};

task("accounts", "Prints the list of available accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  console.log("~~ Available signers ~~");
  for (const account of accounts) {
    const weiBalance = await hre.ethers.provider.getBalance(account.address);
    const etherBalance = hre.ethers.utils.formatEther(weiBalance);
    console.log(`Address: ${account.address}, ballance: ${etherBalance} ETH (${weiBalance} wei)`);
  }
});

task("dpl", "Deploys contracts using specified address")
  .addParam("address", "Address to use during deployment")
  .setAction(async(taskArgs) => {
    console.log("Hello, everything will be deployed using: ", taskArgs.address);
});

export default config;

// See more: https://hardhat.org/guides/create-task.html
