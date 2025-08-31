import React, { useState, useEffect } from 'react';
import { AlertTriangle, Activity, Eye, Users, Menu } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { AlertCenter } from './components/AlertCenter';
import { MonitoringPanel } from './components/MonitoringPanel';
import { AdministratorManagement } from './components/AdministratorManagement';
import { NotificationCenter, INotification } from './components/NotificationCenter';
import { EmergencyModal } from './components/EmergencyModal';
import { Administrator, UserRole } from './data';

interface AppProps {
  userRole: UserRole;
  administrators: Administrator[];
  onAdministratorsChange: (newAdminList: Administrator[]) => void;
}

const initialNotifications: INotification[] = [
    { id: '1', type: 'critical', title: 'Cyclonic Storm Alert Sent', message: 'Emergency alert sent to 45,678 recipients...', timestamp: new Date(Date.now() - 5 * 60 * 1000), isRead: false },
    { id: '2', type: 'success', title: 'System Backup Completed', message: 'Automated system backup completed successfully', timestamp: new Date(Date.now() - 15 * 60 * 1000), isRead: false },
    { id: '3', type: 'warning', title: 'Sensor Maintenance Required', message: 'Visakhapatnam weather station requires maintenance', timestamp: new Date(Date.now() - 30 * 60 * 1000), isRead: false }
];

const notificationTemplates = [
  { type: 'critical' as const, title: 'High Sea Level Detected', message: 'Sea levels at Mumbai Coastline are critically high.' },
  { type: 'warning' as const, title: 'Sensor Offline', message: 'Kochi Weather Station has stopped sending data.' },
  { type: 'success' as const, title: 'Data Sync Complete', message: 'All sensor data has been successfully synced.' },
];

function App({ userRole, administrators, onAdministratorsChange }: AppProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'alerts' | 'monitoring' | 'administrator'>('dashboard');
  const [notifications, setNotifications] = useState<INotification[]>(initialNotifications);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
        const newNotification: INotification = {
          ...template,
          id: Date.now().toString(),
          timestamp: new Date(),
          isRead: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'alerts', label: 'Alert Center', icon: AlertTriangle },
    { id: 'monitoring', label: 'Monitoring', icon: Eye },
    { id: 'administrator', label: 'Administrator', icon: Users },
  ];

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <AlertCenter />;
      case 'monitoring':
        return <MonitoringPanel userRole={userRole} />;
      case 'administrator':
        return <AdministratorManagement 
                 userRole={userRole} 
                 administrators={administrators} 
                 onAdministratorsChange={onAdministratorsChange} 
               />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (<div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>)}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-200 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => handleNavClick(item.id as any)} className={`w-full flex items-center px-6 py-3 text-left transition-colors ${currentView === item.id ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4 p-2 text-gray-600 hover:text-gray-900">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{currentView === 'administrator' ? 'Administrator Management' : currentView}</h2>
                <p className="text-sm text-gray-500 mt-1 hidden sm:block">{new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter notifications={notifications} onPanelOpen={handleMarkAllAsRead} />
              <button onClick={() => setIsEmergencyModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Emergency</button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{renderView()}</main>
      </div>
      <EmergencyModal isOpen={isEmergencyModalOpen} onClose={() => setIsEmergencyModalOpen(false)} userRole={userRole} />
    </div>
  );
}

export default App;