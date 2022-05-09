## About

This project shows integration with BEACON.

The ChangeCadafPercentage function is located on the main screen, which changes the percentage received by CADAF for all user transactions (no more than 50).


## How to run the project
```bash
yarn install
yarn start
```
The **main JS file** can be found in ~src\utils\wallet.js


## Functions **ready for integration**:
- ###  changeCadafPercentage
  *Set CADAF percentage for sale NFT*

  **Input data:** 
  -  percent (new percent for sale: int)
  
  **Returns**: None


- ###  changeMintingPrice
  *Set CADAF percentage for minting NFT*

  **Input data:**
  - price (new price for minting: int)
  
  **Output data:** None


- ###  sellToken
  *User puts his NFT up for sale*

  **Input data:** 
  - price (new price included all comissions (CADAF's and aithor's): int) 
  - tokenID (user's NFT id: int)
 
  **Output data:** None


- ###  purchase
  *User buys NFT*

  **Input data:** 
  - tokenID  (tokenID to buy+: int)

  **Output data:** None


- ###  withdraw
  *Give to admin of smart-contract an ability to withdraw all commissions*
  **Input data:** 

  - address (address for sending funds: string)
  - amount (amount of money to withdraw: string)

  **Output data:** None


- ###   balanceOf
  *Check user's ownership*
  **Input data:**   -

  - tokenID (id of token to check ownership)

  **Output data:** 

  - true (if user is NFT owner)
  - false (if user isn't NFT owner)

- ###   showAllTokenOffers
  *Returns all NFT's that are on sale*
  
  **Output data:**
  - saleOffers (NFT's that are on sale: array of int)

- ###   getTokenMeta
  *Get link to NFT's metadata*
  **Input data:**   

  - tokenID (id of token to find meta)

  **Output data:** 

  - link (string)


### Currently in development **:
- ###  mintNFT
  *User mint NFT paying for its creation*

  **Input data:**  
  -  royalties (author commission for further sales, no more than 7%: int)
  - link_to_metadata (IPFS link to JSON file: string)


------

> Note: A link to JSON metadata file **isn't generated automatically** at the moment, but for testing purposes you can use the following link: https://ipfs.io/ipfs/Qmd5MDvLWFmUC7aZR9ZQWzLNqVejchGmD39Zgx3wrHsy3d?filename=tezosNft.json

> Other docs can be found at https://docs.google.com/document/d/1XmrUUwZ-LQ5dyNqqn6P2NlwOn0XJwhsE78K6IoI0TPI/edit?usp=sharing
