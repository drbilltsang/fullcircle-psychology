import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, AlertTriangle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Get in touch with Full Circle Psychology for appointments, questions, or emergency resources.
            </p>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Mental Health Emergency</h3>
                <p className="text-red-700 mb-3">
                  If you are experiencing a mental health crisis or emergency, please contact:
                </p>
                <div className="space-y-1 text-red-700">
                  <p><strong>911</strong> - Immediate emergency services</p>
                  <p><strong>988</strong> - Suicide & Crisis Lifeline (24/7)</p>
                  <p><strong>1-888-NYC-WELL</strong> - NYC Mobile Crisis Team</p>
                  <p><strong>Text "HELLO" to 741741</strong> - Crisis Text Line</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <MapPin className="h-5 w-5 text-primary mr-2" />
                      Office Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700">
                      123 Healthcare Boulevard<br />
                      Brooklyn, NY 11201<br />
                      Suite 304
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Phone className="h-5 w-5 text-primary mr-2" />
                      Phone & Fax
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700">
                      <strong>Main Office:</strong> (718) 555-0123<br />
                      <strong>Fax:</strong> (718) 555-0124
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Mail className="h-5 w-5 text-primary mr-2" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700">
                      <strong>General Inquiries:</strong><br />
                      info@fullcirclepsychology.com<br />
                      <strong>Billing Questions:</strong><br />
                      billing@fullcirclepsychology.com
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-neutral-700">
                      <p><strong>Monday - Thursday:</strong> 9:00 AM - 7:00 PM</p>
                      <p><strong>Friday:</strong> 9:00 AM - 5:00 PM</p>
                      <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
                      <p><strong>Sunday:</strong> Closed</p>
                      <p className="mt-2 text-sm text-neutral-600">
                        *Telehealth appointments available outside regular hours
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Services & Quick Actions */}
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-8">Quick Actions</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule an Appointment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">
                      Book your assessment or consultation online through our secure patient portal.
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/portal'}
                      className="w-full"
                    >
                      Access Patient Portal
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Insurance & Billing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-neutral-700 space-y-2">
                      <p><strong>We accept most major insurance plans:</strong></p>
                      <ul className="list-disc pl-6 text-sm">
                        <li>Aetna, BCBS, Cigna, UnitedHealth</li>
                        <li>Medicare and Medicaid</li>
                        <li>NYS Employee Benefits</li>
                        <li>Out-of-network benefits available</li>
                      </ul>
                      <p className="text-sm text-neutral-600 mt-3">
                        Self-pay rates available. Contact us for pricing.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Telehealth Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-2">
                      We provide secure telehealth services across:
                    </p>
                    <ul className="list-disc pl-6 text-sm text-neutral-700">
                      <li>New York State</li>
                      <li>42 additional states via PSYPACT</li>
                      <li>HIPAA-compliant video platform</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.location.href = '/provider'}
                      >
                        Provider Portal Access
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open('mailto:referrals@fullcirclepsychology.com')}
                      >
                        Professional Referrals
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-primary mb-8 text-center">Find Us</h2>
            <div className="bg-neutral-100 rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">
                Conveniently located in Brooklyn with easy access to public transportation.
              </p>
              <p className="text-sm text-neutral-500">
                Detailed directions and parking information available upon appointment confirmation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}