// src/app/[locale]/layout.tsx
import Providers from '../../providers/Providers';
import Header from '../../presentation/organisms/Header';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../../styles/globals.css';

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <Providers>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main>{children}</main>
      </NextIntlClientProvider>
    </Providers>
  );
}
