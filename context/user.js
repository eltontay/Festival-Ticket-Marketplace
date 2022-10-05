import { createContext, useState, useEffect, useContext } from 'react';
import festivalNFT from '../contracts/src/abis/FestivalNFT.json';
import festivalToken from '../contracts/src/abis/FestivalToken.json';
import addresses from '../contracts/src/addresses';
import Web3 from 'web3';
const Context = createContext();
const url = process.env.NEXT_PUBLIC_INFURA_URL;
const Provider = ({ children }) => {
  const user = {
    address: '',
    ftkBalance: 0,
    fnftBalance: 0,
    isConnected: false,
    fnft: null,
    ftk: null,
    web3: null,
    signer: '',
  };
  const [state, setState] = useState(user);

  useEffect(() => {
    console.log(state.address);
    console.log(state.isConnected);
    console.log(state.fnft);
    console.log(state.ftk);
  }, [state]);

  async function connect() {
    // var web3 = new Web3(new Web3.providers.HttpProvider(url));
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const web3 = new Web3(window.ethereum);

      var festivalNFTContract = new web3.eth.Contract(
        festivalNFT,
        addresses['festivalNFTAddress']
      );
      var festivalTokenContract = new web3.eth.Contract(
        festivalToken,
        addresses['festivalTokenAddress']
      );
      const ftkBalance = await festivalTokenContract.methods
        .balanceOf(accounts[0])
        .call({
          from: accounts[0],
        });
      const fnftBalance = await festivalNFTContract.methods
        .balanceOf(accounts[0])
        .call({
          from: accounts[0],
        });

      setState({
        address: accounts[0],
        ftkBalance: ftkBalance / 10 ** 18,
        fnftBalance: fnftBalance,
        isConnected: true,
        fnft: festivalNFTContract,
        ftk: festivalTokenContract,
        web3: web3,
        // signer: signer,
      });
    }
  }

  async function disconnect() {
    setState({
      address: '',
      ftkBalance: 0,
      fnftBalance: 0,
      isConnected: false,
      fnft: null,
      ftk: null,
      web3: null,
    });
  }

  const exposed = {
    state,
    connect,
    disconnect,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
