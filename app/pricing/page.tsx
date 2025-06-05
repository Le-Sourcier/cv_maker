import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import PricingFaq from "@/components/pricing/pricing-faq";

export default function PricingPage() {
  // Note: The FileText icon was implicitly available via the removed header's imports.
  // If it's needed by the global header (from layout.tsx), it should be there.
  // For this page, it's not directly used after removing the local header.

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with basic CV creation.",
      price: "$0",
      duration: "forever",
      features: [
        "1 CV template",
        "Basic sections",
        "PDF export",
        "7-day access to editor",
      ],
      limitations: [
        "Limited template selection",
        "No AI suggestions",
        "No cloud storage",
        "Basic support",
      ],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      description: "Everything you need for professional CV creation.",
      price: "$12",
      duration: "per month",
      features: [
        "All CV templates",
        "Unlimited sections",
        "All export formats",
        "Unlimited access",
        "Cloud storage",
        "AI suggestions",
        "Priority support",
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "Advanced features for teams and organizations.",
      price: "$49",
      duration: "per month",
      features: [
        "All Pro features",
        "Team management",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Custom templates",
        "Analytics",
        "SSO Authentication",
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    // Removed redundant header, assuming main header is in layout.tsx
    <main className="flex flex-col min-h-screen">
      <section className="flex-1 py-16 md:py-20 bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-secondary/10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center space-y-4 mb-12 md:mb-16"> {/* Adjusted bottom margin */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight"> {/* Adjusted text size for consistency */}
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mx-auto">
              Choose the plan that best fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "flex flex-col",
                  plan.popular && "border-primary shadow-lg relative"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {plan.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations && plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-center text-muted-foreground">
                        <Check className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0 opacity-50" />
                        <span className="text-sm line-through">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.buttonVariant}
                    className={cn("w-full", plan.popular && "bg-primary hover:bg-primary/90")}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-6 text-left">Feature</th>
                    <th className="py-4 px-6 text-center">Free</th>
                    <th className="py-4 px-6 text-center">Pro</th>
                    <th className="py-4 px-6 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        Templates
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-sm">Professional templates for your CV</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">1</td>
                    <td className="py-4 px-6 text-center">All</td>
                    <td className="py-4 px-6 text-center">All + Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        Export formats
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-sm">Available file formats for download</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">PDF</td>
                    <td className="py-4 px-6 text-center">PDF, HTML, DOCX</td>
                    <td className="py-4 px-6 text-center">All formats</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">AI Suggestions</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-4 w-4 mx-auto text-green-500" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-4 w-4 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">Cloud Storage</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-4 w-4 mx-auto text-green-500" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-4 w-4 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">Support</td>
                    <td className="py-4 px-6 text-center">Email</td>
                    <td className="py-4 px-6 text-center">Priority</td>
                    <td className="py-4 px-6 text-center">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <PricingFaq />
        </div>
      </section>
    </main>
  );
}