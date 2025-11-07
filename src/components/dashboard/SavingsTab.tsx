"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface SavingsGoal {
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

interface SavingsTabProps {
  goals: SavingsGoal[];
  onAddGoal?: () => void;
}

export default function SavingsTab({ goals, onAddGoal }: SavingsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-off-white neon-text">Savings Goals</h3>
        <motion.button
          onClick={onAddGoal}
          className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full hover:bg-primary/30 transition-colors flex items-center space-x-1"
          whileHover={{ scale: 1.05 }}
        >
          <Plus className="w-3 h-3" />
          <span>Add Goal</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          return (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-linear-neon-glow rounded-xl hover-lift cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-semibold text-off-white group-hover:text-primary transition-colors">{goal.name}</p>
                  <p className="text-xs text-off-white/60 mt-1">{daysLeft} days left</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-off-white/70">{Math.round(progress)}% complete</p>
                </div>
              </div>

              <div className="relative mb-3">
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-3 rounded-full"
                    style={{ backgroundColor: goal.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-black drop-shadow-sm">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-off-white/70">Current: </span>
                  <span className="text-off-white font-medium">₦{goal.current.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-off-white/70">Target: </span>
                  <span className="text-primary font-medium">₦{goal.target.toLocaleString()}</span>
                </div>
              </div>

              {remaining > 0 && (
                <div className="mt-2 text-xs text-off-white/60">
                  ₦{remaining.toLocaleString()} remaining to reach goal
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}