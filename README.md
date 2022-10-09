# Blockchain Festival (Frontend)

## View Smart Contracts here

```bash
https://github.com/eltontay/Festival-Smart-Contracts
```

## Overview

> Blockchain Festival is a web-based platform powered by Settlemint for buying and reselling of festival tickets using blockchain technology. By utilising blockchain technology, numerous issues can be eliminated : Scalping , Security and Data Collection. This platform is built on the public Ethereum blockchain with 2 smart contracts utilising the latest standards, where _"FestivalNFT"_ follows the ERC721 standard and _"FestivalToken"_ follows the ERC20 standard.

### Issues tackled

1. **Scalping**

   > Scalpers, an unwanted byproduct of the free market exists typically by buying in bulk and reselling them for ridiculous prices higher than the initial retail price. Despite morality reasons, scalpers are not illegalised in Singapore. This is because margins are determined by willing buyers and willing sellers. However, this is an issue which can damage the reputation of the organiser, as it prevents genuine customers from purchasing tickets. That is why, Blockchain Festival has enforced predefined rules in the smart contracts, which limits the amount of tickets a buyer can purchase, and the price the buyer can resell at. In this example, the limitation of resell price is capped at 110% from the previous price.

2. **Security**

   > Authenticity is an issue when you unknowingly purchased fake tickets. This can happen through phishing sites or through dubious resellers. Using blockchain technology, each ticket has its own unique identity which is transparent for all users to see, allowing easy verification of authenticity not just for the organiser, but for the public as well. Blockchain Festival verifies these transactions in the smart contracts listed on the blockchain.

3. **Data Collection**

   > Data collection is an important aspect for organisers to better understand their target audience to ensure a successful launch of their festival. With blockchain technology, every transaction is tracked and monitored. This gives not just ownership of data to the organiser but also detailed insights. With these insights, organisers will be able to analyse the data and use them to achieve more successful campaigns.

#

## Technical Details

The frontend application is built using nextjs, web3js, metamask, styled with tailwindcss.

### Smart Contracts

There are 4 main pages listed under the `./pages` directory.

- **index**
  - Landing Page with a short introduction , navbar, connecting wallet with metamask, and a button that directs to `./buyticket`
- **BuyTicket**
  - Purchasing page that allows users to purchase ERC721 Festival Ticket (FNFT) using ERC20 FTK Tokens at a price of 10 FTK, limited by 5 purchases
- **Marketplace**
  - Marketplace Page that is a secondary Marketplace that faciliates resales of ERC721 Festival Tickets (FNFT)
- **Profile**
  - Profile Page that showcases the account balances as well as owner functionalities

#

## Localhost Testing

```bash
npm run dev
```

## Docker Deployment

```bash
docker-compose up --build --force-recreate
```

#

![Alt text](./public/landing.png 'Landing Page')
![Alt text](./public/connect.png 'Connect with MetaMask')
![Alt text](./public/buyticket1.png 'Purchase Festival Ticket')
![Alt text](./public/profile.png 'Profile Page')
![Alt text](./public/list.png 'Listing Ticket')
![Alt text](./public/listtransaction.png 'Listing Sucessful with Metamask')
![Alt text](./public/marketplace.png 'Marketplace Page')
![Alt text](./public/purchasemarketplace.png 'Purchasing Ticket from Marketplace')
