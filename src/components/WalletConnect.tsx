"use client";

import { motion } from "framer-motion";
import { Wallet, Zap, Shield, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ExtendedWindow extends Window {
  celo?: unknown;
  valora?: unknown;
  ethereum?: {
    isCelo?: boolean;
    isValora?: boolean;
    isMetaMask?: boolean;
  };
}

interface WalletConnectProps {
  onConnect: () => void;
  onProceed?: () => void;
  isConnecting?: boolean;
  isConnected?: boolean;
}

export default function WalletConnect({ onConnect, onProceed, isConnecting = false, isConnected = false }: WalletConnectProps) {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState<string | null>(null);

  const walletOptions = [
    {
      name: "Celo Wallet",
      icon: "🌿",
      description: "Connect with Celo Wallet",
      popular: true,
      downloadUrl: "https://celowallet.app/",
      checkInstalled: () => {
        return !!(window as ExtendedWindow).celo || !!(window as ExtendedWindow).ethereum?.isCelo;
      }
    },
    {
      name: "Valora",
      icon: "📱",
      description: "Connect with Valora",
      popular: false,
      downloadUrl: "https://valoraapp.com/",
      checkInstalled: () => {
        return !!(window as ExtendedWindow).valora || !!(window as ExtendedWindow).ethereum?.isValora;
      }
    },
    {
      name: "MetaMask",
      icon: "🦊",
      description: "Connect with MetaMask",
      popular: false,
      downloadUrl: "https://metamask.io/download/",
      checkInstalled: () => {
        return !!(window as ExtendedWindow).ethereum?.isMetaMask;
      }
    },
  ];

  const handleWalletConnect = async (wallet: typeof walletOptions[0]) => {
    setConnectingWallet(wallet.name);

    try {
      // Check if wallet is installed
      if (!wallet.checkInstalled()) {
        setShowDownloadPrompt(wallet.name);
        setConnectingWallet(null);
        return;
      }

      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call the onConnect callback
      onConnect();
      setConnectingWallet(null);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setConnectingWallet(null);
    }
  };

  const handleDownloadWallet = (walletName: string) => {
    const wallet = walletOptions.find(w => w.name === walletName);
    if (wallet) {
      window.open(wallet.downloadUrl, '_blank');
    }
    setShowDownloadPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-neon-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-neon-primary rounded-full flex items-center justify-center mx-auto mb-6 neon-glow"
          >
            <Wallet className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2 neon-text">
            {isConnected ? "Wallet Connected!" : "Connect Celo Wallet"}
          </h1>
          <p className="text-muted">
            {isConnected
              ? "Your wallet is successfully connected. You can now proceed to your dashboard."
              : "Link your Celo wallet to enable carbon offset contributions in cUSD and cEUR"
            }
          </p>
        </div>


        {/* Wallet Options */}
        <div className="space-y-3 mb-8">
          {walletOptions.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <button
                onClick={() => handleWalletConnect(wallet)}
                disabled={isConnecting || connectingWallet !== null}
                className="w-full glass-neon p-4 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground flex items-center">
                        {wallet.name}
                        {connectingWallet === wallet.name && (
                          <div className="ml-2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {wallet.popular && !connectingWallet && (
                          <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full neon-text">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted">{wallet.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-neon p-4 rounded-xl mb-8"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Carbon Offset Only</p>
              <p className="text-xs text-muted">
                Your Celo wallet will only be used for carbon offset contributions in cUSD and cEUR.
                It won&apos;t affect your daily Ecopay transactions in ₦.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="glass-neon p-4 rounded-xl text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Secure</div>
            <div className="text-xs text-muted">Bank-level security</div>
          </div>
          <div className="glass-neon p-4 rounded-xl text-center">
            <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Fast</div>
            <div className="text-xs text-muted">Instant connection</div>
          </div>
        </motion.div>

        {/* Proceed Button */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <motion.button
              onClick={onProceed}
              className="w-full py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg hover-lift shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Dashboard
            </motion.button>
          </motion.div>
        )}

        {/* Download Prompt Modal */}
        {showDownloadPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDownloadPrompt(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-xl font-semibold text-off-white neon-text mb-2">
                {showDownloadPrompt} Not Found
              </h3>
              <p className="text-off-white/70 mb-6">
                {showDownloadPrompt} is not installed on your device. Download it to connect your wallet for carbon offset contributions.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDownloadPrompt(null)}
                  className="flex-1 px-4 py-3 border border-off-white/20 text-off-white/70 hover:text-primary hover:border-primary/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDownloadWallet(showDownloadPrompt)}
                  className="flex-1 px-4 py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-muted"
        >
          By connecting, you agree to our{" "}
          <a href="#" className="text-primary hover:text-accent transition-colors neon-text">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-accent transition-colors neon-text">
            Privacy Policy
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}