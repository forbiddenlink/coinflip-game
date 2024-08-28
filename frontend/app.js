const connectButton = document.getElementById('connectButton');
const flipButton = document.getElementById('flipButton');
const result = document.getElementById('result');

let provider;
let signer;
let coinFlipContract;


//This function runs when the "Connect Wallet" button is clicked
connectButton.onclick = async () => {
    if (typeof window.ethereum !== 'undefined') { 
        console.log('Metamask is installed'); 
        try {
            //Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts'});

            // Create an ethers provider and signer from MetaMask
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
    
            //Replace with your deployed contract address
    
    
        const contractAddress = '0xC4001566a0354C5A7cBfE8a68d08b159019AF06C'; // Deployment contract address
        // Replace with your contract's ABI
        const abi = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
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
              "outputs": [],
              "stateMutability": "payable",
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
              "inputs": [],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
    ];

    // Initialize the contract with the provider, ABI, and contract address
    coinFlipContract = new ethers.Contract(contractAddress, abi, signer);
    console.log('Connected to MetaMask');
    } catch (error) {
        console.error('Error connecting to MetaMask', error);
        alert('Failed to connect to MetaMask');
        }
    } else {
        alert ('Please install MetaMask');
    }
};


// This functiom runs when the "Flip Coin" button is clicked
flipButton.onclick = async () => {
    if (coinFlipContract) {
        try {
            // Call flipCoin with a guess of true (this can be changed to allow user input)
            const tx = await coinFlipContract.flipCoin(true, { value: ethers.utils.parseEther("0.01")});
            await tx.wait();
            result.textContent = 'Coin flipped successfully';
            } catch (error) {
                result.textContent = 'Transaction failed';
            }
    } else {
        alert('Please connect your wallet first');
    }
};