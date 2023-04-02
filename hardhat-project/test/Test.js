const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("NFT_BootCamp_CIS", function () {
  let noteFactory, contract;
  beforeEach(async function () {
    noteFactory = await ethers.getContractFactory("NFT_BootCamp_CIS");
    contract = await noteFactory.deploy("none");
  });

  it("Should have 'none' after deployment", async function () {
    const expectedBaseURI = "none";
    const baseURI = await contract.baseURI();
    assert.equal(expectedBaseURI, baseURI);
  });

  it("Should update baseURI", async function () {
    const newUri = "ipfs://QmXmgzwDqrbQ9YNV4WQroqqLY9GaGtvzWBrUJy1eL4sMPL/";
    await contract.setBaseURI(newUri);
    const currentBaseURI = await contract.baseURI();
    expect(newUri).to.be.equal(currentBaseURI);
  });

  it("Should update setMaxSupply", async function () {
    const newMaxSupply = 500;
    await contract.setMaxSupply(newMaxSupply);
    const currentaxSupply = await contract.MAX_SUPPLY();
    expect(newMaxSupply).to.be.equal(currentaxSupply);
  });

  //TODO
  it("Should revert if string has less than 5 characters", async function () {
    await expect(contract.setNote("Dias")).to.be.revertedWith(
      "Should have at least 5 characters"
    );
  });

  it("Should emit event for setnote function", async function () {
    await expect(contract.setNote("Dias Note")).to.emit(
      contract,
      "NoteSubmitted"
    );
  });
});
