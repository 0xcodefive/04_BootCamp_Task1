# Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Coverage

```shell
npm install --save-dev solidity-coverage
```

Need to add the appropriate configuration to the file hardhat.config.js

```js
module.exports = {
  ...
  solidity: {
    ...
  },
  coverage: {
    exclude: ["test/", "node_modules/"],
  },
};
```

Then:

```shell
npx hardhat coverage
```

Result:

```shell
  NFT0xC0de
Owner address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
User address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    ✔ Should have 'none' after deployment
    ✔ Should update baseURI
    ✔ Should update setMaxSupply
    ✔ Should revert if sent ether value is not correct (38ms)
    ✔ Should mint NFT to sender if conditions are met
    ✔ Should revert if the sender has already minted an NFT
    ✔ Should update royaltyFee
    ✔ Should transfer NFT from user to user (46ms)
    ✔ Should withdraw Ethers
    ✔ Should approve Owner to transfer token
    ✔ Should emit Received event on receiving Ether

  T0xC
Owner address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
User address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Contract address: 0xc6e7DF5E7b4f2A278906862b61205850344D4e7d
NFT address: 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c
    ✔ Should have correct name, symbol and decimal places
    ✔ Should stake/unstake NFT and mint reward (105ms)
    ✔ Should transfer tokens correctly (67ms)
    ✔ Should calculate burn fee correctly
    ✔ Should set new NFT collection address
    ✔ Should withdraw tokens (94ms)
    ✔ Should withdraw Ethers
    ✔ Should emit Received event on receiving Ether


  19 passing (3s)

-------------------------|----------|----------|----------|----------|----------------|
File                     |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------------|----------|----------|----------|----------|----------------|
 contracts\              |    80.43 |       50 |    80.95 |       85 |                |
  NFT_BootCamp_CIS.sol   |       55 |    43.33 |       60 |    66.67 |... 75,89,90,91 |
  Token_BootCamp_CIS.sol |      100 |    58.33 |      100 |      100 |                |
-------------------------|----------|----------|----------|----------|----------------|
All files                |    80.43 |       50 |    80.95 |       85 |                |
-------------------------|----------|----------|----------|----------|----------------|
```

## Gas report

```shell
npm install --save-dev hardhat-gas-reporter
```

Need to add the appropriate configuration to the file hardhat.config.js

```js
require('hardhat-gas-reporter');

module.exports = {
  ...
  solidity: {
    ...
  },
  gasReporter: {
    enabled: true,
    outputFile: "gasreporter.txt",
    noColors: true,
  },
};
```

Then:

```shell
npx hardhat test --network <network-name> --show-gas-used
```

where <network-name> is the name of the network on which the tests are run. If you do not specify this value, the "localhost" network will be used by default

Result:

```
·-----------------------------------------|----------------------------|-------------|-----------------------------·
|          Solc version: 0.8.18           ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
··········································|····························|·············|······························
|  Methods                                                                                                         │
··············|···························|··············|·············|·············|···············|··············
|  Contract   ·  Method                   ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  approve                  ·           -  ·          -  ·      49266  ·            4  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  safeMint                 ·           -  ·          -  ·     174384  ·            2  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  setBaseURI               ·           -  ·          -  ·      78042  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  setMaxSupply             ·           -  ·          -  ·      31114  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  setRoyaltyFee            ·           -  ·          -  ·      29059  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  transferFrom             ·           -  ·          -  ·      64644  ·            2  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  NFT0xC0de  ·  withdraw                 ·           -  ·          -  ·      23987  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  T0xC       ·  setNftCollectionAddress  ·           -  ·          -  ·      29285  ·            2  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  T0xC       ·  stake                    ·           -  ·          -  ·     191835  ·            3  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  T0xC       ·  transfer                 ·       59508  ·      67949  ·      63729  ·            2  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  T0xC       ·  unstake                  ·           -  ·          -  ·      90582  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  T0xC       ·  withdraw                 ·           -  ·          -  ·      23988  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  T0xC       ·  withdrawTokens           ·           -  ·          -  ·      60799  ·            1  ·          -  │
··············|···························|··············|·············|·············|···············|··············
|  Deployments                            ·                                          ·  % of limit   ·             │
··········································|··············|·············|·············|···············|··············
|  NFT0xC0de                              ·           -  ·          -  ·    4287964  ·       14.3 %  ·          -  │
··········································|··············|·············|·············|···············|··············
|  T0xC                                   ·     2774484  ·    2774496  ·    2774494  ·        9.2 %  ·          -  │
·-----------------------------------------|--------------|-------------|-------------|---------------|-------------·
```

## Deploy to TestNet BSC

```shell
PS C:\YandexDisk\CIS Devs - BNB Chain\04_BootCamp_Task1\hardhat-project> npx hardhat run scripts/deployNFT.js --network bnb_testnet
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
owner address: 0xc0DE5BCbE4dd5A6E1F7C827B898330d69CcEF216
Deployed token address: 0xEFa93A2839BDCda7416EA0E29e536a55b9109EA9
Contract deployed to 0xEFa93A2839BDCda7416EA0E29e536a55b9109EA9 on bnb_testnet
Verifying contract on Etherscan...
Nothing to compile
Successfully submitted source code for contract
contracts/NFT_BootCamp_CIS.sol:NFT0xC0de at 0xEFa93A2839BDCda7416EA0E29e536a55b9109EA9
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFT0xC0de on Etherscan.
https://testnet.bscscan.com/address/0xEFa93A2839BDCda7416EA0E29e536a55b9109EA9#code


PS C:\YandexDisk\CIS Devs - BNB Chain\04_BootCamp_Task1\hardhat-project> npx hardhat run scripts/deployToken.js --network bnb_testnet
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
owner address: 0xc0DE5BCbE4dd5A6E1F7C827B898330d69CcEF216
Deployed token address: 0x79B30eFbE4983640775736B3E8BCe27D380f2924
Contract deployed to 0x79B30eFbE4983640775736B3E8BCe27D380f2924 on bnb_testnet
Verifying contract on Etherscan...
Nothing to compile
Successfully submitted source code for contract
contracts/Token_BootCamp_CIS.sol:T0xC at 0x79B30eFbE4983640775736B3E8BCe27D380f2924
for verification on the block explorer. Waiting for verification result...

Successfully verified contract T0xC on Etherscan.
https://testnet.bscscan.com/address/0x79B30eFbE4983640775736B3E8BCe27D380f2924#code
```
