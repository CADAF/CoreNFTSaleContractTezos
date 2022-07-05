# CoreNFTSaleContractTezos
Core smart contract that supports an NFT sale via CADAF marketplace on Tezos blockchain

Main CADAF NFT archetecture blueprint:
![image](https://user-images.githubusercontent.com/84318690/177355567-daa9fa5b-07b8-40f2-ac92-bffac57b411c.png)

--------

You can find:
- #### Smart contract
in tezosSC.py

- #### DemoApp with docs
 in DemoApp Folder
 
- #### Python Server
in python.py




## Smart Contract Description
Smart Contract documentation can be found [here](https://docs.google.com/document/d/1mSohO1vVoUgKrwqcn4qFTxiDh-QAVOYznwf0fPzNlHE/edit?usp=sharing)


It covers next functions:

- ######  changeCadafPercentage'

  *Set CADAF percentage for sale NFT*

- ######  changeMintingPrice

  *Set CADAF percentage for minting NFT*

- ######  withdraw

  *Give to admin of smart-contract an ability to withdraw all commissions*

- ######  sellToken 

  *User puts his NFT up for sale*

- ######  cancelSelling 

  *User cancel selling his NFT*

- ######  purchase

  *User buys NFT*
  
- ######  purchase

  *User transfers NFT to another address*

- ######   update_admin

  *Update ownership of smart-contract*

- ######   mintNFT 

  *User mint NFT paying for its creation*
