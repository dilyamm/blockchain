const Web3 = require('web3');

// Подключение к Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// ABI контракта (получено при компиляции)
const contractABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { stateMutability: 'payable', type: 'receive' }
];

// Адрес контракта (получено при деплое)
const contractAddress = web3.utils.toChecksumAddress('0x6Db74Ee113E3aD5C90b50F940834037397cC2bd6');

// Подключение к контракту
const contract = new web3.eth.Contract(contractABI, contractAddress);

(async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    
    // Проверить баланс контракта
    const balance = await contract.methods.getBalance().call();
    console.log(`Contract balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);

    // Отправить средства на контракт
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: contractAddress,
      value: web3.utils.toWei('1', 'ether'),
    });

    // Вывести обновленный баланс
    const updatedBalance = await contract.methods.getBalance().call();
    console.log(`Updated contract balance: ${web3.utils.fromWei(updatedBalance, 'ether')} ETH`);

    // Вывести средства владельцем
    await contract.methods.withdraw().send({ from: accounts[0] });
    console.log('Funds withdrawn by the owner');
  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
})();
