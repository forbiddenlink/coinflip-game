// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool guess) public payable {
        require(msg.value > 0, "Bet amount must be greater than zero");
        bool outcome = (block.timestamp % 2 == 0);
        if (outcome == guess) {
            payable(msg.sender).transfer(msg.value * 2);
        }
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}