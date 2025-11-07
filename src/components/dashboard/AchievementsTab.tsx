"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface Achievement {
  name: string;
  criteria: string;
  progress: number;
  earned: boolean;
  icon: string;
}

interface AchievementsTabProps {
  achievements: Achievement[];
}

export default function AchievementsTab({ achievements }: AchievementsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-off-white neon-text">Achievements</h3>
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-xs text-primary font-medium">
            {achievements.filter(a => a.earned).length}/{achievements.length} Earned
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative p-4 rounded-xl text-center transition-all duration-300 ${
              achievement.earned
                ? 'bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30 shadow-lg'
                : 'bg-linear-neon-glow hover:bg-linear-neon-glow/80'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {achievement.earned && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-bold text-black">✓</span>
              </div>
            )}

            <motion.div
              className={`text-4xl mb-3 ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}
              whileHover={{ rotate: achievement.earned ? 0 : 5 }}
            >
              {achievement.icon}
            </motion.div>

            <p className={`text-sm font-semibold mb-2 ${
              achievement.earned ? 'text-primary' : 'text-off-white/70'
            }`}>
              {achievement.name}
            </p>

            <p className="text-xs text-off-white/60 mb-3 leading-tight">{achievement.criteria}</p>

            {!achievement.earned && (
              <div className="space-y-2">
                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-2 bg-linear-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  />
                </div>
                <p className="text-xs text-off-white/50">{achievement.progress}% complete</p>
              </div>
            )}

            {achievement.earned && (
              <div className="mt-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                  Earned!
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.button
        className="w-full mt-4 py-2 bg-accent/20 text-accent hover:bg-accent/30 rounded-lg text-sm font-medium transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View All Achievements →
      </motion.button>
    </motion.div>
  );
}