import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const PatAbi = require("@/contract/PatAbi.json");

let provider;
let connection;
let accounts;
let chain;
let web3Modal;


export async function init() {
  
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: 'https://bsc-dataseed1.defibit.io/'
        },
        network: 'binance',
        chainId: 56,
      }
    }
  };

  web3Modal = new Web3Modal({
    network: "binance", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  provider = await web3Modal.connect();
  connection = new Web3(provider);
  accounts = await connection.eth.getAccounts();
  chain = await connection.eth.getChainId();
  return chain;
}


export async function disconnect(){
  if(provider.close) {
    await provider.close();
    await web3Modal.clearCachedProvider();
    provider = null;
  } else {
    await web3Modal.clearCachedProvider();
    connection.currentProvider._handleDisconnect();
    provider = null;
  }
} 

export async function balance() {
  if(provider){
  if(chain === 56) {
    let contract = await new connection.eth.Contract(PatAbi, "0xE265467D89ed55c2B5fE3cACDac85A7d13ADACb1");
    let bal = await contract.methods.balanceOf(accounts[0]).call();
    return bal;
  } else {
    return {alert: true}
  }
  }
}