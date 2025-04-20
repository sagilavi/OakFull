-- Drop existing tables if they exist (in correct order due to dependencies)
DROP TABLE IF EXISTS public.user_tech_interests;
DROP TABLE IF EXISTS public.family_connections;
DROP TABLE IF EXISTS public.documents;
DROP TABLE IF EXISTS public.tech_products;
DROP TABLE IF EXISTS public.schedules;
DROP TABLE IF EXISTS public.rights;
DROP TABLE IF EXISTS public.profiles;

-- Drop existing types if they exist
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS right_category;
DROP TYPE IF EXISTS event_type;
DROP TYPE IF EXISTS tech_category;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('elderly', 'relative', 'admin');
CREATE TYPE right_category AS ENUM ('healthcare', 'housing', 'financial', 'legal', 'social');
CREATE TYPE event_type AS ENUM ('appointment', 'meeting', 'reminder', 'task');
CREATE TYPE tech_category AS ENUM ('safety', 'health', 'home', 'communication');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'elderly',
  phone TEXT,
  address TEXT,
  emergency_contact JSONB,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create rights table
CREATE TABLE public.rights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category right_category NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create schedules table
CREATE TABLE public.schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  event_type event_type NOT NULL,
  location TEXT,
  participants JSONB,
  reminder_settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create tech_products table
CREATE TABLE public.tech_products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category tech_category NOT NULL,
  image_url TEXT,
  product_url TEXT,
  features JSONB,
  pricing JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_tech_interests table
CREATE TABLE public.user_tech_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.tech_products(id) ON DELETE CASCADE,
  interest_level INTEGER CHECK (interest_level BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  document_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create family_connections table
CREATE TABLE public.family_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  elderly_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  relative_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(elderly_id, relative_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tech_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_connections ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for rights (publicly readable)
CREATE POLICY "Rights are viewable by everyone"
  ON public.rights FOR SELECT
  USING (true);

-- Create policies for schedules
CREATE POLICY "Users can view their own schedules"
  ON public.schedules FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own schedules"
  ON public.schedules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own schedules"
  ON public.schedules FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own schedules"
  ON public.schedules FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for tech products (publicly readable)
CREATE POLICY "Tech products are viewable by everyone"
  ON public.tech_products FOR SELECT
  USING (true);

-- Create policies for user tech interests
CREATE POLICY "Users can view their own tech interests"
  ON public.user_tech_interests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own tech interests"
  ON public.user_tech_interests FOR ALL
  USING (auth.uid() = user_id);

-- Create policies for documents
CREATE POLICY "Users can view their own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own documents"
  ON public.documents FOR ALL
  USING (auth.uid() = user_id);

-- Create policies for family connections
CREATE POLICY "Users can view their family connections"
  ON public.family_connections FOR SELECT
  USING (auth.uid() = elderly_id OR auth.uid() = relative_id);

CREATE POLICY "Users can manage their family connections"
  ON public.family_connections FOR ALL
  USING (auth.uid() = elderly_id);

-- Create a trigger to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create a profile when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some initial rights data
INSERT INTO public.rights (title, description, category, content) VALUES
('Healthcare Rights', 'Your rights regarding healthcare services', 'healthcare', '{"sections": ["Access to healthcare", "Medical records", "Treatment decisions"]}'),
('Housing Rights', 'Your rights regarding housing and accommodation', 'housing', '{"sections": ["Tenant rights", "Housing benefits", "Home adaptations"]}'),
('Financial Rights', 'Your rights regarding financial matters', 'financial', '{"sections": ["Pensions", "Benefits", "Tax relief"]}'),
('Legal Rights', 'Your rights in legal matters', 'legal', '{"sections": ["Power of attorney", "Will and testament", "Legal aid"]}'),
('Social Rights', 'Your rights to social services and support', 'social', '{"sections": ["Social care", "Community support", "Transport concessions"]}');

-- Insert some initial tech products
INSERT INTO public.tech_products (name, description, category, image_url, product_url, features, pricing) VALUES
('Fall Detection Watch', 'Smart watch with fall detection and emergency alerts', 'safety', 'https://example.com/watch.jpg', 'https://example.com/watch', '{"features": ["Fall detection", "Emergency SOS", "Heart rate monitoring"]}', '{"monthly": 29.99, "annual": 299.99}'),
('Medication Reminder', 'Smart pill dispenser with reminders and tracking', 'health', 'https://example.com/pillbox.jpg', 'https://example.com/pillbox', '{"features": ["Automated dispensing", "Reminder alerts", "Dose tracking"]}', '{"one_time": 199.99}'),
('Smart Home Hub', 'Central control for home automation and security', 'home', 'https://example.com/hub.jpg', 'https://example.com/hub', '{"features": ["Voice control", "Security monitoring", "Energy management"]}', '{"monthly": 9.99, "hub_price": 149.99}'); 