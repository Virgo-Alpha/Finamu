const { Web3 } = require('web3');
const MyToken = require('../build/contracts/MyToken.json');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID));

const deployProjectContract = async (targetAmount, startDate, endDate) => {
  const contract = new web3.eth.Contract(MyToken.abi);
  const deploy = contract.deploy({
    data: MyToken.bytecode,
    arguments: [targetAmount] // Pass constructor arguments if any
  });

  const gas = await deploy.estimateGas();
  const tx = {
    data: deploy.encodeABI(),
    gas
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt.contractAddress; // This is the deployed contract address
};

module.exports = {
  deployProjectContract
};
