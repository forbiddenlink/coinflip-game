require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { INFURA_API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  networks: {
    genache: {
      url: "http://127.0.0.1:7545",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
