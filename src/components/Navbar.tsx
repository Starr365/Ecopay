"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onSignup?: () => void;
}

export default function Navbar({ onSignup }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-none">
      <div className={`${isOpen ? '' : 'border border-off-white/10'} rounded-full mt-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-neon-primary rounded-full">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Ecopay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <Button
              onClick={onSignup}
              className="bg-secondary text-black hover:bg-success px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium hover:neon-text"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                onClick={onSignup}
                className="bg-secondary text-black hover:bg-success px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}