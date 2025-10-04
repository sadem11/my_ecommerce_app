'use client';
import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const locale = useLocale(); // ✅ get the current locale

   const router = useRouter();
  const pathname = usePathname();

   const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(`/${newLocale}${pathname.replace(/^\/(en|ar)/, '')}`);
  };
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#570e6c ',
        color: 'white',
      }}
    >
      <div>My E-Commerce</div>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <Link href={`/${locale}`}>Home</Link>
        <Link href={`/${locale}/favourites`}>Favourites</Link>
        <Link href={`/${locale}/cart`}>Cart</Link>
           <button onClick={toggleLocale} style={{ marginLeft: '16px' }}>
          {locale === 'en' ? 'عربي' : 'EN'}
          
        </button>
      </nav>
    </header>
  );
}
