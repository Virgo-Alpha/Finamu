const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d83ca82ca706430eb2c16878fd99287f'));

const contractABI = []; // Add your contract ABI here
const contractAddress = '0xYourSmartContractAddress';

const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = {
  web3,
  contract,
};
