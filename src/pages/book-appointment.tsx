import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail } from "lucide-react";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  serviceType: z.string().min(1, "Please select a service type"),
  preferredDate: z.date(),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  insuranceProvider: z.string().optional(),
  reasonForVisit: z.string().min(10, "Please provide at least 10 characters describing your reason for visit"),
  previousAssessment: z.string().optional(),
});

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      serviceType: "",
      preferredTime: "",
      insuranceProvider: "",
      reasonForVisit: "",
      previousAssessment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    setIsSubmitting(true);
    // Here you would typically send the data to your backend
    console.log("Booking request:", values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Appointment request submitted successfully! We will contact you within 24 hours to confirm your appointment.");
    form.reset();
    setSelectedDate(undefined);
    setIsSubmitting(false);
  };

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"
  ];

  const serviceTypes = [
    "ADHD Assessment (Adult)",
    "ADHD Assessment (Child/Adolescent)",
    "Learning Disability Assessment",
    "Autism Spectrum Assessment",
    "Cognitive Assessment",
    "Psychological Evaluation",
    "Consultation",
    "Follow-up Appointment",
  ];

  const insuranceProviders = [
    "Aetna",
    "Blue Cross Blue Shield",
    "Cigna",
    "UnitedHealthcare",
    "Medicare",
    "Medicaid",
    "NYS Employee Benefits",
    "Self-Pay",
    "Other",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Book an Appointment</h1>
            <p className="text-xl text-neutral-600">
              Schedule your psychological assessment or consultation with our expert team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Appointment Request Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@email.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/DD/YYYY" type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Service Selection */}
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select the type of service you need" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceTypes.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Scheduling */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Date</FormLabel>
                              <div className="border rounded-md p-3">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={(date) => {
                                    setSelectedDate(date);
                                    field.onChange(date);
                                  }}
                                  disabled={(date) => date < new Date()}
                                  className="rounded-md"
                                />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Time</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select preferred time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Insurance */}
                      <FormField
                        control={form.control}
                        name="insuranceProvider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Provider (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your insurance provider" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {insuranceProviders.map((provider) => (
                                  <SelectItem key={provider} value={provider}>
                                    {provider}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      {/* Reason for Visit */}
                      <FormField
                        control={form.control}
                        name="reasonForVisit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Visit</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe the reason for your visit, any specific concerns, or symptoms you'd like addressed..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="previousAssessment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Psychological Assessments (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please list any previous psychological assessments, when they were conducted, and by whom..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting Request..." : "Submit Appointment Request"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">After Submission:</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• We'll contact you within 24 hours</li>
                      <li>• Confirm your appointment time</li>
                      <li>• Send intake forms to complete</li>
                      <li>• Provide preparation instructions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Assessment Duration:</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• ADHD Assessment: 3-4 hours</li>
                      <li>• Learning Disability: 4-6 hours</li>
                      <li>• Cognitive Assessment: 2-3 hours</li>
                      <li>• Consultation: 1 hour</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p><strong>Monday - Thursday:</strong> 9:00 AM - 7:00 PM</p>
                    <p><strong>Friday:</strong> 9:00 AM - 5:00 PM</p>
                    <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Phone:</strong> (718) 555-0123</p>
                    <p><strong>Email:</strong> scheduling@fullcirclepsychology.com</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}