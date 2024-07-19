// migrations/2_deploy_contracts.js
const StringStorage = artifacts.require("StringStorage");

module.exports = function (deployer) {
  deployer.deploy(StringStorage);
};
