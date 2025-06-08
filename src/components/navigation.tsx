import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:drtsangpsyd@gmail.com";
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              className="text-xl font-bold text-primary cursor-pointer" 
              onClick={() => scrollToSection('hero')}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
              role="button"
              aria-label="Go to homepage"
            >
              Full Circle Psychology
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('services')}
                className="text-neutral-700 hover:text-primary transition-colors duration-200"
                aria-label="Navigate to Services section"
              >
                Services
              </button>
              <button 
                onClick={() => window.location.href = '/about'}
                className="text-neutral-700 hover:text-primary transition-colors duration-200"
                aria-label="Navigate to About page"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('blog')}
                className="text-neutral-700 hover:text-primary transition-colors duration-200"
                aria-label="Navigate to Blog section"
              >
                Blog
              </button>
              <Button 
                onClick={() => window.location.href = '/portal'}
                className="bg-primary text-white hover:bg-primary/90 border-primary"
                aria-label="Access Patient Portal"
              >
                Patient Portal
              </Button>
              <Button 
                onClick={() => window.location.href = '/provider'}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                aria-label="Access Provider Portal"
              >
                Provider Portal
              </Button>
              <Button 
                onClick={() => window.location.href = '/book-appointment'}
                className="bg-secondary text-primary hover:bg-secondary/90"
                aria-label="Book an appointment"
              >
                Book Appointment
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary transition-colors duration-200 w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary transition-colors duration-200 w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary transition-colors duration-200 w-full text-left"
              >
                Blog
              </button>
              <Button 
                onClick={() => window.location.href = '/portal'}
                className="w-full mt-2 bg-primary text-white hover:bg-primary/90"
              >
                Patient Portal
              </Button>
              <Button 
                onClick={() => window.location.href = '/provider'}
                variant="outline"
                className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Provider Portal
              </Button>
              <Button 
                onClick={() => window.location.href = '/book-appointment'}
                className="w-full mt-2 bg-secondary text-primary hover:bg-secondary/90"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
