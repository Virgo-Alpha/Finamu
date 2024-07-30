const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  deployer.deploy(MyToken, 1000000); // Deploy with 1,000,000 initial supply
};
