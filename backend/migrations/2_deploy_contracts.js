const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  deployer.deploy(MyToken, web3.utils.toWei('10000', 'ether')).then((instance) => {
    console.log('Contract deployed at address:', instance.address);
  });
};

