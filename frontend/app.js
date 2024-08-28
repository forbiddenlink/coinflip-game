const connectButton = document.getElementById('connectButton');
const flipButton = document.getElementById('flipButton');
const result = document.getElementById('result');

let provider;
let signer;
let coinFlipContract;
const contractAddress = '0xEcf6880006188926C7D7Eac15Be994Cf7A4083e0'; // Your new contract address

// Function to send ETH to the contract
const sendETHToContract = async () => {
    try {
        const tx = await signer.sendTransaction({
            to: contractAddress, // Your contract address
            value: ethers.utils.parseEther("1"), // Sending 1 ETH to the contract
            gasLimit: 3000000 // Set a higher gas limit
        });
        await tx.wait();
        console.log('Sent 1 ETH to contract');
        alert('1 ETH sent to the contract!');
    } catch (error) {
        console.error('Failed to send ETH to contract', error);
        alert('Failed to send ETH to contract');
    }
};

// Function to check the contract's balance
async function getContractBalance() {
    const balance = await provider.getBalance(contractAddress);
    console.log("Contract balance:", ethers.utils.formatEther(balance), "ETH");
    return balance;
}

// This function runs when the "Connect Wallet" button is clicked
connectButton.onclick = async () => {
    try {
        // Create an ethers provider connected to your local Ganache instance
        provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
        const accounts = await provider.listAccounts(); // List available accounts in Ganache
        signer = provider.getSigner(accounts[0]); // Use the first Ganache account as the signer

        const abi = [
            {
              "inputs": [],
              "stateMutability": "payable",
              "type": "constructor"
            },
            {
              "inputs": [],
              "name": "deposit",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bool",
                  "name": "guess",
                  "type": "bool"
                }
              ],
              "name": "flipCoin",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];

        // Initialize the contract with the provider, ABI, and contract address
        coinFlipContract = new ethers.Contract(contractAddress, abi, signer);

        console.log('Connected to Ganache and Contract');
        
        // Check the contract's balance
        await getContractBalance();

    } catch (error) {
        console.error('Error connecting to Ganache', error);
        alert('Failed to connect to Ganache');
    }
};

// This function runs when the "Flip Coin" button is clicked
flipButton.onclick = async () => {
    if (coinFlipContract) {
        try {
            console.log('Flipping the coin...');
            const tx = await coinFlipContract.flipCoin(true, { value: ethers.utils.parseEther("0.01"), gasLimit: 3000000 }); // Send 0.01 ETH with the transaction
            console.log('Transaction:', tx);
            await tx.wait();
            result.textContent = 'Coin flipped successfully';
        } catch (error) {
            console.error('Transaction failed', error);
            result.textContent = 'Transaction failed: ' + error.message;
        }
    } else {
        alert('Please connect your wallet first');
    }
};




