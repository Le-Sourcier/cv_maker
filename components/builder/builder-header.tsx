"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  ChevronLeft, 
  Save, 
  Download, 
  Share2,
  Loader2 // Added Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVData } from "@/lib/types";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface BuilderHeaderProps {
  cvData: CVData;
}

export default function BuilderHeader({ cvData }: BuilderHeaderProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "CV saved successfully",
        description: "Your CV has been saved to your account",
      });
    }, 1000);
  };

  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4"> {/* Adjusted spacing for sm screens */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2"> {/* Adjusted spacing for sm screens */}
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium hidden sm:inline">Back</span> {/* Text hidden on <sm screens */}
          </Link>
          <div className="hidden md:flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">
              {cvData.personalDetails.name || "Untitled CV"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave} 
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-0 sm:mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-0 sm:mr-2" />
            )}
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span> {/* Text hidden on <sm screens */}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="h-4 w-4 mr-0 sm:mr-2" /> {/* Adjusted margin for sm screens */}
                <span className="hidden sm:inline">Export</span> {/* Text hidden on <sm screens */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="sm:size-sm"> {/* Becomes icon only on <sm, keeps size sm from sm upwards */}
            <Share2 className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Share</span> {/* Text for SR and visible on sm+ */}
          </Button>
        </div>
      </div>
    </header>
  );
}