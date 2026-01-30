import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  Pill,
  Clock,
  Brain,
  Volume2,
  Languages,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { PatientUser } from '../PatientPortal';

interface MyPrescriptionsProps {
  patient: PatientUser;
}

const prescriptions = [
  {
    id: 'RX-2026-001',
    date: 'Jan 15, 2026',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    diagnosis: 'Hypertension Management',
    medicines: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', timing: 'Morning after breakfast' },
      { name: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily', duration: '30 days', timing: 'Morning & Evening' }
    ],
    instructions: 'Monitor blood pressure daily. Avoid excessive salt intake. Regular exercise recommended.',
    status: 'active'
  },
  {
    id: 'RX-2025-089',
    date: 'Dec 28, 2025',
    doctor: 'Dr. Rajesh Kumar',
    specialty: 'General Physician',
    diagnosis: 'Viral Fever',
    medicines: [
      { name: 'Paracetamol', dosage: '650mg', frequency: 'Thrice daily', duration: '5 days', timing: 'After meals' },
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '5 days', timing: 'At bedtime' }
    ],
    instructions: 'Rest adequately. Drink plenty of fluids. Complete the course even if symptoms improve.',
    status: 'completed'
  },
  {
    id: 'RX-2025-067',
    date: 'Nov 20, 2025',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    diagnosis: 'Type 2 Diabetes',
    medicines: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '90 days', timing: 'After lunch & dinner' }
    ],
    instructions: 'Follow diabetic diet plan. Monitor blood sugar levels regularly. Exercise for 30 minutes daily.',
    status: 'active'
  }
];

export function MyPrescriptions({ patient }: MyPrescriptionsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAIExplanation, setShowAIExplanation] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = prescriptions.filter(rx =>
    rx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleAIExplanation = (id: string) => {
    setShowAIExplanation(showAIExplanation === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">My Prescriptions</h1>
          <p className="text-sm text-gray-600">View, download, and get AI explanations of your prescriptions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Prescriptions</p>
                <p className="font-semibold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Pill className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Medications</p>
                <p className="font-semibold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Prescriptions</p>
                <p className="font-semibold text-gray-900">{prescriptions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by prescription ID, doctor, or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prescriptions</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((rx) => (
          <Card key={rx.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{rx.id}</h3>
                    <Badge className={rx.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                      {rx.status === 'active' ? 'Active' : 'Completed'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="size-4" />
                      {rx.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="size-4" />
                      {rx.doctor} ({rx.specialty})
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="size-4" />
                      {rx.diagnosis}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleExpand(rx.id)}
                  >
                    <Eye className="size-4 mr-2" />
                    {expandedId === rx.id ? 'Hide' : 'View'}
                    {expandedId === rx.id ? (
                      <ChevronUp className="size-4 ml-2" />
                    ) : (
                      <ChevronDown className="size-4 ml-2" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedId === rx.id && (
                <div className="pt-4 border-t space-y-4">
                  {/* Medicines */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Pill className="size-4" />
                      Prescribed Medicines
                    </h4>
                    <div className="space-y-2">
                      {rx.medicines.map((med, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 mb-1">{med.name}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Dosage:</span> {med.dosage}
                                </div>
                                <div>
                                  <span className="font-medium">Frequency:</span> {med.frequency}
                                </div>
                                <div>
                                  <span className="font-medium">Duration:</span> {med.duration}
                                </div>
                                <div>
                                  <span className="font-medium">Timing:</span> {med.timing}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Clock className="size-4" />
                      Special Instructions
                    </h4>
                    <p className="text-sm text-blue-800">{rx.instructions}</p>
                  </div>

                  {/* AI Explanation */}
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAIExplanation(rx.id)}
                      className="mb-3"
                    >
                      <Brain className="size-4 mr-2" />
                      {showAIExplanation === rx.id ? 'Hide' : 'Get'} AI Explanation
                    </Button>

                    {showAIExplanation === rx.id && (
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="size-5 text-purple-600" />
                          <h4 className="font-semibold text-gray-900">AI-Powered Explanation</h4>
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-[140px] h-8 ml-auto">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">
                                <div className="flex items-center gap-2">
                                  <Languages className="size-3" />
                                  English
                                </div>
                              </SelectItem>
                              <SelectItem value="hi">
                                <div className="flex items-center gap-2">
                                  <Languages className="size-3" />
                                  हिंदी
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Tabs defaultValue="explanation" className="w-full">
                          <TabsList>
                            <TabsTrigger value="explanation">Text Explanation</TabsTrigger>
                            <TabsTrigger value="audio">Audio Summary</TabsTrigger>
                          </TabsList>

                          <TabsContent value="explanation" className="space-y-4 mt-4">
                            {selectedLanguage === 'en' ? (
                              <div className="space-y-3">
                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">About Your Condition</h5>
                                  <p className="text-sm text-gray-700">
                                    {rx.diagnosis === 'Hypertension Management' && 
                                      'Hypertension (high blood pressure) is a condition where the force of blood against your artery walls is consistently too high. Managing it is crucial to prevent heart disease, stroke, and other complications.'}
                                    {rx.diagnosis === 'Viral Fever' && 
                                      'Viral fever is caused by viral infections and is characterized by high body temperature, headache, and body aches. It typically resolves on its own with rest and supportive care.'}
                                    {rx.diagnosis === 'Type 2 Diabetes' && 
                                      'Type 2 diabetes is a chronic condition affecting how your body processes blood sugar (glucose). Proper management through medication, diet, and exercise is essential to prevent complications.'}
                                  </p>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">How Your Medicines Work</h5>
                                  <ul className="space-y-2 text-sm text-gray-700">
                                    {rx.medicines.map((med, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span className="font-medium text-purple-600">•</span>
                                        <span>
                                          <strong>{med.name}:</strong> {
                                            med.name === 'Amlodipine' ? 'Helps relax blood vessels and improve blood flow, lowering blood pressure.' :
                                            med.name === 'Metoprolol' ? 'Reduces heart rate and the force of heart contractions, helping to lower blood pressure.' :
                                            med.name === 'Paracetamol' ? 'Reduces fever and relieves pain by affecting the areas of the brain that control temperature and pain.' :
                                            med.name === 'Cetirizine' ? 'An antihistamine that helps reduce symptoms like runny nose and sneezing.' :
                                            med.name === 'Metformin' ? 'Helps control blood sugar levels by improving insulin sensitivity and reducing glucose production in the liver.' :
                                            'Works to manage your condition effectively.'
                                          }
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">Important Reminders</h5>
                                  <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                                    <li>Take medicines at the same time every day for best results</li>
                                    <li>Don't skip doses even if you feel better</li>
                                    <li>Follow the dietary and lifestyle recommendations</li>
                                    <li>Contact your doctor if you experience any side effects</li>
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">आपकी स्थिति के बारे में</h5>
                                  <p className="text-sm text-gray-700">
                                    {rx.diagnosis === 'Hypertension Management' && 
                                      'उच्च रक्तचाप एक ऐसी स्थिति है जहां आपकी धमनियों की दीवारों पर रक्त का दबाव लगातार बहुत अधिक होता है। इसे नियंत्रित करना हृदय रोग और स्ट्रोक को रोकने के लिए महत्वपूर्ण है।'}
                                    {rx.diagnosis === 'Viral Fever' && 
                                      'वायरल बुखार वायरल संक्रमण के कारण होता है और इसमें तेज बुखार, सिरदर्द और शरीर में दर्द होता है। यह आमतौर पर आराम और सहायक देखभाल से ठीक हो जाता है।'}
                                    {rx.diagnosis === 'Type 2 Diabetes' && 
                                      'टाइप 2 मधुमेह एक पुरानी स्थिति है जो प्रभावित करती है कि आपका शरीर रक्त शर्करा को कैसे संसाधित करता है। जटिलताओं को रोकने के लिए दवा, आहार और व्यायाम के माध्यम से उचित प्रबंधन आवश्यक है।'}
                                  </p>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">आपकी दवाएं कैसे काम करती हैं</h5>
                                  <ul className="space-y-2 text-sm text-gray-700">
                                    {rx.medicines.map((med, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span className="font-medium text-purple-600">•</span>
                                        <span>
                                          <strong>{med.name}:</strong> {
                                            med.name === 'Amlodipine' ? 'रक्त वाहिकाओं को आराम देने और रक्त प्रवाह में सुधार करने में मदद करती है, रक्तचाप कम करती है।' :
                                            med.name === 'Metoprolol' ? 'हृदय गति और हृदय संकुचन की शक्ति को कम करती है, रक्तचाप कम करने में मदद करती है।' :
                                            med.name === 'Paracetamol' ? 'बुखार कम करती है और मस्तिष्क के उन क्षेत्रों को प्रभावित करके दर्द से राहत देती है जो तापमान और दर्द को नियंत्रित करते हैं।' :
                                            med.name === 'Cetirizine' ? 'एक एंटीहिस्टामाइन जो बहती नाक और छींक जैसे लक्षणों को कम करने में मदद करती है।' :
                                            med.name === 'Metformin' ? 'इंसुलिन संवेदनशीलता में सुधार और यकृत में ग्लूकोज उत्पादन को कम करके रक्त शर्करा के स्तर को नियंत्रित करने में मदद करती है।' :
                                            'आपकी स्थिति को प्रभावी ढंग से प्रबंधित करने के लिए काम करती है।'
                                          }
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">महत्वपूर्ण अनुस्मारक</h5>
                                  <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                                    <li>सर्वोत्तम परिणामों के लिए हर दिन एक ही समय पर दवाएं लें</li>
                                    <li>बेहतर महसूस करने पर भी खुराक न छोड़ें</li>
                                    <li>आहार और जीवनशैली की सिफारिशों का पालन करें</li>
                                    <li>किसी भी दुष्प्रभाव का अनुभव होने पर अपने डॉक्टर से संपर्क करें</li>
                                  </ul>
                                </div>
                              </div>
                            )}

                            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                              <p className="text-xs text-amber-800">
                                ⚠️ This AI-generated explanation is for informational purposes only. Always follow your doctor's advice and consult them if you have concerns.
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent value="audio" className="mt-4">
                            <div className="p-8 bg-white rounded-lg text-center">
                              <Volume2 className="size-12 text-blue-600 mx-auto mb-4" />
                              <p className="text-sm text-gray-600 mb-4">
                                Listen to a comprehensive audio summary of your prescription
                              </p>
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                <Volume2 className="size-4 mr-2" />
                                Play Audio Summary ({selectedLanguage === 'en' ? 'English' : 'Hindi'})
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
