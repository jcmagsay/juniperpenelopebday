import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getEventByYear } from '../data/eventHelpers';

type PasswordGateContextValue = {
  unlockYear: (year: number, password: string) => boolean;
  lockYear: (year: number) => void;
  isUnlocked: (year: number) => boolean;
};

const PasswordGateContext = createContext<PasswordGateContextValue | null>(null);

export function PasswordGateProvider({ children }: { children: React.ReactNode }) {
  const [unlockedYears, setUnlockedYears] = useState<Record<number, boolean>>(() => {
    const stored = localStorage.getItem('birthday-unlocked-years');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('birthday-unlocked-years', JSON.stringify(unlockedYears));
  }, [unlockedYears]);

  const value = useMemo<PasswordGateContextValue>(() => ({
    unlockYear: (year, password) => {
      const event = getEventByYear(year);
      if (!event || event.password !== password) return false;
      setUnlockedYears((prev) => ({ ...prev, [year]: true }));
      return true;
    },
    lockYear: (year) => {
      setUnlockedYears((prev) => ({ ...prev, [year]: false }));
    },
    isUnlocked: (year) => Boolean(unlockedYears[year])
  }), [unlockedYears]);

  return <PasswordGateContext.Provider value={value}>{children}</PasswordGateContext.Provider>;
}

export function usePasswordGate() {
  const context = useContext(PasswordGateContext);
  if (!context) throw new Error('usePasswordGate must be used inside PasswordGateProvider');
  return context;
}
