"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  PiggyBank,
  ArrowUpDown,
  Receipt,
  CreditCard,
  Award,
  Settings,
  Zap,
  Menu,
  X,
  Wallet
} from "lucide-react";

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  userName?: string;
  onWalletConnect?: () => void;
}

export default function DashboardNavigation({
  activeTab,
  onTabChange,
  isMobile = false,
  isOpen = false,
  onToggle,
  userName = "Sarah Johnson",
  onWalletConnect
}: DashboardNavigationProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'savings', label: 'Savings', icon: PiggyBank },
    { id: 'payments-transfers', label: 'Payments & Transfers', icon: ArrowUpDown },
    { id: 'bills-utilities', label: 'Bills & Utilities', icon: Receipt },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'carbon-footprint', label: 'Carbon Footprint / Offset Projects', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <motion.button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 bg-primary/20 backdrop-blur-md rounded-lg text-primary lg:hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isOpen ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-64 bg-linear-neon-dark/95 backdrop-blur-md border-r border-primary/20 z-40 lg:hidden"
        >
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-bold text-primary">ecopay</span>
            </div>
            <div className="mb-8">
              <p className="text-off-white/70 text-sm">Hi, {userName}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    onToggle?.();
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-off-white/70 hover:text-primary hover:bg-primary/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}

              {/* Connect Celo Wallet CTA */}
              <motion.button
                onClick={() => {
                  onWalletConnect?.();
                  onToggle?.();
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-200 mt-4 border border-accent/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Wallet className="w-5 h-5" />
                <span className="font-medium">Connect Celo Wallet</span>
              </motion.button>
            </nav>
          </div>
        </motion.div>

        {/* Mobile Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onToggle}
          />
        )}
      </>
    );
  }

  // Desktop Tabs
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:flex justify-center mb-8"
    >
      <div className="glass rounded-2xl p-2 flex space-x-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-black shadow-lg'
                : 'text-off-white/70 hover:text-primary hover:bg-primary/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}