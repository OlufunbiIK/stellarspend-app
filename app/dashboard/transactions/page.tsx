'use client';

import React, { useState } from 'react';
import TransactionDrawer from '@/components/transactions/TransactionDrawer';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const MOCK_TRANSACTIONS = [
  {
    id: 'tx_1',
    hash: '8f7d6e5c4b3a21098f7d6e5c4b3a21098f7d6e5c4b3a21098f7d6e5c4b3a2109',
    created_at: '2024-05-20T14:30:00Z',
    fee_charged: '100',
    max_fee: '1000',
    operation_count: 1,
    memo: 'Coffee payment',
    memo_type: 'text',
    successful: true,
    source_account: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
    ledger: 51234567,
    tags: ['food', 'daily'],
    operations: [
      {
        id: 'op_1',
        type: 'payment',
        amount: '15.50',
        asset_code: 'USDC',
        from: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
        to: 'GBCS422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C',
      }
    ]
  },
  {
    id: 'tx_2',
    hash: '1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b',
    created_at: '2024-05-19T09:15:00Z',
    fee_charged: '200',
    max_fee: '2000',
    operation_count: 2,
    memo: 'Monthly savings',
    memo_type: 'text',
    successful: true,
    source_account: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
    ledger: 51234568,
    tags: ['savings', 'goal-2024'],
    operations: [
      {
        id: 'op_2',
        type: 'payment',
        amount: '100.00',
        asset_code: 'XLM',
        from: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
        to: 'GASV422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C',
      },
      {
        id: 'op_3',
        type: 'change_trust',
        funder: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
      }
    ]
  },
  {
    id: 'tx_3',
    hash: '5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6',
    created_at: '2024-05-18T18:45:00Z',
    fee_charged: '150',
    max_fee: '1500',
    operation_count: 1,
    memo: 'Rent Payment',
    memo_type: 'text',
    successful: false,
    source_account: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
    ledger: 51234569,
    tags: ['housing'],
    operations: [
      {
        id: 'op_4',
        type: 'payment',
        amount: '850.00',
        asset_code: 'EURC',
        from: 'GDQD6A4P422X44QW6UXO6R6AOTHOV4C6A4P422X44QW6UXO6R6AOTHO',
        to: 'GRNT422X44QW6UXO6R6AOTHOV4CGDQD6A4P422X44QW6UXO6R6AOTHOV4C',
      }
    ]
  }
];

export default function TransactionsPage() {
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (tx: any) => {
    setSelectedTx(tx);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080b18] p-4 md:p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#e8b84b]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#4aa9e8]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-[#e8b84b]/20 bg-[#e8b84b]/[0.08] text-[#e8b84b]">
              <div className="w-1 h-1 rounded-full bg-[#e8b84b] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Blockchain Activity</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Transactions</h1>
            <p className="text-[#7a8aaa] mt-2 font-medium max-w-md">
              A comprehensive history of your operations on the Stellar network.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-95 group">
              <RefreshCw className="w-5 h-5 text-[#7a8aaa] group-hover:text-white transition-colors" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#e8b84b] hover:bg-[#f0c85a] text-[#1a0f00] font-bold rounded-2xl shadow-xl shadow-[#e8b84b]/10 transition-all hover:-translate-y-0.5 active:scale-[0.98] uppercase tracking-wider text-sm">
              Send Assets
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8aaa] group-focus-within:text-[#e8b84b] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by hash, memo or address..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl focus:ring-2 focus:ring-[#e8b84b]/30 focus:border-[#e8b84b]/50 text-white placeholder-[#7a8aaa]/50 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 text-[#e8edf8] font-bold transition-all uppercase tracking-widest text-[10px]">
            <Filter className="w-4 h-4 text-[#7a8aaa]" />
            Filters
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-white/[0.01] backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-5 text-[10px] font-black text-[#7a8aaa] uppercase tracking-[0.2em]">Operation</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#7a8aaa] uppercase tracking-[0.2em]">Context</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#7a8aaa] uppercase tracking-[0.2em]">Impact</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#7a8aaa] uppercase tracking-[0.2em]">Timeframe</th>
                  <th className="px-8 py-5 text-[10px] font-black text-[#7a8aaa] uppercase tracking-[0.2em] text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <tr 
                    key={tx.id} 
                    onClick={() => handleOpenDrawer(tx)}
                    className="hover:bg-white/[0.03] cursor-pointer transition-all group relative border-l-2 border-transparent hover:border-l-[#e8b84b]"
                  >
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl border ${
                          !tx.successful ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          tx.operations[0].type === 'payment' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20' : 
                          'bg-[#4aa9e8]/10 text-[#4aa9e8] border-[#4aa9e8]/20'
                        }`}>
                          {!tx.successful ? <AlertCircle className="w-5 h-5" /> :
                           tx.operations[0].type === 'payment' ? <ArrowDownLeft className="w-5 h-5" /> : 
                           <RefreshCw className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-white uppercase tracking-wider group-hover:text-[#e8b84b] transition-colors">
                            {tx.operations[0].type.replace(/_/g, ' ')}
                          </p>
                          <p className="text-[10px] font-bold text-[#7a8aaa] uppercase tracking-widest mt-1">
                            {tx.successful ? (
                              <span className="flex items-center gap-1.5 text-[#4ade80]/80">
                                <span className="w-1 h-1 rounded-full bg-[#4ade80]" />
                                Verified
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-red-400/80">
                                <span className="w-1 h-1 rounded-full bg-red-400" />
                                Reverted
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-semibold text-[#e8edf8] group-hover:text-white transition-colors">
                        {tx.memo || 'Unlabeled'}
                      </p>
                      <p className="text-[10px] font-mono text-[#7a8aaa] mt-1 line-clamp-1 opacity-60">
                        {tx.hash.substring(0, 32)}...
                      </p>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      {tx.operations[0].amount ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">
                            {tx.operations[0].amount}
                          </span>
                          <span className="text-[10px] font-bold text-[#e8b84b] uppercase">
                            {tx.operations[0].asset_code}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#7a8aaa] uppercase tracking-widest opacity-30">Network</span>
                      )}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <p className="text-sm font-bold text-[#e8edf8]">
                        {new Date(tx.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-[10px] font-bold text-[#7a8aaa] uppercase tracking-widest mt-0.5">
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2.5 text-[#7a8aaa] hover:text-[#e8b84b] hover:bg-white/5 rounded-xl transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State / Load More */}
        <div className="text-center py-16 flex flex-col items-center">
          <div className="w-1 h-12 bg-linear-to-b from-[#e8b84b]/20 to-transparent mb-6" />
          <p className="text-[#7a8aaa] text-[10px] font-bold uppercase tracking-[0.3em]">Operational History Complete</p>
          <button className="mt-4 text-[#e8b84b] font-black text-xs uppercase tracking-[0.15em] hover:text-white transition-colors flex items-center gap-2 group">
            Sync older records
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <TransactionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        transaction={selectedTx} 
      />
    </div>
  );
}

// Helper icons missing from lucide-react in standard import if not defined
function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
