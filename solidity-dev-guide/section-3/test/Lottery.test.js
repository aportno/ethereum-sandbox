const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');
const contractName = 'Lottery Contract';

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
    .deploy({
        data: evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe(contractName, () => {
    it('Deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('Adds player to pool', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1.5', 'ether')
        });
        
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('Adds multiple players to pool', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1.5', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('1.5', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('1.5', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('Requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('Only manager can call pickWinner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('Sends money to winner and resets pool', async() => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });


        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;
        
        assert.equal(0, players.length);
        assert(difference > web3.utils.toWei('1', 'ether'));

    });
});