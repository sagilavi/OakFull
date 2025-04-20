import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import Config from 'react-native-config';

// Initialize the Supabase client
export const supabase = createClient<Database>(
  Config.SUPABASE_URL!,
  Config.SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Auth functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Database['public']['Tables']['profiles']['Update']) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Rights functions
export const getRights = async (category?: Database['public']['Enums']['right_category']) => {
  let query = supabase.from('rights').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  return { data, error };
};

// Schedule functions
export const getSchedules = async (userId: string, startDate?: string, endDate?: string) => {
  let query = supabase
    .from('schedules')
    .select('*')
    .eq('user_id', userId);
  
  if (startDate) {
    query = query.gte('start_time', startDate);
  }
  if (endDate) {
    query = query.lte('start_time', endDate);
  }
  
  const { data, error } = await query;
  return { data, error };
};

export const createSchedule = async (schedule: Database['public']['Tables']['schedules']['Insert']) => {
  const { data, error } = await supabase
    .from('schedules')
    .insert(schedule)
    .select()
    .single();
  return { data, error };
};

// Tech products functions
export const getTechProducts = async (category?: Database['public']['Enums']['tech_category']) => {
  let query = supabase.from('tech_products').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  return { data, error };
};

export const updateTechInterest = async (userId: string, productId: string, interestLevel: number, notes?: string) => {
  const { data, error } = await supabase
    .from('user_tech_interests')
    .upsert({
      user_id: userId,
      product_id: productId,
      interest_level: interestLevel,
      notes,
    })
    .select()
    .single();
  return { data, error };
};

// Document functions
export const uploadDocument = async (userId: string, file: File, title: string, description?: string) => {
  // First upload the file to storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documents')
    .upload(fileName, file);
    
  if (uploadError) return { error: uploadError };

  // Then create the document record
  const { data: documentData, error: documentError } = await supabase
    .from('documents')
    .insert({
      user_id: userId,
      title,
      description,
      file_url: uploadData.path,
      document_type: fileExt || 'unknown',
      metadata: {
        size: file.size,
        type: file.type,
      },
    })
    .select()
    .single();

  return { data: documentData, error: documentError };
};

// Family connection functions
export const getFamilyConnections = async (userId: string) => {
  const { data, error } = await supabase
    .from('family_connections')
    .select(`
      *,
      elderly:profiles!family_connections_elderly_id_fkey(*),
      relative:profiles!family_connections_relative_id_fkey(*)
    `)
    .or(`elderly_id.eq.${userId},relative_id.eq.${userId}`);
  return { data, error };
};

export const createFamilyConnection = async (elderlyId: string, relativeId: string, relationshipType: string) => {
  const { data, error } = await supabase
    .from('family_connections')
    .insert({
      elderly_id: elderlyId,
      relative_id: relativeId,
      relationship_type: relationshipType,
      permissions: {
        can_view_schedule: true,
        can_edit_schedule: false,
        can_view_documents: true,
        can_upload_documents: false,
      },
    })
    .select()
    .single();
  return { data, error };
}; 