// src/hooks/useTranslations.ts
'use client';

import { useTranslations as nextIntlUseTranslations } from 'next-intl';

/**
 * Wrap next-intl's useTranslations to simplify usage
 * Example: const t = useTranslations(); t('products')
 */
export function useTranslations() {
  return nextIntlUseTranslations();
}
