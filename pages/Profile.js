import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useUser } from '../context/user';
import addresses from '../contracts/src/addresses';

function Profile() {
  const { state } = useUser();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [owner, setOwner] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [listForm, setListForm] = useState(false);
  const [listId, setListId] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [currentSellingPrice, setCurrentSellingPrice] = useState(0);
  useEffect(() => {
    const setList = async (arr) => {
      setListForm(true);
      setListId(arr[0]);
      setSellingPrice(arr[2]);
    };

    const approveTicket = async (id) => {
      await state.fnft.methods
        .approve(addresses['festivalNFTAddress'], id)
        .send({
          from: state.address,
        })
        .on('receipt', function (receipt) {
          console.log(receipt);
        });
    };
    const ticketUpdate = async () => {
      try {
        var s;
        await state.fnft.methods
          .totalSupply()
          .call({ from: state.address })
          .then((response) => {
            s = response;
          });
        var array = [];
        for (var i = 1; i <= s; i++) {
          const owner = await state.fnft.methods.ownerOf(i).call({
            from: state.address,
          });
          if (`${state.address}`.toLowerCase() === `${owner}`.toLowerCase()) {
            const sale = await state.fnft.methods.getForSale(i).call({
              from: state.address,
            });
            var renderData = async () => {
              var selling;
              await state.fnft.methods
                .getSellingPrice(i)
                .call({
                  from: state.address,
                })
                .then((response) => {
                  selling = response;
                });
              const approved = await state.fnft.methods.getApproved(i).call({
                from: state.address,
              });
              var checkApproved = false;
              if (
                `${approved}`.toLowerCase() ===
                `${addresses['festivalNFTAddress']}`.toLowerCase()
              ) {
                checkApproved = true;
              }
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{selling}</td>

                  <td>
                    {checkApproved ? (
                      sale ? (
                        <button className="w-full uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100">
                          Change Listing
                        </button>
                      ) : (
                        <button
                          className="w-full uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100"
                          value={[i, selling]}
                          onClick={(e) => setList(e.target.value)}
                        >
                          List
                        </button>
                      )
                    ) : (
                      <button
                        className="w-full uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100"
                        value={i}
                        onClick={(e) => approveTicket(e.target.value)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              );
            };
            array.push(await renderData());
          }
        }
        setTickets(array);
      } catch (error) {
        console.log(error);
      }
    };

    const isOwner = async () => {
      const owner = await state.fnft.methods.owner().call({
        from: state.address,
      });
      if (`${state.address}`.toLowerCase() === `${owner}`.toLowerCase()) {
        setOwner(true);
      }
    };

    if (isInitialRender) {
      setIsInitialRender(false);
      ticketUpdate();
      isOwner();
    }
  }, [owner, isInitialRender, state, tickets, sellingPrice]);

  const listTicket = async () => {
    await state.fnft.methods
      .setListing(listId, currentSellingPrice)
      .send({
        from: state.address,
      })
      .then(function (result) {
        console.log(result);
      });
  };

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

  const handleInputTicket = (event) => {
    if (sellingPrice == 0) {
      if (Number(event.target.value) > 11 || Number(event.target.value) <= 0) {
        console.log('Invalid Input');
      } else {
        setCurrentSellingPrice(Number(event.target.value));
      }
    } else {
      if (
        Number(event.target.value) >= sellingPrice * 1.1 ||
        Number(event.target.value) <= 1
      ) {
        console.log('Invalid Input');
      } else {
        setCurrentSellingPrice(Number(event.target.value));
      }
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="h-screen col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex justify-center">
        <div className="h-auto flex flex-wrap content-center">
          <div className="flex justify-center p-8">
            <div className="block rounded-lg shadow-lg bg-white max-w-sm ">
              <div className="py-3 px-6 text-xl font-bold border-b border-gray-300 text-center">
                Inventory
              </div>
              <div className="p-6 border-b">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {state.ftkBalance} FTK
                </h5>
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {state.fnftBalance} FNFT
                </h5>
              </div>
              <div className="py-3 px-6 text-xl font-bold border-b border-gray-300 text-center">
                FNFT Details
              </div>
              <div className="p-6">
                <table className="table-auto border-separate border-spacing-4 ">
                  <thead>
                    <tr>
                      <th key="id">Ticket ID</th>
                      <th key="sellingPrice">Selling Price</th>
                      <th key="sale">Sale</th>
                    </tr>
                  </thead>
                  <tbody>{tickets}</tbody>
                </table>
                {listForm ? (
                  <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                      <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="number"
                        required
                        placeholder="Price in FTK"
                        value={currentSellingPrice}
                        onChange={handleInputTicket}
                      />

                      <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => listTicket()}
                      >
                        List Ticket
                      </button>
                      <button
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                        type="button"
                        onClick={() => setListForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div></div>
                )}
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
