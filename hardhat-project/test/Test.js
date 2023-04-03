const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("St0xC0deNFT", function () {
  let factory, contract, owner, user, recipient;
  beforeEach(async function () {
    [owner, user, recipient] = await ethers.getSigners();
    factory = await ethers.getContractFactory("St0xC0deNFT");
    contract = await factory.deploy("none");

    const value = ethers.utils.parseEther("0.001");
    // await contract.connect(user).safeMint({ value: value });
  });

  it("Should have 'none' after deployment", async function () {
    console.log(`Contract owner address: ${owner.address}`);
    console.log(`Contract user address: ${user.address}`);
    console.log(`Contract address: ${contract.address}`);

    const expectedBaseURI = "none";
    const baseURI = await contract.baseURI();
    assert.equal(expectedBaseURI, baseURI);
  });

  it("Should update baseURI", async function () {
    const newUri = "ipfs://QmXmgzwDqrbQ9YNV4WQroqqLY9GaGtvzWBrUJy1eL4sMPL/";
    await contract.setBaseURI(20, newUri);
    const currentBaseURI = await contract.baseURI();
    expect(newUri).to.be.equal(currentBaseURI);
  });

  it("Should update setMaxSupply", async function () {
    const newMaxSupply = 500;
    await contract.setMaxSupply(newMaxSupply);
    const currentMaxSupply = await contract.MAX_SUPPLY();
    expect(newMaxSupply).to.be.equal(currentMaxSupply);
  });

  it("Should revert if sent ether value is not correct", async function () {
    const value = ethers.utils.parseEther("0.000001");
    await expect(
      contract.connect(owner).safeMint({ value: value })
    ).to.be.revertedWith("Ether value sent is not correct");
  });

  it("Should mint NFT to sender if conditions are met", async function () {
    const initialBalance = await contract.balanceOf(owner.address);
    console.log(`Contract initialBalance for owner: ${initialBalance}`);

    const value = ethers.utils.parseEther("0.001");
    await contract.connect(owner).safeMint({ value: value });

    const finalBalance = await contract.balanceOf(owner.address);
    expect(finalBalance).to.equal(initialBalance.add(1));
  });

  it("Should revert if the sender has already minted an NFT", async function () {
    const value = ethers.utils.parseEther("0.001");
    await contract.connect(owner).safeMint({ value: value });
    await expect(
      contract.connect(owner).safeMint({ value: value })
    ).to.be.revertedWith("Mint is not available for you");
  });

  it("Should update royaltyFee", async function () {
    const newRoyaltyFee = 5000;
    await contract.setRoyaltyFee(newRoyaltyFee);
    const currentFee = await contract.royaltyFee();
    expect(newRoyaltyFee).to.be.equal(currentFee);
  });

  //   it("Should return the contract balance", async function () {
  //     const contractAddress = contract.address;
  //     const balance = await ethers.provider.getBalance(contractAddress);
  //     console.log(`Contract balance: ${balance}`);

  //     assert(balance.gt(0), "Contract balance should be greater than zero");
  //   });

  //   it("Should transfer NFT from user to user", async function () {
  //     const tokenId = 0;
  //     expect(await contract.ownerOf(tokenId)).to.equal(user.address);
  //     await contract.transferFrom(user.address, recipient.address, tokenId);
  //     expect(await contract.ownerOf(tokenId)).to.equal(recipient.address);
  //   });

  //   it("Should returns the correct royalty information", async function () {
  //     const tokenId = 0;
  //     const salePrice = ethers.utils.parseEther("0.001");
  //     const [receiver, royaltyAmount] = await contract.royaltyInfo(
  //       tokenId,
  //       salePrice
  //     );
  //     expect(receiver).to.equal(user.address);
  //     expect(royaltyAmount).to.equal(
  //       salePrice.div(10000).mul(contract.royaltyFee)
  //     );
  //   });

  it("Should withdraw Ethers", async function () {
    await contract.connect(owner).withdraw();
    const contractAddress = contract.address;
    const balance = await ethers.provider.getBalance(contractAddress);
    assert.equal(balance, 0);
  });
});
