import React, { Component, useState, useEffect } from 'react';
import { useUser } from '../context/user';

function BuyTicket() {
  const { state, disconnect } = useUser();

  // const [ticketSupply, setTicketSupply] = useState(0);

  // useEffect(() => {
  //   const userAddress = state.address;
  //   async function getTicketSupply() {
  //     const ts = await state.fnft.methods
  //       .totalSupply()
  //       .call({ from: userAddress });
  //     console.log(ts);
  //     return ts;
  //   }
  //   const ticketSupply = getTicketSupply();
  //   // setTicketSupply(ticketSupply);
  // }, [state, ticketSupply]);

  // useEffect(() => {
  //   const getTicketSupply = async () => {
  //     const ts = await FestivalNFT.methods
  //       .totalSupply()
  //       .call({ from: state.address });
  //     console.log(ts);
  //     // return Object.values(ts);
  //   };
  //   const ts = getTicketSupply();
  //   // setTicketSupply(ts);
  // }, [ticketSupply, state]);

  return (
    <div className="h-screen col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center">
      {/* <p>{ticketSupply}</p> */}
    </div>
  );
}

export default BuyTicket;

// let web3;

// class BuyTicket extends Component {
//   constructor() {
//     super();

//     this.state = {
//       festivals: [],
//     };

//     web3 = new Web3(Provider);
//   }

//   async componentDidMount() {
//     await this.updateFestivals();
//   }

//   updateFestivals = async () => {
//     try {
//       const initiator = await web3.eth.accounts[0];
//       const fnftName = await FestivalNFT.methods
//         .totalSupply()
//         .call({ from: initiator });
//       // const activeFests = await festivalFactory.methods
//       //   .getActiveFests()
//       //   .call({ from: initiator });
//       // const fests = await Promise.all(
//       //   activeFests.map(async (fest) => {
//       //     const festDetails = await festivalFactory.methods
//       //       .getFestDetails(fest)
//       //       .call({ from: initiator });
//       //     const [festName, festSymbol, ticketPrice, totalSupply, marketplace] =
//       //       Object.values(festDetails);
//       //     const nftInstance = await FestivalNFT(fest);
//       //     const saleId = await nftInstance.methods
//       //       .getNextSaleTicketId()
//       //       .call({ from: initiator });

//       return (
//         // <tr key={fest}>
//         //   <td class="center">{fnftName}</td>
//           {/* <td class="center">{web3.utils.fromWei(ticketPrice, 'ether')}</td>
//               <td class="center">{totalSupply - saleId}</td>

//               <td class="center">
//                 <button
//                   type="submit"
//                   className="custom-btn login-btn"
//                   onClick={this.onPurchaseTicket.bind(
//                     this,
//                     marketplace,
//                     ticketPrice,
//                     initiator
//                   )}
//                 >
//                   Buy
//                 </button>
//               </td> */}
//         // </tr>
//       );

//       // this.setState({ festivals: fests });
//     } catch (err) {
//       // renderNotification('danger', 'Error', err.message);
//       console.log('Error while updating the fetivals', err);
//     }
//   };

//   onPurchaseTicket = async (marketplace, ticketPrice, initiator) => {
//     try {
//       const marketplaceInstance = await FestivalMarketplace(marketplace);
//       await festToken.methods
//         .approve(marketplace, ticketPrice)
//         .send({ from: initiator, gas: 6700000 });
//       await marketplaceInstance.methods
//         .purchaseTicket()
//         .send({ from: initiator, gas: 6700000 });
//       await this.updateFestivals();

//       renderNotification(
//         'success',
//         'Success',
//         `Ticket for the Festival purchased successfully!`
//       );
//     } catch (err) {
//       console.log('Error while creating new festival', err);
//       renderNotification('danger', 'Error', err.message);
//     }
//   };

//   inputChangedHandler = (e) => {
//     const state = this.state;
//     state[e.target.name] = e.target.value;
//     this.setState(state);
//   };

//   render() {
//     return (
//       <div class="container col s12 m6 offset-m3 l4 offset-l4 z-depth-6 card-panel">
//         <h4 class="center">Purchase Tickets</h4>
//         <table id="requests" class="responsive-table striped">
//           <thead>
//             <tr>
//               <th key="name" class="center">
//                 Name
//               </th>
//               <th key="price" class="center">
//                 Price(in FEST)
//               </th>
//               <th key="left" class="center">
//                 Tickets Left
//               </th>
//               <th key="purchase" class="center">
//                 Purchase
//               </th>
//             </tr>
//           </thead>
//           <tbody class="striped highlight">{this.state.festivals}</tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default BuyTicket;
