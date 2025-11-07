"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, ArrowUpRight, ArrowDownLeft, Target } from "lucide-react";

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string;
    change: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="glass rounded-xl p-6 hover-lift cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
              stat.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {stat.change}
            </div>
          </div>
          <div className="text-left">
            <p className="text-off-white/70 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-off-white neon-text">{stat.value}</p>
            <p className="text-off-white/60 text-xs mt-1">
              {stat.change.startsWith('+') ? '↗ Increased' : '↘ Decreased'} from last month
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}