const connectButton = document.getElementById('connectButton');
const flipButton = document.getElementById('flipButton');
const result = document.getElementById('result');

let provider;
let signer;
let coinFlipContract;

connectButton.onclick = async () => {
    if (typeof wiindow.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
    

    const contractAddress = '0xYourContractAdresss'; // Replace with your contract address
    const abi = [
        //Add your contract's ABI here
    ];
    coinFlipContract = new ethers.Contract(contractAddress, abi, signer);
    console.log('Connected to MetaMask');
} else {
        alert ('Please install MetaMask');
    }
};

flipButton.onclick = async () => {
    if (coinFlipContract) {
        try {
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