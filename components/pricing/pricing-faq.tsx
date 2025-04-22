"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingFaq() {
  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer:
        "You can try any paid plan for free for 14 days. During this period, you'll have access to all features included in the plan. No credit card is required to start the trial, and you can cancel anytime before the trial ends without being charged.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll get immediate access to the new features and will be charged the prorated difference for the remainder of your billing cycle. If you downgrade, the changes will take effect at the end of your current billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and in some regions, we also support direct debit and bank transfers for annual plans.",
    },
    {
      question: "Is there a discount for annual billing?",
      answer:
        "Yes, you can save up to 20% by choosing annual billing instead of monthly. The annual discount is automatically applied when you select the annual billing option during signup or when changing your subscription.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. After cancellation, you'll still have access to your paid features until the end of your current billing period. We don't offer refunds for partial months or years.",
    },
    {
      question: "What happens to my CVs if I downgrade or cancel?",
      answer:
        "If you downgrade from Pro to Free, you'll still have access to your CVs, but you won't be able to edit them using the premium templates or features. If you cancel your subscription entirely, you'll have a 30-day grace period to download your CVs before they are removed from our systems.",
    },
  ];

  return (
    <section className="mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-2">
          Everything you need to know about our pricing and products
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left py-4 hover:no-underline">
                <span className="font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="py-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Still have questions?</p>
        <div className="inline-block">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}