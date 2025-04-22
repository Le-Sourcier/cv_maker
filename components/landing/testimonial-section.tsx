import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "This CV builder helped me land my dream job! The templates are professional and the drag and drop editor is incredibly easy to use.",
      author: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "SJ",
    },
    {
      quote: "I was struggling to make my CV stand out until I found this tool. The AI suggestions were particularly helpful in improving my content.",
      author: "David Chen",
      role: "Software Engineer",
      avatar: "DC",
    },
    {
      quote: "As someone who's not design-savvy, this platform made creating a professional CV so simple. The export options are also very convenient.",
      author: "Emma Williams",
      role: "HR Specialist",
      avatar: "EW",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of job seekers have used our platform to create standout CVs and advance their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 dark:bg-gray-900 border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 inline-block">★</span>
                  ))}
                </div>
                <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}