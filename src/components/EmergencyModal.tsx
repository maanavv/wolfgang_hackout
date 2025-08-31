import React from 'react';
import { X, Send, AlertTriangle, ShieldCheck, Phone } from 'lucide-react';
// CORRECTED: Import UserRole from the central data file
import { UserRole } from '../data';

// Define the props the component will receive
interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
}

export function EmergencyModal({ isOpen, onClose, userRole }: EmergencyModalProps) {
  // If the modal is not open, render nothing
  if (!isOpen) {
    return null;
  }

  // Updated list of emergency contacts
  const emergencyContacts = [
    { name: 'Police', number: '100' },
    { name: 'Fire Rescue Department', number: '101' },
    { name: 'Ambulance and Hospital', number: '108' },
    { name: 'National Emergency', number: '112' },
    { name: 'Indian Coast Guard', number: '1554' },
    { name: 'Fisherman Rescue', number: '1969' },
    { name: 'Disaster Management', number: '1077' },
  ];

  // Function to call the Python backend
  const handleSendAlert = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/send-emergency-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Success: Emergency alert has been sent via Twilio!');
        console.log('Twilio Message SID:', result.sid);
      } else {
        alert(`Error: Failed to send alert. Server says: ${result.message}`);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      alert('Error: Could not connect to the backend server. Is it running?');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl transform transition-all">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-red-50 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h2 className="text-2xl font-bold text-red-800">Emergency Protocol Activated</h2>
              <p className="text-sm text-red-600">Follow instructions carefully. This is not a drill.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content Section */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Broadcast Alert Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Send className="w-5 h-5 mr-2 text-blue-600" />
                  Broadcast Urgent Alert
                </h3>
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="Default emergency message will be sent to all administrators."
                  readOnly
                ></textarea>
                <button
                  onClick={handleSendAlert}
                  disabled={userRole === 'guest'} // Disable the button if the user is a guest
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Send to All Administrators</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Important Contacts Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  Important Contacts
                </h3>
                <div className="space-y-3">
                  {emergencyContacts.map(contact => (
                    <div key={contact.name} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <a href={`tel:${contact.number}`} className="font-semibold text-green-700">{contact.number}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Immediate Safety Steps Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2 text-yellow-600" />
                  Immediate Safety Steps
                </h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <li><strong>Seek Higher Ground:</strong> Move away from the coastline immediately.</li>
                  <li><strong>Stay Informed:</strong> Tune into local news channels for official updates.</li>
                  <li><strong>Follow Evacuation Orders:</strong> If authorities issue an evacuation order, comply without delay.</li>
                  <li><strong>Secure Your Home:</strong> If time permits, secure your property and turn off utilities.</li>
                  <li><strong>Check on Neighbors:</strong> Assist children, the elderly, and those with special needs.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 bg-gray-50 rounded-b-xl text-center">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}