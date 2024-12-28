const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await hre.ethers.provider.getBalance(deployer.address);


    console.log("deploying contract with account ", await deployer.getAddress());
    console.log("Account balance ", accountBalance.toString());

    const RoboPuckNFTFactory = await hre.ethers.getContractFactory("RoboPuckNFT");
    const RoboPuckNFTContract = await RoboPuckNFTFactory.deploy();
    await RoboPuckNFTContract.waitForDeployment();
    console.log("Contract deployed to: ", await RoboPuckNFTContract.getAddress());





}

const runMain = async () => {
    try {
        await main();
        process.exit(0);

    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

runMain();