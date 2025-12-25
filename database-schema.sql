-- ============================================
-- TRAVEL TOUR WEBSITE DATABASE SCHEMA
-- ============================================
-- Run this SQL in your Supabase SQL Editor

-- Site Settings Table
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text', -- text, image, json, boolean
  category VARCHAR(50) DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, type, category, description) VALUES
('site_title', 'Tourex - Premium Travel & Car Rental', 'text', 'general', 'Main site title'),
('site_logo', '/assets/img/logo.png', 'image', 'general', 'Site logo URL'),
('hero_title', 'Discover Amazing Destinations', 'text', 'homepage', 'Hero section title'),
('hero_subtitle', 'Book your perfect vacation today', 'text', 'homepage', 'Hero section subtitle'),
('contact_email', 'info@tourex.com', 'text', 'contact', 'Contact email'),
('contact_phone', '+1-234-567-8900', 'text', 'contact', 'Contact phone');

-- Travel Packages Table
CREATE TABLE travel_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  duration_days INTEGER,
  destination VARCHAR(255),
  country VARCHAR(100),
  category VARCHAR(100),
  featured_image TEXT,
  gallery JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  itinerary JSONB DEFAULT '[]',
  included JSONB DEFAULT '[]',
  excluded JSONB DEFAULT '[]',
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  max_people INTEGER,
  min_age INTEGER,
  difficulty_level VARCHAR(50),
  best_time VARCHAR(100),
  location_coordinates JSONB,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for travel_packages
CREATE INDEX idx_travel_packages_slug ON travel_packages(slug);
CREATE INDEX idx_travel_packages_featured ON travel_packages(is_featured);
CREATE INDEX idx_travel_packages_active ON travel_packages(is_active);

-- Car Rentals Table
CREATE TABLE car_rentals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER,
  description TEXT,
  short_description VARCHAR(500),
  price_per_day DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category VARCHAR(100), -- economy, luxury, suv, etc.
  fuel_type VARCHAR(50), -- petrol, diesel, electric, hybrid
  transmission VARCHAR(50), -- manual, automatic
  seats INTEGER,
  doors INTEGER,
  luggage INTEGER,
  features JSONB DEFAULT '[]',
  featured_image TEXT,
  gallery JSONB DEFAULT '[]',
  location VARCHAR(255),
  availability JSONB DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for car_rentals
CREATE INDEX idx_car_rentals_slug ON car_rentals(slug);
CREATE INDEX idx_car_rentals_brand ON car_rentals(brand);
CREATE INDEX idx_car_rentals_featured ON car_rentals(is_featured);
CREATE INDEX idx_car_rentals_active ON car_rentals(is_active);

-- Destinations Table
CREATE TABLE destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(100),
  description TEXT,
  short_description VARCHAR(500),
  featured_image TEXT,
  gallery JSONB DEFAULT '[]',
  coordinates JSONB,
  best_time_to_visit VARCHAR(200),
  popular_attractions JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for destinations
CREATE INDEX idx_destinations_featured ON destinations(is_featured);
CREATE INDEX idx_destinations_sort ON destinations(sort_order);

-- Sliders/Banners Table
CREATE TABLE sliders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),
  description TEXT,
  image_url TEXT NOT NULL,
  button_text VARCHAR(100),
  button_link VARCHAR(500),
  section VARCHAR(100) NOT NULL, -- hero, destinations, packages, etc.
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for sliders
CREATE INDEX idx_sliders_section ON sliders(section);
CREATE INDEX idx_sliders_sort ON sliders(sort_order);

-- Footer Links Table
CREATE TABLE footer_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL, -- company, services, support, etc.
  is_external BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for footer_links
CREATE INDEX idx_footer_links_category ON footer_links(category);

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- super_admin, admin, editor
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON travel_packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON car_rentals FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON destinations FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON sliders FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON footer_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- Admin policies (you'll need to customize based on your auth setup)
CREATE POLICY "Admin full access" ON travel_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON car_rentals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON destinations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON sliders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON footer_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON admin_users FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_travel_packages_updated_at BEFORE UPDATE ON travel_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_car_rentals_updated_at BEFORE UPDATE ON car_rentals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sliders_updated_at BEFORE UPDATE ON sliders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_footer_links_updated_at BEFORE UPDATE ON footer_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
