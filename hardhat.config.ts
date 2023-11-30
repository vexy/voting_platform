import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config();

const { API_KEY, PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

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
  defaultNetwork: "hardhat", //used for testing
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [`0x${PRIVATE_KEY}`]
    },
    alchemy_polygon_mumbai: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: API_KEY
  },
};

task("accounts", "Prints the list of available accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  console.log("~~ Available signers ~~");
  for (const account of accounts) {
    const weiBalance = await hre.ethers.provider.getBalance(account.address);
    const etherBalance = hre.ethers.formatEther(weiBalance);
    console.log(`Address: ${account.address}, ballance: ${etherBalance} ETH (${weiBalance} wei)`);
  }
});

export default config;

// See more: https://hardhat.org/guides/create-task.html
