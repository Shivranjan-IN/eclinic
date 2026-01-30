import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Upload,
  Calendar,
  User,
  Activity,
  Brain,
  Volume2,
  Languages,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { PatientUser } from '../PatientPortal';

interface MyReportsProps {
  patient: PatientUser;
}

const reports = [
  {
    id: 'REP-2026-001',
    type: 'Lab Test',
    name: 'Complete Blood Count (CBC)',
    date: 'Jan 20, 2026',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'Available',
    category: 'Blood Test',
    fileSize: '2.3 MB'
  },
  {
    id: 'REP-2026-002',
    type: 'Imaging',
    name: 'Chest X-Ray',
    date: 'Jan 18, 2026',
    orderedBy: 'Dr. Rajesh Kumar',
    status: 'Available',
    category: 'Radiology',
    fileSize: '5.7 MB'
  },
  {
    id: 'REP-2025-089',
    type: 'Lab Test',
    name: 'Lipid Profile',
    date: 'Dec 15, 2025',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'Available',
    category: 'Blood Test',
    fileSize: '1.8 MB'
  },
  {
    id: 'REP-2025-076',
    type: 'Lab Test',
    name: 'HbA1c Test',
    date: 'Nov 28, 2025',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'Available',
    category: 'Blood Test',
    fileSize: '1.5 MB'
  },
  {
    id: 'REP-2025-065',
    type: 'Imaging',
    name: 'ECG Report',
    date: 'Nov 10, 2025',
    orderedBy: 'Dr. Sarah Johnson',
    status: 'Available',
    category: 'Cardiology',
    fileSize: '3.2 MB'
  }
];

export function MyReports({ patient }: MyReportsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAIExplanation, setShowAIExplanation] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleAIExplanation = (id: string) => {
    setShowAIExplanation(showAIExplanation === id ? null : id);
  };

  const filteredReports = reports.filter(report =>
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">Medical Reports</h1>
          <p className="text-sm text-gray-600">Upload, view, and get AI-powered explanations of your medical reports</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="size-4 mr-2" />
          Upload New Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="font-semibold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lab Tests</p>
                <p className="font-semibold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Imaging</p>
                <p className="font-semibold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="size-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="font-semibold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50">
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="size-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">Upload Medical Report</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get instant AI-powered explanations in English or Hindi
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="size-4 mr-2" />
              Choose File to Upload
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Supports: PDF, JPG, PNG, DICOM (Max 10MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by report ID, name, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="lab">Lab Tests</SelectItem>
            <SelectItem value="imaging">Imaging</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <Badge className="bg-green-600">{report.status}</Badge>
                    <Badge variant="outline">{report.category}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="size-4" />
                      {report.id}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="size-4" />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="size-4" />
                      {report.orderedBy}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Activity className="size-4" />
                      {report.fileSize}
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
                    onClick={() => toggleExpand(report.id)}
                  >
                    <Eye className="size-4 mr-2" />
                    {expandedId === report.id ? 'Hide' : 'View'}
                    {expandedId === report.id ? (
                      <ChevronUp className="size-4 ml-2" />
                    ) : (
                      <ChevronDown className="size-4 ml-2" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedId === report.id && (
                <div className="pt-4 border-t space-y-4">
                  {/* Report Preview */}
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Report Preview</h4>
                    
                    {report.name === 'Complete Blood Count (CBC)' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div className="font-medium text-gray-600">Parameter</div>
                          <div className="font-medium text-gray-600">Value</div>
                          <div className="font-medium text-gray-600">Normal Range</div>
                          <div className="font-medium text-gray-600">Status</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm py-2 border-t">
                          <div>Hemoglobin</div>
                          <div className="font-medium">14.2 g/dL</div>
                          <div className="text-gray-600">13.0 - 17.0</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 w-fit">Normal</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm py-2 border-t">
                          <div>WBC Count</div>
                          <div className="font-medium">7,800 /μL</div>
                          <div className="text-gray-600">4,000 - 11,000</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 w-fit">Normal</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm py-2 border-t">
                          <div>Platelet Count</div>
                          <div className="font-medium">250,000 /μL</div>
                          <div className="text-gray-600">150,000 - 450,000</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 w-fit">Normal</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm py-2 border-t">
                          <div>RBC Count</div>
                          <div className="font-medium">5.2 million/μL</div>
                          <div className="text-gray-600">4.5 - 5.9</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 w-fit">Normal</Badge>
                        </div>
                      </div>
                    )}

                    {report.name !== 'Complete Blood Count (CBC)' && (
                      <div className="text-center py-8">
                        <FileText className="size-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">Report preview will appear here</p>
                      </div>
                    )}
                  </div>

                  {/* AI Explanation */}
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAIExplanation(report.id)}
                      className="mb-3"
                    >
                      <Brain className="size-4 mr-2" />
                      {showAIExplanation === report.id ? 'Hide' : 'Get'} AI Explanation
                    </Button>

                    {showAIExplanation === report.id && (
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
                                  <h5 className="font-medium text-gray-900 mb-2">Overall Assessment</h5>
                                  <p className="text-sm text-gray-700">
                                    {report.name === 'Complete Blood Count (CBC)' && 
                                      'Your Complete Blood Count (CBC) results are all within normal ranges. This indicates that your blood cells are healthy and functioning properly. Your hemoglobin levels show good oxygen-carrying capacity, and your white blood cell count indicates a healthy immune system.'}
                                    {report.name === 'Lipid Profile' && 
                                      'Your lipid profile shows your cholesterol levels. Maintaining healthy cholesterol levels is important for heart health and reducing the risk of cardiovascular diseases.'}
                                    {report.name === 'Chest X-Ray' && 
                                      'Your chest X-ray shows the condition of your lungs, heart, and chest wall. This imaging helps identify any abnormalities or conditions affecting your respiratory system.'}
                                  </p>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">What This Means for You</h5>
                                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                                    <li>All your blood parameters are within the healthy range</li>
                                    <li>No immediate concerns or abnormalities detected</li>
                                    <li>Continue maintaining a healthy lifestyle and diet</li>
                                    <li>Regular monitoring as advised by your doctor is recommended</li>
                                  </ul>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">Next Steps</h5>
                                  <p className="text-sm text-gray-700">
                                    Discuss these results with your doctor during your next appointment. They may provide specific recommendations based on your overall health condition and medical history.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">समग्र मूल्यांकन</h5>
                                  <p className="text-sm text-gray-700">
                                    {report.name === 'Complete Blood Count (CBC)' && 
                                      'आपके रक्त परीक्षण (CBC) के सभी परिणाम सामान्य सीमा में हैं। यह दर्शाता है कि आपकी रक्त कोशिकाएं स्वस्थ हैं और ठीक से काम कर रही हैं। आपके हीमोग्लोबिन स्तर अच्छी ऑक्सीजन ले जाने की क्षमता दिखाते हैं, और आपकी श्वेत रक्त कोशिका गिनती एक स्वस्थ प्रतिरक्षा प्रणाली को दर्शाती है।'}
                                  </p>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">यह आपके लिए क्या मायने रखता है</h5>
                                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                                    <li>आपके सभी रक्त पैरामीटर स्वस्थ सीमा के भीतर हैं</li>
                                    <li>कोई तत्काल चिंता या असामान्यता नहीं पाई गई</li>
                                    <li>स्वस्थ जीवनशैली और आहार बनाए रखना जारी रखें</li>
                                    <li>आपके डॉक्टर द्वारा सलाह के अनुसार नियमित निगरानी की सिफारिश की जाती है</li>
                                  </ul>
                                </div>

                                <div className="p-4 bg-white rounded-lg">
                                  <h5 className="font-medium text-gray-900 mb-2">अगले कदम</h5>
                                  <p className="text-sm text-gray-700">
                                    अपने अगली नियुक्ति के दौरान अपने डॉक्टर के साथ इन परिणामों पर चर्चा करें। वे आपकी समग्र स्वास्थ्य स्थिति और चिकित्सा इतिहास के आधार पर विशिष्ट सिफारिशें प्रदान कर सकते हैं।
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
                              <p className="text-xs text-amber-800">
                                ⚠️ This AI-generated explanation is for informational purposes only and should not replace professional medical advice. Always consult with your healthcare provider.
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent value="audio" className="mt-4">
                            <div className="p-8 bg-white rounded-lg text-center">
                              <Volume2 className="size-12 text-blue-600 mx-auto mb-4" />
                              <p className="text-sm text-gray-600 mb-4">
                                Listen to a comprehensive audio explanation of your report
                              </p>
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                <Volume2 className="size-4 mr-2" />
                                Play Audio Explanation ({selectedLanguage === 'en' ? 'English' : 'Hindi'})
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
