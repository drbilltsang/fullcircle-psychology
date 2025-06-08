export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = "mailto:info@fullcirclepsychology.org";
  };

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Full Circle Psychology</h3>
            <p className="text-neutral-300">Expert psychological services with short wait times and personalized care.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><button onClick={() => window.location.href = '/about'} className="hover:text-primary transition-colors">About Us</button></li>
              <li><button onClick={() => window.location.href = '/book-appointment'} className="hover:text-primary transition-colors">Book Appointment</button></li>
              <li><button onClick={() => window.location.href = '/contact'} className="hover:text-primary transition-colors">Contact</button></li>
              <li><button onClick={() => window.location.href = '/portal'} className="hover:text-primary transition-colors">Patient Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-neutral-300">
              <li>ADHD Assessments</li>
              <li>Mental Health Evaluations</li>
              <li>Learning Disabilities</li>
              <li>Cognitive Assessments</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-neutral-300 mb-2">123 Healthcare Blvd</p>
            <p className="text-neutral-300 mb-2">Brooklyn, NY 11201</p>
            <p className="text-neutral-300 mb-2">(718) 555-0123</p>
            <button 
              onClick={handleEmailClick}
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              info@fullcirclepsychology.org
            </button>
          </div>
        </div>
        <div className="border-t border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400">&copy; 2024 Full Circle Psychology PLLC. All rights reserved.</p>
            <div className="flex space-x-6 text-neutral-400">
              <button onClick={() => window.location.href = '/privacy-policy'} className="hover:text-primary transition-colors">Privacy Policy</button>
              <button onClick={() => window.location.href = '/terms-of-service'} className="hover:text-primary transition-colors">Terms of Service</button>
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
