"use client";

import { motion } from "framer-motion";
import { Award, Plus, CreditCard, Target } from "lucide-react";
import { apiService } from "@/lib/api";

interface QuickActionsProps {
  onAction?: (action: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
        {
      label: "Pay Bills",
      icon: CreditCard,
      color: "bg-linear-to-br from-green-500 to-cyan-600",
      description: "Quick payments",
      action: "pay-bills"
    },
    {
      label: "Add Funds",
      icon: Plus,
      color: "bg-linear-to-br from-green-500 to-cyan-600",
      description: "Top up your balance",
      action: "add-funds"
    },
    {
      label: "Offset Carbon",
      icon: Award,
      color: "bg-linear-to-br from-green-500 to-cyan-600",
      description: "Make an impact now",
      action: "offset"
    },
    {
      label: "Set Goals",
      icon: Target,
      color: "bg-linear-to-br from-green-500 to-cyan-600",
      description: "Plan your savings",
      action: "set-goals"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          onClick={async () => {
            if (action.action === 'add-funds') {
              try {
                const result = await apiService.addUserBalance(10000); // Add ₦10,000
                if (result.success) {
                  console.log('Funds added successfully');
                  window.location.reload();
                } else {
                  console.error('Failed to add funds:', result.error);
                }
              } catch (error) {
                console.error('Error adding funds:', error);
              }
            } else {
              onAction?.(action.action);
            }
          }}
          className={`${action.color} text-black font-semibold rounded-xl hover-lift shadow-lg hover:shadow-xl flex flex-col items-center justify-center p-6 space-y-3 group transition-all duration-300`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="p-3 bg-black/20 rounded-full"
            whileHover={{ rotate: 5 }}
          >
            <action.icon className="w-6 h-6" />
          </motion.div>
          <div className="text-center">
            <span className="text-sm font-bold block">{action.label}</span>
            <span className="text-xs opacity-80 block mt-1">{action.description}</span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}