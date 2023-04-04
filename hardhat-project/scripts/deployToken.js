const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("T0xC");

  const param1 = "0xEFa93A2839BDCda7416EA0E29e536a55b9109EA9";
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
