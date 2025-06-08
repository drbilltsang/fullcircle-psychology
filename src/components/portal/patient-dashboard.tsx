import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut,
  Bell,
  Clock,
  Download,
  Upload,
  CreditCard,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import type { Appointment, Document, Message, Assessment, Invoice } from "@shared/schema";

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user data
  const { data: appointments = [] } = useQuery({
    queryKey: ["/api/appointments"],
  });

  const { data: documents = [] } = useQuery({
    queryKey: ["/api/documents"],
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages"],
  });

  const { data: assessments = [] } = useQuery({
    queryKey: ["/api/assessments"],
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["/api/invoices"],
  });

  const handleLogout = async () => {
    await logout();
  };

  const upcomingAppointments = appointments.filter((apt: Appointment) => 
    new Date(apt.appointmentDate) > new Date() && apt.status === 'scheduled'
  );

  const unreadMessages = messages.filter((msg: Message) => !msg.isRead);
  const pendingAssessments = assessments.filter((assessment: Assessment) => 
    assessment.status === 'pending'
  );

  const pendingInvoices = invoices.filter((invoice: Invoice) => 
    invoice.status === 'pending'
  );

  const totalOutstanding = pendingInvoices.reduce((sum: number, invoice: Invoice) => 
    sum + parseFloat(invoice.amount || '0'), 0
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">Patient Portal</h1>
              <p className="text-lg text-muted-foreground">
                Welcome back, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                {unreadMessages.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadMessages.length}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs md:text-sm">Appointments</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs md:text-sm">Documents</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs md:text-sm">Messages</TabsTrigger>
            <TabsTrigger value="assessments" className="text-xs md:text-sm">Assessments</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs md:text-sm">Billing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Appointments
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Next: {upcomingAppointments[0] ? 
                      new Date(upcomingAppointments[0].appointmentDate).toLocaleDateString() : 
                      'None scheduled'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Documents
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{documents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total documents
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unread Messages
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{unreadMessages.length}</div>
                  <p className="text-xs text-muted-foreground">
                    New messages
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Assessments
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingAssessments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    To complete
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Outstanding Balance
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    {pendingInvoices.length} pending invoice{pendingInvoices.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest appointments and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.slice(0, 3).map((appointment: Appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {appointment.appointmentType} Appointment
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                  <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>
                  View and manage your scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((appointment: Appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{appointment.appointmentType}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.appointmentDate).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {appointment.duration} minutes
                        </p>
                        {appointment.notes && (
                          <p className="text-sm mt-2">{appointment.notes}</p>
                        )}
                      </div>
                      <Badge variant={
                        appointment.status === 'confirmed' ? 'default' :
                        appointment.status === 'completed' ? 'secondary' :
                        appointment.status === 'cancelled' ? 'destructive' : 'outline'
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                    {appointment.meetingLink && appointment.status === 'confirmed' && (
                      <div className="mt-4">
                        <Button size="sm" asChild>
                          <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer">
                            Join Meeting
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {appointments.length === 0 && (
                  <p className="text-sm text-muted-foreground">No appointments found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>
                  Access your medical documents and reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((document: Document) => (
                  <div key={document.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{document.fileName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Type: {document.documentType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {new Date(document.uploadDate!).toLocaleDateString()}
                        </p>
                        {document.description && (
                          <p className="text-sm mt-2">{document.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {document.isConfidential && (
                          <Badge variant="outline">Confidential</Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {documents.length === 0 && (
                  <p className="text-sm text-muted-foreground">No documents available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Secure communication with your healthcare team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.map((message: Message) => (
                  <div key={message.id} className={`border rounded-lg p-4 ${!message.isRead ? 'bg-muted/50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{message.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(message.sentAt!).toLocaleString()}
                        </p>
                        <p className="text-sm mt-2">{message.content}</p>
                      </div>
                      {!message.isRead && (
                        <Badge>New</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-sm text-muted-foreground">No messages</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessments</CardTitle>
                <CardDescription>
                  Complete your psychological assessments and questionnaires
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessments.map((assessment: Assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{assessment.assessmentType}</h4>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(assessment.createdAt!).toLocaleDateString()}
                        </p>
                        {assessment.completedAt && (
                          <p className="text-sm text-muted-foreground">
                            Completed: {new Date(assessment.completedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          assessment.status === 'completed' ? 'default' :
                          assessment.status === 'in_progress' ? 'secondary' : 'outline'
                        }>
                          {assessment.status}
                        </Badge>
                        {assessment.status === 'pending' && (
                          <Button size="sm">
                            Start Assessment
                          </Button>
                        )}
                        {assessment.status === 'in_progress' && (
                          <Button size="sm">
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {assessments.length === 0 && (
                  <p className="text-sm text-muted-foreground">No assessments available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
                <CardDescription>
                  View your invoices and make secure payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {totalOutstanding > 0 && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-yellow-800">Outstanding Balance</h4>
                        <p className="text-yellow-700">
                          You have ${totalOutstanding.toFixed(2)} in unpaid invoices
                        </p>
                      </div>
                      <Button className="bg-primary text-white hover:bg-primary/90">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay All
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <h5 className="font-medium">Recent Invoices</h5>
                  {invoices.map((invoice: Invoice) => (
                    <div key={invoice.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Invoice #{invoice.invoiceNumber}</h4>
                          <p className="text-sm text-muted-foreground">
                            Service Date: {invoice.serviceDate ? 
                              new Date(invoice.serviceDate).toLocaleDateString() : 
                              'N/A'
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Due: {invoice.dueDate ? 
                              new Date(invoice.dueDate).toLocaleDateString() : 
                              'N/A'
                            }
                          </p>
                          {invoice.description && (
                            <p className="text-sm mt-2">{invoice.description}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              ${parseFloat(invoice.amount || '0').toFixed(2)}
                            </div>
                            <Badge variant={
                              invoice.status === 'paid' ? 'default' :
                              invoice.status === 'overdue' ? 'destructive' : 'secondary'
                            }>
                              {invoice.status}
                            </Badge>
                          </div>
                          {invoice.status === 'pending' && (
                            <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Pay Now
                            </Button>
                          )}
                          {invoice.status === 'paid' && (
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {invoices.length === 0 && (
                    <p className="text-sm text-muted-foreground">No invoices available</p>
                  )}
                </div>

                {invoices.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h5 className="font-medium mb-4">Payment Methods</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <div>
                              <h6 className="font-medium">Credit/Debit Card</h6>
                              <p className="text-sm text-muted-foreground">
                                Secure payment via Stripe
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <DollarSign className="w-6 h-6 text-primary" />
                            <div>
                              <h6 className="font-medium">Bank Transfer</h6>
                              <p className="text-sm text-muted-foreground">
                                Direct bank payment
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}