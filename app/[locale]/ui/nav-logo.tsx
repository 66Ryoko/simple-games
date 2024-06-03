import Image from 'next/image';
import { Link } from '@/navigation';
import { kanit } from '@/app/[locale]/fonts';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
export default function NavLogo() {
  const t = useTranslations(LOCALE_NAME_SPACE.home);
  return (
    <Link href="/">
      <div className="flex content-center justify-start gap-2">
        <Image src="/logo.png" width="32" height="32" alt="Simple Games Logo" />
        <p className={`${kanit.className} hidden text-xl md:block`}>
          {t('title')}
        </p>
      </div>
    </Link>
  );
}
