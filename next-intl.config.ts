import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(({ locale }) => {
  const defaultLocale = 'en';

  return {
    locale: locale ?? defaultLocale,
    locales: ['en', 'ar'],
    defaultLocale,
    messages: require(`./src/messages/${locale ?? defaultLocale}.json`)
  };
});
