"use client"; // Required for framer-motion client-side hooks

import { Check, FileText, Download, Upload, LayoutGrid, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

export default function FeatureSection() {
  const features = [
    {
      icon: <LayoutGrid className="h-8 w-8 text-primary" />,
      title: "Customizable Templates",
      description: "Choose from a variety of professional templates designed for different industries and career stages.",
    },
    {
      icon: <MousePointerClick className="h-8 w-8 text-primary" />,
      title: "Drag & Drop Editor",
      description: "Easily customize your CV by dragging and dropping sections exactly where you want them.",
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Export Options",
      description: "Download your finished CV in multiple formats including PDF, HTML, and more.",
    },
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Import Existing CVs",
      description: "Upload your existing CV in PDF, HTML, or image format and we'll convert it automatically.",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Real-time Preview",
      description: "See changes to your CV in real-time as you make them for a seamless editing experience.",
    },
    {
      icon: <Check className="h-8 w-8 text-primary" />,
      title: "AI Suggestions",
      description: "Get AI-powered suggestions to improve your CV content and make it stand out to employers.",
    },
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 }},
  }

  return (
    // Updated section background to use theme variable
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional, standout CVs that get you noticed by employers.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index} 
              // Updated feature item background and border to use theme variables
              // Adjusted padding for smaller screens
              className="p-6 sm:p-8 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              variants={item} // Apply item variant to each feature card
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}