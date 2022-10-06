import Image from 'next/image';
import React, { Component, useState, useEffect, useRef } from 'react';
import { useUser } from '../context/user';
import Navbar from '../components/navbar';

function Marketplace() {
  const { state } = useUser();
  const ticketsSale = useRef({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    const getTicketsOnSale = async () => {
      try {
        var s;
        await state.fnft.methods
          .totalSupply()
          .call({ from: state.address })
          .then((response) => {
            console.log('supply is', response);
            s = response;
          });
        console.log(s);
        var ticketsOnSale = {};

        for (var i = 1; i <= s; i++) {
          const sale = await state.fnft.methods
            .getForSale(i)
            .call({ from: state.address })
            .then(console.log);
          if (sale) {
            const owner = await state.fnft.methods
              .ownerOf(i)
              .call({ from: state.address })
              .then(console.log);
            const sellingPrice = await state.fnft.methods
              .getSellingPrice(i)
              .call({ from: state.address })
              .then(console.log);
            ticketsOnSale[i] = {
              address: owner,
              sellingPrice: sellingPrice,
            };
          }
        }
        ticketsSale.current = ticketsOnSale;
      } catch (error) {
        console.log(error);
      }
    };
    if (isInitialRender) {
      setIsInitialRender(false);
      getTicketsOnSale();
    }
  }, [state, isInitialRender]);

  return (
    <div className="">
      <Navbar />
      {/* <div classNameName="h-screen grid bg-gradient-to-tr from-indigo-800 to-indigo-500"> */}
      <div className="h-screen bg-gradient-to-tr from-indigo-800 to-indigo-500  p-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Secondary Sale
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              {/* <Image
                src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              /> */}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-black text-bold">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    Basic Tee
                  </a>
                </h3>
              </div>
              <p className="text-sm font-medium text-black">
                {ticketsSale.current[1]}
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
export default Marketplace;
