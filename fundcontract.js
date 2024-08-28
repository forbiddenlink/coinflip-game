const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    const signer = provider.getSigner(0); // Use the first account from Ganache

    const tx = await signer.sendTransaction({
        to: "0xEcf6880006188926C7D7Eac15Be994Cf7A4083e0", // Your contract address
        value: ethers.utils.parseEther("1") // Amount of ETH to send
    });

    await tx.wait();
    console.log("Transaction complete:", tx.hash);
}

main().catch(console.error);
