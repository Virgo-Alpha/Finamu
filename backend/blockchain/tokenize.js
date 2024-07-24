require('dotenv').config();
const { web3, contract } = require('./config');

const accountAddress = process.env.ACCOUNT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

const createProjectTokens = async (projectId, targetAmount, smallestTokenAmount, startDate, endDate) => {
  const numberOfTokens = Math.ceil(targetAmount / smallestTokenAmount / 10) * 10;

  const tx = contract.methods.createProjectTokens(projectId, numberOfTokens, startDate, endDate);
  const gas = await tx.estimateGas({ from: accountAddress });
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contract.options.address,
      data,
      gas,
      nonce,
      chainId: web3.utils.toHex(1),
    },
    privateKey
  );

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

const distributeFunds = async (projectId) => {
  const tx = contract.methods.distributeFunds(projectId);
  const gas = await tx.estimateGas({ from: accountAddress });
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contract.options.address,
      data,
      gas,
      nonce,
      chainId: web3.utils.toHex(1),
    },
    privateKey
  );

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

module.exports = {
  createProjectTokens,
  distributeFunds,
};
