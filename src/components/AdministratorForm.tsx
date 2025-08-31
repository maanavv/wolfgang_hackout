import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface Administrator {
  id: string;
  name: string;
  organization: string;
  role: 'authority' | 'community_leader' | 'emergency_responder' | 'researcher';
  location: string;
  phone: string;
  email: string;
  alertPreferences: string[];
  status: 'active' | 'inactive';
}

interface AdministratorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (admin: Administrator) => void;
  initialData?: Administrator | null;
}

const emptyAdmin: Administrator = {
  id: '', name: '', organization: '', role: 'authority', location: '', phone: '', email: '', alertPreferences: [], status: 'active'
};

export function AdministratorForm({ isOpen, onClose, onSave, initialData }: AdministratorFormProps) {
  const [admin, setAdmin] = useState<Administrator>(emptyAdmin);

  useEffect(() => {
    // Populate form with existing data when editing, otherwise reset
    if (initialData) {
      setAdmin(initialData);
    } else {
      setAdmin(emptyAdmin);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAdmin(prev => {
      const prefs = new Set(prev.alertPreferences);
      if (checked) {
        prefs.add(value);
      } else {
        prefs.delete(value);
      }
      return { ...prev, alertPreferences: Array.from(prefs) };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(admin);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Administrator' : 'Add New Administrator'}</h2>
            <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full"><X className="w-6 h-6" /></button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={admin.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div><label className="block text-sm font-medium text-gray-700">Organization</label><input type="text" name="organization" value={admin.organization} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required /></div>
              <div><label className="block text-sm font-medium text-gray-700">Role</label><select name="role" value={admin.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"><option value="authority">Authority</option><option value="community_leader">Community Leader</option><option value="emergency_responder">Emergency Responder</option><option value="researcher">Researcher</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700">Location</label><input type="text" name="location" value={admin.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Phone</label><input type="tel" name="phone" value={admin.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={admin.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/></div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Alert Preferences</label>
              <div className="mt-2 flex items-center space-x-4">
                {['critical', 'high', 'medium', 'low'].map(level => (
                  <label key={level} className="flex items-center"><input type="checkbox" value={level} checked={admin.alertPreferences.includes(level)} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-2 text-sm capitalize">{level}</span></label>
                ))}
              </div>
            </div>

            <div><label className="block text-sm font-medium text-gray-700">Status</label><div className="mt-2 flex items-center space-x-4"><label className="flex items-center"><input type="radio" name="status" value="active" checked={admin.status === 'active'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300" /><span className="ml-2 text-sm">Active</span></label><label className="flex items-center"><input type="radio" name="status" value="inactive" checked={admin.status === 'inactive'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300" /><span className="ml-2 text-sm">Inactive</span></label></div></div>
          </div>

          <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"><Save className="w-4 h-4" /><span>Save</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}