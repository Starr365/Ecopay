"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Award, Receipt } from "lucide-react";
import { useState, useEffect } from "react";
import { apiService, Transaction } from "@/lib/api";

interface LocalTransaction {
  id: number;
  type: string;
  description: string;
  amount: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  fee: string;
}

interface TransactionsTabProps {
  transactions: LocalTransaction[];
}

export default function TransactionsTab({ transactions }: TransactionsTabProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [apiTransactions, setApiTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = ['All', 'Sent', 'Received', 'Offset'];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const result = await apiService.getTransactions();
        if (result.success && result.data) {
          setApiTransactions(result.data);
        } else {
          setError(result.error || 'Failed to load transactions');
        }
      } catch (err) {
        setError('Failed to load transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const allTransactions = [...apiTransactions.map(tx => ({
    id: parseInt(tx.id),
    type: tx.type,
    description: tx.description,
    amount: `₦${tx.amount.toLocaleString()}`,
    time: new Date(tx.time).toLocaleDateString(),
    icon: tx.type === 'sent' ? ArrowUpRight : tx.type === 'received' ? ArrowDownLeft : tx.type === 'offset' ? Award : Receipt,
    fee: tx.fee ? `₦${tx.fee.toLocaleString()}` : 'Free'
  })), ...transactions];

  const filteredTransactions = activeFilter === 'All'
    ? allTransactions
    : allTransactions.filter(tx => {
        if (activeFilter === 'Sent') return tx.type === 'sent';
        if (activeFilter === 'Received') return tx.type === 'received';
        if (activeFilter === 'Offset') return tx.type === 'offset';
        return true;
      });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass rounded-2xl p-6"
      >
        <div className="text-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-off-white/70">Loading transactions...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="glass rounded-2xl p-6"
      >
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold text-off-white neon-text">Recent Transactions</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-black font-medium'
                  : 'bg-off-white/10 text-off-white/70 hover:text-primary hover:bg-primary/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {filteredTransactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-linear-neon-glow rounded-xl hover-lift cursor-pointer group"
            whileHover={{ scale: 1.01, x: 4 }}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'received' ? 'bg-green-500/20' :
                tx.type === 'offset' ? 'bg-primary/20' :
                tx.type === 'sent' ? 'bg-red-500/20' : 'bg-primary/20'
              }`}>
                <tx.icon className={`w-5 h-5 ${
                  tx.type === 'received' ? 'text-green-400' :
                  tx.type === 'offset' ? 'text-primary' :
                  tx.type === 'sent' ? 'text-red-400' : 'text-primary'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-off-white group-hover:text-primary transition-colors">{tx.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-off-white/60">{tx.time}</p>
                  <span className="text-xs text-off-white/40">•</span>
                  <p className="text-xs text-off-white/60">{tx.fee}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${
                tx.type === 'received' ? 'text-green-400' :
                tx.type === 'offset' ? 'text-accent' :
                tx.type === 'sent' ? 'text-red-400' : 'text-off-white'
              }`}>
                {tx.type === 'sent' ? '-' : tx.type === 'offset' ? '' : '+'}{tx.amount}
              </p>
              {tx.type === 'offset' && (
                <p className="text-xs text-accent/70">Carbon Offset</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-primary text-sm hover:text-accent transition-colors font-medium">
          View All Transactions →
        </button>
      </div>
    </motion.div>
  );
}