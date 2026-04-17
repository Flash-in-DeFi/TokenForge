import { create } from 'zustand';

export interface ComplianceConfig {
  authRequired: boolean;
  authRevocable: boolean;
  clawbackEnabled: boolean;
  authImmutable: boolean;
  maxTransferAmount?: number;
}

export interface AllocationGroup {
  name: string;
  percentage: number;
  wallets: string[];
  vestingCliffMonths?: number;
  vestingTotalMonths?: number;
}

export interface WizardState {
  step: number;
  templateId: string | null;
  // Step 2: Token parameters
  name: string;
  symbol: string;
  totalSupply: number | null;
  decimals: number;
  tokenType: 'utility' | 'governance' | 'asset-backed' | '';
  // Step 3: Compliance
  complianceConfig: ComplianceConfig;
  // Step 4: Allocations
  allocations: AllocationGroup[];
  // Actions
  setStep: (step: number) => void;
  setTemplate: (templateId: string | null) => void;
  setTokenParams: (params: Partial<WizardState>) => void;
  setComplianceConfig: (config: Partial<ComplianceConfig>) => void;
  setAllocations: (allocations: AllocationGroup[]) => void;
  reset: () => void;
}

const defaultCompliance: ComplianceConfig = {
  authRequired: false,
  authRevocable: false,
  clawbackEnabled: false,
  authImmutable: false,
};

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  templateId: null,
  name: '',
  symbol: '',
  totalSupply: null,
  decimals: 7,
  tokenType: '',
  complianceConfig: defaultCompliance,
  allocations: [],

  setStep: (step) => set({ step }),
  setTemplate: (templateId) => set({ templateId }),
  setTokenParams: (params) => set((state) => ({ ...state, ...params })),
  setComplianceConfig: (config) =>
    set((state) => ({
      complianceConfig: { ...state.complianceConfig, ...config },
    })),
  setAllocations: (allocations) => set({ allocations }),
  reset: () =>
    set({
      step: 1,
      templateId: null,
      name: '',
      symbol: '',
      totalSupply: null,
      decimals: 7,
      tokenType: '',
      complianceConfig: defaultCompliance,
      allocations: [],
    }),
}));
