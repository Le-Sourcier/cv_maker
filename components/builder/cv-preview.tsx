"use client";

import { CVData } from "@/lib/types";
import { templates } from "@/lib/cv-templates";
import ProfessionalTemplate from "@/components/templates/professional-template";
import ModernTemplate from "@/components/templates/modern-template";
import CreativeTemplate from "@/components/templates/creative-template";

interface CVPreviewProps {
  cvData: CVData;
  templateId: string;
}

export default function CVPreview({ cvData, templateId }: CVPreviewProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case "professional":
        return <ProfessionalTemplate cvData={cvData} />;
      case "modern":
        return <ModernTemplate cvData={cvData} />;
      case "creative":
        return <CreativeTemplate cvData={cvData} />;
      default:
        return <ProfessionalTemplate cvData={cvData} />;
    }
  };

  return (
    <div className="cv-preview w-full h-full">
      {renderTemplate()}
    </div>
  );
}