import { atom } from 'jotai';

// Store the selected ticket quantities
export const ticketSelectionAtom = atom<Record<string, number>>({});

// Store the current order details
export const orderFormAtom = atom({
  customer_name: '',
  customer_email: '',
  customer_phone: '',
});

// Store the current event
export const currentEventAtom = atom<any>(null);

// Store the current order
export const currentOrderAtom = atom<any>(null);

// Store the loading state
export const loadingAtom = atom(false);

// Store the error state
export const errorAtom = atom<string | null>(null);

// Language selection (zn or ja)
export const languageAtom = atom<'zn' | 'ja'>('ja');