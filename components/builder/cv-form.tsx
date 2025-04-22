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
        <AccordionItem value="personal" className="border rounded-lg p-1">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            Personal Details
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <PersonalDetailsForm 
              data={cvData.personalDetails} 
              updateData={(data) => updateCV({ personalDetails: { ...cvData.personalDetails, ...data } })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border rounded-lg p-1">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            Work Experience
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <ExperienceForm 
              experiences={cvData.experience} 
              updateExperiences={(experiences) => updateCV({ experience: experiences })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border rounded-lg p-1">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            Education
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <EducationForm 
              education={cvData.education} 
              updateEducation={(education) => updateCV({ education: education })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border rounded-lg p-1">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            Skills
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <SkillsForm 
              skills={cvData.skills} 
              updateSkills={(skills) => updateCV({ skills: skills })}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects" className="border rounded-lg p-1">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            Projects
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
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