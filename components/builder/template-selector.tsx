"use client";

import { useState, useEffect } from "react";
import { Check, Wand2 } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
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
          className="ml-4"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {isGeneratingSuggestions ? "Generating..." : "Get AI Suggestions"}
        </Button>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
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
                className={`
                  relative overflow-hidden rounded-lg border-2 transition-all duration-200 
                  ${selectedTemplate === id ? 'border-primary shadow-lg' : 'border-muted hover:border-muted-foreground/50'}
                `}
                onMouseEnter={() => setPreviewTemplate(id)}
                onMouseLeave={() => setPreviewTemplate(null)}
              >
                <div className="relative aspect-[3/4] max-h-[400px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center transform scale-50 pointer-events-none p-2">
                    <CVPreview cvData={cvData} templateId={id} />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                      {template.category}
                    </span>
                    <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center px-4">{template.description}</p>
                    
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
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-4">
            {filteredTemplates.map(([id, template]) => (
              <div
                key={id}
                className={`
                  flex items-center gap-6 p-4 rounded-lg border transition-all duration-200
                  ${selectedTemplate === id ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'}
                `}
              >
                <div className="w-40 h-40 relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center transform scale-50">
                    <CVPreview cvData={cvData} templateId={id} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">{template.name}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  
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