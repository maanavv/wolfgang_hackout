// This interface defines the shape of an administrator object
export interface Administrator {
  id: string;
  name: string;
  organization: string;
  role: 'authority' | 'community_leader' | 'emergency_responder' | 'researcher';
  location: string;
  phone: string;
  email: string;
  alertPreferences: string[];
  status: 'active' | 'inactive';
}

// This is the single source of truth for the initial administrator data
export const initialAdminData: Administrator[] = [
    { id: '1', name: 'Prasham Vakharia', organization: 'Mumbai Disaster Management Authority', role: 'authority', location: 'Vadodara,Gujarat', phone: '+91 9316583232 ', email: 'prasham.btmtcs@nfsu.ac.in', alertPreferences: ['critical', 'high'], status: 'active' },
    { id: '2', name: 'Maanavv Bhat', organization: 'Kochi Community Council', role: 'community_leader', location: 'Kochi,Kerala', phone: '+91 7889472118', email: 'maanavvbhat@gmail.com', alertPreferences: ['critical', 'high', 'medium'], status: 'active' },
    { id: '3', name: 'Dheemanth M Rao', organization: 'Indian Coast Guard', role: 'emergency_responder', location: 'Bangalore,Karnataka', phone: '+91 9019579081', email: 'dheemanth.btmtcs@nfsu.ac.in', alertPreferences: ['critical'], status: 'active' },
    { id: '4', name: 'Swayam Shah', organization: 'National Institute of Oceanography', role: 'researcher', location: 'Ahmedabad,Gujarat', phone: '+91 8320221247', email: 'swayam.btmtcs@nfsu.ac.in', alertPreferences: ['critical', 'high', 'medium', 'low'], status: 'active' }
];

// This shared type is now in a neutral file to prevent circular dependencies
export type UserRole = 'admin' | 'guest' | null;