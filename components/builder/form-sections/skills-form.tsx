"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skill as SkillType, SkillCategory as SkillCategoryType } from "@/lib/types";
import { Badge } from "@/components/ui/badge"; // Badge is not used in RHF version yet, but keep for now
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SkillsFormProps {
  skills: SkillCategoryType[];
  updateSkills: (skills: SkillCategoryType[]) => void;
}

const skillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(1, "Level is required").max(5, "Level must be 1-5").optional().default(3),
});

const skillCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Category name is required"),
  skills: z.array(skillItemSchema),
});

const skillsFormSchema = z.object({
  categories: z.array(skillCategorySchema),
});

type SkillsFormData = z.infer<typeof skillsFormSchema>;

export default function SkillsForm({ skills: initialSkillsData, updateSkills }: SkillsFormProps) {

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSkillName, setNewSkillName] = useState("");

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(() =>
    initialSkillsData.length > 0 ? 0 : null
  );

  const {
    control,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: { categories: initialSkillsData },
    mode: "onBlur", // Or "onChange" for more immediate feedback
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory
  } = useFieldArray({
    control,
    name: "categories",
  });

  // Conditionally get skill field array methods and fields
  // This ensures useFieldArray is only truly active with a valid path
  const currentCategorySkillsPath = selectedCategoryIndex !== null ? `categories.${selectedCategoryIndex}.skills` as const : undefined;

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: currentCategorySkillsPath, // `name` is now conditional
    // `useFieldArray` will throw an error if `name` is undefined.
    // So, we need to ensure this hook is only "active" or its results used when currentCategorySkillsPath is defined.
    // A common pattern is to wrap the part of the component that uses skillFields, appendSkill, removeSkill
    // in a conditional block or a sub-component.
    // For this structure, we'll rely on selectedCategoryIndex being non-null when these are called.
  });


  const watchedCategories = watch("categories");
  useEffect(() => {
    if (watchedCategories) {
      updateSkills(watchedCategories);
    }
  }, [watchedCategories, updateSkills]);

  useEffect(() => {
    reset({ categories: initialSkillsData });
  }, [initialSkillsData, reset]);

  useEffect(() => {
    const numCategories = categoryFields.length;
    if (numCategories === 0) {
      setSelectedCategoryIndex(null);
    } else if (selectedCategoryIndex === null && numCategories > 0) {
      setSelectedCategoryIndex(0);
    } else if (selectedCategoryIndex !== null && selectedCategoryIndex >= numCategories) {
      setSelectedCategoryIndex(numCategories > 0 ? numCategories - 1 : null);
    }
  }, [categoryFields.length, selectedCategoryIndex]);


  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newId = Date.now().toString();
    appendCategory({
      id: newId,
      name: newCategoryName,
      skills: [],
    });
    setNewCategoryName("");
    setSelectedCategoryIndex(categoryFields.length); // RHF updates fields.length in next render, so this should be correct
  };

  const handleRemoveCategory = () => { // Removed index param, uses selectedCategoryIndex
    if (selectedCategoryIndex === null) return;
    removeCategory(selectedCategoryIndex);
    // selectedCategoryIndex will be updated by the useEffect above
  };

  const handleAddSkill = () => {
    if (selectedCategoryIndex === null || !newSkillName.trim() || !currentCategorySkillsPath) return;
    const newId = Date.now().toString();
    appendSkill({ // This appendSkill is from the useFieldArray instance tied to selectedCategoryIndex
      id: newId,
      name: newSkillName,
      level: 3,
    });
    setNewSkillName("");
  };

  const handleRemoveSkill = (skillIdx: number) => {
    if (selectedCategoryIndex === null || !currentCategorySkillsPath) return;
    removeSkill(skillIdx); // This removeSkill is from the useFieldArray instance tied to selectedCategoryIndex
  }

  const getInputClassNames = (isError: boolean) => cn(isError ? "border-destructive focus-visible:ring-destructive" : "");
  const getSelectTriggerClassNames = (isError: boolean) => cn(isError ? "border-destructive focus-visible:ring-destructive" : "", "w-full md:w-[140px] h-8 text-xs"); // Adjusted size

  // Component to render skills for the selected category
  // This helps ensure useFieldArray for skills is only mounted when a category is selected
  const SelectedCategorySkills = ({ categoryIndex }: { categoryIndex: number }) => {
    const {
        fields: currentSkillFields,
        append: currentAppendSkill,
        remove: currentRemoveSkill,
    } = useFieldArray({ control, name: `categories.${categoryIndex}.skills` });

    const handleInnerAddSkill = () => {
        if (!newSkillName.trim()) return;
        currentAppendSkill({ id: Date.now().toString(), name: newSkillName, level: 3 });
        setNewSkillName("");
    };


    return (
      <div className="border rounded-lg p-4 space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <Input
            {...register(`categories.${categoryIndex}.name`)}
            placeholder="Category Name"
            className={cn("text-lg font-medium flex-1 mr-2", getInputClassNames(!!errors.categories?.[categoryIndex]?.name))}
          />
          <Button
            variant="ghost" size="sm"
            onClick={handleRemoveCategory} // Uses selectedCategoryIndex from parent scope
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10" type="button"
          >
            <X className="h-4 w-4 mr-2" /> Remove Category
          </Button>
        </div>
        {errors.categories?.[categoryIndex]?.name && <p className="text-sm text-destructive mt-1">{errors.categories?.[categoryIndex]?.name?.message}</p>}

        <div className="flex items-end space-x-2 pt-2">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor={`new-skill-input-${categoryIndex}`}>Add Skill to "{watchedCategories?.[categoryIndex]?.name}"</Label>
            <Input
              id={`new-skill-input-${categoryIndex}`}
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="E.g., React"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleInnerAddSkill();}}}
            />
          </div>
          <Button onClick={handleInnerAddSkill} type="button">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
          </Button>
        </div>

        <div className="space-y-3 pt-2">
          {currentSkillFields.map((skillItem, skillIndex) => (
            <div key={skillItem.id} className="flex items-center justify-between gap-2 border-b pb-2 last:border-b-0 last:pb-0">
              <div className="flex-1 space-y-0.5">
                <Input
                  {...register(`categories.${categoryIndex}.skills.${skillIndex}.name`)}
                  placeholder="Skill Name"
                  className={cn("h-8 text-sm", getInputClassNames(!!errors.categories?.[categoryIndex]?.skills?.[skillIndex]?.name))}
                />
                 {errors.categories?.[categoryIndex]?.skills?.[skillIndex]?.name && <p className="text-xs text-destructive pt-0.5">{errors.categories?.[categoryIndex]?.skills?.[skillIndex]?.name?.message}</p>}
              </div>
              <div className="space-y-0.5">
                <Controller
                  control={control}
                  name={`categories.${categoryIndex}.skills.${skillIndex}.level`}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString() || "3"}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger className={getSelectTriggerClassNames(!!errors.categories?.[categoryIndex]?.skills?.[skillIndex]?.level)}>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Beginner</SelectItem>
                        <SelectItem value="2">Intermediate</SelectItem>
                        <SelectItem value="3">Advanced</SelectItem>
                        <SelectItem value="4">Expert</SelectItem>
                        <SelectItem value="5">Master</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categories?.[categoryIndex]?.skills?.[skillIndex]?.level && <p className="text-xs text-destructive pt-0.5">{errors.categories?.[categoryIndex]?.skills?.[skillIndex]?.level?.message}</p>}
              </div>
              <Button
                variant="ghost" size="icon"
                onClick={() => currentRemoveSkill(skillIndex)}
                className="h-8 w-8 text-muted-foreground shrink-0" type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {currentSkillFields.length === 0 && (
            <div className="text-center py-4 text-muted-foreground text-sm">No skills added to this category yet.</div>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="new-category-input">Add Skill Category</Label>
            <Input 
              id="new-category-input"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="E.g., Programming Languages"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCategory();}}}
            />
          </div>
          <Button onClick={handleAddCategory} type="button"><Plus className="h-4 w-4 mr-2"/>Add Category</Button>
        </div>

        {categoryFields.length > 0 && (
          <div className="pt-2">
            <Label htmlFor="select-category">Select Category to Edit</Label>
            <Select 
              value={selectedCategoryIndex !== null ? selectedCategoryIndex.toString() : ""} 
              onValueChange={(value) => setSelectedCategoryIndex(value ? parseInt(value) : null)}
            >
              <SelectTrigger id="select-category" className="w-full mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryFields.map((category, index) => (
                  <SelectItem key={category.id} value={index.toString()}>
                    {watchedCategories?.[index]?.name || `Category ${index + 1}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {selectedCategoryIndex !== null && categoryFields[selectedCategoryIndex] ? (
        <SelectedCategorySkills categoryIndex={selectedCategoryIndex} />
      ) : categoryFields.length > 0 ? (
        <div className="text-center py-6 text-muted-foreground">Select a category to view and add skills.</div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">Start by adding a skill category.</div>
      )}
    </div>
  );
}