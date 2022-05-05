import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";

const preferredNetwork = "ithacanet";
const options = {
  name: "NFT",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const rpcURL = "https://ithacanet.ecadinfra.com";
const wallet = new BeaconWallet(options);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};

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

const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

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

export const purchase = async (tokenID) => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
      //Get minting price
    let nftStorage = await contract.storage();
    let token = await nftStorage.data.get(tokenID);
    let price = token["amount"];
    //Purchase
    const operation = await contract.methods.collect(tokenID).send({amount: price, mutez: true});
    await operation.confirmation();
  }
};

export const mintNFT = async (royalties, link_to_meta) => {
  //TODO: 1) IPFS JSON CREATION NOT YET IMPLEMENTED
  //     
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

export const balanceOf = async () => {
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const contract = await tezos.wallet.at(config.contractAddress);
    let nftStorage = await contract.storage();
    let token = await nftStorage.data.get(tokenID);
    if (userAddress == token["owner"]){
      return 1;
    }
    else{
      return 0;
    }
  }
};




export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};
