import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesGrid from "@/components/services-grid";
import AboutSection from "@/components/about-section";
import CTASection from "@/components/cta-section";
import LocationSection from "@/components/location-section";
import TestimonialSection from "@/components/testimonial-section";
import BlogSection from "@/components/blog-section";
import AssessmentCategories from "@/components/assessment-categories";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="main-content" role="main">
        <HeroSection />
        <ServicesGrid />
        <AboutSection />
        <CTASection />
        <LocationSection />
        <TestimonialSection />
        <BlogSection />
        <AssessmentCategories />
        <CTASection variant="final" />
      </main>
      <Footer />
    </div>
  );
}
