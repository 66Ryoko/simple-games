import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { localePrefix, LOCALES } from './i18n.config';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: LOCALES, localePrefix });
