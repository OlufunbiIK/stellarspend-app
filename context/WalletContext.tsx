"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Wallet {
  id: string;
  name: string;
  address: string;
  publicKey: string;
  balance: {
    xlm: string;
    usdc?: string;
    eurc?: string;
  };
  isDefault: boolean;
  createdAt: number;
}

export interface WalletContextType {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  addWallet: (wallet: Omit<Wallet, "id" | "createdAt">) => void;
  removeWallet: (id: string) => void;
  selectWallet: (id: string) => void;
  updateWalletBalance: (id: string, balance: Wallet["balance"]) => void;
  updateWalletName: (id: string, name: string) => void;
  setDefaultWallet: (id: string) => void;
  refreshBalances: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WALLETS_STORAGE_KEY = "stellarspend_wallets";
const SELECTED_WALLET_KEY = "stellarspend_selected_wallet";

// Mock wallet data for demonstration
const MOCK_WALLETS: Wallet[] = [
  {
    id: "wallet_1",
    name: "Main Wallet",
    address: "GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO",
    publicKey: "GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO",
    balance: {
      xlm: "1250.50",
      usdc: "500.00",
      eurc: "100.00",
    },
    isDefault: true,
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: "wallet_2",
    name: "Savings",
    address: "GBCS422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
    publicKey: "GBCS422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
    balance: {
      xlm: "5000.00",
      usdc: "2000.00",
    },
    isDefault: false,
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: "wallet_3",
    name: "Trading",
    address: "GTRD422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
    publicKey: "GTRD422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
    balance: {
      xlm: "250.00",
      usdc: "1000.00",
      eurc: "500.00",
    },
    isDefault: false,
    createdAt: Date.now() - 86400000 * 5,
  },
];

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load wallets from localStorage on mount
  useEffect(() => {
    const loadWallets = () => {
      try {
        const savedWallets = localStorage.getItem(WALLETS_STORAGE_KEY);
        const savedSelectedId = localStorage.getItem(SELECTED_WALLET_KEY);

        if (savedWallets) {
          const parsed = JSON.parse(savedWallets);
          setWallets(parsed);
          
          // Restore selected wallet or select default
          if (savedSelectedId && parsed.find((w: Wallet) => w.id === savedSelectedId)) {
            setSelectedWalletId(savedSelectedId);
          } else {
            const defaultWallet = parsed.find((w: Wallet) => w.isDefault);
            setSelectedWalletId(defaultWallet?.id || parsed[0]?.id || null);
          }
        } else {
          // Initialize with mock data if no wallets exist
          setWallets(MOCK_WALLETS);
          const defaultWallet = MOCK_WALLETS.find((w) => w.isDefault);
          setSelectedWalletId(defaultWallet?.id || MOCK_WALLETS[0]?.id);
          localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(MOCK_WALLETS));
          localStorage.setItem(SELECTED_WALLET_KEY, defaultWallet?.id || MOCK_WALLETS[0]?.id);
        }
      } catch (err) {
        setError("Failed to load wallets");
        console.error("Failed to load wallets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWallets();
  }, []);

  // Save wallets to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(wallets));
    }
  }, [wallets, isLoading]);

  // Save selected wallet to localStorage
  useEffect(() => {
    if (!isLoading && selectedWalletId) {
      localStorage.setItem(SELECTED_WALLET_KEY, selectedWalletId);
    }
  }, [selectedWalletId, isLoading]);

  const addWallet = useCallback((wallet: Omit<Wallet, "id" | "createdAt">) => {
    const newWallet: Wallet = {
      ...wallet,
      id: `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };

    setWallets((prev) => {
      // If this is the first wallet, make it default
      if (prev.length === 0) {
        newWallet.isDefault = true;
      }
      return [...prev, newWallet];
    });

    // If no wallet is selected, select the new one
    setSelectedWalletId((prev) => prev || newWallet.id);
  }, []);

  const removeWallet = useCallback((id: string) => {
    setWallets((prev) => {
      const walletToRemove = prev.find((w) => w.id === id);
      const remaining = prev.filter((w) => w.id !== id);
      
      // If removing the default wallet, set a new default
      if (walletToRemove?.isDefault && remaining.length > 0) {
        remaining[0].isDefault = true;
      }
      
      return remaining;
    });

    // If removing the selected wallet, select another one
    setSelectedWalletId((prev) => {
      if (prev === id) {
        const remaining = wallets.filter((w) => w.id !== id);
        const defaultWallet = remaining.find((w) => w.isDefault);
        return defaultWallet?.id || remaining[0]?.id || null;
      }
      return prev;
    });
  }, [wallets]);

  const selectWallet = useCallback((id: string) => {
    setSelectedWalletId(id);
  }, []);

  const updateWalletBalance = useCallback((id: string, balance: Wallet["balance"]) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, balance } : w))
    );
  }, []);

  const updateWalletName = useCallback((id: string, name: string) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, name } : w))
    );
  }, []);

  const setDefaultWallet = useCallback((id: string) => {
    setWallets((prev) =>
      prev.map((w) => ({
        ...w,
        isDefault: w.id === id,
      }))
    );
  }, []);

  const refreshBalances = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to fetch balances
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real implementation, this would fetch from Stellar Horizon API
      // For now, we'll simulate some balance changes
      setWallets((prev) =>
        prev.map((w) => ({
          ...w,
          balance: {
            ...w.balance,
            xlm: (parseFloat(w.balance.xlm) + (Math.random() - 0.5) * 10).toFixed(2),
          },
        }))
      );
    } catch (err) {
      setError("Failed to refresh balances");
      console.error("Failed to refresh balances:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectedWallet = wallets.find((w) => w.id === selectedWalletId) || null;

  const value: WalletContextType = {
    wallets,
    selectedWallet,
    isLoading,
    error,
    addWallet,
    removeWallet,
    selectWallet,
    updateWalletBalance,
    updateWalletName,
    setDefaultWallet,
    refreshBalances,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
}
