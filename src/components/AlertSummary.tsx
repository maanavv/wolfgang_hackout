import React from 'react';
import { AlertTriangle, Waves, Wind, Droplets, TrendingUp } from 'lucide-react';

interface ThreatData {
  id: string;
  type: 'sea_level' | 'algal_bloom' | 'illegal_dumping' | 'cyclonic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  confidence: number;
  timestamp: Date;
}

interface AlertSummaryProps {
  alerts: ThreatData[];
}

export function AlertSummary({ alerts }: AlertSummaryProps) {
  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'sea_level': return Waves;
      case 'algal_bloom': return Droplets;
      case 'illegal_dumping': return AlertTriangle;
      case 'cyclonic': return Wind;
      default: return AlertTriangle;
    }
  };

  const threatCounts = alerts.reduce((acc, alert) => {
    acc[alert.type] = (acc[alert.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severityCounts = alerts.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Alert Distribution</h3>
        <p className="text-sm text-gray-500">Breakdown by threat type and severity</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Threat Type Distribution */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">By Threat Type</h4>
          <div className="space-y-3">
            {[
              { key: 'cyclonic', label: 'Cyclonic Activity', color: 'blue' },
              { key: 'sea_level', label: 'Sea Level Changes', color: 'cyan' },
              { key: 'algal_bloom', label: 'Algal Blooms', color: 'green' },
              { key: 'illegal_dumping', label: 'Illegal Dumping', color: 'red' }
            ].map(({ key, label, color }) => {
              const count = threatCounts[key] || 0;
              const percentage = alerts.length > 0 ? (count / alerts.length) * 100 : 0;
              const Icon = getThreatIcon(key);
              
              return (
                <div key={key} className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 text-${color}-600`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{label}</span>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${color}-500 h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Severity Distribution */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">By Severity Level</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'critical', label: 'Critical', color: 'red' },
              { key: 'high', label: 'High', color: 'orange' },
              { key: 'medium', label: 'Medium', color: 'yellow' },
              { key: 'low', label: 'Low', color: 'green' }
            ].map(({ key, label, color }) => {
              const count = severityCounts[key] || 0;
              
              return (
                <div key={key} className={`border rounded-lg p-3 bg-${color}-50 border-${color}-200`}>
                  <div className="text-center">
                    <p className={`text-2xl font-bold text-${color}-700`}>{count}</p>
                    <p className={`text-sm font-medium text-${color}-600`}>{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Metrics */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Response Metrics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Response Time</span>
              <span className="text-sm font-medium text-green-600">1.4 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Alert Delivery Rate</span>
              <span className="text-sm font-medium text-green-600">99.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Acknowledgment Rate</span>
              <span className="text-sm font-medium text-blue-600">87.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">False Positive Rate</span>
              <span className="text-sm font-medium text-yellow-600">2.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}