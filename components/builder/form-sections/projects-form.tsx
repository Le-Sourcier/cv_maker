"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  GripVertical,
  Link as LinkIcon, // Renamed to avoid conflict with Next.js Link
  BookText // For skills icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/lib/types"; // Project type expects skills: string[]
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface ProjectsFormProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

// Zod Schema for a single project item
// For skills, we'll use a string in the form and convert it to string[] before updating parent
const projectItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string()
    .min(10, "Description should be at least 10 characters")
    .max(1000, "Description should not exceed 1000 characters"),
  skills: z.string().optional(), // Comma-separated string for form input
  link: z.string().url("Invalid URL (e.g., https://example.com)").optional().or(z.literal('')),
  date: z.string().optional(),
});

// Zod Schema for the array of projects
const projectsSchema = z.object({
  projects: z.array(projectItemSchema),
});

// Type for form data, where skills is a string
type ProjectFormDataItem = z.infer<typeof projectItemSchema>;
type ProjectsFormData = { projects: ProjectFormDataItem[] };


export default function ProjectsForm({ projects: initialProjects, updateProjects }: ProjectsFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsSchema),
    // Convert initialProjects (skills: string[]) to form data (skills: string)
    defaultValues: {
      projects: initialProjects.map(p => ({
        ...p,
        skills: p.skills.join(', '), // Join skills array into a comma-separated string
      }))
    },
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "projects",
  });

  const watchedFormProjects = watch("projects");
  useEffect(() => {
    if (watchedFormProjects) {
      // Convert skills string back to string[] before calling updateProjects
      const projectsToUpdate: Project[] = watchedFormProjects.map(p => ({
        ...p,
        skills: p.skills ? p.skills.split(',').map(s => s.trim()).filter(s => s) : [],
      }));
      updateProjects(projectsToUpdate);
    }
  }, [watchedFormProjects, updateProjects]);

  const addNewProjectItem = () => {
    const newId = Date.now().toString();
    append({
      id: newId,
      name: "",
      description: "",
      skills: "", // Initial skills as empty string
      link: "",
      date: "",
    });
    setExpandedIndex(fields.length);
  };

  const removeItem = (index: number) => {
    remove(index);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const getInputClassNames = (fieldName: keyof ProjectFormDataItem, index: number) => {
    const fieldError = errors.projects?.[index]?.[fieldName];
    return cn(fieldError ? "border-destructive focus-visible:ring-destructive" : "");
  };

  return (
    <div className="space-y-4">
      {fields.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No projects added yet</p>
          <Button onClick={addNewProjectItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      ) : (
        <>
          {fields.map((field, index) => (
            <Card key={field.id} className={`p-4 ${expandedIndex === index ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="cursor-grab">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {watchedFormProjects?.[index]?.name || `Project ${index + 1}`}
                    </h3>
                    {watchedFormProjects?.[index]?.date && (
                      <p className="text-sm text-muted-foreground">{watchedFormProjects?.[index]?.date}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => move(index, index - 1)} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => move(index, index + 1)} disabled={index === fields.length - 1}><ChevronDown className="h-4 w-4" /></Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    aria-expanded={expandedIndex === index}
                  >
                    {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    aria-label="Remove project item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedIndex === index && (
                <div className="mt-4 space-y-4 pt-4 border-t border-dashed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`proj-${field.id}-name`}>Project Name</Label>
                      <Input 
                        id={`proj-${field.id}-name`}
                        {...register(`projects.${index}.name`)}
                        placeholder="E.g., Personal Portfolio Website"
                        className={getInputClassNames("name", index)}
                        aria-invalid={errors.projects?.[index]?.name ? "true" : "false"}
                      />
                      {errors.projects?.[index]?.name && <p className="text-sm text-destructive">{errors.projects?.[index]?.name?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`proj-${field.id}-date`}>Date / Duration</Label>
                      <Input 
                        id={`proj-${field.id}-date`}
                        {...register(`projects.${index}.date`)}
                        placeholder="E.g., Jan 2023 - Mar 2023 or Q1 2023"
                        className={getInputClassNames("date", index)}
                        aria-invalid={errors.projects?.[index]?.date ? "true" : "false"}
                      />
                      {errors.projects?.[index]?.date && <p className="text-sm text-destructive">{errors.projects?.[index]?.date?.message}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor={`proj-${field.id}-link`}>Project Link (Optional)</Label>
                    <div className="relative">
                      <Input 
                        id={`proj-${field.id}-link`}
                        {...register(`projects.${index}.link`)}
                        placeholder="https://github.com/user/project"
                        className={getInputClassNames("link", index)}
                        aria-invalid={errors.projects?.[index]?.link ? "true" : "false"}
                      />
                      <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.projects?.[index]?.link && <p className="text-sm text-destructive">{errors.projects?.[index]?.link?.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor={`proj-${field.id}-skills`}>Technologies Used (Comma-separated)</Label>
                     <div className="relative">
                        <Input
                          id={`proj-${field.id}-skills`}
                          {...register(`projects.${index}.skills`)}
                          placeholder="E.g., React, Node.js, Tailwind CSS"
                          className={getInputClassNames("skills", index)}
                          aria-invalid={errors.projects?.[index]?.skills ? "true" : "false"}
                        />
                        <BookText className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    {errors.projects?.[index]?.skills && <p className="text-sm text-destructive">{errors.projects?.[index]?.skills?.message}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor={`proj-${field.id}-description`}>Description</Label>
                    <Textarea 
                      id={`proj-${field.id}-description`}
                      {...register(`projects.${index}.description`)}
                      placeholder="Describe the project, your role, technical challenges, and key achievements..."
                      rows={4}
                      className={getInputClassNames("description", index)}
                      aria-invalid={errors.projects?.[index]?.description ? "true" : "false"}
                    />
                    {errors.projects?.[index]?.description && <p className="text-sm text-destructive">{errors.projects?.[index]?.description?.message}</p>}
                  </div>
                </div>
              )}
            </Card>
          ))}
          
          <div className="flex justify-center mt-6">
            <Button 
              type="button"
              variant="outline" 
              onClick={addNewProjectItem}
              className="w-full md:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Projects
            </Button>
          </div>
        </>
      )}
    </div>
  );
}