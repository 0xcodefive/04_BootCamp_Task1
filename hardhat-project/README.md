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
  St0xC0deNFT
Contract owner address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Contract user address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    ✔ Should have 'none' after deployment
    ✔ Should update baseURI
    ✔ Should update setMaxSupply
    ✔ Should revert if sent ether value is not correct (38ms)
Contract initialBalance for owner: 0
    ✔ Should mint NFT to sender if conditions are met
    ✔ Should revert if the sender has already minted an NFT (40ms)
    ✔ Should update royaltyFee
Contract balance: 0
    1) Should return the contract balance
    2) Should transfer NFT from user to user
    3) Should returns the correct royalty information
    ✔ Should withdraw Ethers

-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
 contracts\            |    58.82 |    46.67 |       70 |    66.67 |                |
  NFT_BootCamp_CIS.sol |    58.82 |    46.67 |       70 |    66.67 |... 72,86,87,91 |
-----------------------|----------|----------|----------|----------|----------------|
All files              |    58.82 |    46.67 |       70 |    66.67 |                |
-----------------------|----------|----------|----------|----------|----------------|
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
·---------------------------------|----------------------------|-------------|-----------------------------·
|      Solc version: 0.8.19       ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
··································|····························|·············|······························
|  Methods                                                                                                 │
················|·················|··············|·············|·············|···············|··············
|  Contract     ·  Method         ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
················|·················|··············|·············|·············|···············|··············
|  St0xC0deNFT  ·  safeMint       ·           -  ·          -  ·     170016  ·            2  ·          -  │
················|·················|··············|·············|·············|···············|··············
|  St0xC0deNFT  ·  setBaseURI     ·           -  ·          -  ·      78042  ·            1  ·          -  │
················|·················|··············|·············|·············|···············|··············
|  St0xC0deNFT  ·  setMaxSupply   ·           -  ·          -  ·      31114  ·            1  ·          -  │
················|·················|··············|·············|·············|···············|··············
|  St0xC0deNFT  ·  setRoyaltyFee  ·           -  ·          -  ·      29059  ·            1  ·          -  │
················|·················|··············|·············|·············|···············|··············
|  St0xC0deNFT  ·  withdraw       ·           -  ·          -  ·      23987  ·            1  ·          -  │
················|·················|··············|·············|·············|···············|··············
|  Deployments                    ·                                          ·  % of limit   ·             │
··································|··············|·············|·············|···············|··············
|  St0xC0deNFT                    ·           -  ·          -  ·    4156178  ·       13.9 %  ·          -  │
·---------------------------------|--------------|-------------|-------------|---------------|-------------·
```

## Deploy to TestNet BSC

```shell
PS C:\YandexDisk\CIS Devs - BNB Chain\04_BootCamp_Task1\hardhat-project> npx hardhat run --network bnbt scripts/deployNFT.js
owner address: 0xc0dE5F13aFA04f09193ef9Cc29f68276722e7Aa5
Deployed token address: 0x451C3E745909e510cC93B6819F8958458055E361
Contract deployed to 0x451C3E745909e510cC93B6819F8958458055E361 on bnbt
Verifying contract on Etherscan...
Nothing to compile
Successfully submitted source code for contract
contracts/NFT_BootCamp_CIS.sol:St0xC0deNFT at 0x451C3E745909e510cC93B6819F8958458055E361
for verification on the block explorer. Waiting for verification result...

Successfully verified contract St0xC0deNFT on Etherscan.
PS C:\YandexDisk\CIS Devs - BNB Chain\04_BootCamp_Task1\hardhat-project> npx hardhat run --network bnbt scripts/deployToken.js
owner address: 0xc0dE5F13aFA04f09193ef9Cc29f68276722e7Aa5
Deployed token address: 0x2199B824BA808E90f2d257CD9bcac837c3927595
Contract deployed to 0x2199B824BA808E90f2d257CD9bcac837c3927595 on bnbt
Verifying contract on Etherscan...
Nothing to compile
Successfully submitted source code for contract
contracts/Token_BootCamp_CIS.sol:TZ2H at 0x2199B824BA808E90f2d257CD9bcac837c3927595
for verification on the block explorer. Waiting for verification result...

Successfully verified contract TZ2H on Etherscan.
https://testnet.bscscan.com/address/0x2199B824BA808E90f2d257CD9bcac837c3927595#code
```
