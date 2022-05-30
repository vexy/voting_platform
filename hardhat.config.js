/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.13",
};

require("@nomiclabs/hardhat-waffle");
task("accounts", "Prints the list of available accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// See more: https://hardhat.org/guides/create-task.html
