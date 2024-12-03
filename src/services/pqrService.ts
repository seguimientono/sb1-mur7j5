import { PQR } from '../types/pqr';

const STORAGE_KEY = 'pqrs';
const COUNTER_KEY = 'pqr_counter';

const getNextPQRNumber = (): number => {
  const currentCounter = localStorage.getItem(COUNTER_KEY);
  const nextNumber = currentCounter ? parseInt(currentCounter) + 1 : 1;
  localStorage.setItem(COUNTER_KEY, nextNumber.toString());
  return nextNumber;
};

export const savePQR = (pqr: PQR): void => {
  const pqrs = getPQRs();
  const pqrNumber = getNextPQRNumber();
  const newPQR = {
    ...pqr,
    id: `PQR-${pqrNumber.toString().padStart(4, '0')}`,
  };
  pqrs.push(newPQR);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pqrs));
};

export const updatePQR = (updatedPQR: PQR): void => {
  const pqrs = getPQRs();
  const index = pqrs.findIndex(p => p.id === updatedPQR.id);
  if (index !== -1) {
    pqrs[index] = updatedPQR;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pqrs));
  }
};

export const getPQRs = (): PQR[] => {
  const pqrsString = localStorage.getItem(STORAGE_KEY);
  return pqrsString ? JSON.parse(pqrsString) : [];
};

export const searchPQRs = (searchTerm: string): PQR[] => {
  const pqrs = getPQRs();
  if (!searchTerm) return pqrs;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return pqrs.filter(pqr => 
    pqr.id.toLowerCase().includes(lowerSearchTerm) ||
    pqr.pedido.toLowerCase().includes(lowerSearchTerm) ||
    pqr.transportador.toLowerCase().includes(lowerSearchTerm) ||
    pqr.oc.toLowerCase().includes(lowerSearchTerm)
  );
};