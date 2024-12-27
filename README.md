# BLOCKCHAIN SMART CONTACTS

This project involves creating and deploying a smart contract on the Ethereum blockchain. The smart contract allows the owner to manage Ether funds by receiving Ether, withdrawing it, and checking the balance. The goal of this project is to demonstrate how to create, deploy, and interact with smart contracts using Ethereum, Web3.js, and MetaMask.

## Usage

1. Install Dependencies
To begin, you need to install web3.js and set up the environment for smart contract deployment and interaction.
1.1. Install Node.js
1.2. Install Web3.js by running the following command in your project directory:
npm install web3

2. Configure Environment
This project uses Ganache for local Ethereum blockchain simulation and Web3.js for interacting with the blockchain.
Ganache: Install Ganache.
MetaMask: Install MetaMask and configure it to connect with Ganache or any public testnet.

3. Set Up Web3.js with Ganache or Public Testnet
If using Ganache, make sure it is running on http://127.0.0.1:7545 (default address).
If using a public testnet, you will need to get test Ether from a faucet and configure your MetaMask account.

4. Deploy the Contract
To deploy the smart contract to Ganache or any public testnet, run the following script (you may need to update the contract details and provide the necessary configuration):
node deploy.js
This will deploy the contract and display the deployed contract's address.

5. Interact with the Contract
After deployment, interact with the contract using the following functions:
5.1. Check the Contract's Balance
const balance = await contract.methods.getBalance().call();
console.log(`Contract Balance: ${balance}`);
5.2. Withdraw Ether (Only Owner)
const receipt = await contract.methods.withdraw().send({ from: ownerAddress });
console.log('Withdrawal Transaction Hash:', receipt.transactionHash);
Make sure that the address you are sending the transaction from is the contract's owner.

### Examples

const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Change to your testnet URL if needed

const contractABI = [...]; // Contract ABI
const contractAddress = '0x...'; // Contract Address after deployment

const contract = new web3.eth.Contract(contractABI, contractAddress);

const ownerAddress = '0x...'; // Your owner address

// Check contract balance
contract.methods.getBalance().call()
  .then(balance => console.log(`Contract Balance: ${balance}`))
  .catch(err => console.log(err));

// Withdraw funds (only for owner)
contract.methods.withdraw().send({ from: ownerAddress })
  .then(receipt => console.log('Withdrawal Successful:', receipt))
  .catch(err => console.log(err));

