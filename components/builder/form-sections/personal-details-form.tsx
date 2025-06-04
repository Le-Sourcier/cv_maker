"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalDetails } from "@/lib/types";
import { cn } from '@/lib/utils';

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  updateData: (data: Partial<PersonalDetails>) => void;
}

const personalDetailsSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Professional title is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL (e.g., https://example.com)").optional().or(z.literal('')),
  summary: z.string()
    .min(10, "Summary should be at least 10 characters")
    .max(500, "Summary should not exceed 500 characters")
    .optional()
    .or(z.literal('')),
});

export default function PersonalDetailsForm({ data, updateData }: PersonalDetailsFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<PersonalDetails>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: data,
    mode: "onBlur", // Validate on blur to avoid too aggressive validation
  });

  const watchedValues = watch();
  useEffect(() => {
    // Only call updateData if the watched values are valid according to the schema
    // This prevents updating parent state with invalid partial data during typing
    // However, for a better UX, we might want to update parent even with partial/invalid data
    // and let the parent decide what to do. For now, just pass through.
    updateData(watchedValues);
  }, [watchedValues, updateData]);

  const getInputClassNames = (fieldName: keyof PersonalDetails) =>
    cn(
      errors[fieldName] ? "border-destructive focus-visible:ring-destructive" : ""
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            {...register("name")}
            placeholder="John Doe"
            aria-invalid={errors.name ? "true" : "false"}
            className={getInputClassNames("name")}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input 
            id="title" 
            {...register("title")}
            placeholder="Frontend Developer"
            aria-invalid={errors.title ? "true" : "false"}
            className={getInputClassNames("title")}
          />
          {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            {...register("email")}
            placeholder="john@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            className={getInputClassNames("email")}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            {...register("phone")}
            placeholder="+1 (555) 123-4567"
            aria-invalid={errors.phone ? "true" : "false"}
            className={getInputClassNames("phone")}
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            {...register("location")}
            placeholder="New York, NY"
            aria-invalid={errors.location ? "true" : "false"}
            className={getInputClassNames("location")}
          />
          {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input 
            id="website" 
            {...register("website")}
            placeholder="https://johndoe.com"
            aria-invalid={errors.website ? "true" : "false"}
            className={getInputClassNames("website")}
          />
          {errors.website && <p className="text-sm text-destructive mt-1">{errors.website.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea 
          id="summary" 
          {...register("summary")}
          placeholder="Experienced frontend developer with 5+ years of experience in building responsive web applications..."
          rows={4}
          aria-invalid={errors.summary ? "true" : "false"}
          className={getInputClassNames("summary")}
        />
        {errors.summary && <p className="text-sm text-destructive mt-1">{errors.summary.message}</p>}
      </div>
    </div>
  );
}