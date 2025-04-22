"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  GripVertical,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface ExperienceFormProps {
  experiences: Experience[];
  updateExperiences: (experiences: Experience[]) => void;
}

export default function ExperienceForm({ experiences, updateExperiences }: ExperienceFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    
    const updatedExperiences = [...experiences, newExperience];
    updateExperiences(updatedExperiences);
    setExpandedIndex(updatedExperiences.length - 1);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    updateExperiences(updatedExperiences);
    
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateExperience = (index: number, updatedData: Partial<Experience>) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], ...updatedData };
    updateExperiences(updatedExperiences);
  };

  const moveExperience = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= experiences.length) return;
    
    const updatedExperiences = [...experiences];
    const [removed] = updatedExperiences.splice(fromIndex, 1);
    updatedExperiences.splice(toIndex, 0, removed);
    
    updateExperiences(updatedExperiences);
    
    if (expandedIndex === fromIndex) {
      setExpandedIndex(toIndex);
    }
  };

  return (
    <div className="space-y-4">
      {experiences.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No work experience added yet</p>
          <Button onClick={addExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        </div>
      ) : (
        <>
          {experiences.map((experience, index) => (
            <Card key={experience.id} className={`p-4 ${expandedIndex === index ? 'border-primary' : ''}`}>
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
                      {experience.position || experience.company || `Experience ${index + 1}`}
                    </h3>
                    {experience.company && (
                      <p className="text-sm text-muted-foreground">{experience.company}</p>
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
                    onClick={() => removeExperience(index)}
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
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input 
                        id={`company-${index}`} 
                        value={experience.company} 
                        onChange={(e) => updateExperience(index, { company: e.target.value })} 
                        placeholder="Company name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`position-${index}`}>Position</Label>
                      <Input 
                        id={`position-${index}`} 
                        value={experience.position} 
                        onChange={(e) => updateExperience(index, { position: e.target.value })} 
                        placeholder="Job title"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input 
                        id={`location-${index}`} 
                        value={experience.location} 
                        onChange={(e) => updateExperience(index, { location: e.target.value })} 
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <div className="relative">
                        <Input 
                          id={`start-date-${index}`} 
                          value={experience.startDate} 
                          onChange={(e) => updateExperience(index, { startDate: e.target.value })} 
                          placeholder="MM/YYYY"
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${index}`}>End Date</Label>
                      <div className="relative">
                        <Input 
                          id={`end-date-${index}`} 
                          value={experience.endDate} 
                          onChange={(e) => updateExperience(index, { endDate: e.target.value })} 
                          placeholder={experience.current ? "Present" : "MM/YYYY"}
                          disabled={experience.current}
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea 
                      id={`description-${index}`} 
                      value={experience.description} 
                      onChange={(e) => updateExperience(index, { description: e.target.value })} 
                      placeholder="Describe your responsibilities and achievements..."
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
              onClick={addExperience}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Experience
            </Button>
          </div>
        </>
      )}
    </div>
  );
}