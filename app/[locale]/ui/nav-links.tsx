'use client';
import { Link, usePathname } from '@/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';

export default function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations(LOCALE_NAME_SPACE.common);
  const links = [{ name: t('nav.tic-tac-toe'), href: '/tic-tac-toe' }];
  return (
    <div className="flex w-full items-center justify-end">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'rounded-full p-2 text-sm font-semibold',
              pathname === link.href
                ? 'bg-sky-50 text-sky-500 hover:bg-sky-100'
                : 'bg-white text-gray-500 hover:bg-gray-100',
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
