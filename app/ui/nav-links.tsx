'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [{ name: 'Tic-Tac-Toe', href: '/tic-tac-toe' }];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'hidden rounded-full px-3  py-2 text-sm font-semibold md:block ',
              {
                'bg-sky-50 text-sky-500 hover:bg-sky-100':
                  pathname === link.href,
                'bg-white text-gray-500 hover:bg-gray-100':
                  pathname !== link.href,
              },
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
