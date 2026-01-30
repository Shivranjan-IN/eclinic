import { supabase } from '../lib/supabase';
// Patient Service - Mock implementation for frontend
// In production, this would connect to your backend API

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    contact: string;
    email: string;
    address: string;
    abha_id?: string;
    registration_date: string;
    last_visit?: string;
    total_visits: number;
}

class PatientService {
    async getPatients(): Promise<Patient[]> {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
        return data || [];
    }

    async getPatientById(id: string): Promise<Patient | null> {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching patient:', error);
            return null;
        }
        return data;
    }

    async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
        const { data, error } = await supabase
            .from('patients')
            .insert([patient])
            .select()
            .single();

        if (error) {
            console.error('Error creating patient:', error);
            throw error;
        }
        return data;
    }

    async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
        const { data, error } = await supabase
            .from('patients')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating patient:', error);
            throw error;
        }
        return data;
    }

    async deletePatient(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('patients')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting patient:', error);
            return false;
        }
        return true;
    }
}

export const patientService = new PatientService();
