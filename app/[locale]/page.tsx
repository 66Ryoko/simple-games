import Image from 'next/image';
import { kanit } from '@/app/[locale]/fonts';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
export default function Home() {
  const t = useTranslations(LOCALE_NAME_SPACE.home);
  return (
    <main
      className="p-0"
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      <Image
        alt="hero image"
        src="/hero-desktop.jpg"
        fill
        style={{
          objectFit: 'cover',
        }}
        className="hidden md:block"
      />
      <Image
        alt="hero image"
        src="/hero-mobile.jpg"
        fill
        style={{
          objectFit: 'cover',
        }}
        className="block md:hidden"
      />
      <div className="absolute inset-x-0 top-1/4 z-10 mx-auto flex items-center justify-center">
        <p
          className={`${kanit.className} md:text-primary-text text-primary-light p-4 text-4xl sm:text-5xl md:text-7xl `}
        >
          {t('hero-title')}
        </p>
      </div>
    </main>
  );
}
