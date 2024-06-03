import { getTranslations } from 'next-intl/server';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
import Board from '@/app/[locale]/ui/tic-tac-toe/board';

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
    title: t('title.tic-tac-toe'),
  };
}
export default function Page() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <Board />
    </div>
  );
}
