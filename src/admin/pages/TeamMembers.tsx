import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import toast from 'react-hot-toast';
import DataTable from '../components/tables/DataTable';
import ImageUpload from '../components/common/ImageUpload';
import {
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface TeamMember {
  id?: string;
  name: string;
  designation: string;
  bio?: string;
  avatar?: string;
  social_links: { platform: string; url: string }[];
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const TeamMembers: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    designation: '',
    bio: '',
    avatar: '',
    social_links: [],
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      toast.error('Error fetching team members');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const memberData = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (editingMember?.id) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id);

        if (error) throw error;
        toast.success('Team member updated successfully!');
      } else {
        // Create new member
        const { error } = await supabase
          .from('team_members')
          .insert([memberData]);

        if (error) throw error;
        toast.success('Team member created successfully!');
      }

      setShowModal(false);
      setEditingMember(null);
      resetForm();
      fetchMembers();
    } catch (error) {
      toast.error('Error saving team member');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(member);
    setShowModal(true);
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', member.id);

      if (error) throw error;
      toast.success('Team member deleted successfully!');
      fetchMembers();
    } catch (error) {
      toast.error('Error deleting team member');
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      bio: '',
      avatar: '',
      social_links: [],
      sort_order: 0,
      is_active: true,
    });
  };

  const openNewModal = () => {
    setEditingMember(null);
    resetForm();
    setShowModal(true);
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      social_links: [...formData.social_links, { platform: '', url: '' }],
    });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...formData.social_links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, social_links: newLinks });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = formData.social_links.filter((_, i) => i !== index);
    setFormData({ ...formData, social_links: newLinks });
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { 
      key: 'sort_order', 
      label: 'Order', 
      sortable: true,
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
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your team members
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      <DataTable
        data={members}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Avatar</label>
                <ImageUpload
                  value={formData.avatar}
                  onChange={(url) => setFormData({ ...formData, avatar: url })}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Social Links</label>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Link
                  </button>
                </div>
                {formData.social_links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Platform (e.g., Twitter)"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
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
                  {editingMember ? 'Update' : 'Create'} Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;