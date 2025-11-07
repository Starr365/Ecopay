"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import HowItWorks from "./HowItWorks";

interface HeroProps {
  onSignup?: () => void;
}

export default function Hero({ onSignup }: HeroProps) {
  const floatingIcons = [
    { Icon: Code, delay: 0, x: 100, y: 50 },
    { Icon: Zap, delay: 1, x: -100, y: 100 },
    { Icon: Globe, delay: 2, x: 150, y: -50 },
  ];

  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${(i * 5) % 100}%`,
      top: `${(i * 7) % 100}%`,
      width: `${(i % 4) + 2}px`,
      height: `${(i % 4) + 2}px`,
      delay: `${(i % 8)}s`,
    }));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Particle Effects */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.width,
              height: particle.height,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Floating background elements */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20 animate-float"
          style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: delay, duration: 1 }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="animate-slide-in-up"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-off-white mb-8 leading-tight animate-fade-in-scale"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track. Save. Offset{" "}
            <span className="neon-text">Reimagined</span>
          </motion.h1>

          <motion.p
            className="text-xl text-off-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The first eco-finance app that helps you manage your money while making a positive impact on climate change.
             Powered by AI-driven analytics and blockchain transparency on Celo.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover-lift"
            >
              <Button
                size="lg"
                onClick={onSignup}
                className="bg-secondary text-black hover:bg-success px-10 py-4 rounded-full transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
              >
                Get Started
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover-lift"
            >
              <Button
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="border-off-white text-off-white hover:bg-white/10 hover:text-off-white px-10 py-4 rounded-full transition-all duration-300 font-semibold text-lg pro-border"
              >
                See How It Works
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}