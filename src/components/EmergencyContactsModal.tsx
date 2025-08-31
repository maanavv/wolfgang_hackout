import React from 'react';
import { X, Phone, Mail, MapPin, Shield, Truck, Users, AlertTriangle } from 'lucide-react';

interface EmergencyContact {
  id: string;
  organization: string;
  type: 'police' | 'fire' | 'medical' | 'disaster_response' | 'coast_guard';
  phone: string;
  email: string;
  address: string;
  available24h: boolean;
}

interface EmergencyContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyContactsModal({ isOpen, onClose }: EmergencyContactsModalProps) {
  if (!isOpen) return null;

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      organization: 'National Disaster Response Force (NDRF)',
      type: 'disaster_response',
      phone: '1070',
      email: 'control@ndrf.gov.in',
      address: 'NDRF Headquarters, New Delhi',
      available24h: true
    },
    {
      id: '2',
      organization: 'Indian Coast Guard',
      type: 'coast_guard',
      phone: '1554',
      email: 'emergency@indiancoastguard.gov.in',
      address: 'Coast Guard Headquarters, New Delhi',
      available24h: true
    },
    {
      id: '3',
      organization: 'State Police Emergency Services',
      type: 'police',
      phone: '100',
      email: 'emergency@police.gov.in',
      address: 'State Police Headquarters',
      available24h: true
    },
    {
      id: '4',
      organization: 'Fire and Emergency Services',
      type: 'fire',
      phone: '101',
      email: 'fire@emergency.gov.in',
      address: 'Fire Department Headquarters',
      available24h: true
    },
    {
      id: '5',
      organization: 'Emergency Medical Services',
      type: 'medical',
      phone: '108',
      email: 'medical@emergency.gov.in',
      address: 'Medical Emergency Control Room',
      available24h: true
    },
    {
      id: '6',
      organization: 'State Disaster Management Authority',
      type: 'disaster_response',
      phone: '+91-11-26701700',
      email: 'sdma@disaster.gov.in',
      address: 'State Emergency Operations Center',
      available24h: true
    }
  ];

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'police': return Shield;
      case 'fire': return AlertTriangle;
      case 'medical': return Users;
      case 'disaster_response': return Truck;
      case 'coast_guard': return Shield;
      default: return Phone;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'police': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'fire': return 'bg-red-100 text-red-600 border-red-200';
      case 'medical': return 'bg-green-100 text-green-600 border-green-200';
      case 'disaster_response': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'coast_guard': return 'bg-cyan-100 text-cyan-600 border-cyan-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
                <p className="text-sm text-gray-600">Local law enforcement and disaster response organizations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact) => {
              const Icon = getContactIcon(contact.type);
              return (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getContactColor(contact.type)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{contact.organization}</h3>
                        {contact.available24h && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            24/7
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a 
                            href={`tel:${contact.phone}`}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {contact.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            {contact.email}
                          </a>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-600">{contact.address}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex space-x-2">
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                          >
                            Call Now
                          </a>
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                          >
                            Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Emergency Guidelines</h4>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• For immediate life-threatening emergencies, call the appropriate emergency number directly</li>
                  <li>• Provide clear location information and nature of the emergency</li>
                  <li>• Stay calm and follow instructions from emergency responders</li>
                  <li>• Keep this contact list accessible during emergency situations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}