import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TemplateShowcase() {
  const templates = [
    {
      name: "Professional",
      image: "https://images.pexels.com/photos/6437842/pexels-photo-6437842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Clean and professional template ideal for corporate jobs.",
    },
    {
      name: "Creative",
      image: "https://images.pexels.com/photos/6437844/pexels-photo-6437844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Bold and creative template perfect for design and marketing roles.",
    },
    {
      name: "Modern",
      image: "https://images.pexels.com/photos/6437839/pexels-photo-6437839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Contemporary design suitable for tech and startup positions.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Templates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of professionally designed templates to make your CV stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <div className="relative h-96 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <img 
                  src={template.image} 
                  alt={`${template.name} Template`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">{template.name}</h3>
                  <p className="text-white/80 mb-4">{template.description}</p>
                  <Link href="/builder">
                    <Button size="sm" variant="secondary">
                      Use this template
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/templates">
            <Button variant="outline" size="lg">
              View all templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}