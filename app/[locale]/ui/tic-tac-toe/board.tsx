'use client';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
import BaseButton from '@/app/[locale]/ui/baseButton';
import { kanit } from '@/app/[locale]/fonts';
import { SquareValue, TIC_TAC_TOE_CONFIG } from '@/app/lib/definitions';
import { calculateWinner } from '@/app/lib/utils';

export default function Board() {
  const t = useTranslations(LOCALE_NAME_SPACE.ticTacToe);

  const [showSettingMenu, setShowSettingMenu] = useState<boolean>(true);
  const [boardSize, setBoardSize] = useState<number>(
    TIC_TAC_TOE_CONFIG.boardSize.simple,
  );
  const [squares, setSquares] = useState<SquareValue[]>(
    Array(Math.pow(boardSize, 2)).fill(null),
  );
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(-1);
  const [totalMoves, setTotalMoves] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<SquareValue>(null);

  const move = useCallback(
    (index: number) => {
      let newSquares: SquareValue[] = [...squares];
      newSquares[index] = getCurrentPlayer(totalMoves);
      setSquares(newSquares);
      setCurrentMoveIndex(index);
      setTotalMoves(totalMoves + 1);
    },
    [squares, totalMoves],
  );

  useEffect(() => {
    let aiPlayerWorker: Worker;
    function aiMove() {
      aiPlayerWorker = new Worker(
        new URL('@/app/workers/ticTacToeAIWorker', import.meta.url),
      );
      aiPlayerWorker.onmessage = (event) => {
        if (!isNaN(event.data)) {
          move(event.data);
        }
      };

      aiPlayerWorker.onerror = (event) => {
        if (event instanceof Event) {
          return event;
        }
        throw event;
      };
      aiPlayerWorker.postMessage({
        squares,
        boardSize,
        totalMoves,
        playerAi: TIC_TAC_TOE_CONFIG.playerAi,
        playerUser: TIC_TAC_TOE_CONFIG.playerUser,
      });
    }
    const { gameOver, winner } = calculateWinner(
      squares,
      boardSize,
      currentMoveIndex,
      totalMoves,
    );
    setWinner(winner);
    if (!gameOver) {
      if (getCurrentPlayer(totalMoves) === TIC_TAC_TOE_CONFIG.playerAi) {
        aiMove();
      }
    }
    setIsGameOver(gameOver);
    return () => {
      if (aiPlayerWorker) {
        aiPlayerWorker.terminate();
      }
    };
  }, [squares, currentMoveIndex, totalMoves, boardSize, move]);

  const gameStatus = useCallback(() => {
    return !isGameOver
      ? t('player.turn', {
          player: getCurrentPlayer(totalMoves),
        })
      : winner !== null
        ? t('player.win', { player: winner })
        : t('player.draw', {
            player1: TIC_TAC_TOE_CONFIG.playerUser,
            player2: TIC_TAC_TOE_CONFIG.playerAi,
          });
  }, [totalMoves, isGameOver, t, winner]);

  function getCurrentPlayer(stepCount: number): SquareValue {
    return stepCount % 2 === 0
      ? TIC_TAC_TOE_CONFIG.playerUser
      : TIC_TAC_TOE_CONFIG.playerAi;
  }

  function handleSquareClick(index: number) {
    if (
      isGameOver ||
      getCurrentPlayer(totalMoves) === TIC_TAC_TOE_CONFIG.playerAi ||
      squares[index] !== null
    ) {
      return;
    }
    move(index);
  }

  function resetGame(size: number = boardSize) {
    setSquares(Array(Math.pow(size, 2)).fill(null));
    setCurrentMoveIndex(-1);
    setTotalMoves(0);
    setIsGameOver(false);
    setWinner(null);
  }

  function changeBoardSize(size: number) {
    setBoardSize(size);
    resetGame(size);
  }

  function toggleSettingMenu(show: boolean) {
    if (show !== showSettingMenu) {
      resetGame();
      setShowSettingMenu(show);
    }
  }

  function BoardLevelButton(level: string) {
    const isSelected: boolean =
      boardSize === TIC_TAC_TOE_CONFIG.boardSize[level];
    const size: number = TIC_TAC_TOE_CONFIG.boardSize[level];
    return (
      <BaseButton
        bold={isSelected}
        key={`level-${level}`}
        className={clsx(
          'flex aspect-square flex-col p-2',
          isSelected ? 'bg-sky-50 text-sky-500 hover:bg-sky-100' : '',
        )}
        onClick={() => changeBoardSize(size)}
      >
        <p>{`${size} x ${size}`}</p>
        <p>{t(`level.${level}`)}</p>
      </BaseButton>
    );
  }

  return showSettingMenu ? (
    <div className="flex w-44 flex-col place-items-center md:w-72">
      <p className="text-lg">{t('level.select')}</p>
      <div className="m-4 flex w-full flex-col gap-2 md:flex-row">
        {Object.values(TIC_TAC_TOE_CONFIG.level).map((level) =>
          BoardLevelButton(level),
        )}
      </div>
      <BaseButton onClick={() => toggleSettingMenu(false)}>
        {t('start')}
      </BaseButton>
    </div>
  ) : (
    <div className="flex w-72 flex-col place-items-center gap-4">
      <p
        className={clsx(
          `${kanit.className} text-lg`,
          isGameOver ? 'text-sky-500' : 'text-gray-500',
        )}
      >
        {gameStatus()}
      </p>
      <div
        className={clsx('grid aspect-square w-full', {
          'grid-cols-3 grid-rows-3':
            boardSize === TIC_TAC_TOE_CONFIG.boardSize.simple,
          'grid-cols-4 grid-rows-4':
            boardSize === TIC_TAC_TOE_CONFIG.boardSize.mid,
          'grid-cols-5 grid-rows-5':
            boardSize === TIC_TAC_TOE_CONFIG.boardSize.hard,
        })}
      >
        {squares.map((square, index) => (
          <BaseButton
            key={`square-${index}`}
            className="text-3xl"
            onClick={() => handleSquareClick(index)}
          >
            {square}
          </BaseButton>
        ))}
      </div>
      <BaseButton onClick={() => resetGame()}>{t('replay')}</BaseButton>
      <BaseButton onClick={() => toggleSettingMenu(true)}>
        {t('level.reselect-level')}
      </BaseButton>
    </div>
  );
}
