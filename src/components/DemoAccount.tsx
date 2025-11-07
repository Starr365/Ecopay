"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wallet, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { apiService } from "@/lib/api";

interface DemoAccountProps {
  onDemoLogin?: () => void;
}

export default function DemoAccount({ onDemoLogin }: DemoAccountProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const demoAccount = {
    name: "Demo User",
    email: "demo@ecopay.app",
    balance: 50000, // ₦50,000
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    carbonOffset: 245,
    ranking: 89
  };

  const handleDemoConnect = async () => {
    setIsConnecting(true);

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // In a real app, this would authenticate with the demo account
      // For now, we'll just simulate success
      setIsConnected(true);
      onDemoLogin?.();
    } catch (error) {
      console.error('Demo connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-6 text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-off-white neon-text mb-2">
          Demo Account Connected!
        </h3>
        <p className="text-off-white/70 mb-4">
          Welcome to Ecopay! You can now explore all features with your demo account.
        </p>
        <div className="text-sm text-off-white/60">
          <p>Demo Balance: ₦{demoAccount.balance.toLocaleString()}</p>
          <p>Carbon Offset: {demoAccount.carbonOffset} kg CO₂e</p>
          <p>Global Ranking: #{demoAccount.ranking}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-off-white neon-text mb-2">
          Try Demo Account
        </h3>
        <p className="text-off-white/70">
          Experience Ecopay without connecting a real wallet. Explore transfers, carbon tracking, and climate contributions.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 bg-off-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <Wallet className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-off-white">Demo Wallet</p>
              <p className="text-xs text-off-white/60">Pre-funded with ₦50,000</p>
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>

        <div className="flex items-center justify-between p-3 bg-off-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="text-xs text-accent">🌱</span>
            </div>
            <div>
              <p className="text-sm font-medium text-off-white">Carbon Tracking</p>
              <p className="text-xs text-off-white/60">245 kg CO₂e already offset</p>
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>

        <div className="flex items-center justify-between p-3 bg-off-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🥇</span>
            </div>
            <div>
              <p className="text-sm font-medium text-off-white">Global Ranking</p>
              <p className="text-xs text-off-white/60">Top 15% of contributors</p>
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>
      </div>

      <motion.button
        onClick={handleDemoConnect}
        disabled={isConnecting}
        className="w-full bg-primary text-black font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <span>Connecting Demo Account...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Start Demo Experience</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>

      <div className="mt-4 text-center">
        <p className="text-xs text-off-white/60">
          No real money or wallet connection required. This is for demonstration purposes only.
        </p>
      </div>
    </motion.div>
  );
}