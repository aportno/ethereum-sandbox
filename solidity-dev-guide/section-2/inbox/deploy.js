const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
require('dotenv').config();

const INITIAL_STRING = 'First deployment!'

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.RINKEBY_API
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
   
    console.log('Attempting to deploy from account', accounts[0]);
   
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: [INITIAL_STRING] })
      .send({ gas: '1000000', from: accounts[0] });
   
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  };

deploy();