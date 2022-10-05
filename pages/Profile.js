import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useUser } from '../context/user';

function Profile() {
  const { state } = useUser();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [owner, setOwner] = useState(false);
  useEffect(() => {
    const isOwner = async () => {
      const owner = await state.fnft.methods.owner().call({
        from: state.address,
      });
      console.log(state.address);
      console.log(owner);
      if (`${state.address}`.toLowerCase() === `${owner}`.toLowerCase()) {
        setOwner(true);
      }
    };
    if (isInitialRender) {
      isOwner();
    }
  }, [owner, isInitialRender, state]);

  const startPublicSale = async () => {
    await state.fnft.methods
      .startPublicSale()
      .send({
        from: state.address,
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
      });
  };

  return (
    <div className="">
      <Navbar />
      <div className="h-screen col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex justify-center">
        <div className="h-auto flex flex-wrap content-center">
          <div className="flex justify-center p-8">
            <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
              <div className="py-3 px-6 text-xl font-bold border-b border-gray-300">
                Inventory
              </div>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {state.ftkBalance} FTK
                </h5>
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {state.fnftBalance} FNFT
                </h5>
              </div>
            </div>
          </div>
        </div>
        {owner ? (
          <div className="h-auto flex flex-wrap content-center">
            <div className="flex justify-center p-8">
              <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                <div className="py-3 px-6 text-xl font-bold border-b border-gray-300">
                  Owner functions
                </div>
                <div className="p-6 space-x-4">
                  <h5 className="inline-block text-gray-900 text-xl font-medium mb-2">
                    Start Public Mint
                  </h5>
                  <button
                    className="uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100"
                    onClick={() => startPublicSale()}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Profile;
