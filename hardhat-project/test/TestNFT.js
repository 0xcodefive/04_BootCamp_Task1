const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("NFT0xC0de", function () {
  let factory, contract, owner, user, recipient;
  beforeEach(async function () {
    [owner, user, recipient] = await ethers.getSigners();
    factory = await ethers.getContractFactory("NFT0xC0de");
    contract = await factory.deploy("none");
  });

  it("Should have 'none' after deployment", async function () {
    console.log(`Owner address: ${owner.address}`);
    console.log(`User address: ${user.address}`);
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
    const initialBalance = await contract.balanceOf(user.address);
    const value = ethers.utils.parseEther("0.001");
    await contract.connect(user).safeMint({ value: value });
    const finalBalance = await contract.balanceOf(user.address);
    expect(finalBalance).to.equal(initialBalance.add(1));
  });

  it("Should revert if the sender has already minted an NFT", async function () {
    const value = ethers.utils.parseEther("0.001");
    await contract.connect(recipient).safeMint({ value: value });
    await expect(
      contract.connect(recipient).safeMint({ value: value })
    ).to.be.revertedWith("Mint is not available for you");
  });

  it("Should update royaltyFee", async function () {
    const newRoyaltyFee = 5000;
    await contract.setRoyaltyFee(newRoyaltyFee);
    const currentFee = await contract.royaltyFee();
    expect(newRoyaltyFee).to.be.equal(currentFee);
  });

  it("Should transfer NFT from user to user", async function () {
    const tokenId = 0;
    await contract
      .connect(owner)
      .transferFrom(owner.address, recipient.address, tokenId);
    expect(await contract.ownerOf(tokenId)).to.equal(recipient.address);

    await contract
      .connect(recipient)
      .transferFrom(recipient.address, owner.address, tokenId);
    expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
  });

  it("Should withdraw Ethers", async function () {
    await contract.connect(owner).withdraw();
    const contractAddress = contract.address;
    const balance = await ethers.provider.getBalance(contractAddress);
    assert.equal(balance, 0);
  });

  it("Should approve Owner to transfer token", async function () {
    const address = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed";
    await contract.connect(owner).approve(address, 0);
    expect(await contract.getApproved(0)).to.equal(address);
  });

  it("Should emit Received event on receiving Ether", async function() {
    const transaction = {
      to: contract.address,
      value: ethers.utils.parseEther("1.0")
    };
    await owner.sendTransaction(transaction);

    const events = await contract.queryFilter("Received");
    expect(events.length).to.equal(1);
    expect(events[0].args[0]).to.equal(owner.address);
    expect(events[0].args[1]).to.equal(transaction.value);
  });
});
