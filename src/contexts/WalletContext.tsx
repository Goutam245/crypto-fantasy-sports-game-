import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number; // Internal USDC balance
  connect: () => Promise<void>;
  disconnect: () => void;
  updateBalance: (amount: number) => void;
  addToBalance: (amount: number) => void;
  deductFromBalance: (amount: number) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const connect = useCallback(async () => {
    // Simulate wallet connection - in production use WalletConnect v2
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockAddress = '0x' + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setAddress(mockAddress);
    setIsConnected(true);
    // Start with $0 balance - user needs to deposit
    setBalance(0);
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
  }, []);

  const updateBalance = useCallback((amount: number) => {
    setBalance(amount);
  }, []);

  const addToBalance = useCallback((amount: number) => {
    setBalance(prev => prev + amount);
  }, []);

  const deductFromBalance = useCallback((amount: number): boolean => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  }, [balance]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        updateBalance,
        addToBalance,
        deductFromBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
