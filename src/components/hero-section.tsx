import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleEmailClick = () => {
    window.location.href = "mailto:drtsangpsyd@gmail.com";
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" role="banner">Full Circle Psychology</h1>
        <p className="text-xl md:text-2xl mb-8 font-light">A boutique service with short wait times for expert care</p>
        <Button 
          size="lg"
          onClick={handleEmailClick}
          className="text-lg px-8 py-4"
          aria-label="Connect with us via email"
        >
          Connect with Us
        </Button>
      </div>
    </section>
  );
}
