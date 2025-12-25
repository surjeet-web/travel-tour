# 🚀 Complete Admin Panel with Supabase Integration Guide

## Overview
This guide will walk you through creating a comprehensive admin panel for your travel and car rental website, connected to Supabase as the backend. The admin panel will allow you to manage all content dynamically without touching the code.

## 📋 Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Database Schema Design](#database-schema-design)
3. [Admin Panel Architecture](#admin-panel-architecture)
4. [Frontend Integration](#frontend-integration)
5. [Authentication & Security](#authentication--security)
6. [Content Management Features](#content-management-features)
7. [Deployment & Maintenance](#deployment--maintenance)

---

## 🗄️ **1. Supabase Setup**

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Login with GitHub
4. Click "New Project"
5. Choose your organization
6. Fill project details:
   - **Name**: `tourex-admin`
   - **Database Password**: Generate strong password
   - **Region**: Choose closest to your users
7. Click "Create new project"
8. Wait for setup completion (2-3 minutes)

### 1.2 Get Project Credentials
1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: `https://your-project.supabase.co`
   - **Project API Key (anon public)**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Project API Key (service_role)**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 1.3 Configure Environment Variables
Create `.env.local` file in your project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_KEY=your-service-key
```

---

## 🏗️ **2. Database Schema Design**

### 2.1 Core Tables Structure

Go to Supabase Dashboard → SQL Editor and run these commands:

#### **Site Settings Table**
```sql
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
```

#### **Travel Packages Table**
```sql
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

-- Create index for better performance
CREATE INDEX idx_travel_packages_slug ON travel_packages(slug);
CREATE INDEX idx_travel_packages_featured ON travel_packages(is_featured);
CREATE INDEX idx_travel_packages_active ON travel_packages(is_active);
```

#### **Car Rentals Table**
```sql
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

-- Create indexes
CREATE INDEX idx_car_rentals_slug ON car_rentals(slug);
CREATE INDEX idx_car_rentals_brand ON car_rentals(brand);
CREATE INDEX idx_car_rentals_featured ON car_rentals(is_featured);
CREATE INDEX idx_car_rentals_active ON car_rentals(is_active);
```

#### **Destinations Table**
```sql
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

CREATE INDEX idx_destinations_featured ON destinations(is_featured);
CREATE INDEX idx_destinations_sort ON destinations(sort_order);
```

#### **Sliders/Banners Table**
```sql
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

CREATE INDEX idx_sliders_section ON sliders(section);
CREATE INDEX idx_sliders_sort ON sliders(sort_order);
```

#### **Footer Links Table**
```sql
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

CREATE INDEX idx_footer_links_category ON footer_links(category);
```

#### **Admin Users Table**
```sql
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
```

### 2.2 Enable Row Level Security (RLS)
```sql
-- Enable RLS on all tables
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
```

---

## 🏛️ **3. Admin Panel Architecture**

### 3.1 Project Structure
```
src/
├── admin/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Breadcrumb.tsx
│   │   ├── forms/
│   │   │   ├── TravelPackageForm.tsx
│   │   │   ├── CarRentalForm.tsx
│   │   │   ├── DestinationForm.tsx
│   │   │   ├── SliderForm.tsx
│   │   │   └── SettingsForm.tsx
│   │   ├── tables/
│   │   │   ├── DataTable.tsx
│   │   │   ├── TravelPackagesTable.tsx
│   │   │   ├── CarRentalsTable.tsx
│   │   │   └── DestinationsTable.tsx
│   │   └── common/
│   │       ├── ImageUpload.tsx
│   │       ├── RichTextEditor.tsx
│   │       ├── Modal.tsx
│   │       └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── TravelPackages.tsx
│   │   ├── CarRentals.tsx
│   │   ├── Destinations.tsx
│   │   ├── Sliders.tsx
│   │   ├── Settings.tsx
│   │   └── Login.tsx
│   ├── hooks/
│   │   ├── useSupabase.ts
│   │   ├── useAuth.ts
│   │   └── useImageUpload.ts
│   └── utils/
│       ├── supabase.ts
│       ├── validation.ts
│       └── helpers.ts
```

### 3.2 Install Required Dependencies
```bash
npm install @supabase/supabase-js
npm install react-hook-form @hookform/resolvers yup
npm install react-router-dom
npm install @tanstack/react-query
npm install react-hot-toast
npm install lucide-react # for icons
npm install @headlessui/react # for modals and dropdowns
npm install @tailwindcss/forms # for better form styling
npm install react-quill # for rich text editor
npm install react-dropzone # for file uploads
```

---

## 🔐 **4. Authentication & Security**

### 4.1 Setup Supabase Auth
1. Go to Supabase Dashboard → Authentication → Settings
2. Configure Site URL: `http://localhost:5173` (development)
3. Add production URL when deploying
4. Enable email confirmation if needed
5. Configure email templates

### 4.2 Create Auth Hook
Create `src/admin/hooks/useAuth.ts`:
```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signIn,
    signOut,
  };
};
```

### 4.3 Protected Route Component
Create `src/admin/components/ProtectedRoute.tsx`:
```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

---

## 📝 **5. Content Management Features**

### 5.1 Travel Packages Management

#### Create Travel Package Form Component
```typescript
// src/admin/components/forms/TravelPackageForm.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../../utils/supabase';
import ImageUpload from '../common/ImageUpload';
import RichTextEditor from '../common/RichTextEditor';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  destination: yup.string().required('Destination is required'),
  duration_days: yup.number().positive('Duration must be positive'),
  description: yup.string().required('Description is required'),
});

interface TravelPackageFormProps {
  packageData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const TravelPackageForm: React.FC<TravelPackageFormProps> = ({
  packageData,
  onSuccess,
  onCancel,
}) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: packageData || {},
  });

  const onSubmit = async (data: any) => {
    try {
      const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      const packagePayload = {
        ...data,
        slug,
        updated_at: new Date().toISOString(),
      };

      if (packageData?.id) {
        // Update existing package
        const { error } = await supabase
          .from('travel_packages')
          .update(packagePayload)
          .eq('id', packageData.id);
        
        if (error) throw error;
      } else {
        // Create new package
        const { error } = await supabase
          .from('travel_packages')
          .insert([packagePayload]);
        
        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <input
            {...register('destination')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            {...register('price')}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
          <input
            {...register('duration_days')}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Featured Image</label>
        <ImageUpload
          value={watch('featured_image')}
          onChange={(url) => setValue('featured_image', url)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <RichTextEditor
          value={watch('description')}
          onChange={(content) => setValue('description', content)}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {packageData?.id ? 'Update' : 'Create'} Package
        </button>
      </div>
    </form>
  );
};

export default TravelPackageForm;
```

### 5.2 Image Upload Component
```typescript
// src/admin/components/common/ImageUpload.tsx
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../utils/supabase';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  bucket = 'images',
}) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        uploadImage(acceptedFiles[0]);
      }
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="text-blue-600">Uploading...</div>
        ) : (
          <div>
            <p className="text-gray-600">
              {isDragActive
                ? 'Drop the image here...'
                : 'Drag & drop an image here, or click to select'}
            </p>
          </div>
        )}
      </div>

      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="max-w-xs h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
```

### 5.3 Data Table Component
```typescript
// src/admin/components/tables/DataTable.tsx
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  loading?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
```

---

## 🎛️ **6. Frontend Integration**

### 6.1 Create Supabase Hook for Frontend
```typescript
// src/hooks/useSupabaseData.ts
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useSupabaseData = (table: string, options?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select('*');

        // Apply filters if provided
        if (options?.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Apply ordering
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending ?? true 
          });
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error } = await query;

        if (error) throw error;

        setData(result || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, JSON.stringify(options)]);

  return { data, loading, error, refetch: () => fetchData() };
};

// Specific hooks for different data types
export const useTravelPackages = (options?: any) => {
  return useSupabaseData('travel_packages', {
    filters: { is_active: true },
    orderBy: { column: 'created_at', ascending: false },
    ...options,
  });
};

export const useCarRentals = (options?: any) => {
  return useSupabaseData('car_rentals', {
    filters: { is_active: true },
    orderBy: { column: 'created_at', ascending: false },
    ...options,
  });
};

export const useDestinations = (options?: any) => {
  return useSupabaseData('destinations', {
    filters: { is_active: true },
    orderBy: { column: 'sort_order', ascending: true },
    ...options,
  });
};

export const useSliders = (section: string) => {
  return useSupabaseData('sliders', {
    filters: { is_active: true, section },
    orderBy: { column: 'sort_order', ascending: true },
  });
};

export const useSiteSettings = () => {
  return useSupabaseData('site_settings');
};
```

### 6.2 Update Your Components to Use Supabase Data

#### Update Travel Package Listing Component
```typescript
// src/components/homes/home-one/Listing.tsx
import { useTravelPackages } from '../../../hooks/useSupabaseData';
import SkeletonLoader from '../../common/skeleton/SkeletonLoader';

const Listing = () => {
  const { data: packages, loading, error } = useTravelPackages({
    filters: { is_featured: true },
    limit: 6,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonLoader key={index} type="card" height="300px" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading packages: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={pkg.featured_image || '/assets/img/placeholder.jpg'}
            alt={pkg.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
            <p className="text-gray-600 mb-4">{pkg.short_description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
              <span className="text-sm text-gray-500">{pkg.duration_days} days</span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;
```

#### Update Destinations Slider
```typescript
// src/components/common/DestinationSlider.tsx
import { useSliders } from '../../hooks/useSupabaseData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const DestinationSlider = () => {
  const { data: slides, loading } = useSliders('destinations');

  if (loading) {
    return <SkeletonLoader type="card" height="400px" />;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold">{slide.title}</h3>
                {slide.subtitle && (
                  <p className="text-sm opacity-90">{slide.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DestinationSlider;
```

---

## 🚀 **7. Deployment & Maintenance**

### 7.1 Environment Setup
Create different environment files:

**Development (.env.local):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_KEY=your-service-key
VITE_APP_ENV=development
```

**Production (.env.production):**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_KEY=your-service-key
VITE_APP_ENV=production
```

### 7.2 Build Scripts
Update your `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:admin": "tsc && vite build --mode admin",
    "preview": "vite preview",
    "deploy": "npm run build && netlify deploy --prod"
  }
}
```

### 7.3 Supabase Storage Setup
1. Go to Supabase Dashboard → Storage
2. Create a new bucket called `images`
3. Set it to public
4. Configure RLS policies:

```sql
-- Allow public read access to images
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'images' AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'images' AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'images' AND auth.role() = 'authenticated'
);
```

### 7.4 Admin Routes Setup
Update your main routing to include admin routes:

```typescript
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Public routes
import AppNavigation from './navigation/Navigation';

// Admin routes
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import AdminLayout from './admin/components/layout/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/*" element={<AppNavigation />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/packages" element={<TravelPackagesPage />} />
                    <Route path="/cars" element={<CarRentalsPage />} />
                    <Route path="/destinations" element={<DestinationsPage />} />
                    <Route path="/sliders" element={<SlidersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
```

---

## 📋 **8. Complete Feature Checklist**

### ✅ **Admin Panel Features:**
- [ ] Dashboard with analytics
- [ ] Travel packages CRUD
- [ ] Car rentals CRUD
- [ ] Destinations management
- [ ] Slider/banner management
- [ ] Site settings (logo, title, contact info)
- [ ] Footer links management
- [ ] Image upload with drag & drop
- [ ] Rich text editor for descriptions
- [ ] SEO meta tags management
- [ ] User authentication
- [ ] Role-based permissions

### ✅ **Frontend Integration:**
- [ ] Dynamic travel packages loading
- [ ] Dynamic car rentals loading
- [ ] Dynamic destinations slider
- [ ] Dynamic site settings
- [ ] Dynamic footer links
- [ ] SEO optimization with dynamic meta tags
- [ ] Loading states with skeleton loaders
- [ ] Error handling
- [ ] Image optimization
- [ ] Responsive design

### ✅ **Database Features:**
- [ ] Proper indexing for performance
- [ ] Row Level Security (RLS)
- [ ] Image storage with Supabase Storage
- [ ] Data validation
- [ ] Soft deletes (is_active flags)
- [ ] Timestamps for audit trail
- [ ] Slug generation for SEO-friendly URLs

---

## 🎯 **Next Steps**

1. **Start with Supabase setup** - Create project and database schema
2. **Build basic admin authentication** - Login/logout functionality
3. **Create one CRUD feature** - Start with travel packages
4. **Add image upload** - Implement file storage
5. **Build data tables** - Create reusable table components
6. **Integrate with frontend** - Connect existing components to Supabase
7. **Add remaining features** - Car rentals, destinations, sliders
8. **Test thoroughly** - Ensure all features work correctly
9. **Deploy** - Set up production environment
10. **Train users** - Create user documentation

This comprehensive guide gives you everything needed to build a full-featured admin panel with Supabase integration. Start with the basics and gradually add more features as needed!