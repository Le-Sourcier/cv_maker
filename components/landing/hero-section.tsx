"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    // Updated background gradient to use theme colors
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text">
              Create professional CVs in minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Build beautiful, customizable resumes with our easy-to-use drag and drop editor. Stand out and get hired faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto gradient-border">
                  Create your CV
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto card-hover">
                  Browse templates
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative mx-auto w-full max-w-lg">
              <motion.div 
                className="absolute -top-4 -left-4 h-72 w-72 bg-primary/5 rounded-full filter blur-3xl opacity-70"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.5, 0.7] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                // Changed hardcoded blue to accent color from theme
                className="absolute -bottom-4 -right-4 h-72 w-72 bg-accent/5 rounded-full filter blur-3xl opacity-70"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.5, 0.7] 
                }}
                transition={{ 
                  duration: 4,
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                // Changed border to use theme variable
                className="relative shadow-2xl rounded-xl overflow-hidden border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="CV Builder Preview" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}