import { Card, CardContent } from "@/components/ui/card";
import { Brain, ClipboardCheck, Heart, Puzzle, Users, GraduationCap, TrendingUp, Shield } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "ADHD",
    description: "Comprehensive assessments to diagnose and better understand Attention Deficit Hyperactivity Disorder (ADHD) symptoms."
  },
  {
    icon: ClipboardCheck,
    title: "Test Accommodations",
    description: "Assessments and documentation for accommodations on standardized tests."
  },
  {
    icon: Heart,
    title: "Mental Health Evaluations",
    description: "Comprehensive assessments to understand and address mental health concerns."
  },
  {
    icon: Puzzle,
    title: "Cognitive Rehabilitation",
    description: "Therapies designed to improve cognitive functioning and everyday life skills."
  },
  {
    icon: Users,
    title: "Autism Spectrum Disorder",
    description: "Personalized evaluations to identify autism spectrum disorder in adolescents/adults (16+)."
  },
  {
    icon: GraduationCap,
    title: "Learning Disabilities",
    description: "In-depth evaluations to diagnose and support learning differences."
  },
  {
    icon: TrendingUp,
    title: "Executive Coaching",
    description: "Personalized coaching to boost productivity, leadership, and life management skills."
  },
  {
    icon: Shield,
    title: "Anxiety And Depression",
    description: "Evidence-based treatments to address a variety of mental health needs. Find the care that works for you."
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Overview of Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-shadow duration-300"
                tabIndex={0}
                role="article"
                aria-labelledby={`service-${index}-title`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  <h3 id={`service-${index}-title`} className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
