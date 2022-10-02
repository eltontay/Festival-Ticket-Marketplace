import Link from 'next/link';
import React, { useEffect } from 'react';
// Importing modules
import { useUser } from '../context/user';
// import { useWeb3 } from '@openzeppelin/network/react';
// import Web3Data from '../components/Web3Data';
function App() {
  // const web3Context = useWeb3(
  //   `wss://rinkeby.infura.io/ws/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`
  // );

  const { state, connect, disconnect } = useUser();

  return (
    <div className="App">
      <div className="App-header">
        <div className="h-screen col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center">
          <div className="ml-20 w-1/2">
            <h2 className="text-white text-4xl">Blockchain Festival</h2>
            <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
              Blockchain Festival is a web-based platform powered by Settlemint
              for buying and reselling of festival tickets using blockchain
              technology. Get started, by connecting your metamask wallet!
            </p>
            {state.isConnected ? (
              <button className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100">
                <Link href="/BuyTicket">Buy Tickets</Link>
              </button>
            ) : (
              <button
                className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
                onClick={() => connect()}
              >
                <p>Connect Wallet</p>
              </button>
            )}
            {/* <Web3Data title="Web3 Data" web3Context={web3Context}></Web3Data> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
