import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import toast from 'react-hot-toast';
import DataTable from '../components/tables/DataTable';
import ImageUpload from '../components/common/ImageUpload';
import {
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface TravelPackage {
  id?: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  original_price?: number;
  duration_days?: number;
  destination: string;
  country?: string;
  category?: string;
  featured_image?: string;
  gallery?: any[];
  features?: any[];
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const TravelPackages: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);
  const [formData, setFormData] = useState<TravelPackage>({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    price: 0,
    destination: '',
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('travel_packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      toast.error('Error fetching packages');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const packageData = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        updated_at: new Date().toISOString(),
      };

      if (editingPackage?.id) {
        // Update existing package
        const { error } = await supabase
          .from('travel_packages')
          .update(packageData)
          .eq('id', editingPackage.id);

        if (error) throw error;
        toast.success('Package updated successfully!');
      } else {
        // Create new package
        const { error } = await supabase
          .from('travel_packages')
          .insert([packageData]);

        if (error) throw error;
        toast.success('Package created successfully!');
      }

      setShowModal(false);
      setEditingPackage(null);
      resetForm();
      fetchPackages();
    } catch (error) {
      toast.error('Error saving package');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: TravelPackage) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setShowModal(true);
  };

  const handleDelete = async (pkg: TravelPackage) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const { error } = await supabase
        .from('travel_packages')
        .delete()
        .eq('id', pkg.id);

      if (error) throw error;
      toast.success('Package deleted successfully!');
      fetchPackages();
    } catch (error) {
      toast.error('Error deleting package');
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      short_description: '',
      price: 0,
      destination: '',
      is_featured: false,
      is_active: true,
    });
  };

  const openNewModal = () => {
    setEditingPackage(null);
    resetForm();
    setShowModal(true);
  };

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
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
          <h1 className="text-2xl font-bold text-gray-900">Travel Packages</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your travel packages and tours
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Package
        </button>
      </div>

      <DataTable
        data={packages}
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
                {editingPackage ? 'Edit Package' : 'Add New Package'}
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
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                  <input
                    type="number"
                    value={formData.duration_days || ''}
                    onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
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
                  {editingPackage ? 'Update' : 'Create'} Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPackages;