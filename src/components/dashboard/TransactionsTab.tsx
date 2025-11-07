"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Award, Receipt } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  fee: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
}

export default function TransactionsTab({ transactions }: TransactionsTabProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Sent', 'Received', 'Offset'];

  const filteredTransactions = activeFilter === 'All'
    ? transactions
    : transactions.filter(tx => {
        if (activeFilter === 'Sent') return tx.type === 'sent';
        if (activeFilter === 'Received') return tx.type === 'received';
        if (activeFilter === 'Offset') return tx.type === 'offset';
        return true;
      });

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