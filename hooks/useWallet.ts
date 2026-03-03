"use client";

import { useCallback } from "react";
import { useWalletContext, Wallet } from "@/context/WalletContext";

export interface UseWalletReturn {
  // State
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addWallet: (wallet: Omit<Wallet, "id" | "createdAt">) => void;
  removeWallet: (id: string) => void;
  selectWallet: (id: string) => void;
  updateWalletBalance: (id: string, balance: Wallet["balance"]) => void;
  updateWalletName: (id: string, name: string) => void;
  setDefaultWallet: (id: string) => void;
  refreshBalances: () => Promise<void>;
  
  // Helpers
  getWalletById: (id: string) => Wallet | undefined;
  getWalletByAddress: (address: string) => Wallet | undefined;
  formatAddress: (address: string, start?: number, end?: number) => string;
  getTotalBalance: () => { xlm: string; usdc: string; eurc: string };
}

/**
 * Hook for managing wallet operations and accessing wallet state.
 * Provides a convenient interface for components to interact with wallet functionality.
 * 
 * @example
 * ```tsx
 * const { wallets, selectedWallet, selectWallet, addWallet } = useWallet();
 * ```
 */
export function useWallet(): UseWalletReturn {
  const context = useWalletContext();

  const getWalletById = useCallback(
    (id: string) => {
      return context.wallets.find((w) => w.id === id);
    },
    [context.wallets]
  );

  const getWalletByAddress = useCallback(
    (address: string) => {
      return context.wallets.find(
        (w) => w.address.toLowerCase() === address.toLowerCase()
      );
    },
    [context.wallets]
  );

  const formatAddress = useCallback(
    (address: string, start = 4, end = 4) => {
      if (address.length <= start + end) return address;
      return `${address.slice(0, start)}...${address.slice(-end)}`;
    },
    []
  );

  const getTotalBalance = useCallback(() => {
    return context.wallets.reduce(
      (totals, wallet) => {
        const xlm = parseFloat(wallet.balance.xlm) || 0;
        const usdc = parseFloat(wallet.balance.usdc || "0") || 0;
        const eurc = parseFloat(wallet.balance.eurc || "0") || 0;
        
        return {
          xlm: (parseFloat(totals.xlm) + xlm).toFixed(2),
          usdc: (parseFloat(totals.usdc) + usdc).toFixed(2),
          eurc: (parseFloat(totals.eurc) + eurc).toFixed(2),
        };
      },
      { xlm: "0.00", usdc: "0.00", eurc: "0.00" }
    );
  }, [context.wallets]);

  return {
    // State
    wallets: context.wallets,
    selectedWallet: context.selectedWallet,
    isLoading: context.isLoading,
    error: context.error,
    
    // Actions
    addWallet: context.addWallet,
    removeWallet: context.removeWallet,
    selectWallet: context.selectWallet,
    updateWalletBalance: context.updateWalletBalance,
    updateWalletName: context.updateWalletName,
    setDefaultWallet: context.setDefaultWallet,
    refreshBalances: context.refreshBalances,
    
    // Helpers
    getWalletById,
    getWalletByAddress,
    formatAddress,
    getTotalBalance,
  };
}

export default useWallet;
