import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
          <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">HIPAA Compliance</h2>
            <p className="mb-4">
              Full Circle Psychology is committed to protecting your health information. We comply with the Health Insurance 
              Portability and Accountability Act (HIPAA) and maintain strict confidentiality of all patient information.
            </p>
            <p className="mb-4">
              Your protected health information (PHI) will only be used for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Treatment purposes</li>
              <li>Payment processing</li>
              <li>Healthcare operations</li>
              <li>Legal requirements when mandated by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
            <p className="mb-4">We collect information necessary to provide psychological services:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Personal identification information (name, address, phone, email)</li>
              <li>Health insurance information</li>
              <li>Medical and psychological history</li>
              <li>Assessment results and treatment notes</li>
              <li>Billing and payment information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">How We Protect Your Information</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Encrypted data transmission and storage</li>
              <li>Secure patient portal access</li>
              <li>Limited access to authorized personnel only</li>
              <li>Regular security audits and updates</li>
              <li>Secure disposal of physical and electronic records</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
            <p className="mb-4">Under HIPAA, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your health information</li>
              <li>Request corrections to your records</li>
              <li>Request restrictions on information use</li>
              <li>Request confidential communications</li>
              <li>File a complaint about privacy practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Telehealth Privacy</h2>
            <p className="mb-4">
              For telehealth sessions, we use HIPAA-compliant video platforms. Please ensure you are in a private 
              location during sessions and use a secure internet connection.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this privacy policy or your health information rights, please contact:
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p><strong>Privacy Officer</strong></p>
              <p>Full Circle Psychology</p>
              <p>Email: privacy@fullcirclepsychology.com</p>
              <p>Phone: (718) 555-0123</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}