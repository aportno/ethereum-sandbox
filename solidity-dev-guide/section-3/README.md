# Section 3

## Lottery Contract
* We will create a smart contract that allows users to send ether into a prize pool
* At some point in the future, a manager will trigger the contract to randomly pick a winner of the prize pool
* The contract will randomly chose a participant and return the prize pool to them

## Lottery Design
* Variables
    * manager (name) : address of person who created the contract (purpose)
    * players (name) : array of addresses of people who have entered (purpose)
* Functions
    * enter (name) : enters a player into the lotter (purpose)
    * pickWinner (name) : randomly picks a winner and sends them the prize pool (purpose)

## The Message Global Variable
* `msg.data` = 'Data' field from the call or transaction that invoked the current function
* `msg.gas` = amount of gas the current function invocation has available
* `msg.sender` = address of the account that started the current function invocation
* `msg.value` = amount of there (in wei) that was sent along with the function invocation

## Overview of Arrays
* Fixed arrays
    * Array that contains a single type of element. Has an unchanging length
    * Can never change in length
    * Example
        * `uint[3] test = [a, b, c]`
* Dynamic array
    * Array that contains a single type of elevemt. Can change size over time
    * Example
        * `uint[] test = [a, b, c, ... , n]`
    * calls to the contract require index to be specified
* Mapping
    * collection of key, value pairs. Think of JS objects, Ruby hashes, or Python dictionary. All keys must be of the same type, and all values much be of the same type
    * Example
        * `mapping (address => uint) test`
* Struct
    * Collection of key, value pairs that can have different types
    * Example
        * `struct {car: string, type: string}`

## Entering the Lottery
* Function type "payable"
    * When someone call this fucntion they might send ether along
* We can submit money to the contract using the `msg.value` property
    * `msg.value` = amount of ether (in wei) that was sent along with the function invocation

## Pseudo Random Number Generator
* We want our contract to randomly select a winner of the lottery
    * Solidity does not have a random number generator
* Approach
    * Data (we have a reasonable idea of what this data is)
        * Take current block difficulty using `block.difficulty`
        * Current time using `block.timestamp`
        * Addresses of players using `players` dynamic array
    * Inject the data into a keccak256 algorithm
    * Produce a really big number from the keccak256 output


## Sending Ether from Contracts
* `payable` allows a function to receive ether while being called and also specify addresses that are able to process payments
* `address(this).balance` is used to get the balance of the smart contract
* `transfer` is used where `players[index]` is the "to" field and inside the `()` is the "from"

## Function Modifiers
* Function modifiers are used to help reduce the amount of code we need to write
* the line `_;` is essentially a placeholder for the code block inside the function

## Testing our script
* we can run `npm node test` in the `contracts` directory
* Sample tests (what behavior do we care about in our contract?):
    * Entering the lottery (we want to be 100% sure a players address gets added to the pool):
        * We will assert the players address is in the array
        * We can access the players array by getPlayers()
        * `await lottery.methods.enter().send();`
            * why call() vs send()?
                * solidity functions can be divided into two categories:
                    * functions that alter the state of the contract
                        * we should use methods.function().send()
                        * creates transaction or alter's the state
                    * functions that do not alter the state of the contract
                        * we should use methods.function().call()
                        * generalyl functions with `pure` or `view` function type keywords
            * We are using `send()` because we are going to be "paying" some amount of money to the contract (greater than 1 ETH)
            * `value: web3.utils.toWei('1.5', 'ether')` is used to convert 1.5 ether into wei (given Mocha requires wei)
        * the `methods` call allows us to test the functions inside the smart contract
        * of course, we need to call the `contract` instance `lottery` first
        * `        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });` block returns all players added to the pool. This is being called `from` the first account in accounts i.e., `accounts[0]`
    * Sending ether to the pool
        * We use `try-catch` handling
        * First we try to send `0 wei` to the contract using the `enter()` function which requires greater than 1 ether to be sent to the contract
        * `assert(err);` is used because it checks if the variable passed in i.e., `err` returns some truthy value
            * `assert.ok()` is used to check for some sort of existence
            * this only gets thrown when something goes wrong, and we are testing that a minimum requirement is meant
        * `assert(false)` is used to trigger the catch block
    * Send money to winner and reset pool
        * `const initialBalance = await web3.eth.getBalance(accounts[0]);` to get the amount of ether assigned to that specific address



