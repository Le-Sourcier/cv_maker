"use client";

import { useState } from "react";
import { CVData } from "@/lib/types";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PersonalDetailsForm from "@/components/builder/form-sections/personal-details-form";
import ExperienceForm from "@/components/builder/form-sections/experience-form";
import EducationForm from "@/components/builder/form-sections/education-form";
import SkillsForm from "@/components/builder/form-sections/skills-form";
import ProjectsForm from "@/components/builder/form-sections/projects-form";
import { Card } from "@/components/ui/card";

interface CVFormProps {
  cvData: CVData;
  updateCV: (data: Partial<CVData>) => void;
}

export default function CVForm({ cvData, updateCV }: CVFormProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["personal"]);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">CV Information</h2>
      
      <Accordion 
        type="multiple" 
        value={expandedSections} 
        onValueChange={setExpandedSections}
        className="space-y-4"
      >
        {/* Removed p-1, added specific styling for trigger and content for better visual separation */}
        <AccordionItem value="personal" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-t-md data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:border-border">
            Personal Details
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 rounded-b-md bg-background">
            <PersonalDetailsForm 
              data={cvData.personalDetails} 
              updateData={(data) => updateCV({ personalDetails: { ...cvData.personalDetails, ...data } })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Removed p-1, added specific styling for trigger and content for better visual separation */}
        <AccordionItem value="experience" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-t-md data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:border-border">
            Work Experience
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 rounded-b-md bg-background">
            <ExperienceForm 
              experiences={cvData.experience} 
              updateExperiences={(experiences) => updateCV({ experience: experiences })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Removed p-1, added specific styling for trigger and content for better visual separation */}
        <AccordionItem value="education" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-t-md data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:border-border">
            Education
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 rounded-b-md bg-background">
            <EducationForm 
              education={cvData.education} 
              updateEducation={(education) => updateCV({ education: education })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Removed p-1, added specific styling for trigger and content for better visual separation */}
        <AccordionItem value="skills" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-t-md data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:border-border">
            Skills
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 rounded-b-md bg-background">
            <SkillsForm 
              skills={cvData.skills} 
              updateSkills={(skills) => updateCV({ skills: skills })}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Removed p-1, added specific styling for trigger and content for better visual separation */}
        <AccordionItem value="projects" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/30 hover:bg-muted/60 data-[state=open]:bg-muted/60 rounded-t-md data-[state=open]:rounded-b-none data-[state=open]:border-b data-[state=open]:border-border">
            Projects
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 rounded-b-md bg-background">
            <ProjectsForm 
              projects={cvData.projects} 
              updateProjects={(projects) => updateCV({ projects: projects })}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}