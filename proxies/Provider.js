import Web3 from 'web3';

class Provider {
  constructor() {
    // to be changed to settlemint provider
    this.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
  }
}

export default Provider;
