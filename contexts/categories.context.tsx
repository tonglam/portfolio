'use client';

import { createContext, useContext } from 'react';

interface CategoriesContextType {
  categories: string[];
}

const CategoriesContext = createContext<CategoriesContextType>({ categories: ['All'] });

export function CategoriesProvider({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: string[];
}) {
  return <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>;
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}
