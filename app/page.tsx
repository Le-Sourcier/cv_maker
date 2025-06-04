import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Download, Upload, Settings } from "lucide-react";
import HeroSection from "@/components/landing/hero-section";
import FeatureSection from "@/components/landing/feature-section";
import TemplateShowcase from "@/components/landing/template-showcase";
import TestimonialSection from "@/components/landing/testimonial-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Changed to bg-background for theme consistency */}
      <header className="bg-background shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CV Builder</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/templates" className="text-sm font-medium hover:text-primary transition-colors">
              Templates
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/builder">
              <Button>
                Create CV
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />
      <FeatureSection />
      <TemplateShowcase />
      <TestimonialSection />
      <Footer />
    </main>
  );
}