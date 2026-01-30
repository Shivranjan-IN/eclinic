import { supabase } from '../lib/supabase';
import { User, UserRole } from '../App';

export async function getUserWithRole(): Promise<User | null> {
    // get auth user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // check role from public.users table
    let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    // if no record (likely Google login first time)
    if (error && error.code === 'PGRST116') {
        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                role: "patient", // default role
            })
            .select()
            .single();

        if (insertError) {
            console.error("Error creating user profile:", insertError);
            return null;
        }
        data = newUser;
    } else if (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }

    return {
        id: user.id,
        name: data.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        role: data.role as UserRole,
        avatar: data.avatar_url || user.user_metadata?.avatar_url,
    };
}

export interface ClinicRegistrationData {
    name: string;
    type: string;
    establishedYear?: number;
    tagline?: string;
    description?: string;
    address: string;
    pinCode: string;
    city: string;
    state: string;
    mobile: string;
    email: string;
    website?: string;
    medicalCouncilRegNo: string;
    bankDetails?: {
        accountName: string;
        accountNumber: string;
        ifsc: string;
        pan: string;
        gstin?: string;
    };
    services?: string[];
    facilities?: string[];
    paymentModes?: string[];
    bookingModes?: string[];
}

export interface DoctorRegistrationData {
    name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    mciReg: string;
    councilName: string;
    regYear: number;
    degrees: string;
    university: string;
    gradYear: number;
    experience: number;
    specializations: string[];
    languages: string[];
    clinicName?: string;
    clinicAddress?: string;
    inClinicFee?: number;
    onlineFee?: number;
    consultationModes: string[];
    conditionsTreated: string[];
    servicesOffered: string[];
    bankDetails?: {
        accountName: string;
        accountNumber: string;
        ifsc: string;
        pan: string;
        gstin?: string;
    };
    bio?: string;
}

class AuthService {
    // Sign in with email and password
    async signInWithEmail(email: string, password: string): Promise<User> {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        const userWithRole = await getUserWithRole();
        if (!userWithRole) throw new Error('Failed to fetch user profile');

        return userWithRole;
    }

    // Sign in with Google OAuth
    async signInWithGoogle(): Promise<void> {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) throw error;
    }

    // Sign out
    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    // Sign up a clinic
    async signUpClinic(data: ClinicRegistrationData, password: string): Promise<void> {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password,
            options: {
                data: {
                    full_name: data.name,
                    role: 'clinic'
                }
            }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Failed to create auth user');

        // Insert into public.users
        const { error: userError } = await supabase.from('users').insert({
            id: authData.user.id,
            email: data.email,
            full_name: data.name,
            role: 'clinic',
            phone: data.mobile
        });

        if (userError) throw userError;

        // Insert into public.clinics
        const { data: clinic, error: clinicError } = await supabase.from('clinics').insert({
            clinic_name: data.name,
            address: data.address,
            pin_code: data.pinCode,
            city: data.city,
            state: data.state,
            mobile: data.mobile,
            email: data.email,
            medical_council_reg_no: data.medicalCouncilRegNo,
            establishment_year: data.establishedYear,
            tagline: data.tagline,
            description: data.description,
            website: data.website,
            bank_account_name: data.bankDetails?.accountName,
            bank_account_number: data.bankDetails?.accountNumber,
            ifsc_code: data.bankDetails?.ifsc,
            pan_number: data.bankDetails?.pan,
            gstin: data.bankDetails?.gstin,
            verification_status: 'PENDING'
        }).select('id').single();

        if (clinicError) throw clinicError;

        // Insert related data
        if (data.services?.length) {
            await supabase.from('clinic_services').insert(
                data.services.map(s => ({ clinic_id: clinic.id, service_type: s }))
            );
        }
        if (data.facilities?.length) {
            await supabase.from('clinic_facilities').insert(
                data.facilities.map(f => ({ clinic_id: clinic.id, facility_name: f }))
            );
        }
        if (data.paymentModes?.length) {
            await supabase.from('clinic_payment_modes').insert(
                data.paymentModes.map(m => ({ clinic_id: clinic.id, payment_mode: m }))
            );
        }
    }

    // Sign up a doctor
    async signUpDoctor(data: DoctorRegistrationData, password: string): Promise<void> {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password,
            options: {
                data: {
                    full_name: data.name,
                    role: 'doctor'
                }
            }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Failed to create auth user');

        // Insert into public.users
        const { error: userError } = await supabase.from('users').insert({
            id: authData.user.id,
            email: data.email,
            full_name: data.name,
            role: 'doctor',
            phone: data.mobile
        });

        if (userError) throw userError;

        // Insert into public.doctors
        const { data: doctor, error: doctorError } = await supabase.from('doctors').insert({
            full_name: data.name,
            email: data.email,
            mobile: data.mobile,
            date_of_birth: data.dob,
            medical_council_reg_no: data.mciReg,
            medical_council_name: data.councilName,
            registration_year: data.regYear,
            qualifications: data.degrees,
            university_name: data.university,
            graduation_year: data.gradYear,
            experience_years: data.experience,
            bio: data.bio,
            bank_account_name: data.bankDetails?.accountName,
            bank_account_number: data.bankDetails?.accountNumber,
            ifsc_code: data.bankDetails?.ifsc,
            pan_number: data.bankDetails?.pan,
            gstin: data.bankDetails?.gstin,
            verification_status: 'PENDING'
        }).select('id').single();

        if (doctorError) throw doctorError;

        // Insert related data
        if (data.specializations?.length) {
            await supabase.from('doctor_specializations').insert(
                data.specializations.map(s => ({ doctor_id: doctor.id, specialization: s }))
            );
        }
        if (data.languages?.length) {
            await supabase.from('doctor_languages').insert(
                data.languages.map(l => ({ doctor_id: doctor.id, language: l }))
            );
        }
        if (data.consultationModes?.length) {
            await supabase.from('doctor_consultation_modes').insert(
                data.consultationModes.map(m => ({ doctor_id: doctor.id, mode: m }))
            );
        }
    }

    // Get current session
    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    }

    // Reset password
    async resetPassword(email: string): Promise<void> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
    }

    // Update password
    async updatePassword(newPassword: string): Promise<void> {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    }

    // Get user profile from database
    async getUserProfile(userId: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    }

    // Update user profile in database
    async updateUserProfile(userId: string, updates: any) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}

export const authService = new AuthService();
