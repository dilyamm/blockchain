// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Функция для получения Ether
    receive() external payable {}

    // Функция для проверки баланса контракта
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Функция для вывода средств владельцем
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
}
