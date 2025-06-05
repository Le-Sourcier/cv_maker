"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/cv-templates";
import CVPreview from "@/components/builder/cv-preview";
import { defaultCV } from "@/lib/default-data";
import { FileText } from "lucide-react";

export default function TemplatesPage() {
  return (
    // Removed redundant header, assuming main header is in layout.tsx
    <main className="min-h-screen">
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional CV Templates</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates to create your perfect CV.
            </p>
          </div>

          {/* Adjusted grid and card styling to match TemplateSelector component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(templates).map(([id, template]) => (
              <div 
                key={id}
                className="rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-200 flex flex-col bg-card shadow-sm"
              >
                {/* Preview Area */}
                <div className="relative aspect-[3/4] max-h-[450px] overflow-hidden bg-muted/30 dark:bg-muted/10 rounded-t-md">
                  <div className="absolute inset-0 flex items-center justify-center transform scale-[0.65] origin-top pointer-events-none p-1">
                    <CVPreview cvData={defaultCV} templateId={id} />
                  </div>
                </div>
                {/* Caption Area */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <span className="text-xs font-medium text-primary mb-2">
                    {template.category}
                  </span>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">{template.description}</p>

                  <Link href={`/builder?template=${id}`} className="mt-auto">
                    <Button className="w-full">Use Template</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}