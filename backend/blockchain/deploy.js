const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const compileAndDeployWithTruffle = async () => {
  return new Promise((resolve, reject) => {
    exec('truffle compile && truffle migrate --network development', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during contract deployment: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

const deployProjectContract = async (targetAmount, startDate, endDate) => {
  try {
    // Compile and deploy using Truffle
    await compileAndDeployWithTruffle();

    // Read the contract ABI and address
    const contractPath = path.join(__dirname, '../build/contracts/MyToken.json');
    const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    const contractABI = contractData.abi;
    const contractAddress = contractData.networks['5777'].address; // Replace '5777' with your network ID

    console.log(`Contract deployed at address: ${contractAddress}`);

    // Here you would use the deployed contract's address in your application logic
    // For example, storing it in a database or using it to interact with the contract

    return contractAddress;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

module.exports = {
  deployProjectContract
};
