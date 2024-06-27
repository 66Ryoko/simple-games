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
          'border-primary-regular flex flex-col items-center justify-center border p-2',
          !isGameOver && currentPlayer === player
            ? 'animate-bg-breathing font-bold'
            : isGameOver && winner === player
              ? 'text-secondary-text bg-secondary-light font-bold'
              : 'bg-primary-light font-normal',
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
