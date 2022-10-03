import React, { useState, useEffect } from 'react';

export const EthAccountContext = React.createContext(null);

export function EthAccountProvider({ children }) {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      ethereum.request({ method: 'eth_requestAccounts' })
        .then((result) => {
          setAccount(result[0]);
          setIsConnected(true);
        });

      ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    } else {
      alert('Install metamask');
    }
  }, []);

  return <EthAccountContext.Provider value={{ account, isConnected }}>{children}</EthAccountContext.Provider>;
}

export default function useEthAccount() {
  const context = React.useContext(EthAccountContext);

  if (context === undefined) {
    throw new Error('useMetaMask hook must be used with a UseWeb3Account component');
  }

  return context;
}
