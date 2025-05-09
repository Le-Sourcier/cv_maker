"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/cv-templates";
import CVPreview from "@/components/builder/cv-preview";
import { defaultCV } from "@/lib/default-data";
import { FileText } from "lucide-react";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen">
      <header className="bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CV Builder</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/templates" className="text-sm font-medium text-primary transition-colors">
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
              <Button>Create CV</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Professional CV Templates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates to create your perfect CV
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(templates).map(([id, template]) => (
              <div 
                key={id}
                className="relative overflow-hidden rounded-lg border-2 border-muted hover:border-muted-foreground/50 transition-all duration-200"
              >
                <div className="relative aspect-[3/4] max-h-[400px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center transform scale-50 pointer-events-none p-2">
                    <CVPreview cvData={defaultCV} templateId={id} />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                      {template.category}
                    </span>
                    <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center px-4">{template.description}</p>
                    
                    <Link href={`/builder?template=${id}`}>
                      <Button>Use Template</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}