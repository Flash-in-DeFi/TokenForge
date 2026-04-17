import { create } from 'zustand';

export interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: (publicKey: string) => void;
  disconnect: () => void;
  setConnecting: (connecting: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  publicKey: null,
  isConnected: false,
  isConnecting: false,

  connect: (publicKey) =>
    set({ publicKey, isConnected: true, isConnecting: false }),

  disconnect: () =>
    set({ publicKey: null, isConnected: false, isConnecting: false }),

  setConnecting: (isConnecting) => set({ isConnecting }),
}));
