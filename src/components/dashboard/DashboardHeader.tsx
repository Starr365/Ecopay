"use client";

import { motion } from "framer-motion";
import { Award, Wallet } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  walletAddress: string;
  balance: string;
  onWalletConnect: () => void;
}

export default function DashboardHeader({ userName, walletAddress, balance, onWalletConnect }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8 glass rounded-2xl overflow-hidden"
    >
      <div className="bg-linear-to-r from-primary/10 to-accent/10 p-1">
        <div className="bg-linear-neon-dark rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-linear-neon-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-black">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-off-white neon-text">Welcome back, {userName}! 👋</h1>
                <p className="text-off-white/70 mt-1">{walletAddress}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400 font-medium">Wallet Connected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs text-primary font-medium">Eco Contributor</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:items-end">
              <div className="text-center sm:text-right">
                <p className="text-off-white/70 text-sm font-medium">ecopay Balance</p>
                <p className="text-4xl font-bold text-primary neon-text">{balance}</p>
                <p className="text-off-white/60 text-xs mt-1">+₦15,000 this month</p>
              </div>
              <motion.button
                onClick={onWalletConnect}
                className="px-4 py-2 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Manage Wallet
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}