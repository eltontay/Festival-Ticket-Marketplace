import Provider from './Provider';
import Contract from 'web3-eth-contract';
import festivalToken from '../contracts/src/abis/FestivalToken.json';
import festivalTokenAddress from '../contracts/src/addresses';

const provider = new Provider();

class Token {
  constructor() {
    const web3 = provider.web3;

    this.instance = new Contract(festivalToken, festivalTokenAddress);
  }

  getInstance = () => this.instance;
}

const token = new Token();
Object.freeze(token);

export default token.getInstance();
