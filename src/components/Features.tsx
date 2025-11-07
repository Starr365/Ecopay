"use client";

import { motion } from "framer-motion";
import { Brain, Link as LinkIcon, Leaf, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI Carbon Tracker",
    description: "Automatically estimates emissions from spending using advanced machine learning algorithms.",
  },
  {
    icon: LinkIcon,
    title: "Blockchain Transparency",
    description: "Every offset is verifiable on-chain, ensuring complete transparency and accountability.",
  },
  {
    icon: Leaf,
    title: "Green Rewards",
    description: "Earn GreenPoints and unlock eco-badges for sustainable spending habits.",
  },
  {
    icon: BarChart3,
    title: "Sustainability Dashboard",
    description: "View your emissions, offsets, and progress with beautiful, interactive visualizations.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-neon-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-4 neon-text">
            Web3 Features for Sustainable Finance
          </h2>
          <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
            Experience the future of eco-friendly crypto payments with blockchain transparency and AI-powered carbon tracking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full glass hover:pro-shadow-lg transition-all duration-300 pro-border">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-off-white/70 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}