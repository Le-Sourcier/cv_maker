"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  GripVertical,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface ProjectsFormProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

export default function ProjectsForm({ projects, updateProjects }: ProjectsFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      skills: [],
      link: "",
      date: "",
    };
    
    const updatedProjects = [...projects, newProject];
    updateProjects(updatedProjects);
    setExpandedIndex(updatedProjects.length - 1);
  };

  const removeProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    updateProjects(updatedProjects);
    
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateProject = (index: number, updatedData: Partial<Project>) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], ...updatedData };
    updateProjects(updatedProjects);
  };

  const moveProject = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= projects.length) return;
    
    const updatedProjects = [...projects];
    const [removed] = updatedProjects.splice(fromIndex, 1);
    updatedProjects.splice(toIndex, 0, removed);
    
    updateProjects(updatedProjects);
    
    if (expandedIndex === fromIndex) {
      setExpandedIndex(toIndex);
    }
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No projects added yet</p>
          <Button onClick={addProject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      ) : (
        <>
          {projects.map((project, index) => (
            <Card key={project.id} className={`p-4 ${expandedIndex === index ? 'border-primary' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="cursor-grab"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  
                  <div>
                    <h3 className="font-medium">
                      {project.name || `Project ${index + 1}`}
                    </h3>
                    {project.date && (
                      <p className="text-sm text-muted-foreground">{project.date}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeProject(index)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedIndex === index && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                      <Input 
                        id={`project-name-${index}`} 
                        value={project.name} 
                        onChange={(e) => updateProject(index, { name: e.target.value })} 
                        placeholder="E-commerce Platform, Mobile App, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`project-date-${index}`}>Date</Label>
                      <Input 
                        id={`project-date-${index}`} 
                        value={project.date} 
                        onChange={(e) => updateProject(index, { date: e.target.value })} 
                        placeholder="January 2023 - March 2023"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                    <div className="relative">
                      <Input 
                        id={`project-link-${index}`} 
                        value={project.link} 
                        onChange={(e) => updateProject(index, { link: e.target.value })} 
                        placeholder="https://project-link.com"
                      />
                      <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`project-description-${index}`}>Description</Label>
                    <Textarea 
                      id={`project-description-${index}`} 
                      value={project.description} 
                      onChange={(e) => updateProject(index, { description: e.target.value })} 
                      placeholder="Describe the project, your role, and key achievements..."
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              onClick={addProject}
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