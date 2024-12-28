import React from 'react';
import { ethers } from 'ethers';
import facebook from './assets/social-media-icons/facebook.png';
import twitter from './assets/social-media-icons/twitter.png';
import email from './assets/social-media-icons/email.png';
import './NavBar.css';

function NavBar({ accounts, setAccounts, setIsConnected }) {
    async function connectAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

                console.log("Connected account:", accounts[0]);
                console.log("Signer:", signer);

                setAccounts(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error("Error connecting account:", error);
            }
        } else {
            console.error("MetaMask is not installed.");
        }
    }

    return (
        <nav className="navbar">
            <div className="social-links">
                <a href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer" className="social-link">
                    <img src={facebook} alt="Facebook" className="social-icon" />
                </a>
                <a href='https://twitter.com/' target='_blank' rel="noopener noreferrer" className="social-link">
                    <img src={twitter} alt="Twitter" className="social-icon" />
                </a>
                <a href='mailto:' target='_blank' rel="noopener noreferrer" className="social-link">
                    <img src={email} alt="Email" className="social-icon" />
                </a>
            </div>

            <div className="nav-links">
                <div onClick={() => window.location.href = '/about'} className="nav-link">About</div>
                <div onClick={() => window.location.href = '/mint'} className="nav-link">Mint</div>
                <div onClick={() => window.location.href = '/team'} className="nav-link">Team</div>
            </div>

            {accounts.length > 0 ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}
        </nav>
    );
}

export default NavBar;
