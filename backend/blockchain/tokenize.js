const { web3, contract } = require('./config');

const createProjectTokens = async (projectId, targetAmount, smallestTokenAmount, startDate, endDate) => {
  const numberOfTokens = Math.ceil(targetAmount / smallestTokenAmount / 10) * 10;

  const tx = contract.methods.createProjectTokens(projectId, numberOfTokens, startDate, endDate);
  const gas = await tx.estimateGas({ from: '0xYourAccountAddress' });
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount('0xYourAccountAddress');

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data,
      gas,
      nonce,
      chainId: web3.utils.toHex(1),
    },
    'YOUR_PRIVATE_KEY'
  );

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

const distributeFunds = async (projectId) => {
  const tx = contract.methods.distributeFunds(projectId);
  const gas = await tx.estimateGas({ from: '0xYourAccountAddress' });
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount('0xYourAccountAddress');

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data,
      gas,
      nonce,
      chainId: web3.utils.toHex(1),
    },
    'YOUR_PRIVATE_KEY'
  );

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

module.exports = {
  createProjectTokens,
  distributeFunds,
};
