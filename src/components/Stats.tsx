"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedCounter = ({ from, to, suffix = "", duration = 2 }: { from: number; to: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(from);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      onUpdate: (value) => setCount(Math.floor(value)),
      ease: "easeOut",
    });

    return controls.stop;
  }, [from, to, duration, isInView]);

  return (
    <motion.span
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ once: false }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
};

export default function Stats() {
  const stats = [
    { value: 10000, suffix: "+", label: "Active Users" },
    { value: 50000, suffix: "kg", label: "CO₂ Offset" },
    { value: 250, suffix: "+", label: "Projects Funded" },
    { value: 4.0, suffix: "/5", label: "User Rating", isFloat: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold text-primary mb-2">
            <AnimatedCounter
              from={0}
              to={stat.isFloat ? stat.value * 10 : stat.value}
              suffix={stat.suffix}
              duration={2}
            />
            {stat.isFloat && <span className="text-2xl">.</span>}
            {stat.isFloat && <AnimatedCounter
              from={0}
              to={Math.floor((stat.value % 1) * 10)}
              duration={2}
            />}
          </div>
          <div className="text-off-white/70">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}