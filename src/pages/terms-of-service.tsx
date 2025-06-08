import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>
          <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Professional Services Agreement</h2>
            <p className="mb-4">
              By scheduling an appointment or using our services, you agree to these terms and conditions. 
              Full Circle Psychology provides psychological assessment, evaluation, and consultation services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Appointment Policies</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Scheduling</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Appointments must be scheduled in advance through our patient portal or by phone</li>
                <li>We require 24-hour notice for appointment changes or cancellations</li>
                <li>Late cancellations (less than 24 hours) may incur a fee</li>
                <li>No-shows will be charged the full session fee</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Punctuality</h3>
              <p className="mb-4">
                Please arrive 10 minutes early for your appointment. Late arrivals may result in shortened 
                sessions or rescheduling, depending on the provider's schedule.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Payment is due at the time of service unless other arrangements are made</li>
              <li>We accept cash, credit cards, and insurance (where applicable)</li>
              <li>Insurance copays and deductibles are due at time of service</li>
              <li>Outstanding balances over 90 days may be sent to collections</li>
              <li>A $35 fee will be charged for returned checks</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Confidentiality</h2>
            <p className="mb-4">
              All communications between you and your psychologist are confidential, except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>When there is imminent danger to yourself or others</li>
              <li>Suspected child, elder, or dependent adult abuse</li>
              <li>Court-ordered disclosures</li>
              <li>When you provide written authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Telehealth Services</h2>
            <p className="mb-4">
              We offer telehealth services for eligible clients. By participating in telehealth:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You agree to use a secure, private location</li>
              <li>You understand the limitations of remote assessment</li>
              <li>You consent to the use of HIPAA-compliant video platforms</li>
              <li>You agree to have emergency contact information readily available</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Emergency Procedures</h2>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Mental Health Emergency</h3>
              <p className="text-red-700 mb-2">
                If you are experiencing a mental health emergency, please call:
              </p>
              <ul className="text-red-700">
                <li><strong>911</strong> for immediate emergency</li>
                <li><strong>988</strong> for Suicide & Crisis Lifeline</li>
                <li><strong>NYC Mobile Crisis Team:</strong> 1-888-NYC-WELL</li>
              </ul>
            </div>
            <p className="mb-4">
              Our practice is not equipped to handle emergency situations. In case of emergency, 
              contact emergency services immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              Our liability is limited to the fees paid for services. We are not responsible for 
              any indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be posted on 
              our website and take effect immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p><strong>Full Circle Psychology</strong></p>
              <p>123 Healthcare Blvd, Brooklyn, NY 11201</p>
              <p>Phone: (718) 555-0123</p>
              <p>Email: info@fullcirclepsychology.com</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}