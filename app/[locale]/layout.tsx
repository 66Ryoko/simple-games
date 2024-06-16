import NavBar from '@/app/[locale]/ui/navbar';
import { inter } from '@/app/[locale]/fonts';
import { StoreProvider } from '@/app/[locale]/ui/store-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
import './globals.css';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: LOCALE_NAME_SPACE.metadata,
  });

  return {
    title: {
      template: t('layout.title.template'),
      default: t('layout.title.default'),
    },
    description: t('layout.description'),
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  };
}
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <body className={`${inter.className} text-gray-800`}>
            <NavBar />
            {children}
          </body>
        </StoreProvider>
      </NextIntlClientProvider>
    </html>
  );
}
