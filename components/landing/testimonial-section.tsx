"use client"; // Required for framer-motion

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion"; // Import motion

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "This CV builder helped me land my dream job! The templates are professional and the drag and drop editor is incredibly easy to use.",
      author: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "SJ",
    },
    {
      quote: "I was struggling to make my CV stand out until I found this tool. The AI suggestions were particularly helpful in improving my content.",
      author: "David Chen",
      role: "Software Engineer",
      avatar: "DC",
    },
    {
      quote: "As someone who's not design-savvy, this platform made creating a professional CV so simple. The export options are also very convenient.",
      author: "Emma Williams",
      role: "HR Specialist",
      avatar: "EW",
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
    // Updated section background to use theme variable
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of job seekers have used our platform to create standout CVs and advance their careers.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              {/* Removed custom background and border to use default Card styling from theme */}
              <Card className="shadow-sm h-full"> {/* Added h-full for consistent height in flex/grid items if needed */}
                <CardContent className="p-8 flex flex-col h-full"> {/* Added flex flex-col h-full for better content distribution if card heights vary */}
                  <div className="mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 inline-block">★</span>
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 flex-grow">"{testimonial.quote}"</blockquote> {/* Added flex-grow to allow quote to take space */}
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}