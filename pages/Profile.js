import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import Navbar from '../components/navbar';
import { useUser } from '../context/user';

function Profile() {
  const { state } = useUser();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [owner, setOwner] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [listForm, setListForm] = useState(false);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [currentSellingPrice, setCurrentSellingPrice] = useState(0);
  const [ticketId, setTicketId] = useState(0);
  const [approval, setApproval] = useState(false);
  useEffect(() => {
    const ticketUpdate = async () => {
      var s;
      await state.fnft.methods
        .totalSupply()
        .call({ from: state.address })
        .then((response) => {
          s = response;
        });
      var array = [];
      console.log('supply', s);
      for (var i = 1; i <= s; i++) {
        const owner = await state.fnft.methods.ownerOf(i).call({
          from: state.address,
        });
        console.log(owner);
        if (`${state.address}`.toLowerCase() === `${owner}`.toLowerCase()) {
          const sale = await state.fnft.methods.getForSale(i).call({
            from: state.address,
          });
          var onSale;
          if (sale) {
            onSale = 'Yes';
          } else {
            onSale = 'No';
          }
          var selling;
          await state.fnft.methods
            .getSellingPrice(i)
            .call({
              from: state.address,
            })
            .then((response) => {
              selling = response;
              console.log(selling);
            });
          array.push({ id: i, sale: onSale, sellingPrice: selling });
        }
      }
      setTickets(array);
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
      console.log('tickets', tickets);
    }
  }, [owner, isInitialRender, state, tickets]);

  const open = async (id, cSellingPrice) => {
    setListForm(true);
    setTicketId(id);
    setCurrentSellingPrice(cSellingPrice);
    // await state.fnft.methods.
  };

  const close = async () => {
    setListForm(false);
    setSellingPrice(0);
    setTicketId(0);
  };

  const listTicket = async () => {
    await state.fnft.methods
      .setListing(ticketId, currentSellingPrice)
      .send({
        from: state.address,
      })
      .then(function (result) {
        console.log(result);
      });
  };

  const approveTicketListing = async () => {
    const approved = await state.ftk.methods.getApproved(ticketId).call({
      from: state.address,
    });
    console.log(approved);
    // if (allowance > 0) {
    //   console.log('you have sufficient allowance');
    // } else {
    //   await state.ftk.methods
    //     .approve(
    //       addresses['festivalNFTAddress'],
    //       state.web3.utils.toBN(ticketPrice * 5 * 1e18)
    //     )
    //     .send({ from: state.address })
    //     .then(function (result) {
    //       console.log(result);
    //     });
    // }
    // checkAllowance(true);
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
    if (
      Number(event.target.value) >= currentSellingPrice * 1.1 ||
      Number(event.target.value) <= 1
    ) {
      console.log('Invalid input');
    } else {
      setCurrentSellingPrice(Number(event.target.value));
    }
  };

  const data = useMemo(() => tickets, [tickets]);

  // Define column of the table
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Sale',
        accessor: 'sale',
      },
      {
        Header: 'Selling Price',
        accessor: 'selling_price',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
                <table
                  {...getTableProps()}
                  className="table-auto border-separate border-spacing-4 "
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {tickets.map((obj) => {
                      return (
                        <tr key={obj}>
                          <td>{obj['id']}</td>
                          <td>
                            {obj['sale'] == 'No' ? (
                              <button
                                className="uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100"
                                onClick={() =>
                                  open(obj['id'], obj['sellingPrice'])
                                }
                              ></button>
                            ) : (
                              <button className="uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100">
                                Change Listing
                              </button>
                            )}
                          </td>
                          <td>{obj['sellingPrice']}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {listForm ? (
                  <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                      <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="number"
                        required
                        placeholder="Price in FTK"
                      />

                      <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onChange={handleInputTicket}
                        value={sellingPrice}
                        onClick={() => approveTicketListing()}
                      >
                        Approve Ticket
                      </button>
                      <button
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                        type="button"
                        onClick={() => close()}
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
