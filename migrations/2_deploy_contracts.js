const PublicVoting = artifacts.require("PublicVoting");

module.exports = async function (deployer) {
  await deployer.deploy(PublicVoting);
};
