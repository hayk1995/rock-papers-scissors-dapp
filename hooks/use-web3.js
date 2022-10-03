import React from 'react';

import Web3 from 'web3';

export const Web3Context = React.createContext(null);
export function Web3Provider({ children }) {
  const web3 = new Web3(window.ethereum);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  const context = React.useContext(Web3Context);

  if (context === undefined) {
    throw new Error('useMetaMask hook must be used with a UseWeb3Account component');
  }

  return context;
}
