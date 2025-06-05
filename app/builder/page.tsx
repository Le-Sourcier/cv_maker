"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer, Download, Loader2 } from "lucide-react"; // Added Loader2 icon
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
  const [isExportingPDF, setIsExportingPDF] = useState(false); // State for PDF export loading

  const handleUpdateCV = (updatedData: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      // Simulate PDF export logic here
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Actual PDF generation would happen here
      // For example, using a library like jsPDF or calling an API
      alert("PDF Exported (simulated)!"); // Placeholder for actual export success
    } catch (error) {
      console.error("Error exporting PDF:", error);
      // Potentially show a toast notification for error
    } finally {
      setIsExportingPDF(false);
    }
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
          {/* Adjusted parent flex container for responsiveness */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* TabsList now full-width on small screens, auto on larger */}
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
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
                <Printer className="mr-2 h-4 w-4" />
                Print Preview
              </Button>
              <Button onClick={handleExportPDF} disabled={isExportingPDF}>
                {isExportingPDF ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isExportingPDF ? "Exporting..." : "Export PDF"}
              </Button>
            </div>
          </div>

          <TabsContent value="details" className="mt-6">
            {/* Updated grid for better responsiveness of live preview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3"> {/* CVForm takes 3/5 on medium screens and up */}
                <CVForm cvData={cvData} updateCV={handleUpdateCV} />
              </div>
              {/* Live Preview Card - now visible from md screens up */}
              <div className="hidden md:block md:col-span-2">
                <Card className="sticky top-8 h-[calc(100vh-160px)] overflow-auto"> {/* Removed p-4, will be handled by inner wrapper if needed */}
                  {/* Added wrapper for scaling and centering the preview */}
                  <div className="w-full h-full transform scale-[0.8] origin-top p-2 flex justify-center items-start">
                    <div className="bg-white dark:bg-gray-800 shadow-lg w-full"> {/* Added bg and shadow to scaled preview */}
                       <CVPreview cvData={cvData} templateId={selectedTemplate} />
                    </div>
                  </div>
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
            <div className="mx-auto max-w-4xl">
              {/* Corrected scaling to use standard Tailwind breakpoints */}
              <div className="transform origin-top scale-[0.75] sm:scale-[0.85] md:scale-[1] p-1 sm:p-2 md:p-0">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-sm overflow-hidden">
                  <CVPreview cvData={cvData} templateId={selectedTemplate} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}