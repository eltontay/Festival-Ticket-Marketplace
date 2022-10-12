# Blockchain Festival (Frontend)

## View Smart Contracts here

```bash
https://github.com/eltontay/Festival-Smart-Contracts
```

## Overview

> Blockchain Festival is a web-based platform powered by Settlemint for buying and reselling of festival tickets using blockchain technology. This platform is built on the public Ethereum blockchain with 2 smart contracts utilising the latest standards, where "FestivalNFT" follows the ERC721 standard and "FestivalToken" follows the ERC20 standard.


## Technical Details

The frontend application is built using nextjs, web3js, metamask, styled with tailwindcss.

### Smart Contracts

There are 4 main pages listed under the `./pages` directory.

- **index**
  - Landing Page with a short introduction , navbar, connecting wallet with metamask, and a button that directs to `./buyticket`
- **BuyTicket**
  - Primary purchasing page that allows users to purchase ERC721 Festival Ticket (FNFT) using ERC20 FTK Tokens at a price of 10 FTK, limited by 5 purchases
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

## Feature Debt
1. Swapping/Purchase of FTK Tokens with other tokens.
2. Adding more owner functionalities
   - withdraw
   - pausing mint
   - burning tokens
