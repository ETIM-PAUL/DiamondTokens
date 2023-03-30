import axios from "axios";
import { ethers } from "ethers";
import { Datepicker } from "flowbite-svelte";
import unix from "moment";
import abi from "../utils/DiamondLab.json";

const contractAddress = "0x9fe147c23600CFcB7dd0DAEc4670d96868142744";
const contractABI = abi.abi;
let provider;

const browserProvider = new ethers.providers.Web3Provider(window.ethereum);
provider = browserProvider;

export const getBalance = async (address) => {
  if (address !== null) {
    let walletBalance = 0;
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.utils.formatEther(balance);
    walletBalance = Number(balanceInEth).toFixed(4);
    return walletBalance;
  } else return "Please Connect Your Wallet";
};

export const transferDiamondTokens = async (values, loadingTransaction) => {
  loadingTransaction = true;

  try {
    loadingTransaction = true;

    const signer = provider.getSigner();
    const transferToken = new ethers.Contract(contractAddress, contractABI, signer);
    const sendTokens = await transferToken.transferTokens(
      values._receiver,
      Number(values.amount)
    );

    await sendTokens.wait();
    alert("Tokens Sent Successfully");
    loadingTransaction = false;
  } catch (error) {
    console.log(error);
    loadingTransaction = false;
  }
};
export const approveDelegate = async (values, loadingDelegate) => {

  try {
    loadingDelegate = true;

    const signer = provider.getSigner();
    const transferToken = new ethers.Contract(contractAddress, contractABI, signer);
    const approveDel = await transferToken.approveRep(
      values._delegate,
      Number(values.delegateAmount)
    );

    await approveDel.wait();
    alert("Delegate Approved And Assigned Tokens");
    loadingDelegate = false;
  } catch (error) {
    console.log(error);
    loadingDelegate = false;
  }
};

export const transferHistoryDetails = async () => {
  try {
    const signer = provider.getSigner();
    const transferToken = new ethers.Contract(contractAddress, contractABI, signer);
    const allTransactions = await transferToken.totalHistory();

    return allTransactions;
  } catch (error) {
    console.log(error);
  }
};

export const formatTimestamp = (timestamp) => {
  const time = unix(timestamp)
  const date = time.toString()
  return date;
}
export const balanceOwner = async (owner) => {
  try {
    const signer = provider.getSigner();
    const transferToken = new ethers.Contract(contractAddress, contractABI, signer);
    const balanceDMD = await transferToken.balanceOf(owner);

    return balanceDMD;
  } catch (error) {
    console.log(error);
  }
}