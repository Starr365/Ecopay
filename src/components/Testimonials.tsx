"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Andrews Peter",
    role: " Fashion Entrepreneur",
    avatar: "👩‍💼",
    quote: "Ecopay has transformed how I think about my business's environmental impact. The AI tracking is incredibly accurate, and seeing my carbon offset in real-time is motivating.",
    impact: "Offset 450kg CO₂",
    rating: 3.5,
  },
  {
    name: "Sunday Ugwuanyi",
    role: "Tech Professional",
    avatar: "👨‍💻",
    quote: "As someone who's always on the go, Ecopay makes it effortless to contribute to climate action. The gamification aspect keeps me engaged and informed.",
    impact: "Offset 320kg CO₂",
    rating: 4.5,
  },
  {
    name: "Emma Thompson",
    role: "Environmental Activist",
    avatar: "🌱",
    quote: "The transparency of Ecopay's blockchain verification gives me confidence that my contributions are making a real difference. It's the future of climate finance.",
    impact: "Offset 680kg CO₂",
    rating: 5,
  },
  {
    name: "Emmanuel Chisalum",
    role: "Small Business Owner",
    avatar: "👨‍🍳",
    quote: "Running a restaurant, I never thought carbon tracking could be this simple. Ecopay's dashboard helps me make better decisions for my business and the planet.",
    impact: "Offset 290kg CO₂",
    rating: 4.8,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-neon-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-4 neon-text">
            Web3 Community Voices
          </h2>
          <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
            Hear from crypto pioneers who are revolutionizing sustainable finance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full glass hover:pro-shadow-lg transition-all duration-300 pro-border">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-primary/30 absolute -top-2 -left-2" />
                    <p className="text-off-white/70 italic leading-relaxed pl-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-off-white/70">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="bg-primary/10 rounded-lg p-3 text-center">
                    <p className="text-sm text-primary font-medium">{testimonial.impact}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}