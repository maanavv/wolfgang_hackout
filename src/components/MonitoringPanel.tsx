import React from 'react';
import { useState, useEffect } from 'react';
import { Activity, Wind, Waves, Droplets, MapPin, Download } from 'lucide-react';
import { RealTimeChart } from './RealTimeChart';
import { UserRole } from '../data'; // Corrected: Import UserRole from the central data file

// Define the props the component will receive
interface MonitoringPanelProps {
  userRole: UserRole;
}

interface SensorData {
  id: string;
  name: string;
  location: string;
  type: 'tide_gauge' | 'weather_station' | 'water_quality' | 'satellite';
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: Date;
  value: number;
  unit: string;
}

const initialSensorData: SensorData[] = [
    { id: '1', name: 'Mumbai Port Tide Gauge', location: 'Mumbai, Maharashtra', type: 'tide_gauge', status: 'online', lastUpdate: new Date(), value: 2.4, unit: 'm' },
    { id: '2', name: 'Kochi Weather Station', location: 'Kochi, Kerala', type: 'weather_station', status: 'online', lastUpdate: new Date(), value: 28.5, unit: '°C' },
    { id: '3', name: 'Chennai Water Quality Monitor', location: 'Chennai, Tamil Nadu', type: 'water_quality', status: 'online', lastUpdate: new Date(), value: 7.2, unit: 'pH' },
    { id: '4', name: 'Visakhapatnam Weather Station', location: 'Visakhapatnam, Andhra Pradesh', type: 'weather_station', status: 'maintenance', lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000), value: 0, unit: 'km/h' },
    { id: '5', name: 'Goa Satellite Feed', location: 'Goa Coastline', type: 'satellite', status: 'online', lastUpdate: new Date(), value: 92.1, unit: '%' }
];

const generateChartData = (timeRange: '1h' | '24h' | '48h' | '7d') => {
  const now = new Date();
  let points = 7;
  let intervalMinutes = 0;
  let timeFormat: 'minute' | 'hour' | 'weekday' = 'hour';

  switch (timeRange) {
    case '1h':
      points = 7;
      intervalMinutes = 10;
      timeFormat = 'minute';
      break;
    case '48h':
      points = 7;
      intervalMinutes = 8 * 60;
      break;
    case '7d':
      points = 7;
      intervalMinutes = 24 * 60;
      timeFormat = 'weekday';
      break;
    case '24h':
    default:
      points = 7;
      intervalMinutes = 4 * 60;
      break;
  }

  const generateData = (base: number, variation: number) => {
    const data = [];
    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
      let timeLabel = '';
      if (timeFormat === 'weekday') {
        timeLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else {
        timeLabel = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', '');
      }
      const value = base + (Math.random() - 0.5) * variation;
      data.push({ time: timeLabel, value: parseFloat(value.toFixed(2)) });
    }
    return data;
  };

  return {
    seaLevelData: generateData(2.0, 1.5),
    waterTempData: generateData(28.0, 3),
    windSpeedData: generateData(18.0, 10),
    waterQualityData: generateData(7.5, 0.6)
  };
};

export function MonitoringPanel({ userRole }: MonitoringPanelProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '48h' | '7d'>('24h');
  const [selectedSensorType, setSelectedSensorType] = useState('all');
  const [chartData, setChartData] = useState(generateChartData(selectedTimeRange));
  const [sensors, setSensors] = useState<SensorData[]>(initialSensorData);

  useEffect(() => {
    setChartData(generateChartData(selectedTimeRange));
  }, [selectedTimeRange]);
  
  useEffect(() => {
    const sensorInterval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => {
          let newStatus = sensor.status;
          const randomStatus = Math.random();
          if (sensor.status !== 'online' && Math.random() < 0.5) {
             newStatus = 'online';
          } else if (randomStatus > 0.97) {
            newStatus = 'offline';
          } else if (randomStatus > 0.94) {
            newStatus = 'maintenance';
          }

          const variation = (Math.random() - 0.5) * (sensor.value * 0.05);
          const newValue = parseFloat((sensor.value + variation).toFixed(1));

          return {
            ...sensor,
            value: newStatus === 'online' ? newValue : sensor.value,
            status: newStatus,
            lastUpdate: newStatus === 'online' ? new Date() : sensor.lastUpdate,
          };
        })
      );
    }, 5000);

    return () => clearInterval(sensorInterval);
  }, []);

  const getStatusColor = (status: string) => { switch (status) { case 'online': return 'text-green-600 bg-green-50 border-green-200'; case 'offline': return 'text-red-600 bg-red-50 border-red-200'; case 'maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200'; default: return 'text-gray-600 bg-gray-50 border-gray-200'; } };
  const getSensorIcon = (type: string) => { switch (type) { case 'tide_gauge': return Waves; case 'weather_station': return Wind; case 'water_quality': return Droplets; case 'satellite': return Activity; default: return MapPin; } };
  const handleExportData = () => { const { seaLevelData, waterTempData, windSpeedData, waterQualityData } = chartData; const headers = ['Time', 'Sea Level (m)', 'Water Temperature (°C)', 'Wind Speed (km/h)', 'Water Quality (pH)']; const csvRows = seaLevelData.map((point, index) => [ point.time, seaLevelData[index]?.value || 'N/A', waterTempData[index]?.value || 'N/A', windSpeedData[index]?.value || 'N/A', waterQualityData[index]?.value || 'N/A' ].join(',')); const csvString = [headers.join(','), ...csvRows].join('\n'); const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' }); const link = document.createElement('a'); const url = URL.createObjectURL(blob); link.setAttribute('href', url); link.setAttribute('download', `monitoring_data_${selectedTimeRange}.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link); };
  
  const filteredSensors = sensors.filter(sensor => 
    selectedSensorType === 'all' || sensor.type === selectedSensorType
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Sensor Monitoring</h2>
          <p className="text-sm text-gray-500">Real-time data from coastal monitoring infrastructure</p>
        </div>
        <div className="flex items-center space-x-4">
          <select value={selectedSensorType} onChange={(e) => setSelectedSensorType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Sensors</option>
            <option value="tide_gauge">Tide Gauges</option>
            <option value="weather_station">Weather Stations</option>
            <option value="water_quality">Water Quality</option>
            <option value="satellite">Satellite Feeds</option>
          </select>
          <select value={selectedTimeRange} onChange={(e) => setSelectedTimeRange(e.target.value as '1h' | '24h' | '48h' | '7d')} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="48h">Last 48 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <button 
            onClick={handleExportData} 
            disabled={userRole === 'guest'}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealTimeChart title="Sea Level Monitoring" data={chartData.seaLevelData} color="blue" unit="m" />
        <RealTimeChart title="Water Temperature" data={chartData.waterTempData} color="red" unit="°C" />
        <RealTimeChart title="Wind Speed" data={chartData.windSpeedData} color="green" unit="km/h" />
        <RealTimeChart title="Water Quality Index" data={chartData.waterQualityData} color="yellow" unit="pH" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sensor Network Status</h3>
          <p className="text-sm text-gray-500">Current status of all monitoring equipment</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredSensors.map((sensor) => {
            const Icon = getSensorIcon(sensor.type);
            return (
              <div key={sensor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{sensor.name}</h4>
                      <p className="text-sm text-gray-500">{sensor.location}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(sensor.status)}`}>
                    {sensor.status}
                  </span>
                </div>
                {sensor.status === 'online' && (
                  <div className="mb-3">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{sensor.value}</span>
                      <span className="text-sm text-gray-500">{sensor.unit}</span>
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500">Last update: {sensor.lastUpdate.toLocaleTimeString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}