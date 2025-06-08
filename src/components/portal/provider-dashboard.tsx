import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users,
  FileText, 
  MessageSquare, 
  LogOut,
  Bell,
  Clock,
  Download,
  Upload,
  CreditCard,
  DollarSign,
  Plus,
  Search,
  Calendar
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { User, Appointment, Document, Message, Assessment, Invoice } from "@shared/schema";

export default function ProviderDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data for all patients
  const { data: patients = [] } = useQuery({
    queryKey: ["/api/provider/patients"],
  });

  const { data: allAppointments = [] } = useQuery({
    queryKey: ["/api/provider/appointments"],
  });

  const { data: allMessages = [] } = useQuery({
    queryKey: ["/api/provider/messages"],
  });

  const { data: allInvoices = [] } = useQuery({
    queryKey: ["/api/provider/invoices"],
  });

  const handleLogout = async () => {
    await logout();
  };

  const todayAppointments = allAppointments.filter((apt: Appointment) => {
    const today = new Date().toDateString();
    return new Date(apt.appointmentDate).toDateString() === today;
  });

  const pendingInvoices = allInvoices.filter((invoice: Invoice) => 
    invoice.status === 'pending'
  );

  const unreadMessages = allMessages.filter((msg: Message) => !msg.isRead);

  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: async (invoiceData: any) => {
      return await apiRequest("POST", "/api/provider/invoices", invoiceData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/provider/invoices"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      return await apiRequest("POST", "/api/provider/messages", messageData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message sent successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/provider/messages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">Provider Portal</h1>
              <p className="text-lg text-muted-foreground">
                Welcome, Dr. {user?.firstName} {user?.lastName}
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="patients" className="text-xs md:text-sm">Patients</TabsTrigger>
            <TabsTrigger value="invoices" className="text-xs md:text-sm">Invoices</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs md:text-sm">Messages</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs md:text-sm">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">Scheduled for today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patients.length}</div>
                  <p className="text-xs text-muted-foreground">Active patients</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingInvoices.length}</div>
                  <p className="text-xs text-muted-foreground">Awaiting payment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{unreadMessages.length}</div>
                  <p className="text-xs text-muted-foreground">New messages</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayAppointments.map((appointment: Appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} - {appointment.appointmentType}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Patient ID: {appointment.patientId}
                      </p>
                    </div>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
                {todayAppointments.length === 0 && (
                  <p className="text-sm text-muted-foreground">No appointments scheduled for today</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>View and manage your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search patients..." className="flex-1" />
                  </div>
                  
                  <div className="space-y-3">
                    {patients.map((patient: User) => (
                      <div key={patient.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{patient.firstName} {patient.lastName}</h4>
                            <p className="text-sm text-muted-foreground">{patient.email}</p>
                            <p className="text-sm text-muted-foreground">{patient.phoneNumber}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {patients.length === 0 && (
                      <p className="text-sm text-muted-foreground">No patients found</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>Create and manage patient invoices</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allInvoices.map((invoice: Invoice) => (
                    <div key={invoice.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Invoice #{invoice.invoiceNumber}</h4>
                          <p className="text-sm text-muted-foreground">
                            Patient ID: {invoice.patientId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Amount: ${parseFloat(invoice.amount || '0').toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Due: {invoice.dueDate ? 
                              new Date(invoice.dueDate).toLocaleDateString() : 
                              'N/A'
                            }
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={
                            invoice.status === 'paid' ? 'default' :
                            invoice.status === 'overdue' ? 'destructive' : 'secondary'
                          }>
                            {invoice.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {allInvoices.length === 0 && (
                    <p className="text-sm text-muted-foreground">No invoices created</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Patient Messages</CardTitle>
                  <CardDescription>Communicate securely with patients</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allMessages.map((message: Message) => (
                    <div key={message.id} className={`border rounded-lg p-4 ${!message.isRead ? 'bg-muted/50' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{message.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            From Patient ID: {message.fromUserId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(message.sentAt!).toLocaleString()}
                          </p>
                          <p className="text-sm mt-2">{message.content}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!message.isRead && <Badge>New</Badge>}
                          <Button size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {allMessages.length === 0 && (
                    <p className="text-sm text-muted-foreground">No messages</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>Upload and manage patient documents</CardDescription>
                </div>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Document management interface would be implemented here with secure file upload and organization.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}