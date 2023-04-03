const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("TZ2H");

  const param1 = "0x451C3E745909e510cC93B6819F8958458055E361";
  const token = await Token.deploy(param1);
  await token.deployed();

  console.log(`owner address: ${owner.address}`);
  console.log(`Deployed token address: ${token.address}`);
  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await token.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  console.log(`Contract deployed to ${token.address} on ${network.name}`);
  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: token.address,
    constructorArguments: [param1],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
