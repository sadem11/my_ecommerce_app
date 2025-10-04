// src/presentation/atoms/LanguageSwitcher.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  return (
    <div>
      <Link href={`/en${pathname.replace(/^\/(en|ar)/, '')}`}>English</Link>
      {' | '}
      <Link href={`/ar${pathname.replace(/^\/(en|ar)/, '')}`}>العربية</Link>
    </div>
  );
}
