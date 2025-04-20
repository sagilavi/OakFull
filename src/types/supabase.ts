export type UserRole = 'elderly' | 'relative' | 'admin';
export type RightCategory = 'healthcare' | 'housing' | 'financial' | 'legal' | 'social';
export type EventType = 'appointment' | 'meeting' | 'reminder' | 'task';
export type TechCategory = 'safety' | 'health' | 'home' | 'communication';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  phone: string | null;
  address: string | null;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  } | null;
  preferences: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark';
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Right {
  id: string;
  title: string;
  description: string | null;
  category: RightCategory;
  content: {
    sections: string[];
    details?: Record<string, any>;
  };
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  event_type: EventType;
  location: string | null;
  participants: {
    ids: string[];
    names: string[];
  } | null;
  reminder_settings: {
    remind_before: number;
    notification_type: 'push' | 'email' | 'both';
  } | null;
  created_at: string;
  updated_at: string;
}

export interface TechProduct {
  id: string;
  name: string;
  description: string | null;
  category: TechCategory;
  image_url: string | null;
  product_url: string | null;
  features: {
    features: string[];
    specifications?: Record<string, any>;
  } | null;
  pricing: {
    monthly?: number;
    annual?: number;
    one_time?: number;
    hub_price?: number;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface UserTechInterest {
  id: string;
  user_id: string;
  product_id: string;
  interest_level: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  file_url: string;
  document_type: string;
  metadata: {
    size?: number;
    type?: string;
    uploaded_by?: string;
    tags?: string[];
  } | null;
  created_at: string;
  updated_at: string;
}

export interface FamilyConnection {
  id: string;
  elderly_id: string;
  relative_id: string;
  relationship_type: string;
  permissions: {
    can_view_schedule: boolean;
    can_edit_schedule: boolean;
    can_view_documents: boolean;
    can_upload_documents: boolean;
  } | null;
  created_at: string;
  updated_at: string;
}

// Database interface
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      rights: {
        Row: Right;
        Insert: Omit<Right, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Right, 'id' | 'created_at' | 'updated_at'>>;
      };
      schedules: {
        Row: Schedule;
        Insert: Omit<Schedule, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Schedule, 'id' | 'created_at' | 'updated_at'>>;
      };
      tech_products: {
        Row: TechProduct;
        Insert: Omit<TechProduct, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<TechProduct, 'id' | 'created_at' | 'updated_at'>>;
      };
      user_tech_interests: {
        Row: UserTechInterest;
        Insert: Omit<UserTechInterest, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserTechInterest, 'id' | 'created_at' | 'updated_at'>>;
      };
      documents: {
        Row: Document;
        Insert: Omit<Document, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Document, 'id' | 'created_at' | 'updated_at'>>;
      };
      family_connections: {
        Row: FamilyConnection;
        Insert: Omit<FamilyConnection, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FamilyConnection, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      user_role: UserRole;
      right_category: RightCategory;
      event_type: EventType;
      tech_category: TechCategory;
    };
  };
} 