import Link from "next/link";
import { useState } from "react"; // Added useState
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  FileText,
  Menu as MenuIcon // Added Menu icon
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // Added SheetClose
} from "@/components/ui/sheet"; // Added Sheet components
import HeroSection from "@/components/landing/hero-section";
import FeatureSection from "@/components/landing/feature-section";
import TemplateShowcase from "@/components/landing/template-showcase";
import TestimonialSection from "@/components/landing/testimonial-section";
import Footer from "@/components/landing/footer";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/templates", label: "Templates" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <main className="min-h-screen">
      {/* Changed to bg-background for theme consistency */}
      <header className="bg-background shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CV Builder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/builder" className="hidden sm:block"> {/* Hide "Create CV" on very small screens if menu is open */}
              <Button size="sm" className="text-xs sm:text-sm">
                Create CV
                <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-3/4 sm:w-1/2">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="text-lg font-medium hover:text-primary transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                     <SheetClose asChild>
                        <Link href="/builder" className="mt-4">
                          <Button className="w-full">
                            Create CV
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
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