"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Award, ArrowUpRight, ArrowDownLeft, Target, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import WalletConnect from "@/components/WalletConnect";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickStats from "@/components/dashboard/QuickStats";
import TransactionsTab from "@/components/dashboard/TransactionsTab";
import SavingsTab from "@/components/dashboard/SavingsTab";
import CarbonFootprintTab from "@/components/dashboard/CarbonFootprintTab";
import AchievementsTab from "@/components/dashboard/AchievementsTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import QuickActions from "@/components/dashboard/QuickActions";
import TransferModal from "@/components/dashboard/TransferModal";
import ImpactTab from "@/components/dashboard/ImpactTab";
import { apiService, User } from "@/lib/api";

const quickStats = [
  { label: "Total Saved", value: "₦85,000", change: "+15%", icon: TrendingUp },
  { label: "Spent This Month", value: "₦42,500", change: "-8%", icon: ArrowDownLeft },
  { label: "Carbon Offset", value: "245kg", change: "+32%", icon: Award },
  { label: "Offset Progress", value: "78%", change: "+12%", icon: Target },
];

const recentTransactions = [
  { id: 1, type: "sent", description: "Transfer to John Doe", amount: "₦15,000", time: "2 hours ago", icon: ArrowUpRight, fee: "₦5" },
  { id: 2, type: "received", description: "Payment from EcoShop", amount: "₦8,500", time: "1 day ago", icon: ArrowDownLeft, fee: "Free" },
  { id: 3, type: "offset", description: "Carbon Offset - Celo Climate", amount: "50 cUSD", time: "3 days ago", icon: Award, fee: "Free" },
  { id: 4, type: "sent", description: "Bill Payment - Electricity", amount: "₦12,000", time: "5 days ago", icon: Receipt, fee: "Free" },
  { id: 5, type: "received", description: "Salary Deposit", amount: "₦150,000", time: "1 week ago", icon: ArrowDownLeft, fee: "Free" },
];

const savingsGoals = [
  { name: "Emergency Fund", target: 500000, current: 320000, deadline: "Dec 2024", color: "#00FF9C" },
  { name: "Vacation Savings", target: 200000, current: 85000, deadline: "Jun 2024", color: "#f0cc35" },
  { name: "New Car", target: 1000000, current: 450000, deadline: "Jan 2025", color: "#066b6b" },
];

const achievements = [
  { name: "Bronze", criteria: "Offset 100kg CO₂", progress: 100, earned: true, icon: "🥉" },
  { name: "Silver", criteria: "Offset 500kg CO₂", progress: 49, earned: false, icon: "🥈" },
  { name: "Gold", criteria: "Offset 1000kg CO₂", progress: 24.5, earned: false, icon: "🥇" },
  { name: "Eco-Champion", criteria: "Top 10% contributors", progress: 15, earned: false, icon: "🏆" },
];

export default function Dashboard() {
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleWalletConnect = () => {
    setShowWalletConnect(true);
  };

  const handleWalletConnected = () => {
    setShowWalletConnect(false);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'transfer') {
      setShowTransferModal(true);
    } else {
      console.log('Quick action:', action);
      // Handle other quick actions here
    }
  };

  const handleTransferComplete = () => {
    // Refresh transactions or update UI
    window.location.reload();
  };

  const handleLogout = () => {
    apiService.logout();
    // Redirect to home page
    router.push('/');
  };

  const handleUpdateProfile = (data: { name: string; email: string; password?: string }) => {
    console.log('Update profile:', data);
    // Handle profile update here
  };

  const handleUpdateAvatar = (file: File) => {
    console.log('Update avatar:', file);
    // Handle avatar upload here
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await apiService.getUserProfile();
        if (result.success && result.data) {
          setUserProfile(result.data);
        } else {
          // If profile fetch fails, redirect to auth
          router.push('/auth');
        }
      } catch (error) {
        router.push('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-neon-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-off-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (showWalletConnect) {
    return <WalletConnect onConnect={handleWalletConnected} />;
  }

  if (showTransferModal) {
    return (
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransferComplete={handleTransferComplete}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <QuickStats stats={quickStats} />
            <ImpactTab onWalletConnect={handleWalletConnect} />
            <div className="grid lg:grid-cols-3 gap-8">
              <TransactionsTab transactions={recentTransactions} />
              <SavingsTab goals={savingsGoals} />
            </div>
          </motion.div>
        );

      case 'savings':
        return (
          <motion.div
            key="savings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SavingsTab goals={savingsGoals} />
          </motion.div>
        );

      case 'payments-transfers':
        return (
          <motion.div
            key="payments-transfers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionsTab transactions={recentTransactions} />
          </motion.div>
        );

      case 'bills-utilities':
        return (
          <motion.div
            key="bills-utilities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Bills & Utilities component would go here */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-off-white neon-text mb-6">Bills & Utilities</h3>
              <p className="text-off-white/70">Bills & Utilities section coming soon...</p>
            </div>
          </motion.div>
        );

      case 'cards':
        return (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cards component would go here */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-off-white neon-text mb-6">Cards</h3>
              <p className="text-off-white/70">Cards section coming soon...</p>
            </div>
          </motion.div>
        );

      case 'carbon-footprint':
        return (
          <motion.div
            key="carbon-footprint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CarbonFootprintTab onWalletConnect={handleWalletConnect} />
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SettingsTab
              userName={userProfile?.name || "User"}
              userEmail={userProfile?.email || ""}
              onLogout={handleLogout}
              onUpdateProfile={handleUpdateProfile}
              onUpdateAvatar={handleUpdateAvatar}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-linear-neon-dark pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Mobile Navigation */}
        <DashboardNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobile={true}
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          userName={userProfile?.name || "User"}
          onWalletConnect={handleWalletConnect}
        />

        {/* Header */}
        <DashboardHeader
          userName={userProfile?.name || "User"}
          walletAddress={userProfile?.walletAddress || ""}
          balance={`₦${userProfile?.balance?.toLocaleString() || "0"}`}
          onWalletConnect={handleWalletConnect}
        />

        {/* Desktop Navigation */}
        <DashboardNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Quick Actions - Universal (except settings) */}
        {activeTab !== 'settings' && (
          <div className="mb-8">
            <QuickActions onAction={handleQuickAction} />
          </div>
        )}

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </section>
  );
}