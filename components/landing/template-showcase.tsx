"use client"; // Required for framer-motion

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

export default function TemplateShowcase() {
  const templates = [
    {
      name: "Professional",
      image: "https://images.pexels.com/photos/6437842/pexels-photo-6437842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Clean and professional template ideal for corporate jobs.",
    },
    {
      name: "Creative",
      image: "https://images.pexels.com/photos/6437844/pexels-photo-6437844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Bold and creative template perfect for design and marketing roles.",
    },
    {
      name: "Modern",
      image: "https://images.pexels.com/photos/6437839/pexels-photo-6437839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Contemporary design suitable for tech and startup positions.",
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
  };

  return (
    // Updated section background to use a subtle shade of the theme's secondary color
    <section className="py-20 bg-secondary/20 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Templates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of professionally designed templates to make your CV stand out.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {templates.map((template, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl"
              variants={item}
            >
              {/* Updated template image container border to use theme variable */}
              <div className="relative h-96 overflow-hidden rounded-xl border border-border">
                <img 
                  src={template.image} 
                  alt={`${template.name} Template`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">{template.name}</h3>
                  <p className="text-white/80 mb-4">{template.description}</p>
                  <Link href="/builder">
                    <Button size="sm" variant="secondary">
                      Use this template
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link href="/templates">
            <Button variant="outline" size="lg">
              View all templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}