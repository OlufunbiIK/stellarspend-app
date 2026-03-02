/**
 * StellarSpend — Mock API Client
 * Simulates network latency and returns typed mock data.
 * Replace with real Stellar Horizon calls in production.
 */

export interface AssetBalance {
  asset: "XLM" | "USDC" | "EURC";
  balance: string;
  usdValue: number;
  change24h: number; // percent
}

export interface WalletBalances {
  balances: AssetBalance[];
  totalUsd: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  hash: string;
  created_at: string;
  memo: string;
  successful: boolean;
  operations: {
    id: string;
    type: string;
    amount?: string;
    asset_code?: string;
    from?: string;
    to?: string;
  }[];
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Mock Data ─────────────────────────────────────────────────────────────

const MOCK_BALANCES: WalletBalances = {
  balances: [
    { asset: "XLM", balance: "4 210.50", usdValue: 631.58, change24h: +2.4 },
    { asset: "USDC", balance: "1 085.20", usdValue: 1085.2, change24h: +0.01 },
    { asset: "EURC", balance: "320.00", usdValue: 347.2, change24h: -0.31 },
  ],
  totalUsd: 2063.98,
  updatedAt: new Date().toISOString(),
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    hash: "8f7d6e5c4b3a21098f7d6e5c4b3a21098f7d6e5c4b3a21098f7d6e5c4b3a2109",
    created_at: "2024-05-20T14:30:00Z",
    memo: "Coffee payment",
    successful: true,
    operations: [
      {
        id: "op_1",
        type: "payment",
        amount: "15.50",
        asset_code: "USDC",
        from: "GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO",
        to: "GBCS422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
      },
    ],
  },
  {
    id: "tx_2",
    hash: "1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b",
    created_at: "2024-05-19T09:15:00Z",
    memo: "Monthly savings",
    successful: true,
    operations: [
      {
        id: "op_2",
        type: "payment",
        amount: "100.00",
        asset_code: "XLM",
        from: "GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO",
        to: "GASV422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
      },
    ],
  },
  {
    id: "tx_3",
    hash: "5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6",
    created_at: "2024-05-18T18:45:00Z",
    memo: "Rent Payment",
    successful: false,
    operations: [
      {
        id: "op_4",
        type: "payment",
        amount: "850.00",
        asset_code: "EURC",
        from: "GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO",
        to: "GRNT422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C",
      },
    ],
  },
];

// ─── API Functions ──────────────────────────────────────────────────────────

/**
 * Fetch wallet balances (mock — 400 ms latency).
 */
export async function fetchBalances(): Promise<WalletBalances> {
  await delay(400);
  return { ...MOCK_BALANCES, updatedAt: new Date().toISOString() };
}

/**
 * Fetch recent transactions (mock — 300 ms latency).
 * @param limit  maximum number of records to return (default 10)
 */
export async function fetchTransactions(limit = 10): Promise<Transaction[]> {
  await delay(300);
  return MOCK_TRANSACTIONS.slice(0, limit);
}
