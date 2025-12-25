import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import toast from 'react-hot-toast';
import {
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'image' | 'json' | 'boolean';
  category: string;
  description?: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category')
        .order('key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      toast.error('Error fetching settings');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (id: string, newValue: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, value: newValue } : setting
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = settings.map(({ id, value }) => ({
        id,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(updates);

      if (error) throw error;
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Error saving settings');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderInput = (setting: SiteSetting) => {
    const { type, value, id } = setting;

    switch (type) {
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={value === 'true'}
            onChange={(e) =>
              handleSettingChange(id, e.target.checked ? 'true' : 'false')
            }
            className="rounded border-gray-300"
          />
        );
      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={value}
              onChange={(e) => handleSettingChange(id, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Image URL"
            />
            {value && (
              <img
                src={value}
                alt="Preview"
                className="max-w-xs h-24 object-cover rounded-lg"
              />
            )}
          </div>
        );
      case 'json':
        return (
          <textarea
            rows={4}
            value={value}
            onChange={(e) => handleSettingChange(id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm font-mono text-sm"
            placeholder="JSON content"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleSettingChange(id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading settings...</p>
      </div>
    );
  }

  const categories = Array.from(new Set(settings.map(s => s.category)));

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Configure your website settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
        >
          <Cog6ToothIcon className="h-5 w-5 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
              {category} Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {settings
                .filter(s => s.category === category)
                .map(setting => (
                  <div key={setting.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {setting.key.replace(/_/g, ' ')}
                      {setting.description && (
                        <span className="block text-xs text-gray-500 font-normal mt-1">
                          {setting.description}
                        </span>
                      )}
                    </label>
                    {renderInput(setting)}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;