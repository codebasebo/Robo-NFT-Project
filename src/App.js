import { useState } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className='overlay'>
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} setIsConnected={setIsConnected} />
        <MainMint accounts={accounts} setAccounts={setAccounts} isConnected={isConnected} />
      </div>
      <div className='moving-background'></div>
    </div>
  );
}

export default App;