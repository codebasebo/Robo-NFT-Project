import { useState } from 'react';
import { ethers, Contract } from "ethers";
import roboPunksNFT from './RobopunkNFT.json';
import './MainMint.css';

const roboPunksNFTAddress = "0x9493EC1e8440516839DF053Ab53c6EEE2DAa584c";

const MainMint = ({ accounts, setAccounts, isConnected }) => {
    const [mintAmount, setMintAmount] = useState(1);

    async function handleMint() {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner(); // Get signer for authenticated transactions
                const contract = new Contract(
                    roboPunksNFTAddress, // Contract address
                    roboPunksNFT.abi,    // Contract ABI
                    signer               // Signer instance
                );

                const mintCost = ethers.parseEther((0.02 * mintAmount).toString());

                const response = await contract.mint(mintAmount, {
                    value: mintCost
                });

                await response.wait();
                console.log("Minting successful!");
            } catch (error) {
                console.error("Minting failed:", error.message);
            }
        } else {
            console.error("Ethereum object not found. Is MetaMask installed?");
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div className="mainMint">
            <div className="container">
                <h1 className="title">RoboPunks</h1>
                <p className="description">
                    It's 2078. Can the RoboPunks NFT save humans from the destruction rampant NFT speculation? Mint RoboPunk to find out.
                </p>
                {isConnected ? (
                    <div className="mintContainer">
                        <div className="mintControls">
                            <button className="controlButton" onClick={handleDecrement}>-</button>
                            <input
                                type="number"
                                value={mintAmount}
                                readOnly
                                className="mintInput"
                            />
                            <button className="controlButton" onClick={handleIncrement}>+</button>
                        </div>
                        <button className="mintButton" onClick={handleMint}>MINT NOW</button>
                    </div>
                ) : (
                    <p className="connectPrompt">Connect your wallet to mint</p>
                )}
            </div>
        </div>
    );
}

export default MainMint;