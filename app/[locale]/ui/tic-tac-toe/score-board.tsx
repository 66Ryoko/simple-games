'use client';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
import { useAppSelector } from '@/app/lib/state/hook';
import { TicTacToe } from '@/app/lib/definitions';

export default function ScoreBoard({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations(LOCALE_NAME_SPACE.ticTacToe);
  const { currentPlayer, isGameOver, winner, userScore, aiScore } =
    useAppSelector((state) => state.ticTacToe);

  const Player = (
    player: TicTacToe.PLAYERS.O | TicTacToe.PLAYERS.X,
    score: number,
  ) => {
    return (
      <div
        className={clsx(
          'flex flex-col items-center justify-center border border-gray-100 p-2',
          !isGameOver && currentPlayer === player
            ? 'animate-bg-breathing font-bold'
            : isGameOver && winner === player
              ? 'bg-sky-50 font-bold text-sky-500'
              : 'bg-gray-50 font-normal',
        )}
      >
        <div className="text-large py-2">
          {t('score-board.player', { player })}
        </div>
        <div>{t('score-board.score', { score })}</div>
      </div>
    );
  };
  return (
    <div {...rest} className={clsx(className, 'grid w-full grid-cols-2')}>
      {Player(TicTacToe.CONFIG.playerUser, userScore)}
      {Player(TicTacToe.CONFIG.playerAi, aiScore)}
    </div>
  );
}
