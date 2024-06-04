'use client';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
import BaseButton from '@/app/[locale]/ui/baseButton';
import { kanit } from '@/app/[locale]/fonts';
import {
  TIC_TAC_TOE_LEVEL,
  BOARD_SIZES,
  TicTacToePlayers,
  SquareValue,
} from '@/app/lib/definitions';
import { checkIsSameRowOrColumn, checkIsSameDiagonal } from '@/app/lib/utils';

export default function Board() {
  const t = useTranslations(LOCALE_NAME_SPACE.ticTacToe);

  const [showSettingMenu, setShowSettingMenu] = useState<boolean>(true);
  const [boardSize, setBoardSize] = useState<number>(BOARD_SIZES.simple);
  const [squares, setSquares] = useState<SquareValue[]>(
    Array(Math.pow(boardSize, 2)).fill(null),
  );
  const [currentSquareIndex, setCurrentSquareIndex] = useState<number>(-1);
  const [filledSquareCount, setFilledSquareCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<SquareValue>(null);

  useEffect(() => {
    function calculateWinner(): SquareValue {
      if (filledSquareCount < boardSize) {
        return null;
      }
      const row: number = currentSquareIndex % boardSize;
      const column: number = (currentSquareIndex - row) / boardSize;

      let winner: SquareValue = null;
      winner = checkIsSameRowOrColumn(row, column, boardSize, squares);
      if (winner !== null) {
        return winner;
      }

      winner = checkIsSameDiagonal(row, column, boardSize, squares);
      return winner;
    }
    let winner: SquareValue = calculateWinner();
    setWinner(winner);
    setIsGameOver(
      filledSquareCount === Math.pow(boardSize, 2) || winner !== null,
    );
  }, [squares, currentSquareIndex, filledSquareCount, boardSize]);

  const gameStatus = useCallback(() => {
    return !isGameOver
      ? t('player.turn', {
          player: getCurrentPlayer(filledSquareCount),
        })
      : winner !== null
        ? t('player.win', { player: winner })
        : t('player.draw', {
            player1: TicTacToePlayers.O,
            player2: TicTacToePlayers.X,
          });
  }, [filledSquareCount, isGameOver, t, winner]);

  function getCurrentPlayer(stepCount: number): SquareValue {
    return stepCount % 2 === 0 ? TicTacToePlayers.O : TicTacToePlayers.X;
  }

  function handleSquareClick(index: number) {
    if (isGameOver || squares[index] !== null) {
      return;
    }
    setSquares((oldSquares) => {
      let newSquares: SquareValue[] = [...oldSquares];
      newSquares[index] = getCurrentPlayer(filledSquareCount);
      return newSquares;
    });
    setCurrentSquareIndex(index);
    setFilledSquareCount(filledSquareCount + 1);
  }

  function resetGame(size: number = boardSize) {
    setSquares(Array(Math.pow(size, 2)).fill(null));
    setCurrentSquareIndex(-1);
    setFilledSquareCount(0);
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
    const isSelected: boolean = boardSize === BOARD_SIZES[level];
    const size: number = BOARD_SIZES[level];
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
        {Object.values(TIC_TAC_TOE_LEVEL).map((level) =>
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
          'grid-cols-3 grid-rows-3': boardSize === BOARD_SIZES.simple,
          'grid-cols-4 grid-rows-4': boardSize === BOARD_SIZES.mid,
          'grid-cols-5 grid-rows-5': boardSize === BOARD_SIZES.hard,
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
