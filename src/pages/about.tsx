import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Users, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4">About Full Circle Psychology</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A boutique psychology practice dedicated to providing comprehensive, compassionate, 
              and evidence-based psychological services with exceptional care and minimal wait times.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700">
                  To provide accessible, high-quality psychological assessments and interventions 
                  that empower individuals to understand their cognitive strengths and challenges, 
                  leading to improved quality of life and personal growth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700">
                  To be the leading psychology practice in the region, known for our expertise, 
                  compassionate care, innovative approaches, and commitment to making mental 
                  health services accessible to all who need them.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Why Choose Full Circle Psychology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Short Wait Times</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-neutral-600 text-sm">
                    Most appointments available within 2-3 weeks, not months
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <GraduationCap className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Expert Providers</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-neutral-600 text-sm">
                    Licensed psychologists with specialized training and years of experience
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Comprehensive Care</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-neutral-600 text-sm">
                    Full range of psychological assessments and evidence-based interventions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Personalized Approach</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-neutral-600 text-sm">
                    Tailored treatment plans that honor your unique needs and goals
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Dr. Sarah Johnson, Ph.D.</CardTitle>
                  <p className="text-primary font-medium">Licensed Clinical Psychologist</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-neutral-700">
                      Dr. Johnson specializes in ADHD assessments, learning disabilities, and cognitive rehabilitation. 
                      She brings over 12 years of experience in neuropsychological assessment and intervention.
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2">Specializations:</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">ADHD Assessment</Badge>
                        <Badge variant="secondary">Learning Disabilities</Badge>
                        <Badge variant="secondary">Autism Spectrum</Badge>
                        <Badge variant="secondary">Cognitive Rehabilitation</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Education & Training:</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>Ph.D. Clinical Psychology, NYU</li>
                        <li>Neuropsychology Fellowship, Mount Sinai</li>
                        <li>Licensed in NY and 42 states via PSYPACT</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Dr. Michael Chen, Psy.D.</CardTitle>
                  <p className="text-primary font-medium">Licensed Clinical Psychologist</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-neutral-700">
                      Dr. Chen focuses on anxiety disorders, depression, and trauma-informed care. 
                      He has extensive experience in both assessment and therapeutic interventions.
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2">Specializations:</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Anxiety & Depression</Badge>
                        <Badge variant="secondary">Trauma Assessment</Badge>
                        <Badge variant="secondary">Personality Assessment</Badge>
                        <Badge variant="secondary">CBT & DBT</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Education & Training:</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>Psy.D. Clinical Psychology, Columbia</li>
                        <li>Trauma Specialist Certification</li>
                        <li>Licensed in NY and telehealth provider</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Practice Information */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Practice Information</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Licensing & Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-neutral-700 space-y-2">
                    <li>• NYS Licensed Psychology Practice</li>
                    <li>• PSYPACT Interstate Compact</li>
                    <li>• HIPAA Compliant</li>
                    <li>• APA Ethics Guidelines</li>
                    <li>• Continuing Education Current</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insurance & Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-neutral-700 space-y-2">
                    <li>• Most major insurance accepted</li>
                    <li>• Out-of-network benefits</li>
                    <li>• Self-pay options available</li>
                    <li>• Sliding scale for qualifying individuals</li>
                    <li>• Secure online payment portal</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-neutral-700 space-y-2">
                    <li>• In-person: Brooklyn, NY</li>
                    <li>• Telehealth: All of New York</li>
                    <li>• PSYPACT states available</li>
                    <li>• Flexible scheduling options</li>
                    <li>• Weekend appointments</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">Compassion</h3>
                <p className="text-neutral-600 text-sm">
                  We approach every client with empathy, understanding, and genuine care for their wellbeing.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">Excellence</h3>
                <p className="text-neutral-600 text-sm">
                  We maintain the highest standards in assessment, treatment, and professional practice.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">Integrity</h3>
                <p className="text-neutral-600 text-sm">
                  We practice with honesty, transparency, and ethical responsibility in all interactions.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-primary mb-2">Innovation</h3>
                <p className="text-neutral-600 text-sm">
                  We embrace evidence-based practices and new technologies to improve patient care.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}