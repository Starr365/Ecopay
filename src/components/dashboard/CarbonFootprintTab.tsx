"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  TrendingUp,
  Award,
  Leaf,
  BarChart3,
  Calendar,
  Users,
  Info,
  DollarSign,
  Euro,
  Target,
  Zap
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface CarbonFootprintTabProps {
  onWalletConnect?: () => void;
}

const climateProjects = [
  {
    id: 'celo-climate',
    name: 'Celo Climate Collective',
    description: 'Celo ecosystem initiative focused on tokenizing natural capital and funding community climate projects.',
    contributors: 1247,
    priority: true,
    icon: '🌿'
  },
  {
    id: 'toucan',
    name: 'Toucan Protocol',
    description: 'Infrastructure to tokenize real-world carbon credits for on-chain liquidity and transparency.',
    contributors: 856,
    priority: false,
    icon: '🌳'
  },
  {
    id: 'flowcarbon',
    name: 'Flowcarbon (GNT Token)',
    description: 'Project tokenizing carbon credits using on-chain tokens (GNT).',
    contributors: 423,
    priority: false,
    icon: '🌱'
  },
  {
    id: 'moss-earth',
    name: 'Moss Earth (MCO2 Token)',
    description: 'Brazilian climate-tech offering tokenized carbon credits to support rainforest protection.',
    contributors: 1089,
    priority: false,
    icon: '🌴'
  },
  {
    id: 'refidao',
    name: 'ReFiDAO',
    description: 'Web3 regenerative finance collective exploring on-chain funding for climate impact.',
    contributors: 634,
    priority: false,
    icon: '🌍'
  },
  {
    id: 'kolektivo',
    name: 'Kolektivo',
    description: 'Community and Celo-aligned initiative exploring natural capital and local climate solutions.',
    contributors: 512,
    priority: false,
    icon: '🌿'
  },
  {
    id: 'impactmarket',
    name: 'ImpactMarket',
    description: 'Development & poverty-alleviation focused DAO with potential climate co-benefits through community programs.',
    contributors: 789,
    priority: false,
    icon: '🌱'
  }
];

const offsetHistory = [
  {
    project: 'Celo Climate Collective',
    date: 'Nov 2, 2025',
    amount: '50 kg CO₂e',
    currency: '25 cUSD'
  },
  {
    project: 'Toucan Protocol',
    date: 'Oct 30, 2025',
    amount: '75 kg CO₂e',
    currency: '40 cEUR'
  },
  {
    project: 'Moss Earth',
    date: 'Oct 25, 2025',
    amount: '65 kg CO₂e',
    currency: '35 cUSD'
  }
];

const weeklyEmissions = [
  { week: 'Week 1', value: 8 },
  { week: 'Week 2', value: 15 },
  { week: 'Week 3', value: 22 },
  { week: 'Week 4', value: 28 },
  { week: 'Week 5', value: 19 },
  { week: 'Week 6', value: 25 }
];

export default function CarbonFootprintTab({ onWalletConnect }: CarbonFootprintTabProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'cUSD' | 'cEUR'>('cUSD');

  const handleContribute = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleConfirmContribution = () => {
    // Handle contribution logic here
    console.log('Contributing to:', selectedProject, 'Amount:', contributionAmount, 'Currency:', selectedCurrency);
    setSelectedProject(null);
    setContributionAmount('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-off-white neon-text mb-2">Carbon Footprint & Offset Projects</h2>
        <p className="text-off-white/70">Track your impact and support climate projects</p>
      </div>

      {/* Current Month Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-xl p-6 text-center"
        >
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-primary neon-text mb-1">125 kg</div>
          <div className="text-sm text-off-white/70">Current Month Footprint</div>
          <div className="text-xs text-off-white/60">CO₂e emissions</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-xl p-6 text-center"
        >
          <Award className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl font-bold text-accent neon-text mb-1">225 kg</div>
          <div className="text-sm text-off-white/70">Lifetime Offsets</div>
          <div className="text-xs text-accent/70">+225 kg this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-xl p-6 text-center"
        >
          <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-400 neon-text mb-1">68%</div>
          <div className="text-sm text-off-white/70">Offset Progress</div>
          <div className="text-xs text-off-white/60">This month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-xl p-6 text-center"
        >
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-primary neon-text mb-1">7</div>
          <div className="text-sm text-off-white/70">Projects Available</div>
          <div className="text-xs text-off-white/60">Climate initiatives</div>
        </motion.div>
      </div>

      {/* Emissions by Week Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-off-white neon-text mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Emissions by Week
        </h3>
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyEmissions}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF9C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00FF9C" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                domain={[0, 30]}
                ticks={[0, 10, 20, 30]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                labelStyle={{ color: 'white' }}
                formatter={(value: number) => [`${value} kg`, 'CO₂e Emissions']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00FF9C"
                strokeWidth={3}
                fill="url(#colorEmissions)"
                dot={{
                  fill: '#00FF9C',
                  strokeWidth: 2,
                  stroke: '#1a1a1a',
                  r: 6
                }}
                activeDot={{
                  r: 8,
                  fill: '#00FF9C',
                  stroke: '#1a1a1a',
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent"></div>
              <span className="text-sm text-off-white/70">CO₂e Emissions (kg)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Climate Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-off-white neon-text mb-6">Climate Projects</h3>
        <div className="grid gap-4">
          {climateProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`glass rounded-xl p-6 hover-lift ${project.priority ? 'border border-primary/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{project.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-off-white">{project.name}</h4>
                      {project.priority && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="text-off-white/70 text-sm mb-3">{project.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-off-white/60">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {project.contributors.toLocaleString()} contributors
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-off-white/60 hover:text-primary transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-off-white/60">
                  Demo / Mock contribution — verify before live integration
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => handleContribute(project.id)}
                    className="px-4 py-2 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contribute
                  </motion.button>
                  <button className="px-4 py-2 border border-off-white/20 text-off-white/70 hover:text-primary hover:border-primary/50 rounded-lg transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Offset History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-off-white neon-text mb-6">Offset History</h3>
        <div className="space-y-4">
          {offsetHistory.map((offset, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-neon-glow rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-off-white">{offset.project}</p>
                  <p className="text-xs text-off-white/60">{offset.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-accent">{offset.amount}</p>
                <p className="text-xs text-off-white/60">{offset.currency}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Impact Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-off-white neon-text mb-6">Your Impact</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent neon-text mb-2">225</div>
            <div className="text-sm text-off-white/70">kg CO₂e offset</div>
            <div className="text-xs text-off-white/60">Equivalent to planting ~11 trees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary neon-text mb-2">150</div>
            <div className="text-sm text-off-white/70">cUSD</div>
            <div className="text-xs text-off-white/60">Total Contributions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent neon-text mb-2">75</div>
            <div className="text-sm text-off-white/70">cEUR</div>
            <div className="text-xs text-off-white/60">Total Contributions</div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-1">🥈</div>
              <div className="text-sm font-bold text-off-white">#124</div>
              <div className="text-xs text-off-white/70">Silver - 45% to Gold</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contribution Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-off-white neon-text mb-4">Make a Contribution</h3>
            <p className="text-off-white/70 mb-6">
              Support climate projects with cUSD or cEUR tokens from your Celo wallet.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-off-white/70 mb-2">
                  Contribution Amount (kg CO₂e)
                </label>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full glass-neon pl-4 pr-4 py-3 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-off-white/70 mb-2">
                  Payment Currency
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedCurrency('cUSD')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                      selectedCurrency === 'cUSD'
                        ? 'bg-primary/20 border border-primary/50'
                        : 'bg-off-white/10 hover:bg-off-white/20'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>cUSD</span>
                  </button>
                  <button
                    onClick={() => setSelectedCurrency('cEUR')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
                      selectedCurrency === 'cEUR'
                        ? 'bg-accent/20 border border-accent/50'
                        : 'bg-off-white/10 hover:bg-off-white/20'
                    }`}
                  >
                    <Euro className="w-4 h-4" />
                    <span>cEUR</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 px-4 py-3 border border-off-white/20 text-off-white/70 hover:text-primary hover:border-primary/50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleConfirmContribution}
                className="flex-1 px-4 py-3 bg-secondary text-black hover:bg-success font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm Contribution
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}