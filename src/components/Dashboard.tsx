import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, MapPin, Activity, Waves, Wind, Droplets, Zap, CheckCircle } from 'lucide-react';

interface LocationData {
  id: string;
  name: string;
  threatType: 'Cyclonic Threat' | 'High Sea Level' | 'Algal Bloom' | 'No Active Threat';
  seaLevel: string;
  windSpeed: string;
  icon: React.ElementType;
  color: 'red' | 'orange' | 'yellow' | 'green';
  safeLocations: { name: string; details: string; }[];
}

// UPDATED: The list of locations has been expanded from 6 to 14
const initialLocations: LocationData[] = [
  { id: 'vis', name: 'Visakhapatnam Port', threatType: 'Cyclonic Threat', seaLevel: '1.3m', windSpeed: '15 km/h', icon: Wind, color: 'red', safeLocations: [ { name: 'Cyclone Shelter MVP Colony', details: '3.1 km away' }, { name: 'Port Stadium', details: '5.2 km away' } ] },
  { id: 'mum', name: 'Mumbai Coastline', threatType: 'High Sea Level', seaLevel: '2.8m', windSpeed: '8 km/h', icon: Waves, color: 'orange', safeLocations: [ { name: 'Sardar Vallabhbhai Patel Stadium', details: '2.8 km away' }, { name: 'St. Xavier\'s College', details: '4.5 km away' } ] },
  { id: 'che', name: 'Chennai Port', threatType: 'No Active Threat', seaLevel: '0.8m', windSpeed: '5 km/h', icon: CheckCircle, color: 'green', safeLocations: [ { name: 'Kamaraj Memorial Hall', details: '1.9 km away' }, { name: 'University of Madras', details: '3.7 km away' } ] },
  { id: 'koc', name: 'Kochi Harbor', threatType: 'Algal Bloom', seaLevel: '1.1m', windSpeed: '6 km/h', icon: Droplets, color: 'yellow', safeLocations: [ { name: 'Govt. Higher Secondary School', details: '2.5 km away - Marine Drive' }, { name: 'Jawaharlal Nehru Stadium', details: '4.1 km away - Kaloor' } ] },
  { id: 'goa', name: 'Goa Coastline', threatType: 'No Active Threat', seaLevel: '0.9m', windSpeed: '10 km/h', icon: CheckCircle, color: 'green', safeLocations: [ { name: 'Dr. Shyama Prasad Mukherjee Stadium', details: '3.0 km away' }, { name: 'Goa University', details: '6.1 km away' } ] },
  { id: 'kol', name: 'Kolkata Port', threatType: 'High Sea Level', seaLevel: '2.1m', windSpeed: '12 km/h', icon: Waves, color: 'orange', safeLocations: [ { name: 'Netaji Indoor Stadium', details: '2.2 km away' }, { name: 'Salt Lake Stadium', details: '8.4 km away' } ] },
  { id: 'kan', name: 'Kandla Port', threatType: 'Cyclonic Threat', seaLevel: '1.5m', windSpeed: '25 km/h', icon: Wind, color: 'red', safeLocations: [ { name: 'Community Hall, Gandhidham', details: '12 km away' }, { name: 'Kandla Port Trust Hospital', details: '4 km away' } ] },
  { id: 'hal', name: 'Haldia Port', threatType: 'High Sea Level', seaLevel: '2.3m', windSpeed: '14 km/h', icon: Waves, color: 'orange', safeLocations: [ { name: 'Haldia Institute of Technology', details: '5.5 km away' }, { name: 'Haldia Township Sports Complex', details: '7.1 km away' } ] },
  { id: 'par', name: 'Paradip Port', threatType: 'Cyclonic Threat', seaLevel: '1.8m', windSpeed: '22 km/h', icon: Wind, color: 'red', safeLocations: [ { name: 'Paradip College', details: '3.8 km away' }, { name: 'Gopabandhu Stadium', details: '6.2 km away' } ] },
  { id: 'tut', name: 'Tuticorin Port', threatType: 'High Sea Level', seaLevel: '2.2m', windSpeed: '11 km/h', icon: Waves, color: 'orange', safeLocations: [ { name: 'V.O.C. College of Engineering', details: '4.9 km away' }, { name: 'District Collectorate', details: '7.3 km away' } ] },
  { id: 'sur', name: 'Surat (Hazira)', threatType: 'Algal Bloom', seaLevel: '1.4m', windSpeed: '13 km/h', icon: Droplets, color: 'yellow', safeLocations: [ { name: 'S. V. National Institute of Technology', details: '15 km away' }, { name: 'Pandit Dindayal Upadhyay Indoor Stadium', details: '20 km away' } ] },
  { id: 'man', name: 'Mangalore Port', threatType: 'No Active Threat', seaLevel: '1.2m', windSpeed: '9 km/h', icon: CheckCircle, color: 'green', safeLocations: [ { name: 'Mangala Stadium', details: '8 km away' }, { name: 'NITK Surathkal', details: '14 km away' } ] },
  { id: 'pud', name: 'Puducherry', threatType: 'No Active Threat', seaLevel: '1.0m', windSpeed: '7 km/h', icon: CheckCircle, color: 'green', safeLocations: [ { name: 'Pondicherry University', details: '10 km away' }, { name: 'Rajiv Gandhi Indoor Stadium', details: '3 km away' } ] },
  { id: 'kak', name: 'Kakinada Port', threatType: 'No Active Threat', seaLevel: '0.7m', windSpeed: '6 km/h', icon: CheckCircle, color: 'green', safeLocations: [ { name: 'JNTU Kakinada', details: '5 km away' }, { name: 'Rangaraya Medical College', details: '7 km away' } ] },
];

const colorClasses = {
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', iconBg: 'bg-red-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', iconBg: 'bg-orange-100' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', iconBg: 'bg-yellow-100' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', iconBg: 'bg-green-100' },
};

export function Dashboard() {
  const [locations, setLocations] = useState<LocationData[]>(initialLocations);
  const [sensorsOnline, setSensorsOnline] = useState(247);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(locations[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorsOnline(prev => prev + Math.floor(Math.random() * 3) - 1);
      setLocations(prevLocations => {
        return prevLocations.map(loc => {
          if (Math.random() < 0.33) {
            const threatOptions: { type: LocationData['threatType']; color: LocationData['color']; icon: React.ElementType }[] = [ { type: 'Cyclonic Threat', color: 'red', icon: Wind }, { type: 'High Sea Level', color: 'orange', icon: Waves }, { type: 'Algal Bloom', color: 'yellow', icon: Droplets }, { type: 'No Active Threat', color: 'green', icon: CheckCircle }, ];
            const newThreat = threatOptions[Math.floor(Math.random() * threatOptions.length)];
            return { ...loc, threatType: newThreat.type, color: newThreat.color, icon: newThreat.icon, seaLevel: `${(Math.random() * 3 + 0.5).toFixed(1)}m`, windSpeed: `${Math.floor(Math.random() * 25 + 5)} km/h`, };
          }
          return loc;
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const threatCounts = { 'cyclonic_threat': locations.filter(l => l.threatType === 'Cyclonic Threat').length, 'high_sea_level': locations.filter(l => l.threatType === 'High Sea Level').length, 'algal_bloom': locations.filter(l => l.threatType === 'Algal Bloom').length, 'illegal_dumping': 0, };
  const totalThreats = Object.values(threatCounts).reduce((sum, count) => sum + count, 0);
  const severityCounts = { critical: locations.filter(l => l.color === 'red').length, high: locations.filter(l => l.color === 'orange').length, medium: locations.filter(l => l.color === 'yellow').length, low: locations.filter(l => l.threatType === 'No Active Threat').length, };
  const threatTypesForDisplay = [ { key: 'cyclonic_threat', label: 'Cyclonic Activity', color: 'blue', icon: Wind }, { key: 'high_sea_level', label: 'Sea Level Changes', color: 'blue', icon: Waves }, { key: 'algal_bloom', label: 'Algal Blooms', color: 'green', icon: Droplets }, { key: 'illegal_dumping', label: 'Illegal Dumping', color: 'red', icon: AlertTriangle } ];
  const CurrentIcon = selectedLocation.icon;
  const colors = colorClasses[selectedLocation.color];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Active Threats</p><p className="text-3xl font-bold text-gray-900 mt-2">{totalThreats}</p></div><div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-red-600" /></div></div><div className="mt-4 flex items-center"><TrendingUp className="w-4 h-4 text-red-500 mr-1" /><span className="text-sm text-red-600 font-medium">~{Math.round(totalThreats/locations.length * 100)}% active</span></div></div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Sensors Online</p><p className="text-3xl font-bold text-gray-900 mt-2">{sensorsOnline}</p></div><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><Activity className="w-6 h-6 text-green-600" /></div></div><div className="mt-4 flex items-center"><TrendingUp className="w-4 h-4 text-green-500 mr-1" /><span className="text-sm text-green-600 font-medium">98.2% uptime</span></div></div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Alerts Sent</p><p className="text-3xl font-bold text-gray-900 mt-2">1,247</p></div><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Zap className="w-6 h-6 text-blue-600" /></div></div><div className="mt-4 flex items-center"><TrendingUp className="w-4 h-4 text-blue-500 mr-1" /><span className="text-sm text-blue-600 font-medium">24h response time</span></div></div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Coverage Area</p><p className="text-3xl font-bold text-gray-900 mt-2">2,847</p><p className="text-xs text-gray-500">km² monitored</p></div><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><MapPin className="w-6 h-6 text-purple-600" /></div></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6"><h3 className="text-lg font-semibold text-gray-900 mb-4">Location Access</h3><div className="space-y-2 max-h-[400px] overflow-y-auto">{locations.map((location) => (<button key={location.id} onClick={() => setSelectedLocation(location)} className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${selectedLocation.id === location.id ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}>{location.name}</button>))}</div></div>
        <div className="lg:col-span-2">{selectedLocation && (<div className={`p-6 rounded-xl border ${colors.bg} ${colors.border} space-y-4`}><div className="flex items-center space-x-4"><div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.iconBg}`}><CurrentIcon className={`w-6 h-6 ${colors.text}`} /></div><div><h3 className="text-xl font-bold text-gray-900">{selectedLocation.name}</h3><p className={`text-sm font-medium ${colors.text}`}>{selectedLocation.threatType}</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="bg-white p-4 rounded-lg border border-gray-200"><p className="text-sm text-gray-500">Sea Level</p><p className="text-2xl font-bold text-gray-900">{selectedLocation.seaLevel}</p></div><div className="bg-white p-4 rounded-lg border border-gray-200"><p className="text-sm text-gray-500">Wind Speed</p><p className="text-2xl font-bold text-gray-900">{selectedLocation.windSpeed}</p></div></div><div><h4 className="font-semibold text-gray-800 mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2 text-purple-600"/> Nearest Safe Locations</h4><div className="space-y-2">{selectedLocation.safeLocations.map((loc, index) => (<div key={index} className="bg-white p-3 rounded-lg border border-gray-200"><p className="font-medium text-gray-900">{loc.name}</p><p className="text-sm text-gray-500">{loc.details}</p></div>))}</div></div></div>)}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Alert Distribution</h3>
        <div className="space-y-8">
          <div><h4 className="font-medium text-gray-800 mb-4">By Threat Type</h4><div className="space-y-4">{threatTypesForDisplay.map(({ key, label, color, icon: Icon }) => { const count = threatCounts[key as keyof typeof threatCounts] || 0; const percentage = totalThreats > 0 ? (count / totalThreats) * 100 : 0; return (<div key={key} className="flex items-center"><Icon className={`w-5 h-5 mr-3 text-${color}-500`} /><div className="flex-1"><div className="flex justify-between items-center mb-1"><span className="text-sm text-gray-600">{label}</span><span className="text-sm font-medium text-gray-800">{count}</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${percentage}%` }}></div></div></div></div>);})}</div></div>
          <div><h4 className="font-medium text-gray-800 mb-4">By Severity Level</h4><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-red-700">{severityCounts.critical}</p><p className="text-sm font-medium text-red-600">Critical</p></div><div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-orange-700">{severityCounts.high}</p><p className="text-sm font-medium text-orange-600">High</p></div><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-yellow-700">{severityCounts.medium}</p><p className="text-sm font-medium text-yellow-600">Medium</p></div><div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-green-700">{severityCounts.low}</p><p className="text-sm font-medium text-green-600">Low</p></div></div></div>
        </div>
      </div>
    </div>
  );
}