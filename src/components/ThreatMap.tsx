import React from 'react';
import { MapPin, AlertTriangle, Waves, Wind, Droplets } from 'lucide-react';

interface ThreatData {
  id: string;
  type: 'sea_level' | 'algal_bloom' | 'illegal_dumping' | 'cyclonic';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  confidence: number;
  timestamp: Date;
}

interface ThreatMapProps {
  threats: ThreatData[];
}

export function ThreatMap({ threats }: ThreatMapProps) {
  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'sea_level': return Waves;
      case 'algal_bloom': return Droplets;
      case 'illegal_dumping': return AlertTriangle;
      case 'cyclonic': return Wind;
      default: return MapPin;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Threat Distribution Map</h3>
        <p className="text-sm text-gray-500">Real-time coastal threat visualization</p>
      </div>
      
      <div className="p-6">
        <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg h-96 overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-50 opacity-60"></div>
          
          {/* Coastline representation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <path
              d="M50 250 Q100 240 150 245 T250 240 Q300 235 350 230"
              stroke="#1e40af"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-sm"
            />
            <path
              d="M60 180 Q120 175 180 178 T280 175 Q320 170 360 165"
              stroke="#1e40af"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </svg>
          
          {/* Threat Markers */}
          {threats.slice(0, 8).map((threat, index) => {
            const Icon = getThreatIcon(threat.type);
            const x = 80 + (index * 35) + (Math.random() * 40);
            const y = 100 + (Math.random() * 100);
            
            return (
              <div
                key={threat.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(threat.severity)} animate-pulse`}>
                  <div className={`w-8 h-8 rounded-full ${getSeverityColor(threat.severity)} opacity-30 animate-ping`}></div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className="w-3 h-3" />
                      <span className="font-medium capitalize">{threat.type.replace('_', ' ')}</span>
                    </div>
                    <div className="text-gray-300">
                      <p>{threat.location}</p>
                      <p>Severity: {threat.severity}</p>
                      <p>Confidence: {threat.confidence.toFixed(1)}%</p>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Threat Severity</h4>
            <div className="space-y-1">
              {['critical', 'high', 'medium', 'low'].map((severity) => (
                <div key={severity} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(severity)}`}></div>
                  <span className="text-xs text-gray-600 capitalize">{severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}