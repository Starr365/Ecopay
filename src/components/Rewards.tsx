"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Flame, Zap, Leaf, TreePine, Sun, Crown } from "lucide-react";
import { Card, CardContent, } from "@/components/ui/card";

const badges = [
  {
    icon: Leaf,
    title: "Carbon Neutral",
    description: "Offset 100kg of CO₂",
    earned: true,
    rarity: "common",
  },
  {
    icon: TreePine,
    title: "Forest Guardian",
    description: "Funded 5 reforestation projects",
    earned: true,
    rarity: "rare",
  },
  {
    icon: Sun,
    title: "Solar Pioneer",
    description: "Supported renewable energy for 1 year",
    earned: false,
    rarity: "epic",
  },
  {
    icon: Crown,
    title: "Climate Champion",
    description: "Top 1% of offsetters this month",
    earned: false,
    rarity: "legendary",
  },
];

const leaderboard = [
  { rank: 1, name: "EcoWarrior", points: 2450, avatar: "🌱" },
  { rank: 2, name: "GreenGuru", points: 2230, avatar: "🌿" },
  { rank: 3, name: "CarbonZero", points: 2105, avatar: "🍃" },
  { rank: 4, name: "You", points: 1850, avatar: "👤", isCurrentUser: true },
  { rank: 5, name: "PlanetSaver", points: 1720, avatar: "🌍" },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common": return "border-green-300 bg-green-50 dark:bg-green-900/20";
    case "rare": return "border-blue-300 bg-blue-50 dark:bg-blue-900/20";
    case "epic": return "border-purple-300 bg-purple-50 dark:bg-purple-900/20";
    case "legendary": return "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20";
    default: return "border-gray-300 bg-gray-50 dark:bg-gray-900/20";
  }
};

export default function Rewards() {
  return (
    <section id="about" className="py-20 bg-gradient-neon-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10"
        >
          <Leaf className="w-16 h-16 text-primary" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10"
        >
          <Zap className="w-12 h-12 text-accent" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-4 neon-text">
            Earn Rewards for Your Impact
          </h2>
          <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
            Turn your sustainable actions into achievements. Collect badges, climb leaderboards, and unlock exclusive rewards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Your Eco-Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className={`relative glass ${badge.earned ? 'pro-shadow' : 'opacity-50'} transition-all duration-300 pro-border`}>
                    {badge.earned && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-white/50 dark:bg-black/50 rounded-full flex items-center justify-center">
                        <badge.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{badge.title}</h4>
                      <p className="text-xs text-off-white/70">{badge.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          {/* Streak Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="glass max-w-md mx-auto pro-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground">Current Streak</h4>
                    <p className="text-3xl font-bold text-primary">12 days</p>
                    <p className="text-sm text-off-white/70">Keep it up!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          </motion.div>
          

          {/* Leaderboard Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Monthly Leaderboard</h3>
            <Card className="glass pro-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.isCurrentUser
                          ? 'bg-primary/10 border border-primary/20'
                          : 'bg-surface/50 dark:bg-black/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1 ? 'bg-yellow-400 text-black' :
                          user.rank === 2 ? 'bg-gray-300 text-black' :
                          user.rank === 3 ? 'bg-orange-400 text-black' :
                          'bg-muted text-off-white/70'
                        }`}>
                          {user.rank <= 3 ? <Trophy className="w-4 h-4" /> : user.rank}
                        </div>
                        <span className="text-2xl">{user.avatar}</span>
                        <div>
                          <p className={`font-medium ${user.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                            {user.name}
                          </p>
                          <p className="text-sm text-off-white/70">{user.points} points</p>
                        </div>
                      </div>
                      {user.rank <= 3 && (
                        <div className="flex space-x-1">
                          {Array.from({ length: 4 - user.rank }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </section>
  );
}