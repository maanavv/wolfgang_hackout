import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Users, Send, Filter, Search } from 'lucide-react';

interface Alert {
  id: string;
  type: 'sea_level' | 'algal_bloom' | 'illegal_dumping' | 'cyclonic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  status: 'pending' | 'sent' | 'acknowledged';
  recipients: number;
}

export function AlertCenter() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'cyclonic',
      severity: 'critical',
      title: 'Severe Cyclonic Storm Warning',
      description: 'Category 3 cyclonic storm approaching Bay of Bengal with wind speeds of 120-150 km/h',
      location: 'Bay of Bengal',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      status: 'sent',
      recipients: 45678
    },
    {
      id: '2',
      type: 'sea_level',
      severity: 'high',
      title: 'Abnormal Sea Level Rise Detected',
      description: 'Sea level rise of 2.4m detected, 150% above normal levels for this time period',
      location: 'Mumbai Coastline',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'sent',
      recipients: 12340
    },
    {
      id: '3',
      type: 'algal_bloom',
      severity: 'medium',
      title: 'Harmful Algal Bloom Detected',
      description: 'Toxic algal bloom concentration exceeds safe levels in coastal waters',
      location: 'Kerala Backwaters',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'acknowledged',
      recipients: 8760
    },
    {
      id: '4',
      type: 'illegal_dumping',
      severity: 'high',
      title: 'Illegal Waste Dumping Activity',
      description: 'Satellite imagery shows unauthorized waste discharge in protected marine area',
      location: 'Goa Marine Sanctuary',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending',
      recipients: 0
    },
    {
      id: '5',
      type: 'sea_level',
      severity: 'low',
      title: 'Minor Tidal Anomaly',
      description: 'Slight deviation from predicted tidal patterns observed',
      location: 'Chennai Port',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'sent',
      recipients: 2340
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-blue-600 bg-blue-50';
      case 'acknowledged': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Alert Management Center</h2>
          <p className="text-sm text-gray-500">Monitor and manage all coastal threat alerts</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>New Alert</span>
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-600">Critical Alerts</span>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-700 mt-2">
            {alerts.filter(a => a.severity === 'critical').length}
          </p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-orange-600">High Priority</span>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-700 mt-2">
            {alerts.filter(a => a.severity === 'high').length}
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">Resolved</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {alerts.filter(a => a.status === 'acknowledged').length}
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">Total Recipients</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            {alerts.reduce((sum, alert) => sum + alert.recipients, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h4>
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>📍 {alert.location}</span>
                    <span>🕐 {alert.timestamp.toLocaleString()}</span>
                    {alert.recipients > 0 && (
                      <span>👥 {alert.recipients.toLocaleString()} recipients</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert.status === 'pending' && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Send Alert
                    </button>
                  )}
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}