// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Lottery {
    address public manager;
    address payable[] public players;
    
    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 1 ether);
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {

        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function getBalance() public view restricted returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
 
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
