"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BuilderHeader from "@/components/builder/builder-header";
import CVForm from "@/components/builder/cv-form";
import TemplateSelector from "@/components/builder/template-selector";
import CVPreview from "@/components/builder/cv-preview";
import { defaultCV } from "@/lib/default-data";
import { CVData } from "@/lib/types";

export default function BuilderPage() {
  const [cvData, setCvData] = useState<CVData>(defaultCV);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [currentTab, setCurrentTab] = useState("details");

  const handleUpdateCV = (updatedData: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <BuilderHeader cvData={cvData} />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <Tabs 
          value={currentTab} 
          onValueChange={setCurrentTab}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => window.print()}
                className="hidden md:flex"
              >
                Preview
              </Button>
              <Button>Export PDF</Button>
            </div>
          </div>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CVForm cvData={cvData} updateCV={handleUpdateCV} />
              </div>
              <div className="hidden lg:block lg:col-span-1">
                <Card className="sticky top-8 p-4 h-[calc(100vh-160px)] overflow-auto">
                  <CVPreview cvData={cvData} templateId={selectedTemplate} />
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="template" className="mt-6">
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              cvData={cvData}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <CVPreview cvData={cvData} templateId={selectedTemplate} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}