import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import toast from 'react-hot-toast';
import DataTable from '../components/tables/DataTable';
import ImageUpload from '../components/common/ImageUpload';
import {
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Slider {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url: string;
  button_text?: string;
  button_link?: string;
  section: string;
  is_active: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

const Sliders: React.FC = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [formData, setFormData] = useState<Slider>({
    title: '',
    image_url: '',
    section: 'hero',
    is_active: true,
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setSliders(data || []);
    } catch (error) {
      toast.error('Error fetching sliders');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sliderData = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (editingSlider?.id) {
        // Update existing slider
        const { error } = await supabase
          .from('sliders')
          .update(sliderData)
          .eq('id', editingSlider.id);

        if (error) throw error;
        toast.success('Slider updated successfully!');
      } else {
        // Create new slider
        const { error } = await supabase
          .from('sliders')
          .insert([sliderData]);

        if (error) throw error;
        toast.success('Slider created successfully!');
      }

      setShowModal(false);
      setEditingSlider(null);
      resetForm();
      fetchSliders();
    } catch (error) {
      toast.error('Error saving slider');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setFormData(slider);
    setShowModal(true);
  };

  const handleDelete = async (slider: Slider) => {
    if (!confirm('Are you sure you want to delete this slider?')) return;

    try {
      const { error } = await supabase
        .from('sliders')
        .delete()
        .eq('id', slider.id);

      if (error) throw error;
      toast.success('Slider deleted successfully!');
      fetchSliders();
    } catch (error) {
      toast.error('Error deleting slider');
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image_url: '',
      section: 'hero',
      is_active: true,
    });
  };

  const openNewModal = () => {
    setEditingSlider(null);
    resetForm();
    setShowModal(true);
  };

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'section', label: 'Section', sortable: true },
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
    { key: 'sort_order', label: 'Sort Order', sortable: true },
  ];

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sliders / Banners</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your website sliders and banners
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Slider
        </button>
      </div>

      <DataTable
        data={sliders}
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
                {editingSlider ? 'Edit Slider' : 'Add New Slider'}
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL *</label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Button Text</label>
                <input
                  type="text"
                  value={formData.button_text || ''}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Button Link</label>
                <input
                  type="text"
                  value={formData.button_link || ''}
                  onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="hero">Hero</option>
                  <option value="destinations">Destinations</option>
                  <option value="packages">Packages</option>
                  <option value="testimonials">Testimonials</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order || ''}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || undefined })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div className="flex items-center">
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
                  {editingSlider ? 'Update' : 'Create'} Slider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sliders;