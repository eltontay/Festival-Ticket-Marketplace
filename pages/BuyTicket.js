import React, { Component, useState, useEffect, useRef } from 'react';
import { useUser } from '../context/user';
import Navbar from '../components/Navbar';
import addresses from '../contracts/src/addresses';

function BuyTicket() {
  const { state, disconnect } = useUser();
  const [allowance, checkAllowance] = useState(false);
  const [ticketSupply, setTicketSupply] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [num, setNum] = useState(0);
  useEffect(() => {
    const getTicketSupply = async () => {
      const supply = await state.fnft.methods
        .totalSupply()
        .call({ from: state.address });
      setTicketSupply(1000 - supply);
    };
    const getTicketPrice = async () => {
      const price = await state.fnft.methods.PRICE().call({
        from: state.address,
      });
      setTicketPrice(price / 10 ** 18);
    };

    if (isInitialRender) {
      setIsInitialRender(false);
      getTicketSupply();
      getTicketPrice();
      console.log(ticketSupply);
      console.log(ticketPrice);
    }
  }, [ticketSupply, isInitialRender, ticketPrice, state, num, allowance]);

  const buyTicket = async () => {
    await state.fnft.methods
      .publicMint(num)
      .send({ from: state.address })
      .then(function (result) {
        console.log(result);
      });
  };

  const approveTicketPurchase = async () => {
    const allowance = await state.ftk.methods.allowance(
      state.address,
      addresses['festivalNFTAddress']
    );
    if (allowance > 0) {
      console.log('you have sufficient allowance');
    } else {
      await state.ftk.methods
        .approve(
          addresses['festivalNFTAddress'],
          state.web3.utils.toBN(ticketPrice * 5 * 1e18)
        )
        .send({ from: state.address })
        .then(function (result) {
          console.log(result);
        });
    }
    checkAllowance(true);
  };

  const handleInputTicket = (event) => {
    if (Number(event.target.value) > 5 || Number(event.target.value) < 1) {
      console.log('Invalid input');
    } else {
      setNum(Number(event.target.value));
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="h-screen col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex justify-center">
        <div className="h-auto flex flex-wrap content-center">
          <div className="flex justify-center">
            <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
              <div className="py-3 px-6 text-xl font-bold border-b border-gray-300">
                Festival Ticket
              </div>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  Price : {ticketPrice} FTK
                </h5>
                <p className="text-gray-700 text-base mb-4">
                  You can purchase up to 5 FNFT
                </p>
                <div className="flex flex-wrap space-x-4">
                  {allowance ? (
                    <button
                      type="button"
                      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => buyTicket()}
                    >
                      Purchase
                    </button>
                  ) : (
                    <button
                      type="button"
                      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => approveTicketPurchase()}
                    >
                      Approve
                    </button>
                  )}

                  <div className="inline-block flex justify-center">
                    <input
                      type="number"
                      className="
                        form-control
                        block
                        w-full
                        px-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      "
                      id="num"
                      placeholder="Input 1-5"
                      onChange={handleInputTicket}
                      value={num}
                    />
                  </div>
                </div>
              </div>
              <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                Remaining Supply : {ticketSupply}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
