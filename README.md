# CoreNFTSaleContractTezos
Core smart contract that supports an NFT sale via CADAF marketplace on Tezos blockchain

--------

 The main JS file can be found in ~src\utils\wallet.js

--------

## How to run the project

```bash
yarn install
yarn start
```

-------

This project shows integration with BEACON.

The ChangeCadafPercentage function is located on the main screen, which changes the percentage received by CADAF for all user transactions (no more than 50).

## Smart Contract Description
It covers next functions:

- ######  changeCadafPercentage

- ######  changeMintingPrice

- ######  withdraw

- ######  sellToken 

- ######  purchase

- ######   update_admin

- ######   fa2_transfer

- ######   mintNFT (now it works without IPFS, it's needed to put link to generated JSON)
