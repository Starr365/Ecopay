"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Calculator, Leaf, AlertCircle, CheckCircle } from "lucide-react";
import { apiService } from "@/lib/api";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferComplete?: () => void;
}

interface CarbonEstimate {
  co2Emission: number;
  category: string;
  description: string;
}

interface TransferStep {
  step: 'details' | 'confirm' | 'success';
  transferData?: {
    recipient: string;
    amount: number;
    category: string;
    description: string;
    carbonEstimate: CarbonEstimate;
  };
}

// Carbon emission factors (kg CO2 per Naira spent)
const carbonFactors = {
  food: 0.8, // kg CO2 per ₦1000 spent on food
  transport: 1.2,
  shopping: 0.6,
  bills: 0.3,
  entertainment: 0.4,
  default: 0.5
};

export default function TransferModal({ isOpen, onClose, onTransferComplete }: TransferModalProps) {
  const [currentStep, setCurrentStep] = useState<TransferStep['step']>('details');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('default');
  const [isCalculating, setIsCalculating] = useState(false);
  const [carbonEstimate, setCarbonEstimate] = useState<CarbonEstimate | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferData, setTransferData] = useState<TransferStep['transferData'] | null>(null);

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'bills', label: 'Bills & Utilities', icon: '💡' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'default', label: 'Other', icon: '📦' }
  ];

  const calculateCarbonFootprint = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsCalculating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const amountValue = parseFloat(amount);
    const factor = carbonFactors[category as keyof typeof carbonFactors];
    const co2Emission = (amountValue / 1000) * factor;

    const categoryInfo = categories.find(cat => cat.value === category);
    const estimate: CarbonEstimate = {
      co2Emission: Math.round(co2Emission * 100) / 100,
      category: categoryInfo?.label || 'Other',
      description: `Carbon generated from this ${categoryInfo?.label.toLowerCase()} transaction`
    };

    setCarbonEstimate(estimate);
    setIsCalculating(false);
  };

  // Auto-calculate carbon footprint when amount or category changes
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      calculateCarbonFootprint();
    } else {
      setCarbonEstimate(null);
    }
  }, [amount, category]);

  const handleProceedToConfirm = () => {
    if (!recipient || !amount || !carbonEstimate) return;

    const data = {
      recipient,
      amount: parseFloat(amount),
      category,
      description: description || `Transfer - ${carbonEstimate.category}`,
      carbonEstimate
    };

    setTransferData(data);
    setCurrentStep('confirm');
  };

  const handleConfirmTransfer = async () => {
    if (!transferData) return;

    setIsProcessing(true);

    try {
      // Create transaction with carbon data
      const transactionData = {
        recipientId: transferData.recipient,
        amount: transferData.amount,
        description: transferData.description,
        carbonFootprint: transferData.carbonEstimate.co2Emission,
        category: transferData.category
      };

      const result = await apiService.makeTransaction(transactionData);

      if (result.success) {
        setCurrentStep('success');
        // Auto-close after showing success
        setTimeout(() => {
          onTransferComplete?.();
          onClose();
          resetForm();
        }, 3000);
      } else {
        console.error('Transfer failed:', result.error);
      }
    } catch (error) {
      console.error('Transfer error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCurrentStep('details');
    setRecipient('');
    setAmount('');
    setDescription('');
    setCategory('default');
    setCarbonEstimate(null);
    setTransferData(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {currentStep === 'details' && (
          <h3 className="text-xl font-semibold text-off-white neon-text mb-6 flex items-center">
            <ArrowUpRight className="w-5 h-5 mr-2" />
            Make Transfer
          </h3>
        )}

        {currentStep === 'confirm' && transferData && (
          <h3 className="text-xl font-semibold text-off-white neon-text mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Transfer
          </h3>
        )}

        {currentStep === 'success' && (
          <h3 className="text-xl font-semibold text-off-white neon-text mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Transfer Successful!
          </h3>
        )}

        {currentStep === 'details' && (
          <div className="space-y-4 mb-6">
            {/* Recipient */}
            <div>
              <label className="block text-sm font-medium text-off-white/70 mb-2">
                Recipient
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient name or account"
                className="w-full glass-neon pl-4 pr-4 py-3 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-off-white/70 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="w-full glass-neon pl-4 pr-4 py-3 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-off-white/70 mb-2">
                Transaction Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-neon pl-4 pr-4 py-3 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-off-white/70 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this transfer for?"
                className="w-full glass-neon pl-4 pr-4 py-3 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Automated Carbon Estimation Display */}
            {carbonEstimate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-4 border border-orange-500/30"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-400">Carbon Generated</span>
                </div>
                <div className="text-2xl font-bold text-orange-400 neon-text mb-1">
                  {carbonEstimate.co2Emission} kg CO₂e
                </div>
                <p className="text-xs text-off-white/70">{carbonEstimate.description}</p>
                <div className="flex items-center space-x-1 mt-2 text-xs text-off-white/60">
                  <AlertCircle className="w-3 h-3" />
                  <span>This will be automatically added to your carbon footprint</span>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {currentStep === 'confirm' && transferData && (
          <div className="space-y-4 mb-6">
            <div className="glass rounded-xl p-4">
              <h4 className="text-lg font-semibold text-off-white mb-4">Transfer Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-off-white/70">Recipient:</span>
                  <span className="text-off-white">{transferData.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-off-white/70">Amount:</span>
                  <span className="text-off-white">₦{transferData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-off-white/70">Category:</span>
                  <span className="text-off-white">{transferData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-off-white/70">Carbon Impact:</span>
                  <span className="text-orange-400">{transferData.carbonEstimate.co2Emission} kg CO₂e</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="text-center space-y-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            </motion.div>
            <div>
              <h4 className="text-xl font-semibold text-off-white mb-2">Transfer Completed Successfully!</h4>
              <p className="text-off-white/70">Your transaction has been processed and carbon footprint updated.</p>
            </div>
          </div>
        )}

        {currentStep === 'details' && (
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-off-white/20 text-off-white/70 hover:text-primary hover:border-primary/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleProceedToConfirm}
              disabled={!recipient || !amount || !carbonEstimate}
              className="flex-1 px-4 py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Review Transfer
            </motion.button>
          </div>
        )}

        {currentStep === 'confirm' && (
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentStep('details')}
              className="flex-1 px-4 py-3 border border-off-white/20 text-off-white/70 hover:text-primary hover:border-primary/50 rounded-lg transition-colors"
            >
              Back
            </button>
            <motion.button
              onClick={handleConfirmTransfer}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Confirm Transfer'
              )}
            </motion.button>
          </div>
        )}

        {currentStep === 'success' && (
          <motion.button
            onClick={handleClose}
            className="w-full px-4 py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Done
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}