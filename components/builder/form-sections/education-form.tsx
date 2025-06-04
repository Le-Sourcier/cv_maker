"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Education } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

// Zod Schema for a single education item
const educationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(), // Field of study
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string()
    .max(500, "Description should not exceed 500 characters")
    .optional().or(z.literal('')),
});

// Zod Schema for the array of education entries
const educationSchema = z.object({
  education: z.array(educationItemSchema),
});

type EducationFormData = z.infer<typeof educationSchema>;

export default function EducationForm({ education: initialEducation, updateEducation }: EducationFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const {
    control,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: { education: initialEducation },
    mode: "onBlur",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "education",
  });

  const watchedEducation = watch("education");
  useEffect(() => {
    if (watchedEducation) {
      updateEducation(watchedEducation);
    }
  }, [watchedEducation, updateEducation]);

  const addNewEducationItem = () => {
    const newId = Date.now().toString();
    append({
      id: newId,
      institution: "",
      degree: "",
      field: "",
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
    }
  };

  const getInputClassNames = (fieldName: string, index: number) => {
    const fieldError = errors.education?.[index]?.[fieldName as keyof Education];
    return cn(fieldError ? "border-destructive focus-visible:ring-destructive" : "");
  };

  return (
    <div className="space-y-4">
      {fields.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No education added yet</p>
          <Button onClick={addNewEducationItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
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
                      {watchedEducation?.[index]?.degree || watchedEducation?.[index]?.institution || `Education ${index + 1}`}
                    </h3>
                    {watchedEducation?.[index]?.institution && (
                      <p className="text-sm text-muted-foreground">{watchedEducation?.[index]?.institution}</p>
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
                    aria-label="Remove education item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedIndex === index && (
                <div className="mt-4 space-y-4 pt-4 border-t border-dashed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`edu-${field.id}-institution`}>Institution</Label>
                      <Input 
                        id={`edu-${field.id}-institution`}
                        {...register(`education.${index}.institution`)}
                        placeholder="University or school name"
                        className={getInputClassNames("institution", index)}
                        aria-invalid={errors.education?.[index]?.institution ? "true" : "false"}
                      />
                      {errors.education?.[index]?.institution && <p className="text-sm text-destructive">{errors.education?.[index]?.institution?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`edu-${field.id}-degree`}>Degree</Label>
                      <Input 
                        id={`edu-${field.id}-degree`}
                        {...register(`education.${index}.degree`)}
                        placeholder="Bachelor's, Master's, etc."
                        className={getInputClassNames("degree", index)}
                        aria-invalid={errors.education?.[index]?.degree ? "true" : "false"}
                      />
                      {errors.education?.[index]?.degree && <p className="text-sm text-destructive">{errors.education?.[index]?.degree?.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`edu-${field.id}-field`}>Field of Study</Label>
                      <Input 
                        id={`edu-${field.id}-field`}
                        {...register(`education.${index}.field`)}
                        placeholder="Computer Science, Business, etc."
                        className={getInputClassNames("field", index)}
                        aria-invalid={errors.education?.[index]?.field ? "true" : "false"}
                      />
                      {errors.education?.[index]?.field && <p className="text-sm text-destructive">{errors.education?.[index]?.field?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`edu-${field.id}-location`}>Location</Label>
                      <Input
                        id={`edu-${field.id}-location`}
                        {...register(`education.${index}.location`)}
                        placeholder="City, Country"
                        className={getInputClassNames("location", index)}
                        aria-invalid={errors.education?.[index]?.location ? "true" : "false"}
                      />
                       {errors.education?.[index]?.location && <p className="text-sm text-destructive">{errors.education?.[index]?.location?.message}</p>}
                    </div>
                     <div className="space-y-1.5"> {/* Placeholder to make grid align with ExperienceForm, or add another field */}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-1.5 md:col-start-2"> {/* Aligns Start Date under Location from row above if screen is md or larger */}
                      <Label htmlFor={`edu-${field.id}-startDate`}>Start Date</Label>
                      <div className="relative">
                        <Input 
                          id={`edu-${field.id}-startDate`}
                          {...register(`education.${index}.startDate`)}
                          placeholder="MM/YYYY"
                          className={getInputClassNames("startDate", index)}
                          aria-invalid={errors.education?.[index]?.startDate ? "true" : "false"}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.education?.[index]?.startDate && <p className="text-sm text-destructive">{errors.education?.[index]?.startDate?.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`edu-${field.id}-endDate`}>End Date / Expected</Label>
                      <div className="relative">
                        <Input 
                          id={`edu-${field.id}-endDate`}
                          {...register(`education.${index}.endDate`)}
                          placeholder={watchedEducation?.[index]?.current ? "Present" : "MM/YYYY"}
                          disabled={watchedEducation?.[index]?.current}
                          className={getInputClassNames("endDate", index)}
                          aria-invalid={errors.education?.[index]?.endDate ? "true" : "false"}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.education?.[index]?.endDate && <p className="text-sm text-destructive">{errors.education?.[index]?.endDate?.message}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-1">
                    <Controller
                        name={`education.${index}.current`}
                        control={control}
                        render={({ field: controllerField }) => (
                            <Checkbox
                                id={`edu-${field.id}-current`}
                                checked={controllerField.value}
                                onCheckedChange={(checked) => {
                                    controllerField.onChange(checked);
                                    if (checked) {
                                      setValue(`education.${index}.endDate`, "");
                                    }
                                }}
                            />
                        )}
                    />
                    <Label htmlFor={`edu-${field.id}-current`} className="text-sm font-normal">I currently study here</Label>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor={`edu-${field.id}-description`}>Description</Label>
                    <Textarea 
                      id={`edu-${field.id}-description`}
                      {...register(`education.${index}.description`)}
                      placeholder="Describe your studies, achievements, relevant coursework, etc."
                      rows={3}
                      className={getInputClassNames("description", index)}
                      aria-invalid={errors.education?.[index]?.description ? "true" : "false"}
                    />
                    {errors.education?.[index]?.description && <p className="text-sm text-destructive">{errors.education?.[index]?.description?.message}</p>}
                  </div>
                </div>
              )}
            </Card>
          ))}
          
          <div className="flex justify-center mt-6">
            <Button 
              type="button"
              variant="outline" 
              onClick={addNewEducationItem}
              className="w-full md:w-auto"
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