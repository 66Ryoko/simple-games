import createMiddleware from 'next-intl/middleware';
import { localePrefix, LOCALES, LOCALE } from './i18n.config';

export default createMiddleware({
  locales: LOCALES,
  localePrefix,
  defaultLocale: LOCALE.en,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
