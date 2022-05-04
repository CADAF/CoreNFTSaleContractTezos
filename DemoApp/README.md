# CADAF DRAFT
------
## How to run the project
```bash
yarn install
yarn start
```
-------
This project shows integration with BEACON.

The ChangeCadafPercentage function is located on the main screen, which changes the percentage received by CADAF for all user transactions (no more than 50).

-----
Functions that are **ready for integration**:
- ######  changeCadafPercentage
- ######  changeMintingPrice
- ######  withdraw
- ######  sellToken 
- ######  purchase
- ######   balanceOf
- ######   showAllTokenOffers


Some functions that are **made, but require improvements**:
- ######  mintNFT
***TODO***: 
    1) IPFS JSON CREATION NOT YET IMPLEMENTED
    Function is waiting for link to JSON file and doesn't create it by itself



-----
The main JS file can be found in ~src\utils\wallet.js