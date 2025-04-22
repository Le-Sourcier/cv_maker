"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalDetails } from "@/lib/types";

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  updateData: (data: Partial<PersonalDetails>) => void;
}

export default function PersonalDetailsForm({ data, updateData }: PersonalDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={data.name} 
            onChange={(e) => updateData({ name: e.target.value })} 
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input 
            id="title" 
            value={data.title} 
            onChange={(e) => updateData({ title: e.target.value })} 
            placeholder="Frontend Developer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={data.email} 
            onChange={(e) => updateData({ email: e.target.value })} 
            placeholder="john@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            value={data.phone} 
            onChange={(e) => updateData({ phone: e.target.value })} 
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={data.location} 
            onChange={(e) => updateData({ location: e.target.value })} 
            placeholder="New York, NY"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input 
            id="website" 
            value={data.website} 
            onChange={(e) => updateData({ website: e.target.value })} 
            placeholder="https://johndoe.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea 
          id="summary" 
          value={data.summary} 
          onChange={(e) => updateData({ summary: e.target.value })} 
          placeholder="Experienced frontend developer with 5+ years of experience in building responsive web applications..."
          rows={4}
        />
      </div>
    </div>
  );
}