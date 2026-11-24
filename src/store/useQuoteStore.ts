import { create } from 'zustand';

export interface QuoteDraft {
  categorySlug: string;
  size: string;
  quantity: number;
  finishId: string;
  artworkUploaded: boolean;
  artworkFileName?: string;
  deadline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  agencyName: string;
  notes: string;
}

interface QuoteStore {
  draft: QuoteDraft;
  updateDraft: (fields: Partial<QuoteDraft>) => void;
  resetDraft: () => void;
}

const initialDraft: QuoteDraft = {
  categorySlug: 'challenge-coins',
  size: '1.75"',
  quantity: 100,
  finishId: 'ant-gold',
  artworkUploaded: false,
  deadline: 'Standard (14 Days)',
  contactName: 'Lt. Marcus Vance',
  contactEmail: 'm.vance@mpd.gov',
  contactPhone: '(443) 324-3900',
  agencyName: 'Metropolitan Police Dept',
  notes: '',
};

export const useQuoteStore = create<QuoteStore>((set) => ({
  draft: initialDraft,
  updateDraft: (fields) =>
    set((state) => ({ draft: { ...state.draft, ...fields } })),
  resetDraft: () => set({ draft: initialDraft }),
}));
