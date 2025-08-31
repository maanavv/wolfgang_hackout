import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  color: 'blue' | 'green' | 'red' | 'yellow';
  unit: string;
}

export function RealTimeChart({ title, data: initialData, color, unit }: ChartProps) {
  const [data, setData] = useState(initialData);

  // This effect ensures the chart updates whenever the data prop from the parent changes.
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const colorClasses = {
    blue: 'text-blue-600 border-blue-200 bg-blue-50',
    green: 'text-green-600 border-green-200 bg-green-50',
    red: 'text-red-600 border-red-200 bg-red-50',
    yellow: 'text-yellow-600 border-yellow-200 bg-yellow-50'
  };

  const strokeColors = {
    blue: '#2563eb',
    green: '#16a34a',
    red: '#dc2626',
    yellow: '#d97706'
  };
  
  // Handle case where data might not be ready
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center h-full">
        <p>Loading chart data...</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const trend = currentValue > previousValue;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">Real-time sensor data</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {trend ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className="text-2xl font-bold text-gray-900">
                {currentValue.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">{unit}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 400 150">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 30}
                x2="400"
                y2={i * 30}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Data line */}
            <polyline
              fill="none"
              stroke={strokeColors[color]}
              strokeWidth="2"
              points={data.map((point, index) => {
                const x = (index / (data.length - 1)) * 380 + 10;
                const y = 140 - ((point.value - minValue) / range) * 120;
                return `${x},${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 380 + 10;
              const y = 140 - ((point.value - minValue) / range) * 120;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={strokeColors[color]}
                  className="drop-shadow-sm"
                />
              );
            })}
          </svg>
          
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
            Live: {currentValue.toFixed(2)} {unit}
          </div>
        </div>
        
        {/* UPDATED: This section now displays all time labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {data.map((point, index) => (
            <span key={index} className="flex-1 text-center">
              {index === data.length - 1 ? 'Current' : point.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}