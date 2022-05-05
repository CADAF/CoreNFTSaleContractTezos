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
At the mmoment it's needed to put link to generated JSON file, for example https://ipfs.io/ipfs/Qmd5MDvLWFmUC7aZR9ZQWzLNqVejchGmD39Zgx3wrHsy3d?filename=tezosNft.json
Link isn't generated automatically but for tests you can use this link 

Documentation to all this functions can be found at https://docs.google.com/document/d/1XmrUUwZ-LQ5dyNqqn6P2NlwOn0XJwhsE78K6IoI0TPI/edit?usp=sharing

-----
The main JS file can be found in ~src\utils\wallet.js
