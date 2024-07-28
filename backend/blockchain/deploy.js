const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// ! Find a way to keep ganache-cli always open, like node server.js
const startGanache = () => {
  return new Promise((resolve, reject) => {
    const ganache = spawn('ganache-cli', ['--port', '8545', '--networkId', '5777']); // Customize port and networkId as needed

    ganache.stdout.on('data', (data) => {
      console.log(`Ganache: ${data}`);
      if (data.toString().includes('Listening on')) {
        resolve(ganache); // Resolve with the ganache process
      }
    });
  })};

const deployContractWithExecFile = async () => {
  return new Promise((resolve, reject) => {
    execFile('truffle', ['migrate', '--network', 'development'], (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during contract deployment: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

// stop ganache
const stopGanache = (ganache) => {
  return new Promise((resolve, reject) => {
    ganache.kill('SIGINT');
    ganache.on('close', (code) => {
      console.log(`Ganache process exited with code ${code}`);
      resolve();
    });
  });
};

const deployProjectContract = async () => {
  try {
    // Start Ganache
    const ganache = await startGanache();

    // Deploy using Truffle and execFile
    await deployContractWithExecFile();

    // Read the contract ABI and address
    const contractPath = path.join(__dirname, '../build/contracts/MyToken.json');
    const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    
    const outputFilePath = path.join(__dirname, 'contractData.json');

    // Store the contract data in a file for debugging purposes
    fs.writeFile(outputFilePath, JSON.stringify(contractData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Contract data saved to', outputFilePath);
      }
    });

    const contractAddress = contractData.networks["1722053871845"].address;

    console.log(`Contract deployed at address: ${contractAddress}`);

    // Stop Ganache
    await stopGanache(ganache);

    return contractAddress;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

module.exports = {
  deployProjectContract
};
