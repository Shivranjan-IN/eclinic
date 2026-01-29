import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Heart,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Stethoscope,
  FileText,
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  Bell,
  Building2,
  Edit,
  Eye,
  Trash2,
  Plus,
  X,
  Send,
  Printer,
  Mail,
  Phone,
  MapPin,
  Star,
  Package,
  FlaskConical,
  Pill,
  Receipt,
  CreditCard,
  Shield,
  Lock,
  Key,
  Database,
  AlertCircle,
  CheckCircle,
  Brain,
  Mic,
  Volume2,
  Languages,
  Wifi,
  MessageCircle,
  Video,
  Smartphone,
  Target,
  Lightbulb,
  Sparkles,
  Zap,
  Award,
  FileCheck,
  ClipboardList,
  Repeat,
  MoreVertical,
  Globe,
  Camera,
  Headphones,
  PlayCircle,
  Archive,
  UserCheck,
  Droplet,
  Thermometer
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import type { User } from "../App";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ClinicDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ClinicDashboard({ user, onLogout }: ClinicDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  // Translations
  const translations = {
    en: {
      dashboard: "Dashboard",
      doctors: "Doctors",
      patients: "Patients",
      appointments: "Appointments",
      billing: "Billing",
      analytics: "Analytics",
      settings: "Settings",
      todayAppointments: "Today's Appointments",
      totalDoctors: "Total Doctors",
      totalPatients: "Total Patients",
      monthlyRevenue: "Monthly Revenue"
    },
    hi: {
      dashboard: "डैशबोर्ड",
      doctors: "डॉक्टर",
      patients: "रोगी",
      appointments: "अपॉइंटमेंट",
      billing: "बिलिंग",
      analytics: "विश्लेषण",
      settings: "सेटिंग्स",
      todayAppointments: "आज की अपॉइंटमेंट",
      totalDoctors: "कुल डॉक्टर",
      totalPatients: "कुल रोगी",
      monthlyRevenue: "मासिक राजस्व"
    }
  };

  const t = translations[language];

  // Mock Clinic Profile Data (from registration)
  const clinicProfile = {
    clinicName: "Kumar Multi-Specialty Hospital",
    legalEntity: "Private Limited",
    yearEstablished: "2010",
    clinicCategory: "Multi-Specialty Hospital",
    tagline: "Caring for your health with excellence",
    aboutClinic: "A leading multi-specialty hospital with state-of-the-art facilities and experienced doctors providing comprehensive healthcare services.",
    address: "123, MG Road, Koramangala",
    pincode: "560034",
    city: "Bangalore",
    state: "Karnataka",
    mobile: "+91 80 1234 5678",
    email: "info@kumarhospital.com",
    website: "www.kumarhospital.com",
    regNumber: "KA/BLR/2010/12345",
    gstNumber: "29ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    bankAccount: "XXXX XXXX 1234",
    ifscCode: "HDFC0001234",
    logo: "https://i.pravatar.cc/150?img=1",
    specializations: ["Cardiology", "Orthopedics", "Pediatrics", "Dermatology", "General Medicine"],
    services: ["General Checkup", "Blood Test", "ECG", "X-Ray", "Ultrasound", "Vaccination", "Emergency Care"],
    facilities: ["24/7 Emergency", "Pharmacy", "Laboratory", "Parking", "Wi-Fi", "Cafeteria", "Wheelchair Access"],
    paymentModes: ["Cash", "Card", "UPI", "Insurance"],
    languages: ["English", "Hindi", "Kannada"],
    workingHours: {
      weekdays: "8:00 AM - 8:00 PM",
      weekends: "9:00 AM - 6:00 PM",
      emergency: "24x7"
    },
    emergencyAvailable: true,
    onlineConsultation: true,
    consultationFee: "₹500",
    totalDoctors: 24,
    totalStaff: 85,
    totalBeds: 50,
    rating: 4.6,
    totalReviews: 856,
    verified: true
  };

  // Mock data
  const overviewStats = {
    totalDoctors: 24,
    totalPatients: 1248,
    todayAppointments: 86,
    completedToday: 58,
    pendingToday: 28,
    monthlyRevenue: 2450000,
    todayRevenue: 145000,
    revenueGrowth: 12.5,
    patientGrowth: 8.3,
    activeStaff: 78,
    avgWaitTime: 15,
    patientSatisfaction: 4.6
  };

  const revenueData = [
    { name: "Jan", revenue: 1850000, expenses: 980000 },
    { name: "Feb", revenue: 2100000, expenses: 1050000 },
    { name: "Mar", revenue: 1950000, expenses: 920000 },
    { name: "Apr", revenue: 2300000, expenses: 1100000 },
    { name: "May", revenue: 2200000, expenses: 1000000 },
    { name: "Jun", revenue: 2450000, expenses: 1150000 }
  ];

  const departmentRevenue = [
    { name: "Cardiology", value: 35, amount: 857500, color: "#ec4899", patients: 145 },
    { name: "Orthopedics", value: 25, amount: 612500, color: "#8b5cf6", patients: 98 },
    { name: "General", value: 20, amount: 490000, color: "#3b82f6", patients: 185 },
    { name: "Pediatrics", value: 12, amount: 294000, color: "#10b981", patients: 76 },
    { name: "Others", value: 8, amount: 196000, color: "#f59e0b", patients: 42 }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: "12 years",
      patients: 45,
      appointments: 12,
      revenue: 85000,
      rating: 4.8,
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=5",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      consultationFee: 800,
      mciNumber: "MCI/12345/2012",
      languages: ["English", "Hindi"],
      email: "priya.sharma@kumarhospital.com",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Orthopedic",
      qualification: "MBBS, MS (Orthopedics)",
      experience: "15 years",
      patients: 38,
      appointments: 10,
      revenue: 72000,
      rating: 4.6,
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=12",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      consultationFee: 900,
      mciNumber: "MCI/67890/2009",
      languages: ["English", "Hindi", "Tamil"],
      email: "rajesh.kumar@kumarhospital.com",
      phone: "+91 98765 43211"
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      specialty: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: "10 years",
      patients: 52,
      appointments: 15,
      revenue: 68000,
      rating: 4.9,
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=9",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      consultationFee: 700,
      mciNumber: "MCI/11223/2014",
      languages: ["English", "Hindi", "Gujarati"],
      email: "anita.desai@kumarhospital.com",
      phone: "+91 98765 43212"
    }
  ];

  const patients = [
    {
      id: 1,
      name: "Ramesh Patel",
      age: 45,
      gender: "Male",
      contact: "+91 98765 43210",
      email: "ramesh@email.com",
      bloodGroup: "O+",
      abhaId: "12-3456-7890-1234",
      address: "123, MG Road, Bangalore",
      registrationDate: "2024-01-15",
      lastVisit: "2025-01-10",
      totalVisits: 8,
      diagnosis: "Hypertension",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=33",
      insurance: {
        provider: "Star Health",
        policyNumber: "STAR/2024/12345",
        validUntil: "2025-12-31",
        coverageAmount: "₹5,00,000"
      }
    },
    {
      id: 2,
      name: "Anjali Verma",
      age: 32,
      gender: "Female",
      contact: "+91 98765 43211",
      email: "anjali@email.com",
      bloodGroup: "A+",
      abhaId: "12-3456-7890-5678",
      address: "456, Brigade Road, Bangalore",
      registrationDate: "2024-03-20",
      lastVisit: "2025-01-11",
      totalVisits: 3,
      diagnosis: "Migraine",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=45",
      insurance: {
        provider: "HDFC Ergo",
        policyNumber: "HDFC/2024/67890",
        validUntil: "2025-11-30",
        coverageAmount: "₹3,00,000"
      }
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      tokenNumber: "T001",
      patient: "Ramesh Patel",
      patientId: 1,
      doctor: "Dr. Priya Sharma",
      doctorId: 1,
      department: "Cardiology",
      time: "10:00 AM",
      type: "In-Person",
      status: "Completed",
      checkInTime: "09:55 AM",
      checkOutTime: "10:25 AM",
      fee: 800,
      paymentStatus: "Paid",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: 2,
      tokenNumber: "T002",
      patient: "Anjali Verma",
      patientId: 2,
      doctor: "Dr. Rajesh Kumar",
      doctorId: 2,
      department: "Orthopedics",
      time: "10:30 AM",
      type: "In-Person",
      status: "In Progress",
      checkInTime: "10:25 AM",
      checkOutTime: null,
      fee: 900,
      paymentStatus: "Pending",
      avatar: "https://i.pravatar.cc/150?img=45"
    },
    {
      id: 3,
      tokenNumber: "T003",
      patient: "Suresh Kumar",
      patientId: 3,
      doctor: "Dr. Anita Desai",
      doctorId: 3,
      department: "Pediatrics",
      time: "11:00 AM",
      type: "In-Person",
      status: "Waiting",
      checkInTime: "10:45 AM",
      checkOutTime: null,
      fee: 700,
      paymentStatus: "Pending",
      avatar: "https://i.pravatar.cc/150?img=51"
    },
    {
      id: 4,
      tokenNumber: "T004",
      patient: "Priya Sharma",
      patientId: 4,
      doctor: "Dr. Priya Sharma",
      doctorId: 1,
      department: "Cardiology",
      time: "11:30 AM",
      type: "Video",
      status: "Scheduled",
      checkInTime: null,
      checkOutTime: null,
      fee: 500,
      paymentStatus: "Paid",
      avatar: "https://i.pravatar.cc/150?img=26"
    }
  ];

  const patientQueue = todayAppointments.filter(apt => apt.status === "Waiting" || apt.status === "In Progress");

  const staff = [
    { id: 1, name: "Rekha Nair", role: "Receptionist", department: "Front Desk", status: "Active", email: "rekha@kumarhospital.com", phone: "+91 98765 00001" },
    { id: 2, name: "Amit Singh", role: "Nurse", department: "Cardiology", status: "Active", email: "amit@kumarhospital.com", phone: "+91 98765 00002" },
    { id: 3, name: "Neha Sharma", role: "Lab Technician", department: "Laboratory", status: "Active", email: "neha@kumarhospital.com", phone: "+91 98765 00003" },
    { id: 4, name: "Vijay Kumar", role: "Pharmacist", department: "Pharmacy", status: "Active", email: "vijay@kumarhospital.com", phone: "+91 98765 00004" }
  ];

  const medicineInventory = [
    { id: 1, name: "Paracetamol 500mg", quantity: 500, minStock: 100, price: 2.5, expiry: "2026-12-31", status: "In Stock", manufacturer: "Cipla" },
    { id: 2, name: "Amoxicillin 250mg", quantity: 45, minStock: 50, price: 12, expiry: "2026-08-15", status: "Low Stock", manufacturer: "Sun Pharma" },
    { id: 3, name: "Aspirin 75mg", quantity: 200, minStock: 100, price: 1.5, expiry: "2027-03-20", status: "In Stock", manufacturer: "Dr. Reddy's" },
    { id: 4, name: "Insulin Injection", quantity: 15, minStock: 30, price: 450, expiry: "2026-06-10", status: "Critical", manufacturer: "Novo Nordisk" }
  ];

  const labTests = [
    { id: 1, name: "Complete Blood Count", price: 500, category: "Blood Test", turnaroundTime: "24 hours" },
    { id: 2, name: "Lipid Profile", price: 800, category: "Blood Test", turnaroundTime: "24 hours" },
    { id: 3, name: "ECG", price: 300, category: "Cardiac", turnaroundTime: "Immediate" },
    { id: 4, name: "X-Ray Chest", price: 600, category: "Imaging", turnaroundTime: "2 hours" },
    { id: 5, name: "HbA1c", price: 450, category: "Blood Test", turnaroundTime: "24 hours" }
  ];

  const labOrders = [
    { id: 1, patient: "Ramesh Patel", test: "Complete Blood Count", orderDate: "2025-01-12", status: "Completed", result: "Normal" },
    { id: 2, patient: "Anjali Verma", test: "Lipid Profile", orderDate: "2025-01-12", status: "Processing", result: null },
    { id: 3, patient: "Suresh Kumar", test: "HbA1c", orderDate: "2025-01-11", status: "Pending", result: null }
  ];

  const billingTransactions = [
    { id: 1, invoiceNo: "INV-001", patient: "Ramesh Patel", date: "2025-01-12", items: ["Consultation - Dr. Priya Sharma"], amount: 800, tax: 144, total: 944, paymentMode: "UPI", status: "Paid" },
    { id: 2, invoiceNo: "INV-002", patient: "Anjali Verma", date: "2025-01-12", items: ["Consultation - Dr. Rajesh Kumar", "X-Ray"], amount: 1500, tax: 270, total: 1770, paymentMode: "Card", status: "Paid" },
    { id: 3, invoiceNo: "INV-003", patient: "Suresh Kumar", date: "2025-01-12", items: ["Consultation - Dr. Anita Desai", "Blood Test"], amount: 1200, tax: 216, total: 1416, paymentMode: "Cash", status: "Pending" }
  ];

  const notifications = [
    { id: 1, type: "appointment", message: "New appointment booked - Ramesh Patel", time: "5 mins ago", read: false, priority: "high" },
    { id: 2, type: "inventory", message: "Low stock alert: Amoxicillin 250mg", time: "30 mins ago", read: false, priority: "critical" },
    { id: 3, type: "payment", message: "Payment received - Invoice INV-002", time: "1 hour ago", read: true, priority: "medium" },
    { id: 4, type: "staff", message: "Dr. Priya Sharma marked leave for tomorrow", time: "2 hours ago", read: false, priority: "high" },
    { id: 5, type: "lab", message: "Lab report ready for Ramesh Patel", time: "3 hours ago", read: false, priority: "high" }
  ];

  const departments = [
    { id: 1, name: "Cardiology", head: "Dr. Priya Sharma", doctors: 5, patients: 145, rooms: 8, consultationFee: 800 },
    { id: 2, name: "Orthopedics", head: "Dr. Rajesh Kumar", doctors: 4, patients: 98, rooms: 6, consultationFee: 900 },
    { id: 3, name: "Pediatrics", head: "Dr. Anita Desai", doctors: 3, patients: 76, rooms: 5, consultationFee: 700 },
    { id: 4, name: "General Medicine", head: "Dr. Amit Verma", doctors: 6, patients: 185, rooms: 10, consultationFee: 500 }
  ];

  const aiInsights = {
    appointmentPrediction: {
      nextWeek: 520,
      trend: "increasing",
      peakDay: "Wednesday",
      peakHour: "11:00 AM"
    },
    patientFlow: {
      avgWaitTime: 15,
      suggestedStaffing: "Add 1 nurse in Cardiology",
      bottleneck: "Reception desk during 10-11 AM"
    },
    revenueForecasting: {
      nextMonth: 2680000,
      growth: 9.4,
      topDepartment: "Cardiology"
    }
  };

  const handleVoiceCommand = () => {
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
      alert("Voice command activated. Say your command...");
    } else {
      alert("Voice recognition not supported in your browser");
    }
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contact.includes(searchQuery) ||
    patient.abhaId.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-lg font-medium">{clinicProfile.clinicName}</span>
                  <p className="text-xs text-muted-foreground">{clinicProfile.city}</p>
                </div>
              </div>
              <nav className="hidden lg:flex gap-1">
                {[
                  { id: "dashboard", label: t.dashboard, icon: BarChart3 },
                  { id: "profile", label: "Profile", icon: Building2 },
                  { id: "doctors", label: t.doctors, icon: Stethoscope },
                  { id: "patients", label: t.patients, icon: Users },
                  { id: "appointments", label: t.appointments, icon: Calendar },
                  { id: "billing", label: t.billing, icon: Receipt }
                ].map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "secondary" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-sm"
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              >
                <Languages className="w-4 h-4 mr-2" />
                {language === "en" ? "हिंदी" : "English"}
              </Button>

              {/* Voice Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  handleTextToSpeech(voiceEnabled ? "Voice disabled" : "Voice enabled");
                }}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setActiveTab("notifications")}>
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </div>
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setActiveTab("settings")}>
                <Settings className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={clinicProfile.logo} alt={clinicProfile.clinicName} />
                  <AvatarFallback>{clinicProfile.clinicName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-2">{language === "en" ? "Welcome to" : "स्वागत है"} {clinicProfile.clinicName}</h1>
                <p className="text-muted-foreground">{language === "en" ? "Here's your clinic overview for today" : "आज के लिए आपके क्लिनिक का अवलोकन"}</p>
              </div>
              <div className="flex gap-2">
                {voiceEnabled && (
                  <Button onClick={handleVoiceCommand}>
                    <Mic className="w-4 h-4 mr-2" />
                    {language === "en" ? "Voice Command" : "आवाज कमांड"}
                  </Button>
                )}
                <Button onClick={() => setShowQueue(!showQueue)}>
                  <Users className="w-4 h-4 mr-2" />
                  Patient Queue ({patientQueue.length})
                </Button>
              </div>
            </div>

            {/* Verification Status */}
            {clinicProfile.verified && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">Clinic Verified</p>
                    <p className="text-sm text-green-700">Your clinic is verified and approved • Reg No: {clinicProfile.regNumber}</p>
                  </div>
                  <Badge className="bg-green-600">Active</Badge>
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.todayAppointments}</p>
                    <p className="text-3xl mt-1">{overviewStats.todayAppointments}</p>
                    <p className="text-sm mt-1">
                      <span className="text-green-600">{overviewStats.completedToday} completed</span>
                      <span className="text-muted-foreground"> • {overviewStats.pendingToday} pending</span>
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalDoctors}</p>
                    <p className="text-3xl mt-1">{overviewStats.totalDoctors}</p>
                    <p className="text-sm text-green-600 mt-1">{overviewStats.activeStaff} staff active</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalPatients}</p>
                    <p className="text-3xl mt-1">{overviewStats.totalPatients}</p>
                    <p className="text-sm text-green-600 mt-1">+{overviewStats.patientGrowth}% growth</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-3xl mt-1">₹{(overviewStats.todayRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground mt-1">Monthly: ₹{(overviewStats.monthlyRevenue / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Patient Queue Modal */}
            {showQueue && (
              <Card className="p-6 border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Current Patient Queue
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowQueue(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {patientQueue.map((apt) => (
                    <Card key={apt.id} className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge className="text-lg">{apt.tokenNumber}</Badge>
                          <Avatar>
                            <AvatarImage src={apt.avatar} alt={apt.patient} />
                            <AvatarFallback>{apt.patient.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{apt.patient}</p>
                            <p className="text-sm text-muted-foreground">{apt.doctor} • {apt.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Wait Time</p>
                            <p className="font-medium">{Math.floor(Math.random() * 20) + 5} mins</p>
                          </div>
                          <Badge className={apt.status === "In Progress" ? "bg-blue-600" : "bg-orange-600"}>
                            {apt.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* AI Insights */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl">AI Insights & Predictions</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-white">
                  <Sparkles className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Next Week Forecast</p>
                  <p className="text-2xl font-medium">{aiInsights.appointmentPrediction.nextWeek} appointments</p>
                  <p className="text-sm text-green-600 mt-1">Peak: {aiInsights.appointmentPrediction.peakDay} at {aiInsights.appointmentPrediction.peakHour}</p>
                </Card>
                <Card className="p-4 bg-white">
                  <Target className="w-5 h-5 text-orange-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Optimization Tip</p>
                  <p className="text-sm font-medium mt-1">{aiInsights.patientFlow.suggestedStaffing}</p>
                  <p className="text-sm text-orange-600 mt-1">Bottleneck: {aiInsights.patientFlow.bottleneck}</p>
                </Card>
                <Card className="p-4 bg-white">
                  <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Revenue Forecast</p>
                  <p className="text-2xl font-medium">₹{(aiInsights.revenueForecasting.nextMonth / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-green-600 mt-1">+{aiInsights.revenueForecasting.growth}% growth predicted</p>
                </Card>
              </div>
            </Card>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Revenue & Expenses Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Department Revenue Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentRevenue}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Today's Appointments */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">{t.todayAppointments}</h2>
                <div className="flex gap-2">
                  <Badge>{todayAppointments.length} appointments</Badge>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <Card key={apt.id} className="p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge className="text-lg">{apt.tokenNumber}</Badge>
                        <Avatar>
                          <AvatarImage src={apt.avatar} alt={apt.patient} />
                          <AvatarFallback>{apt.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{apt.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {apt.doctor} • {apt.department} • {apt.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium">₹{apt.fee}</p>
                          <Badge variant={apt.paymentStatus === "Paid" ? "default" : "secondary"} className="text-xs">
                            {apt.paymentStatus}
                          </Badge>
                        </div>
                        <Badge className={
                          apt.status === "Completed" ? "bg-green-600" :
                          apt.status === "In Progress" ? "bg-blue-600" :
                          apt.status === "Waiting" ? "bg-orange-600" :
                          "bg-gray-600"
                        }>
                          {apt.status}
                        </Badge>
                        {apt.type === "Video" && (
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("pharmacy")}>
                <Pill className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-sm text-muted-foreground">Pharmacy</p>
                <p className="text-2xl">{medicineInventory.length}</p>
                <p className="text-sm text-orange-600 mt-1">{medicineInventory.filter(m => m.status !== "In Stock").length} alerts</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("lab")}>
                <FlaskConical className="w-8 h-8 text-purple-600 mb-3" />
                <p className="text-sm text-muted-foreground">Lab Tests</p>
                <p className="text-2xl">{labTests.length}</p>
                <p className="text-sm text-blue-600 mt-1">{labOrders.filter(o => o.status === "Pending").length} pending</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("staff")}>
                <UserCheck className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-sm text-muted-foreground">Staff</p>
                <p className="text-2xl">{staff.length}</p>
                <p className="text-sm text-green-600 mt-1">All active</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("departments")}>
                <Building2 className="w-8 h-8 text-orange-600 mb-3" />
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl">{departments.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Active departments</p>
              </Card>
            </div>
          </div>
        )}

        {/* Continue in the next component file due to size... */}

        {/* Profile Tab - Using ClinicDashboardTabs */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Clinic Profile</h2>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Logo and Quick Info */}
                <div className="space-y-4">
                  <Card className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={clinicProfile.logo} alt={clinicProfile.clinicName} />
                        <AvatarFallback>{clinicProfile.clinicName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button size="sm" className="absolute bottom-0 right-0 rounded-full" variant="outline">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="text-xl mb-1">{clinicProfile.clinicName}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{clinicProfile.tagline}</p>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(clinicProfile.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm">{clinicProfile.rating} ({clinicProfile.totalReviews} reviews)</span>
                    </div>

                    {clinicProfile.verified && (
                      <Badge className="bg-green-600 mb-4">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified Clinic
                      </Badge>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <Card className="p-3 bg-blue-50">
                        <p className="text-2xl text-blue-600">{clinicProfile.totalDoctors}</p>
                        <p className="text-xs text-muted-foreground">Doctors</p>
                      </Card>
                      <Card className="p-3 bg-green-50">
                        <p className="text-2xl text-green-600">{clinicProfile.totalStaff}</p>
                        <p className="text-xs text-muted-foreground">Staff</p>
                      </Card>
                      <Card className="p-3 bg-purple-50">
                        <p className="text-2xl text-purple-600">{clinicProfile.totalBeds}</p>
                        <p className="text-xs text-muted-foreground">Beds</p>
                      </Card>
                      <Card className="p-3 bg-orange-50">
                        <p className="text-2xl text-orange-600">24x7</p>
                        <p className="text-xs text-muted-foreground">Emergency</p>
                      </Card>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="mb-3">Working Hours</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekdays:</span>
                        <span className="font-medium">{clinicProfile.workingHours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekends:</span>
                        <span className="font-medium">{clinicProfile.workingHours.weekends}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Emergency:</span>
                        <span className="font-medium text-green-600">{clinicProfile.workingHours.emergency}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Column - Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <Card className="p-6">
                    <h3 className="mb-4">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Clinic Name</Label>
                        <p className="font-medium">{clinicProfile.clinicName}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Legal Entity</Label>
                        <p className="font-medium">{clinicProfile.legalEntity}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Year Established</Label>
                        <p className="font-medium">{clinicProfile.yearEstablished}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Category</Label>
                        <p className="font-medium">{clinicProfile.clinicCategory}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-muted-foreground">About</Label>
                        <p className="text-sm mt-1">{clinicProfile.aboutClinic}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Contact & Location */}
                  <Card className="p-6">
                    <h3 className="mb-4">Contact & Location</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Address</Label>
                        <p className="font-medium flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          {clinicProfile.address}, {clinicProfile.city}, {clinicProfile.state} - {clinicProfile.pincode}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Contact</Label>
                        <p className="font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {clinicProfile.mobile}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {clinicProfile.email}
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Website</Label>
                        <p className="font-medium flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          {clinicProfile.website}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Registration & Legal */}
                  <Card className="p-6">
                    <h3 className="mb-4">Registration & Legal Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Registration Number</Label>
                        <p className="font-medium">{clinicProfile.regNumber}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">GST Number</Label>
                        <p className="font-medium">{clinicProfile.gstNumber}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">PAN Number</Label>
                        <p className="font-medium">{clinicProfile.panNumber}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Bank Account</Label>
                        <p className="font-medium">{clinicProfile.bankAccount}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-muted-foreground">IFSC Code</Label>
                        <p className="font-medium">{clinicProfile.ifscCode}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Specializations & Services */}
                  <Card className="p-6">
                    <h3 className="mb-4">Specializations & Services</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Specializations</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clinicProfile.specializations.map((spec, idx) => (
                            <Badge key={idx} variant="secondary">{spec}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Services Offered</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clinicProfile.services.map((service, idx) => (
                            <Badge key={idx} className="bg-blue-100 text-blue-700">{service}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Facilities</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clinicProfile.facilities.map((facility, idx) => (
                            <Badge key={idx} className="bg-green-100 text-green-700">{facility}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Payment Modes</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clinicProfile.paymentModes.map((mode, idx) => (
                            <Badge key={idx} variant="outline">{mode}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Languages Supported</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clinicProfile.languages.map((lang, idx) => (
                            <Badge key={idx} variant="outline">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Consultation Fees */}
                  <Card className="p-6">
                    <h3 className="mb-4">Consultation Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Base Consultation Fee</Label>
                        <p className="font-medium text-2xl">{clinicProfile.consultationFee}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Online Consultation Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">24x7 Emergency Services</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}