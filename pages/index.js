import Link from 'next/link';
import React from 'react';
// Importing modules
import { useUser } from '../context/user';
import Navbar from '../components/navbar';
function App() {
  const { state, connect } = useUser();

  return (
    <div className="App">
      <div className="App-header">
        <Navbar></Navbar>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
