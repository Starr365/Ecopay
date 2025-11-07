"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";

interface ImpactTabProps {
  onWalletConnect: () => void;
}

export default function ImpactTab({ onWalletConnect }: ImpactTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Carbon Impact Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-off-white neon-text">Carbon Impact</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Active</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-20 h-20 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-10 h-10 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-bold text-black">✓</span>
            </div>
          </motion.div>

          <p className="text-off-white/70 text-sm mb-4">Your carbon offset balance</p>
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <p className="text-xl font-bold text-primary neon-text">250 cUSD</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <p className="text-xl font-bold text-accent neon-text">150 cEUR</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-off-white/70">This Month</span>
            <span className="text-primary font-medium">+45kg CO₂</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-off-white/70">Total Offset</span>
            <span className="text-accent font-medium">245kg CO₂</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-off-white/70">Trees Planted</span>
            <span className="text-green-400 font-medium">12 🌳</span>
          </div>
        </div>

        <motion.button
          onClick={onWalletConnect}
          className="w-full mt-6 py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg hover-lift shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Offset History
        </motion.button>
      </motion.div>

      {/* Global Ranking */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-off-white neon-text">Global Leaderboard</h3>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400 font-medium">Top 15%</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <motion.div
            className="relative inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Trophy className="w-12 h-12 text-black" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-sm font-bold text-black">#124</span>
            </div>
          </motion.div>
          <p className="text-off-white/70 text-sm mb-2">Your Global Ranking</p>
          <p className="text-accent text-sm font-medium">Eco Contributor • Rising Star</p>
        </div>

        <div className="space-y-3 mb-4">
          {[
            { rank: 1, name: "EcoWarrior", contributions: 1250, badge: "🏆" },
            { rank: 2, name: "GreenPioneer", contributions: 1180, badge: "🥇" },
            { rank: 3, name: "CarbonHero", contributions: 1120, badge: "🥈" },
            { rank: 4, name: "NatureLover", contributions: 1080, badge: "🥉" },
            { rank: 124, name: "Sarah Johnson", contributions: 245, badge: "🥈", isUser: true },
          ].map((user) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                user.isUser
                  ? 'bg-primary/20 border border-primary/30 shadow-lg'
                  : 'bg-linear-neon-glow hover:bg-linear-neon-glow/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  user.rank === 1 ? 'bg-yellow-400 text-black' :
                  user.rank === 2 ? 'bg-gray-300 text-black' :
                  user.rank === 3 ? 'bg-orange-400 text-black' :
                  user.isUser ? 'bg-primary text-black' : 'bg-off-white/20 text-off-white'
                }`}>
                  {user.rank}
                </div>
                <span className="text-lg">{user.badge}</span>
                <div>
                  <span className={`text-sm font-medium ${user.isUser ? 'text-primary' : 'text-off-white'}`}>
                    {user.name}
                  </span>
                  {user.isUser && <span className="text-xs text-primary/70 ml-2">(You)</span>}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-off-white">{user.contributions}kg</span>
                <p className="text-xs text-off-white/60">CO₂ offset</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="w-full py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg text-sm font-medium transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Full Leaderboard →
        </motion.button>
      </motion.div>
    </div>
  );
}