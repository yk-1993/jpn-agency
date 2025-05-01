import { atom } from 'jotai';
import { Database } from '@/types/supabase';

// Store the selected ticket quantities
export const ticketSelectionAtom = atom<Record<string, number>>({});

// Store the current order details
export const orderFormAtom = atom({
  customer_name: '',
  customer_email: '',
  customer_phone: '',
});

// Store the current event
export const currentEventAtom = atom<Database['public']['Tables']['events']['Row'] | null>(null);

// Store the current order
export const currentOrderAtom = atom<Database['public']['Tables']['orders']['Row'] | null>(null);

// Store the loading state
export const loadingAtom = atom(false);

// Store the error state
export const errorAtom = atom<string | null>(null);

// Language selection (ja or zh)
export const languageAtom = atom<'ja' | 'zh'>('zh');
