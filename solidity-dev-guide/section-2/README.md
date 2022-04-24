# Section 2

## Contract Deployment
* Contract source code
    * Solidity compiler
        * ABI
        * Contract bytecode
            * Deployed to network (Rinkeby or mainnet for example)
* Truffle
    * Command line tool that aids in contract creation, local testing and deployment
    * Useful but in constant development
* Custom Node project as alternative to Truffle
    * Allows us to create contracts, test locally and deploy to a specified network

## Project Requirements
* Need to be able to write Solidity code in a JS project
    * Solution: setup the solidity compiler to build our contracts
* Need some way to rapidy test contracts without doing the manual testing we were doing with Remix
    * Solution: setup a custom Mocha test runner that can somehow test Solidity code
* Need some way to deploy our contract to public networks
    * Solution: setup a deploy script to compile + deploy our contract

## Setting Up a Project
* *Note: Inbox dir is the directory provided from the program
* ```cd``` to ```ethereum-sandbox/section-2```
* ```mkdir scripts```
* ```cd``` to ```scripts```
* ```npm init```

## Project Structure
* folder: contracts
    * file: Inbox.sol
* folder: test
    * file: Inbox.test.js
* file: package.json
* file: compile.js
* file: deploy.js

## Installing dependencies
* ```npm install solc@0.4.17``` to create package.json files and node_modules

## Compiling Solidity
* ```touch compile.js``` in ```scripts```
    * We can't use require to load modules (Inbox.sol) because the node engine will try to execute the contents of the file as if it was a JS code
    * Instead, we have to read the contents of Inbox.sol off of our harddrive
        * To read the contents out, we must use the built-in library modules:
            * ```const path = require('path');```
                * Helps us build a directory path from compile.js to Inbox.sol file
                * Using the path module, we are guaranteed to get cross platform compatability (can run script on both windows and UNIX system)
            * ```const fs = require('fs');```
            * ```const solc = require('solc');```
                * This is the compile statement
            * ```const inboxPath = path.resolve(__dirname, contracts, Inbox.sol);```
                * ```__dirname``` is always set to the current working directory
                * This will generate a path that points directly to Inbox.sol file
            * ```const source = gs.readFileSync(inboxPath, 'utf8');```
                * This is used to read in the contents of the Inbox.sol file (raw source code of our contract)
            * ```solc.compile(source, 1)```
                * we pass in our source code and specify the number of different contracts we need to compile
                    * The return value from the compiler is always going to be an object
            * ```console.log(solc.compile(source, 1));```
                * We print to the screen to get a better idea of what the compiler is doing
* ```cd``` to ```inbox```
* run ```node compile.js```
```javascript
    $ node compile.js
{
  contracts: {
    ':Inbox': {
      assembly: [Object],
      bytecode: '608060405234801561001057600080fd5b5060405161038c38038061038c83398101604052805101805161003a906000906020840190610041565b50506100dc565b8280546001816001161561010002031660029004906000526020
60002090601f016020900481019282601f1061008257805160ff19168380011785556100af565b828001600101855582156100af579182015b828111156100af578251825591602001919060010190610094565b506100bb9291506100bf565b5090565b6
100d991905b808211156100bb57600081556001016100c5565b90565b6102a1806100eb6000396000f30060806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663368b8772
8114610050578063e21f37ce146100ab575b600080fd5b34801561005c57600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100a9943694929360249392840191908190840183828082843750949750610
1359650505050505050565b005b3480156100b757600080fd5b506100c061014c565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100fa5781810151838201526020016100e2565b5050505090509081
0190601f1680156101275780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80516101489060009060208401906101da565b5050565b60008054604080516020600260018516156101000260001901909
41693909304601f810184900484028201840190925281815292918301828280156101d25780601f106101a7576101008083540402835291602001916101d2565b820191906000526020600020905b8154815290600101906020018083116101b557829003
601f168201915b505050505081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061021b57805160ff1916838001178555610248565b82800160010185558215610248579182015b82811
11561024857825182559160200191906001019061022d565b50610254929150610258565b5090565b61027291905b80821115610254576000815560010161025e565b905600a165627a7a72305820097d5b2932c61e391e787404e0c0e3e2319c90495bc4
eaa24689aa12e517ca550029',
      functionHashes: [Object],
      gasEstimates: [Object],
      interface: '[{"constant":false,"inputs":[{"name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true
,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"
stateMutability":"nonpayable","type":"constructor"}]',
      metadata: '{"compiler":{"version":"0.4.26+commit.4563c3fc"},"language":"Solidity","output":{"abi":[{"constant":false,"inputs":[{"name":"newMessage","type":"string"}],"name":"setMessage","outputs"
:[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","typ
e":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],"devdoc":{"methods":{}},"userdoc":{"methods":{}}},"settings":{
"compilationTarget":{"":"Inbox"},"evmVersion":"byzantium","libraries":{},"optimizer":{"enabled":true,"runs":200},"remappings":[]},"sources":{"":{"keccak256":"0x20d80f7a0c035dbdc835d25a69463639941d0ae85
7bd911c573a0e11ff4d1ca0","urls":["bzzr://7231b31686756ccecb6911e87268173ac2401c6e498f182a132102170b322c3b"]}},"version":1}',
      opcodes: 'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH2 0x38C CODESIZE SUB DUP1 PUSH2 0x38C DUP4 CODECOPY DUP2 ADD 
PUSH1 0x40 MSTORE DUP1 MLOAD ADD DUP1 MLOAD PUSH2 0x3A SWAP1 PUSH1 0x0 SWAP1 PUSH1 0x20 DUP5 ADD SWAP1 PUSH2 0x41 JUMP JUMPDEST POP POP PUSH2 0xDC JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1
 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0x82 JUMP
I DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0xAF JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0xAF JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PU
SH2 0xAF JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x94 JUMP JUMPDEST POP PUSH2 0xBB SWAP3 SWAP2 POP PUSH2 0xBF JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH2
 0xD9 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0xBB JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH2 0xC5 JUMP JUMPDEST SWAP1 JUMP JUMPDEST PUSH2 0x2A1 DUP1 PUSH2 0xEB PUSH1 0x0 CODECOPY PUSH1 0x0
 RETURN STOP PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x4B JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND P
USH4 0x368B8772 DUP2 EQ PUSH2 0x50 JUMPI DUP1 PUSH4 0xE21F37CE EQ PUSH2 0xAB JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x5C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH
1 0x40 DUP1 MLOAD PUSH1 0x20 PUSH1 0x4 DUP1 CALLDATALOAD DUP1 DUP3 ADD CALLDATALOAD PUSH1 0x1F DUP2 ADD DUP5 SWAP1 DIV DUP5 MUL DUP6 ADD DUP5 ADD SWAP1 SWAP6 MSTORE DUP5 DUP5 MSTORE PUSH2 0xA9 SWAP5 CA
LLDATASIZE SWAP5 SWAP3 SWAP4 PUSH1 0x24 SWAP4 SWAP3 DUP5 ADD SWAP2 SWAP1 DUP2 SWAP1 DUP5 ADD DUP4 DUP3 DUP1 DUP3 DUP5 CALLDATACOPY POP SWAP5 SWAP8 POP PUSH2 0x135 SWAP7 POP POP POP POP POP POP POP JUMP
 JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xB7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xC0 PUSH2 0x14C JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP1 DUP3 MSTORE DUP4 MLOAD DUP2 
DUP4 ADD MSTORE DUP4 MLOAD SWAP2 SWAP3 DUP4 SWAP3 SWAP1 DUP4 ADD SWAP2 DUP6 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xFA JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUS
H1 0x20 ADD PUSH2 0xE2 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x127 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP S
UB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 MLOAD PUSH2 0x148 SWAP1 PUSH1 0x0 SWAP1 PUSH1 0x20 DUP5 ADD SWA
P1 PUSH2 0x1DA JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 PUSH1 0x2 PUSH1 0x1 DUP6 AND ISZERO PUSH2 0x100 MUL PUSH1 0x0 NOT ADD SWAP1 SWAP5 AND SWAP4 SWAP
1 SWAP4 DIV PUSH1 0x1F DUP2 ADD DUP5 SWAP1 DIV DUP5 MUL DUP3 ADD DUP5 ADD SWAP1 SWAP3 MSTORE DUP2 DUP2 MSTORE SWAP3 SWAP2 DUP4 ADD DUP3 DUP3 DUP1 ISZERO PUSH2 0x1D2 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1A7
 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x1D2 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOA
D DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x1B5 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP DUP2 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 
0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F 
LT PUSH2 0x21B JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x248 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x248 JUMPI SWAP2 DUP3 ADD JUMPDEST D
UP3 DUP2 GT ISZERO PUSH2 0x248 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x22D JUMP JUMPDEST POP PUSH2 0x254 SWAP3 SWAP2 POP PUSH2 0x258 JUMP JUMPDEST POP 
SWAP1 JUMP JUMPDEST PUSH2 0x272 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x254 JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH2 0x25E JUMP JUMPDEST SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK
256 MULMOD PUSH30 0x5B2932C61E391E787404E0C0E3E2319C90495BC4EAA24689AA12E517CA55 STOP 0x29 ',
      runtimeBytecode: '60806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663368b87728114610050578063e21f37ce146100ab575b600080fd5b34801561005c576
00080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100a99436949293602493928401919081908401838280828437509497506101359650505050505050565b005b3480156100b757600080fd5b506100c061
014c565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100fa5781810151838201526020016100e2565b50505050905090810190601f1680156101275780820380516001836020036101000a031916815
260200191505b509250505060405180910390f35b80516101489060009060208401906101da565b5050565b6000805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282
80156101d25780601f106101a7576101008083540402835291602001916101d2565b820191906000526020600020905b8154815290600101906020018083116101b557829003601f168201915b505050505081565b8280546001816001161561010002031
  },
  errors: [
    ':6:5: Warning: Defining constructors as functions with the same name as the contract is deprecated. Use "constructor(...) { ... }" instead.\n' +
      '    function Inbox(string initialMessage) public {\n' +
      '    ^ (Relevant source part starts here and spans across multiple lines).\n'
  ],
  sourceList: [ '' ],
  sources: { '': { AST: [Object] } }
}
```

* The ```contracts``` object contains all the different contracts that were compiled. The solidity compiler is built assuming you want to compile multiple contracts in one go
* In our case, we specified just one contract ```Inbox.sol```, but if we had other contracts we passed in at the same time, then we'd see similar key, value pairs
* The objects we really care about are:
    * ```bytecode:``` is the actual bytecode we are going to deploy to the ethereum network
    * ```interface``` is our contracts ABI (the communication layer between the solidity world ans the JS world)
    