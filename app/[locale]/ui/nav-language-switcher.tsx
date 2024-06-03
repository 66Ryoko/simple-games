'use client';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE, LOCALES } from '@/i18n.config';
import { useTransition, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/navigation';
import { clsx } from 'clsx';
import { useClickAway } from '@uidotdev/usehooks';

export default function NavLanguageSwitcher() {
  const t = useTranslations(LOCALE_NAME_SPACE.languageSwitcher);
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useClickAway<HTMLUListElement>(() => {
    setIsMenuOpen(false);
  });

  const handleToggleMenu = (open: boolean) => {
    setIsMenuOpen(open);
  };
  function handleChangeLanguage(nextLocale: string) {
    if (!isPending && nextLocale !== currentLocale) {
      startTransition(() => {
        router.replace(`${pathname}?${searchParams}`, { locale: nextLocale });
      });
    }
    setIsMenuOpen(false);
  }

  function LanguageItem(locale: string, hideTextOnMobile: boolean = false) {
    return (
      <div className="flex items-center justify-start gap-2 p-2">
        <Image
          src={`/language/${locale}.png`}
          width={24}
          height={24}
          alt={t(locale)}
        />

        <p
          className={clsx(
            'break-all text-sm text-gray-500',
            hideTextOnMobile ? 'hidden md:block' : '',
          )}
        >
          {t(locale)}
        </p>
      </div>
    );
  }
  function Switcher() {
    return (
      <button
        onClick={() => handleToggleMenu(true)}
        className="overflow-hidden rounded-full bg-white hover:bg-gray-50"
      >
        {LanguageItem(currentLocale, true)}
      </button>
    );
  }
  function LanguageMenu() {
    return isMenuOpen ? (
      <ul
        ref={ref}
        className="absolute right-0 w-28 cursor-pointer rounded-md border border-gray-50 bg-white shadow-sm shadow-gray-100 md:shadow-lg"
      >
        {LOCALES.map((locale: string) => (
          <li
            key={locale}
            className={clsx(
              'box-border bg-transparent bg-white text-sm hover:bg-gray-50',
              locale === currentLocale ? 'font-bold' : 'font-normal',
            )}
            onClick={() => handleChangeLanguage(locale)}
          >
            {LanguageItem(locale)}
          </li>
        ))}
      </ul>
    ) : (
      <></>
    );
  }

  return (
    <div className="relative">
      <Switcher />
      <LanguageMenu />
    </div>
  );
}
