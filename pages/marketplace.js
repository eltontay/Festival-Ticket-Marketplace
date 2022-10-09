import React, { useState, useEffect } from 'react';
import { useUser } from '../context/user';
import Navbar from '../components/Navbar';

function Marketplace() {
  const { state } = useUser();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [purchase, setPurchase] = useState(false);
  const [listId, setListId] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  useEffect(() => {
    const purchase = async (arr) => {
      setPurchase(true);
      setListId(arr[0]);
      setSellingPrice(arr[2]);
    };

    const getTicketsOnSale = async () => {
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
          const sale = await state.fnft.methods
            .getForSale(i)
            .call({ from: state.address });
          if (sale) {
            console.log('pass');
            var renderData = async () => {
              var sellingPrice;
              await state.fnft.methods
                .getSellingPrice(i)
                .call({ from: state.address })
                .then((response) => {
                  sellingPrice = response;
                });
              console.log(sellingPrice);
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{sellingPrice}</td>
                  <td>
                    <button
                      className="w-full uppercase border-light-blue border-2 inline-block text-sm bg-grey px-4 p-2 rounded-full font-semibold hover:bg-indigo-100"
                      value={[i, sellingPrice]}
                      onClick={(e) => purchase(e.target.value)}
                    >
                      Purchase
                    </button>
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
    if (isInitialRender) {
      setIsInitialRender(false);
      getTicketsOnSale();
    }
  }, [state, isInitialRender, tickets]);

  const purchaseTicket = async () => {
    await state.fnft.methods
      .adjustListing(listId, sellingPrice)
      .send({
        from: state.address,
      })
      .then(function (result) {
        console.log(result);
      });
  };

  return (
    <div className="">
      <Navbar />
      <div className="h-screen col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex justify-center">
        <div className="h-auto flex flex-wrap content-center">
          <div className="flex justify-center p-8">
            <div className="block rounded-lg shadow-lg bg-white max-w-sm ">
              <table className="table-auto border-separate border-spacing-4 ">
                <thead>
                  <tr>
                    <th key="id">Ticket ID</th>
                    <th key="sellingPrice">Selling Price</th>
                    <th key="purchase">Purchase</th>
                  </tr>
                </thead>
                <tbody>{tickets}</tbody>
              </table>
              {purchase ? (
                <form className="flex w-full max-w-sm justify-center">
                  <div className="flex items-center py-2">
                    <button
                      className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => purchaseTicket()}
                    >
                      Confirm Purchase
                    </button>
                    <button
                      className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                      type="button"
                      onClick={() => setPurchase(false)}
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
    </div>
  );
}
export default Marketplace;
