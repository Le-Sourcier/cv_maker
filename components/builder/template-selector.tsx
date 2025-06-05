"use client";

import { useState, useEffect } from "react";
import { Check, Wand2, Eye, Loader2 } from "lucide-react"; // Added Loader2 icon
import { Button } from "@/components/ui/button";
import { CVData } from "@/lib/types";
import { templates } from "@/lib/cv-templates";
import CVPreview from "./cv-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  cvData: CVData;
}

export default function TemplateSelector({ 
  selectedTemplate, 
  onSelectTemplate,
  cvData 
}: TemplateSelectorProps) {
  const { toast } = useToast();
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  const categories = ["All", ...new Set(Object.values(templates).map(t => t.category))];
  
  const filteredTemplates = Object.entries(templates).filter(([id, template]) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateSuggestions = async () => {
    try {
      setIsGeneratingSuggestions(true);
      
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestions');
      }

      const data = await response.json();
      
      toast({
        title: "AI Suggestions",
        description: data.suggestions,
        duration: 10000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Adjusted for responsiveness: stacks on small screens */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex-1 max-w-full sm:max-w-md"> {/* Full width on small, max-w-md on sm+ */}
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button
          onClick={handleGenerateSuggestions}
          disabled={isGeneratingSuggestions}
          className="ml-4" // Consider removing ml-4 if gap-4 on parent is enough, or adjust for sm screens.
        >
          {isGeneratingSuggestions ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isGeneratingSuggestions ? "Generating..." : "Get AI Suggestions"}
        </Button>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          {/* Category buttons now wrap */}
          <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(([id, template]) => (
              <div 
                key={id}
                // Removed onMouseEnter/onMouseLeave, adjusted layout to card with caption
                className={`
                  rounded-lg border-2 transition-all duration-200 flex flex-col
                  ${selectedTemplate === id ? 'border-primary shadow-lg' : 'border-muted hover:border-muted-foreground/50'}
                `}
              >
                {/* Preview Area */}
                <div className="relative aspect-[3/4] max-h-[400px] overflow-hidden bg-muted/30 dark:bg-muted/10">
                  <div className="absolute inset-0 flex items-center justify-center transform scale-[0.65] origin-top pointer-events-none p-1">
                    <CVPreview cvData={cvData} templateId={id} />
                  </div>
                </div>
                {/* Caption Area */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{template.name}</h3>
                      <span className="text-xs font-medium text-primary">
                        {template.category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0" // Ensure button size is controlled
                      onClick={() => setPreviewTemplate(id)}
                      aria-label="Preview template"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">{template.description}</p>

                  {selectedTemplate === id ? (
                    <Button size="sm" disabled className="w-full mt-auto">
                      <Check className="mr-2 h-4 w-4" />
                      Selected
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectTemplate(id)}
                      className="w-full mt-auto"
                    >
                      Use Template
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-4">
            {filteredTemplates.map(([id, template]) => (
              <div
                key={id}
                // Adjusted for responsiveness: stacks on small screens
                className={`
                  flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-lg border transition-all duration-200
                  ${selectedTemplate === id ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'}
                `}
              >
                {/* Adjusted preview container for responsiveness */}
                <div className="w-full sm:w-32 md:w-40 aspect-[3/4] sm:aspect-square relative overflow-hidden rounded-md bg-muted/30 dark:bg-muted/10 shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center transform scale-[0.65] sm:scale-[0.5] md:scale-[0.65] origin-center">
                    <CVPreview cvData={cvData} templateId={id} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start w-full"> {/* Ensure this div takes full width */}
                    <div className="flex-grow"> {/* Allow text content to take available space */}
                      <h3 className="text-lg font-medium">{template.name}</h3>
                      <span className="text-xs font-medium text-primary mb-1 block">
                        {template.category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => setPreviewTemplate(id)}
                      aria-label="Preview template"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{template.description}</p>
                  
                  {selectedTemplate === id ? (
                    <Button size="sm" disabled>
                      <Check className="mr-2 h-4 w-4" />
                      Selected
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSelectTemplate(id)}
                    >
                      Use Template
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card max-w-4xl w-full max-h-[80vh] overflow-auto rounded-lg shadow-xl p-6 border">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Template Preview</h2>
              <Button 
                size="sm"
                onClick={() => setPreviewTemplate(null)}
              >
                Close
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden">
              <CVPreview cvData={cvData} templateId={previewTemplate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}