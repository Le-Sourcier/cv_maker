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
import { Education } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

export default function EducationForm({ education, updateEducation }: EducationFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    
    const updatedEducation = [...education, newEducation];
    updateEducation(updatedEducation);
    setExpandedIndex(updatedEducation.length - 1);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    updateEducation(updatedEducation);
    
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateEducationItem = (index: number, updatedData: Partial<Education>) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], ...updatedData };
    updateEducation(updatedEducation);
  };

  const moveEducation = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= education.length) return;
    
    const updatedEducation = [...education];
    const [removed] = updatedEducation.splice(fromIndex, 1);
    updatedEducation.splice(toIndex, 0, removed);
    
    updateEducation(updatedEducation);
    
    if (expandedIndex === fromIndex) {
      setExpandedIndex(toIndex);
    }
  };

  return (
    <div className="space-y-4">
      {education.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No education added yet</p>
          <Button onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <>
          {education.map((edu, index) => (
            <Card key={edu.id} className={`p-4 ${expandedIndex === index ? 'border-primary' : ''}`}>
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
                      {edu.degree || edu.institution || `Education ${index + 1}`}
                    </h3>
                    {edu.institution && (
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
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
                    onClick={() => removeEducation(index)}
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
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
                      <Input 
                        id={`institution-${index}`} 
                        value={edu.institution} 
                        onChange={(e) => updateEducationItem(index, { institution: e.target.value })} 
                        placeholder="University or school name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input 
                        id={`degree-${index}`} 
                        value={edu.degree} 
                        onChange={(e) => updateEducationItem(index, { degree: e.target.value })} 
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`field-${index}`}>Field of Study</Label>
                      <Input 
                        id={`field-${index}`} 
                        value={edu.field} 
                        onChange={(e) => updateEducationItem(index, { field: e.target.value })} 
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <div className="relative">
                        <Input 
                          id={`start-date-${index}`} 
                          value={edu.startDate} 
                          onChange={(e) => updateEducationItem(index, { startDate: e.target.value })} 
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
                          value={edu.endDate} 
                          onChange={(e) => updateEducationItem(index, { endDate: e.target.value })} 
                          placeholder={edu.current ? "Present" : "MM/YYYY"}
                          disabled={edu.current}
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea 
                      id={`description-${index}`} 
                      value={edu.description} 
                      onChange={(e) => updateEducationItem(index, { description: e.target.value })} 
                      placeholder="Describe your studies, achievements, etc."
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
              onClick={addEducation}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Education
            </Button>
          </div>
        </>
      )}
    </div>
  );
}