"use client";

import { motion } from "framer-motion";
import { Wallet, Link as LinkIcon, Leaf, Trophy } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect your wallet",
    description: "Link your Celo wallet securely to start tracking your carbon footprint.",
  },
  {
    icon: LinkIcon,
    title: "Link your transactions",
    description: "Automatically sync your spending data with our AI-powered carbon calculator.",
  },
  {
    icon: Leaf,
    title: "Offset carbon with verified projects",
    description: "Support real-world reforestation and renewable energy projects on the blockchain.",
  },
  {
    icon: Trophy,
    title: "Earn rewards + share impact",
    description: "Collect GreenPoints, unlock badges, and share your sustainability journey.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-neon-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-4 neon-text">
            How It Works
          </h2>
          <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
            Connect your wallet and start offsetting carbon with every crypto transaction.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-neon-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-8 relative z-10 shadow-lg neon-glow-subtle"
                    whileInView={{ scale: [0, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-off-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 border-r-2 border-b-2 border-primary transform rotate-45"></div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-off-white/70 mb-6">
            Ready to make a difference? Join thousands of users already offsetting their carbon footprint.
          </p>
        </motion.div>
      </div>
    </section>
  );
}