async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const NewCoinFlip = await ethers.getContractFactory("NewCoinFlip");
    const contract = await NewCoinFlip.deploy({ value: ethers.utils.parseEther("1.0") });  // Deploy with 1 ETH

    console.log("NewCoinFlip deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

