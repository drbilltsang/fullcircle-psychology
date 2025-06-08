import { Button } from "@/components/ui/button";

interface CTASectionProps {
  variant?: "default" | "final";
}

export default function CTASection({ variant = "default" }: CTASectionProps) {
  const handleEmailClick = () => {
    window.location.href = "mailto:drtsangpsyd@gmail.com";
  };

  if (variant === "final") {
    return (
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Feeling Better Is Closer Than You Think.</h2>
          <Button 
            variant="secondary"
            size="lg"
            onClick={handleEmailClick}
            className="text-lg px-8 py-4"
          >
            Book An Appointment Today
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Find your path</h2>
        <p className="text-xl mb-8">
          Discover how our personalized approach can enhance your well-being and transform your quality of life.
        </p>
        <Button 
          variant="secondary"
          size="lg"
          onClick={handleEmailClick}
          className="text-lg px-8 py-4"
        >
          Book An Appointment Today
        </Button>
      </div>
    </section>
  );
}
