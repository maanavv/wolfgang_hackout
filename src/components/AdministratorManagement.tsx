import React, { useState } from 'react';
import { Users, Plus, Phone, Mail, MapPin, Shield, Eye, Edit, Trash2 } from 'lucide-react';
import { AdministratorForm } from './AdministratorForm';
import { Administrator, UserRole } from '../data';

interface AdminManagementProps {
  userRole: UserRole;
  administrators: Administrator[];
  onAdministratorsChange: (newAdminList: Administrator[]) => void;
}

export function AdministratorManagement({ userRole, administrators, onAdministratorsChange }: AdminManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Administrator | null>(null);
  const [selectedRole, setSelectedRole] = useState('all');

  const handleOpenModal = (admin: Administrator | null = null) => { setEditingAdmin(admin); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setEditingAdmin(null); };
  const handleSaveAdmin = (savedAdmin: Administrator) => { let newAdminList; if (editingAdmin) { newAdminList = administrators.map(a => a.id === savedAdmin.id ? savedAdmin : a); } else { newAdminList = [...administrators, { ...savedAdmin, id: Date.now().toString() }]; } onAdministratorsChange(newAdminList); handleCloseModal(); };
  const handleDeleteAdmin = (adminId: string) => { if (window.confirm('Are you sure you want to delete this administrator?')) { const newAdminList = administrators.filter(admin => admin.id !== adminId); onAdministratorsChange(newAdminList); } };
  const getRoleColor = (role: string) => { switch (role) { case 'authority': return 'text-blue-600 bg-blue-50 border-blue-200'; case 'community_leader': return 'text-green-600 bg-green-50 border-green-200'; case 'emergency_responder': return 'text-red-600 bg-red-50 border-red-200'; case 'researcher': return 'text-purple-600 bg-purple-50 border-purple-200'; default: return 'text-gray-600 bg-gray-50 border-gray-200'; } };
  const getRoleIcon = (role: string) => { switch (role) { case 'authority': return Shield; case 'community_leader': return Users; case 'emergency_responder': return Phone; case 'researcher': return Eye; default: return Users; } };
  const getAlertPreferenceColor = (preference: string) => { switch (preference.toLowerCase()) { case 'critical': return 'text-red-800 bg-red-100 border-red-300'; case 'high': return 'text-orange-800 bg-orange-100 border-orange-300'; case 'medium': return 'text-yellow-800 bg-yellow-100 border-yellow-300'; case 'low': return 'text-green-800 bg-green-100 border-green-300'; default: return 'text-gray-800 bg-gray-100 border-gray-300'; } };
  
  const filteredAdministrators = administrators.filter(admin => selectedRole === 'all' || admin.role === selectedRole);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div><h2 className="text-xl font-semibold text-gray-900">Administrator Management</h2><p className="text-sm text-gray-500">Manage alert recipients and communication channels</p></div>
          <div className="flex items-center space-x-4">
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value="all">All Roles</option><option value="authority">Authorities</option><option value="community_leader">Community Leaders</option><option value="emergency_responder">Emergency Responders</option><option value="researcher">Researchers</option></select>
            <button onClick={() => handleOpenModal()} disabled={userRole === 'guest'} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"><Plus className="w-4 h-4" /><span>Add Administrator</span></button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4"><div className="flex items-center space-x-3"><Shield className="w-6 h-6 text-blue-600" /><div><p className="text-sm font-medium text-blue-600">Authorities</p><p className="text-xl font-bold text-blue-700">{administrators.filter(s => s.role === 'authority').length}</p></div></div></div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4"><div className="flex items-center space-x-3"><Users className="w-6 h-6 text-green-600" /><div><p className="text-sm font-medium text-green-600">Community</p><p className="text-xl font-bold text-green-700">{administrators.filter(s => s.role === 'community_leader').length}</p></div></div></div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4"><div className="flex items-center space-x-3"><Phone className="w-6 h-6 text-red-600" /><div><p className="text-sm font-medium text-red-600">Responders</p><p className="text-xl font-bold text-red-700">{administrators.filter(s => s.role === 'emergency_responder').length}</p></div></div></div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4"><div className="flex items-center space-x-3"><Eye className="w-6 h-6 text-purple-600" /><div><p className="text-sm font-medium text-purple-600">Researchers</p><p className="text-xl font-bold text-purple-700">{administrators.filter(s => s.role === 'researcher').length}</p></div></div></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-semibold text-gray-900">Registered Administrators</h3></div>
          <div className="divide-y divide-gray-200">
            {filteredAdministrators.map((admin) => {
              const RoleIcon = getRoleIcon(admin.role);
              return (
                <div key={admin.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRoleColor(admin.role)}`}>
                        <RoleIcon className="w-6 h-6" />
                      </div>
                      {/* THIS IS THE RESTORED SECTION OF CODE */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{admin.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(admin.role)}`}>{admin.role.replace('_', ' ')}</span>
                          {admin.status === 'active' && (<span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">Active</span>)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{admin.organization}</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1"><MapPin className="w-4 h-4" /><span>{admin.location}</span></div>
                          <div className="flex items-center space-x-1"><Phone className="w-4 h-4" /><span>{admin.phone}</span></div>
                          <div className="flex items-center space-x-1"><Mail className="w-4 h-4" /><span>{admin.email}</span></div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">Alert Preferences:</p>
                          <div className="flex items-center space-x-2">{admin.alertPreferences.map((pref) => (<span key={pref} className={`px-2 py-1 rounded text-xs font-medium capitalize border ${getAlertPreferenceColor(pref)}`}>{pref}</span>))}</div>
                        </div>
                      </div>
                    </div>
                    {userRole === 'admin' && (
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleOpenModal(admin)} className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-2 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteAdmin(admin.id)} className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {userRole === 'admin' && <AdministratorForm isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveAdmin} initialData={editingAdmin} />}
    </>
  );
}