"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { 
  Plus, 
  Trash2, 
  // ChevronUp, // Removed for D&D
  // ChevronDown, // Removed for D&D
  GripVertical,
  Calendar,
  ChevronUp, // Kept for expand/collapse
  ChevronDown // Kept for expand/collapse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Experience } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface ExperienceFormProps {
  experiences: Experience[];
  updateExperiences: (experiences: Experience[]) => void;
}

const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string()
    .min(10, "Description should be at least 10 characters")
    .max(1000, "Description should not exceed 1000 characters")
    .optional().or(z.literal('')),
});

const experiencesSchema = z.object({
  experiences: z.array(experienceItemSchema),
});

type ExperiencesFormData = z.infer<typeof experiencesSchema>;

export default function ExperienceForm({ experiences: initialExperiences, updateExperiences }: ExperienceFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(initialExperiences.length > 0 ? 0 : null);

  const {
    control,
    register,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ExperiencesFormData>({
    resolver: zodResolver(experiencesSchema),
    defaultValues: { experiences: initialExperiences },
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "experiences",
  });

  const watchedExperiences = watch("experiences");
  useEffect(() => {
    if (watchedExperiences) {
      updateExperiences(watchedExperiences);
    }
  }, [watchedExperiences, updateExperiences]);

  useEffect(() => {
    reset({ experiences: initialExperiences });
    if (initialExperiences.length > 0 && expandedIndex === null) {
        // setExpandedIndex(0); // Optionally expand first item if list becomes non-empty
    } else if (initialExperiences.length === 0) {
        setExpandedIndex(null);
    }
  }, [initialExperiences, reset, expandedIndex]);


  const addNewExperienceItem = () => {
    const newId = Date.now().toString();
    append({
      id: newId,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setExpandedIndex(fields.length);
  };

  const removeItem = (index: number) => {
    remove(index);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    } else if (fields.length -1 === 0) { // If last item removed
        setExpandedIndex(null);
    } else if (expandedIndex === fields.length -1 && index < expandedIndex) { // If item before current expanded is removed
        // No change needed if last item is expanded and an item before it is removed
    } else if (index < expandedIndex) {
        // If item before current expanded is removed, no change to index needed due to RHF shift
    } else if (expandedIndex !==null && index === expandedIndex && index === fields.length -1) {
        setExpandedIndex(fields.length - 2 >=0 ? fields.length -2 : null);
    }


  };

  const getInputClassNames = (fieldName: keyof Experience, index: number) => {
    const fieldError = errors.experiences?.[index]?.[fieldName];
    return cn(fieldError ? "border-destructive focus-visible:ring-destructive" : "");
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    move(sourceIndex, destinationIndex);

    if (expandedIndex === sourceIndex) {
      setExpandedIndex(destinationIndex);
    } else if (expandedIndex !== null) {
      if (sourceIndex < expandedIndex && destinationIndex >= expandedIndex) {
        setExpandedIndex(expandedIndex - 1);
      } else if (sourceIndex > expandedIndex && destinationIndex <= expandedIndex) {
        setExpandedIndex(expandedIndex + 1);
      }
    }
  };

  return (
    <div className="space-y-4">
      {fields.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No work experience added yet</p>
          <Button type="button" onClick={addNewExperienceItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="experienceItems" type="EXPERIENCE">
            {(providedDroppable, snapshotDroppable) => (
              <div
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
                className={`space-y-4 ${snapshotDroppable.isDraggingOver ? 'bg-muted/20 rounded-lg p-1' : ''}`}
              >
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(providedDraggable, snapshotDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        className={cn(snapshotDraggable.isDragging ? "shadow-xl rounded-lg" : "")}
                      >
                        <Card
                          className={cn(
                            `p-4 transition-all duration-200`,
                            expandedIndex === index ? 'border-primary ring-1 ring-primary' : 'border-border'
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="cursor-grab p-2 -ml-2"
                                {...providedDraggable.dragHandleProps}
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </Button>
                              <div>
                    <h3 className="font-semibold text-lg">
                      {watchedExperiences?.[index]?.position || watchedExperiences?.[index]?.company || `Experience ${index + 1}`}
                    </h3>
                    {watchedExperiences?.[index]?.company && (
                      <p className="text-sm text-muted-foreground">{watchedExperiences?.[index]?.company}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {/* ChevronUp/Down for expand/collapse, reordering is now D&D */}
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    aria-expanded={expandedIndex === index}
                  >
                    {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    aria-label="Remove experience item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedIndex === index && (
                <div className="mt-4 space-y-4 pt-4 border-t border-dashed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`exp-${field.id}-company`}>Company</Label>
                      <Input 
                        id={`exp-${field.id}-company`}
                        {...register(`experiences.${index}.company`)}
                        placeholder="Company name"
                        className={getInputClassNames("company", index)}
                        aria-invalid={errors.experiences?.[index]?.company ? "true" : "false"}
                      />
                      {errors.experiences?.[index]?.company && <p className="text-sm text-destructive">{errors.experiences?.[index]?.company?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`exp-${field.id}-position`}>Position</Label>
                      <Input 
                        id={`exp-${field.id}-position`}
                        {...register(`experiences.${index}.position`)}
                        placeholder="Job title"
                        className={getInputClassNames("position", index)}
                        aria-invalid={errors.experiences?.[index]?.position ? "true" : "false"}
                      />
                      {errors.experiences?.[index]?.position && <p className="text-sm text-destructive">{errors.experiences?.[index]?.position?.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`exp-${field.id}-location`}>Location</Label>
                      <Input 
                        id={`exp-${field.id}-location`}
                        {...register(`experiences.${index}.location`)}
                        placeholder="City, Country (e.g. Remote)"
                        className={getInputClassNames("location", index)}
                        aria-invalid={errors.experiences?.[index]?.location ? "true" : "false"}
                      />
                       {errors.experiences?.[index]?.location && <p className="text-sm text-destructive">{errors.experiences?.[index]?.location?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`exp-${field.id}-startDate`}>Start Date</Label>
                      <div className="relative">
                        <Input 
                          id={`exp-${field.id}-startDate`}
                          {...register(`experiences.${index}.startDate`)}
                          placeholder="MM/YYYY"
                          className={getInputClassNames("startDate", index)}
                          aria-invalid={errors.experiences?.[index]?.startDate ? "true" : "false"}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.experiences?.[index]?.startDate && <p className="text-sm text-destructive">{errors.experiences?.[index]?.startDate?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`exp-${field.id}-endDate`}>End Date</Label>
                      <div className="relative">
                        <Input 
                          id={`exp-${field.id}-endDate`}
                          {...register(`experiences.${index}.endDate`)}
                          placeholder={watchedExperiences?.[index]?.current ? "Present" : "MM/YYYY"}
                          disabled={watchedExperiences?.[index]?.current}
                          className={getInputClassNames("endDate", index)}
                          aria-invalid={errors.experiences?.[index]?.endDate ? "true" : "false"}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.experiences?.[index]?.endDate && <p className="text-sm text-destructive">{errors.experiences?.[index]?.endDate?.message}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-1">
                    <Controller
                        name={`experiences.${index}.current`}
                        control={control}
                        render={({ field: controllerField }) => (
                            <Checkbox
                                id={`exp-${field.id}-current`}
                                checked={Boolean(controllerField.value)} // Ensure value is boolean
                                onCheckedChange={(checked) => {
                                    controllerField.onChange(checked);
                                    if (checked) {
                                      setValue(`experiences.${index}.endDate`, "");
                                    }
                                }}
                            />
                        )}
                    />
                    <Label htmlFor={`exp-${field.id}-current`} className="text-sm font-normal">I currently work here</Label>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor={`exp-${field.id}-description`}>Description</Label>
                    <Textarea 
                      id={`exp-${field.id}-description`}
                      {...register(`experiences.${index}.description`)}
                      placeholder="Describe your responsibilities and achievements (e.g., Led a team of 5 engineers...)"
                      rows={4}
                      className={getInputClassNames("description", index)}
                      aria-invalid={errors.experiences?.[index]?.description ? "true" : "false"}
                    />
                    {errors.experiences?.[index]?.description && <p className="text-sm text-destructive">{errors.experiences?.[index]?.description?.message}</p>}
                  </div>
                </div>
              )}
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
       <div className="flex justify-center mt-6"> {/* Add button outside DND context */}
          <Button
            type="button"
            variant="outline"
            onClick={addNewExperienceItem}
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add More Experience
          </Button>
        </div>
    </div>
  );
}