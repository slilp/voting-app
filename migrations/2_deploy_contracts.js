const PublicVoting = artifacts.require("PublicVoting");

module.exports = function (deployer) {
  deployer.deploy(PublicVoting);
};
