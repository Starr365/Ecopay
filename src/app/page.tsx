"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Rewards from "@/components/Rewards";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen">
      <Navbar onSignup={handleSignup} />
      <main>
        <Hero onSignup={handleSignup} />
        <Features />
        <HowItWorks />
        <Stats />
        <Rewards />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
