import { createContext, useContext } from 'react';

export type FieldVariant = 'outlined' | 'plain';

export const FieldVariantContext = createContext<FieldVariant | null>(null);

export const useFieldVariant = (
  override?: FieldVariant,
): FieldVariant => {
  const fromContext = useContext(FieldVariantContext);

  return override ?? fromContext ?? 'plain';
};
