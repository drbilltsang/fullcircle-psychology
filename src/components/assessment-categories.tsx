import { Check } from "lucide-react";

const assessmentCategories = [
  {
    title: "Pediatric and Adult",
    items: [
      "Attention deficit/Hyperactivity disorder (ADHD)",
      "Autoimmune disorders (e.g., Long COVID, Multiple Sclerosis, Lyme, ME/CFS)",
      "Autism",
      "Complex medical conditions",
      "Epilepsy",
      "Genetic disorders",
      "Insomnia",
      "Learning disabilities (e.g., Dyslexia)",
      "Memory disorders",
      "Movement disorders",
      "Psychiatric/psychological conditions",
      "Stroke/cerebrovascular disease",
      "TBI and Concussion"
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300",
    alt: "Child receiving support from caregiver"
  },
  {
    title: "Corporate/Executive",
    items: [
      "Executive Functioning Assessment",
      "Cognitive Ability Testing",
      "Emotional Intelligence (EI) Testing",
      "Stress and Resilience Assessments",
      "Leadership Assessments",
      "Personality Assessments",
      "Mental Health Screening",
      "Neurocognitive Testing for Aging Executives",
      "Decision-Making and Risk Assessment",
      "Burnout and Work-Life Balance Assessment"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300",
    alt: "Professional business consultation meeting"
  },
  {
    title: "Legal/Forensic",
    items: [
      "Independent Medical Evaluations",
      "Workers Compensation",
      "Expert testimony/witness",
      "Case review",
      "Fitness for duty",
      "Consultation"
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300",
    alt: "Professional therapy consultation session"
  },
  {
    title: "Surgical",
    items: [
      "Pre/post surgery for organ transplant",
      "Brain tumors",
      "Deep brain stimulation",
      "Epilepsy",
      "Other medical conditions"
    ],
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=300",
    alt: "Medical professional discussing treatment with patient"
  }
];

export default function AssessmentCategories() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Personalized Assessments</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {assessmentCategories.map((category, index) => (
            <div key={index} className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">{category.title}</h3>
              <ul className="space-y-3 text-muted-foreground mb-8">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <Check className="text-primary w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <img 
                  src={category.image}
                  alt={category.alt}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
