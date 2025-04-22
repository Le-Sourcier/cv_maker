"use client";

import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skill, SkillCategory } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsFormProps {
  skills: SkillCategory[];
  updateSkills: (skills: SkillCategory[]) => void;
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(
    skills.length > 0 ? 0 : null
  );

  const addCategory = () => {
    if (!newCategory.trim()) return;
    
    const category: SkillCategory = {
      id: Date.now().toString(),
      name: newCategory,
      skills: [],
    };
    
    const updatedSkills = [...skills, category];
    updateSkills(updatedSkills);
    setNewCategory("");
    setSelectedCategoryIndex(updatedSkills.length - 1);
  };

  const removeCategory = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateSkills(updatedSkills);
    
    if (selectedCategoryIndex === index) {
      setSelectedCategoryIndex(updatedSkills.length > 0 ? 0 : null);
    } else if (selectedCategoryIndex !== null && selectedCategoryIndex > index) {
      setSelectedCategoryIndex(selectedCategoryIndex - 1);
    }
  };

  const addSkill = () => {
    if (selectedCategoryIndex === null || !newSkill.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill,
      level: 3,
    };
    
    const updatedSkills = [...skills];
    updatedSkills[selectedCategoryIndex].skills.push(skill);
    updateSkills(updatedSkills);
    setNewSkill("");
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex].skills.splice(skillIndex, 1);
    updateSkills(updatedSkills);
  };

  const updateSkillLevel = (categoryIndex: number, skillIndex: number, level: number) => {
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex].skills[skillIndex].level = level;
    updateSkills(updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="new-category">Add Skill Category</Label>
            <Input 
              id="new-category" 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)} 
              placeholder="Programming Languages, Tools, Soft Skills, etc."
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            />
          </div>
          <Button onClick={addCategory} type="button">
            Add
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="pt-4">
            <Label htmlFor="select-category">Select Category</Label>
            <Select 
              value={selectedCategoryIndex !== null ? selectedCategoryIndex.toString() : ""} 
              onValueChange={(value) => setSelectedCategoryIndex(parseInt(value))}
            >
              <SelectTrigger id="select-category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {skills.map((category, index) => (
                  <SelectItem key={category.id} value={index.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {selectedCategoryIndex !== null && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">
              {skills[selectedCategoryIndex].name}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeCategory(selectedCategoryIndex)}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              <X className="h-4 w-4 mr-2" />
              Remove Category
            </Button>
          </div>

          <div className="flex items-end space-x-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="new-skill">Add Skill</Label>
              <Input 
                id="new-skill" 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
                placeholder="React, JavaScript, Project Management, etc."
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <Button onClick={addSkill} type="button">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-3 pt-2">
            {skills[selectedCategoryIndex].skills.map((skill, skillIndex) => (
              <div key={skill.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {skill.name}
                  </Badge>
                  <Select
                    value={skill.level?.toString() || "3"}
                    onValueChange={(value) => 
                      updateSkillLevel(selectedCategoryIndex, skillIndex, parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-[120px] h-7 text-xs">
                      <SelectValue placeholder="Skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Beginner</SelectItem>
                      <SelectItem value="2">Intermediate</SelectItem>
                      <SelectItem value="3">Advanced</SelectItem>
                      <SelectItem value="4">Expert</SelectItem>
                      <SelectItem value="5">Master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(selectedCategoryIndex, skillIndex)}
                  className="h-7 w-7 p-0 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {skills[selectedCategoryIndex].skills.length === 0 && (
              <div className="text-center py-4 text-muted-foreground text-sm">
                No skills added to this category yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}