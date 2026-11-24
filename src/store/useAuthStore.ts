import { create } from 'zustand';

export interface UserProfile {
  name: string;
  agency: string;
  badgeNumber: string;
  email: string;
  phone: string;
  customerType: string;
  taxExemptNumber: string;
  savedAddresses: Array<{
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
  }>;
}

interface AuthStore {
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  addAddress: (address: UserProfile['savedAddresses'][0]) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    name: 'Lt. Marcus Vance',
    agency: 'Metropolitan Police Department',
    badgeNumber: '#4092',
    email: 'm.vance@mpd.gov',
    phone: '(443) 324-3900',
    customerType: 'Law Enforcement',
    taxExemptNumber: 'TX-940219-LE',
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Special Ops Armory',
        street: '400 E 8th St, Suite 210',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        isDefault: true,
      },
      {
        id: 'addr-2',
        label: 'Precinct 4 Station',
        street: '1200 S Congress Ave',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        isDefault: false,
      },
    ],
  },
  updateUser: (fields) =>
    set((state) => ({ user: { ...state.user, ...fields } })),
  addAddress: (address) =>
    set((state) => ({
      user: {
        ...state.user,
        savedAddresses: [...state.user.savedAddresses, address],
      },
    })),
}));
