import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import toast from 'react-hot-toast';
import DataTable from '../components/tables/DataTable';
import ImageUpload from '../components/common/ImageUpload';
import {
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface CarRental {
  id?: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  year?: number;
  description: string;
  short_description: string;
  price_per_day: number;
  original_price?: number;
  category?: string;
  fuel_type?: string;
  transmission?: string;
  seats?: number;
  doors?: number;
  luggage?: number;
  features?: unknown[];
  featured_image?: string;
  gallery?: unknown[];
  location?: string;
  availability?: unknown;
  rating?: number;
  review_count?: number;
  is_featured: boolean;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  created_at?: string;
  updated_at?: string;
}

const CarRentals: React.FC = () => {
  const [cars, setCars] = useState<CarRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<CarRental | null>(null);
  const [formData, setFormData] = useState<CarRental>({
    title: '',
    slug: '',
    brand: '',
    model: '',
    description: '',
    short_description: '',
    price_per_day: 0,
    is_featured: false,
    is_active: true,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('car_rentals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      toast.error('Error fetching cars');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const carData = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        updated_at: new Date().toISOString(),
      };

      if (editingCar?.id) {
        // Update existing car
        const { error } = await supabase
          .from('car_rentals')
          .update(carData)
          .eq('id', editingCar.id);

        if (error) throw error;
        toast.success('Car updated successfully!');
      } else {
        // Create new car
        const { error } = await supabase
          .from('car_rentals')
          .insert([carData]);

        if (error) throw error;
        toast.success('Car created successfully!');
      }

      setShowModal(false);
      setEditingCar(null);
      resetForm();
      fetchCars();
    } catch (error) {
      toast.error('Error saving car');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car: CarRental) => {
    setEditingCar(car);
    setFormData(car);
    setShowModal(true);
  };

  const handleDelete = async (car: CarRental) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    try {
      const { error } = await supabase
        .from('car_rentals')
        .delete()
        .eq('id', car.id);

      if (error) throw error;
      toast.success('Car deleted successfully!');
      fetchCars();
    } catch (error) {
      toast.error('Error deleting car');
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      brand: '',
      model: '',
      description: '',
      short_description: '',
      price_per_day: 0,
      is_featured: false,
      is_active: true,
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
    });
  };

  const openNewModal = () => {
    setEditingCar(null);
    resetForm();
    setShowModal(true);
  };

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'brand', label: 'Brand', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    { 
      key: 'price_per_day', 
      label: 'Price/Day', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'fuel_type', 
      label: 'Fuel Type',
      render: (value: string) => value || '-'
    },
    { 
      key: 'transmission', 
      label: 'Transmission',
      render: (value: string) => value || '-'
    },
    { 
      key: 'is_featured', 
      label: 'Featured',
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    },
    { 
      key: 'is_active', 
      label: 'Active',
      render: (value: boolean) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    },
  ];

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Car Rentals</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your car rental listings
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Car
        </button>
      </div>

      <DataTable
        data={cars}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model *</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || undefined })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price per day ($) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price_per_day}
                    onChange={(e) => setFormData({ ...formData, price_per_day: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.original_price || ''}
                    onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || undefined })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                  <select
                    value={formData.fuel_type || ''}
                    onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="">Select</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Transmission</label>
                  <select
                    value={formData.transmission || ''}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="">Select</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Seats</label>
                  <input
                    type="number"
                    value={formData.seats || ''}
                    onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || undefined })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Doors</label>
                  <input
                    type="number"
                    value={formData.doors || ''}
                    onChange={(e) => setFormData({ ...formData, doors: parseInt(e.target.value) || undefined })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Luggage</label>
                  <input
                    type="number"
                    value={formData.luggage || ''}
                    onChange={(e) => setFormData({ ...formData, luggage: parseInt(e.target.value) || undefined })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div className="pt-2 border-t">
                <h4 className="text-md font-semibold text-gray-800 mb-2">SEO Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <input
                      type="text"
                      value={formData.meta_title || ''}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="Title for search engines (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <textarea
                      rows={2}
                      value={formData.meta_description || ''}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="Description for search engines (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
                    <input
                      type="text"
                      value={formData.meta_keywords || ''}
                      onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="Comma-separated keywords (optional)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                <ImageUpload
                  value={formData.featured_image}
                  onChange={(url) => setFormData({ ...formData, featured_image: url })}
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {editingCar ? 'Update' : 'Create'} Car
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarRentals;
