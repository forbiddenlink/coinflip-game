// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewCoinFlip {
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    function flipCoin(bool guess) public payable returns (bool) {
        require(msg.value > 0, "Bet amount must be greater than zero");
        
        bool outcome = (block.timestamp % 2 == 0);
        if (outcome == guess) {
            payable(msg.sender).transfer(msg.value * 2);
            return true;
        } else {
            return false;
        }
    }

    function deposit() public payable {}

    function withdraw(uint amount) public {
        require(msg.sender == owner, "Only the owner can withdraw");
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(owner).transfer(amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}


    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
