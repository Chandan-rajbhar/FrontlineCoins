import { create } from 'zustand';
import { ProofComment } from '../types';

interface DesignStore {
  currentVersion: string;
  status: 'In Review' | 'Changes Requested' | 'Approved';
  comments: ProofComment[];
  setVersion: (v: string) => void;
  setStatus: (s: 'In Review' | 'Changes Requested' | 'Approved') => void;
  addComment: (comment: Omit<ProofComment, 'id' | 'timestamp'>) => void;
}

export const useDesignStore = create<DesignStore>((set) => ({
  currentVersion: 'v3.0',
  status: 'In Review',
  comments: [
    {
      id: 'c-1',
      author: 'Frontline Design Desk',
      text: 'Proof v3.0 rendered with dual antique brass and gold plating. Rim lettering bevels sharpened.',
      timestamp: '10:15 AM',
      x: 35,
      y: 42,
    },
    {
      id: 'c-2',
      author: 'Lt. Marcus Vance',
      text: 'Star badge eagle crest matches our department shield perfectly. Ready for officer review.',
      timestamp: '11:40 AM',
      x: 62,
      y: 55,
    },
  ],
  setVersion: (v) => set({ currentVersion: v }),
  setStatus: (s) => set({ status: s }),
  addComment: (c) =>
    set((state) => ({
      comments: [
        ...state.comments,
        {
          ...c,
          id: `c-${Date.now()}`,
          timestamp: 'Just now',
        },
      ],
    })),
}));
