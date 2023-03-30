import axios from "axios";
import { ethers } from "ethers";
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
    loadingTransaction = false;
    alert("Tokens Sent Successfully");
  } catch (error) {
    console.log(error);
    loadingTransaction = false;
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

export const formatTimestamp = (time) => {
  const date = new Date(1680146532);
  console.log(date)
  console.log(time)
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
  return dateFormat
}