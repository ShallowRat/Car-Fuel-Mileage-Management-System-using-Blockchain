const mileage = artifacts.require('../contracts/Mileage.sol');

module.exports = function(deployer) {
    deployer.deploy(mileage);
}