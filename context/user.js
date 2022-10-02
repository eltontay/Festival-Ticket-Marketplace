import { createContext, useState, useEffect, useContext } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import festivalNFT from '../contracts/src/abis/FestivalNFT.json';
import festivalToken from '../contracts/src/abis/FestivalToken.json';
import addresses from '../contracts/src/addresses';
import Web3EthContract from 'web3-eth-contract';
import Web3 from 'web3';

const Context = createContext();

const Provider = ({ children }) => {
  const user = {
    address: '',
    isConnected: false,
    provider: null,
    fnft: null,
    ftk: null,
  };
  const [state, setState] = useState(user);

  useEffect(() => {
    console.log(state.address);
    console.log(state.isConnected);
    console.log(state.provider);
    console.log(state.fnft);
    console.log(state.ftk);
  }, [state]);

  async function connect() {
    var web3 = new Web3(Web3.givenProvider);

    const provider = await detectEthereumProvider();

    if (provider === window.ethereum) {
      const accounts = await web3.eth
        .requestAccounts()
        .then((accounts) => {
          setState({
            address: accounts[0],
            isConnected: true,
            provider: provider,
          });
        })
        .catch((err) => console.log(err));

      var festivalNFTContract = new web3.eth.Contract(
        festivalNFT,
        addresses['festivalNFTAddress']
      );

      setState({
        fnft: festivalNFTContract,
      });
      console.log(festivalNFTContract);
      // var FestivalToken = new web3.eth.Contract(
      //   festivalToken,
      //   addresses['festivalTokenAddress']
      // );
      // setState({
      //   ftk: FestivalToken,
      // });
    } else {
      alert('Please install MetaMask!');
    }
  }

  async function disconnect() {
    setState({
      address: '',
      isConnected: false,
      fnft: null,
      ftk: null,
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
