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
* 