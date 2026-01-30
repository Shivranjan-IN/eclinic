import { useState } from 'react';
import { PatientDashboard } from './patient-portal/PatientDashboard';
import { AIHealthTools } from './patient-portal/AIHealthTools';
import { MedicineStore } from './patient-portal/MedicineStore';
import { PatientProfile } from './patient-portal/PatientProfile';
import { BookAppointment } from './patient-portal/BookAppointment';
import { MyPrescriptions } from './patient-portal/MyPrescriptions';
import { MyReports } from './patient-portal/MyReports';
import { MyBilling } from './patient-portal/MyBilling';
import { PatientHeader } from './patient-portal/PatientHeader';
import { PatientSidebar } from './patient-portal/PatientSidebar';
import { MyAppointments } from './patient-portal/MyAppointments';
import { VideoConsultation } from './patient-portal/VideoConsultation';
import type { User } from '../App';

export type PatientPage =
  | 'dashboard'
  | 'ai-tools'
  | 'medicine-store'
  | 'profile'
  | 'book-appointment'
  | 'appointments'
  | 'video-consultation'
  | 'prescriptions'
  | 'reports'
  | 'billing';

export interface PatientUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  abhaId?: string;
}

interface PatientPortalProps {
  user: User;
  onLogout?: () => void;
}

export function PatientPortal({ user, onLogout }: PatientPortalProps) {
  const [currentPage, setCurrentPage] = useState<PatientPage>('dashboard');

  // Convert User to PatientUser
  const currentPatient: PatientUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    phone: '', // Default or fetch from somewhere else later
    abhaId: '' // Default
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <PatientDashboard patient={currentPatient} onNavigate={setCurrentPage} />;
      case 'ai-tools':
        return <AIHealthTools />;
      case 'medicine-store':
        return <MedicineStore />;
      case 'profile':
        return <PatientProfile patient={currentPatient} />;
      case 'book-appointment':
        return <BookAppointment patient={currentPatient} />;
      case 'appointments':
        return <MyAppointments patient={currentPatient} />;
      case 'video-consultation':
        return <VideoConsultation patient={currentPatient} />;
      case 'prescriptions':
        return <MyPrescriptions patient={currentPatient} />;
      case 'reports':
        return <MyReports patient={currentPatient} />;
      case 'billing':
        return <MyBilling patient={currentPatient} />;
      default:
        return <PatientDashboard patient={currentPatient} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PatientHeader patient={currentPatient} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}