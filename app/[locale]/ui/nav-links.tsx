'use client';
import { Link, usePathname } from '@/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';

export default function NavLinks({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const t = useTranslations(LOCALE_NAME_SPACE.common);
  const links = [{ name: t('nav.tic-tac-toe'), href: '/tic-tac-toe' }];
  return (
    <div
      {...rest}
      className={clsx(className, 'flex h-full items-center justify-end')}
    >
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'group flex h-full flex-col place-content-center place-items-center px-2 py-0 text-center text-sm font-semibold',
              pathname === link.href
                ? 'text-secondary-text bg-secondary-light hover:bg-secondary-regular'
                : 'hover:bg-primary-regular text-primary-text bg-white',
            )}
          >
            <p>{link.name}</p>
            <span
              className={clsx(
                'block h-0.5 w-0 opacity-50 transition-all duration-500 group-hover:w-full',
                pathname === link.href
                  ? 'bg-secondary-text'
                  : 'bg-primary-text',
              )}
            ></span>
          </Link>
        );
      })}
    </div>
  );
}
