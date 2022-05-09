import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";
//________________________________________________________________________________________________________________________________________
//------------------------------------------------------------------ SETTINGS ------------------------------------------------------------
//________________________________________________________________________________________________________________________________________
const preferredNetwork = "ithacanet";
const options = {
  name: "NFT",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const rpcURL = "https://ithacanet.ecadinfra.com";
const wallet = new BeaconWallet(options);

//________________________________________________________________________________________________________________________________________
//------------------------------------------------------------------ WALLET'S FUNCTIONS ------------------------------------------------------------
//________________________________________________________________________________________________________________________________________
// -------------------------------------- Get a registered user account 
const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};

// -------------------------------------- Log in
const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet.client.getActiveAccount();
  }
  return { success: true, wallet: account.address };
};

// -------------------------------------- Log out
const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

// -------------------------------------- Check if the user is registered
const checkIfWalletConnected = async (wallet) => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

//________________________________________________________________________________________________________________________________________
//------------------------------------------------------------------ BLOCKCHAIN'S FUNCTIONS ------------------------------------------------------------
//________________________________________________________________________________________________________________________________________

// -------------------------------------- Set Cadaf Percentage
// ---------------- Set CADAF percentage for sale NFT
// Input data: - percent (new percent for sale: int)
export const setCadafPercentage = async (percent) => {
  
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.set_cadaf_percentage(percent).send();
    await operation.confirmation();
    
  }
};

// -------------------------------------- Change Minting Price
// ---------------- Set CADAF percentage for minting NFT
// Input data: - price (new price for minting: int)
export const changeMintingPrice = async (price) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.set_price_for_minting(price).send();
    await operation.confirmation();
  }
};

// -------------------------------------- Sell NFT 
// ---------------- User puts his NFT up for sale
// Input data: - price (new price included all comissions (CADAF's and aithor's): int)
//             - tokenID (user's NFT id: int)
export const sellNft = async (price, tokenID) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.sell_token(price, tokenID).send();
    const result = await operation.confirmation();
  }
};

// -------------------------------------- Purchase 
// ---------------- User buys NFT
// Input data: - tokenID (tokenID to buy+: int)
export const purchase = async (tokenID) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);0
      //Get minting price
    let nftStorage = await contract.storage();
    let token = await nftStorage.data.get(tokenID);
    let price = token["amount"];
    //Purchase
    const operation = await contract.methods.collect(tokenID).send({amount: price, mutez: true});
    await operation.confirmation();
  }
};

// -------------------------------------- Mint NFT (NEEDS IMPROVEMENTS)
// ---------------- User mint NFT
// Input data: - royalties (author commission for further sales (no more than 7%): int)
//             - link_to_metadataq (IPFS link to JSON file: string)
export const mintNFT = async (royalties, link_to_meta) => {
  //TODO: 1) IPFS JSON CREATION NOT YET IMPLEMENTED
  
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
      //Get minting price
    let nftStorage = await contract.storage();
    let mintingPrice = await nftStorage.price_for_minting;
      //Mint
    let utf8Encode = new TextEncoder();
    let bytes = utf8Encode.encode(link_to_meta);
    const operation = await contract.methods.mint(bytes, royalties).send({amount: mintingPrice, mutez: true});
    await operation.confirmation();
  }
};



// -------------------------------------- WITHDRAW   
// ---------------- Give to admin of smart-contract an ability to withdraw all comissions
// Input data: - address (address for sending funds: string)
//             - amount (amount of money to withdraw: string)
export const withdraw = async (address, amount) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    const operation = await contract.methods.collect_management_rewards(address, amount).send();
    await operation.confirmation();
  }
};

// -------------------------------------- Show All Token Offers   
// ---------------- Returns all NFT's that are on sale
// Output data: - saleOffers (NFT's that are on sale: array of int)
export const showAllTokenOffers = async () => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    var saleOffers =  new Array();
    let nftStorage = await contract.storage();
    let tokenAmount = await nftStorage.token_id;
    for (var tokenId = 0; tokenId<tokenAmount; tokenId++) {
      let token = await nftStorage.data.get(tokenId); 
      if (token["collectable"]==true){
        saleOffers.push(tokenId);
      }
    }
    return saleOffers;
  }
};

// -------------------------------------- Balance Of
// ---------------- Check user's ownership
//Input data:   - tokenID (id of token to check ownership)
// Output data: - true (if user is NFT owner)
//              - false (if user isn't NFT owner)
export const balanceOf = async (tokenID) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    let nftStorage = await contract.storage();
    let token = await nftStorage.data.get(tokenID);
    if (userAddress == token["owner"]){
      return true;
    }
    else{
      return false;
    }
  }
};

// -------------------------------------- Get NFT's Meta
// ---------------- Get link to NFT's metadata
//Input data:   - tokenID (id of token to find meta)
// Output data: - link (string)

export const getTokenMeta = async (tokenID) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    let nftStorage = await contract.storage();
    let token = await nftStorage.data.get(tokenID);
    return token["link_to_json"]
};


export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};
