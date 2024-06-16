'use client';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LOCALE_NAME_SPACE } from '@/i18n.config';
import BaseButton from '@/app/[locale]/ui/base-button';
import ScoreBoard from '@/app/[locale]/ui/tic-tac-toe/score-board';
import { kanit } from '@/app/[locale]/fonts';
import { TicTacToe } from '@/app/lib/definitions';
import { TicTacToeAIWorkerController } from '@/app/workers/tic-tac-toe/worker-controller';
import { calculateWinner, getPossibleMoves } from '@/app/lib/utils';
import { useAppDispatch, useAppSelector } from '@/app/lib/state/hook';
import {
  setBoardSize,
  move,
  updateGameResult,
  resetGameStates,
} from '@/app/lib/state/reducers/tic-tac-toe-reducer';

const MAX_WORKERS_NUM = 4;
export default function Board() {
  const t = useTranslations(LOCALE_NAME_SPACE.ticTacToe);
  const {
    isGameOver,
    winner,
    boardSize,
    squares,
    currentMoveIndex,
    totalMoves,
    currentPlayer,
  } = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();

  const [showSettingMenu, setShowSettingMenu] = useState<boolean>(true);
  const [workers, setWorkers] = useState<TicTacToeAIWorkerController[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  useEffect(() => {
    function aiMove() {
      const possibleMoves: number[] = getPossibleMoves(squares);
      const numOfWorkers: number = Math.min(
        possibleMoves.length,
        MAX_WORKERS_NUM,
      );
      const squaresPerWorker = Math.ceil(possibleMoves.length / numOfWorkers);
      let workerControllers: TicTacToeAIWorkerController[] = [];
      for (let i = 0; i < numOfWorkers; i++) {
        const start = i * squaresPerWorker;
        const end = Math.min(start + squaresPerWorker, possibleMoves.length);
        workerControllers.push(
          new TicTacToeAIWorkerController({
            action: {
              squares,
              boardSize,
              totalMoves,
              subPossibleMoves: possibleMoves.slice(start, end),
            },
          }),
        );
      }
      setWorkers(workerControllers);
      Promise.all(workerControllers.map((worker) => worker.postMessage())).then(
        (results) => {
          let bestMove = results.reduce((best, current) =>
            current.bestScore > best.bestScore ? current : best,
          );
          if (bestMove.bestMoveIndex === -1) {
            bestMove.bestMoveIndex =
              possibleMoves[
                Math.floor(Math.random() * (possibleMoves.length - 1))
              ];
          }
          dispatch(move({ index: bestMove.bestMoveIndex }));
          setWorkers([]);
        },
      );
    }

    if (!isCalculating) {
      setIsCalculating(true);
      const { gameOver, winner } = calculateWinner(
        squares,
        boardSize,
        currentMoveIndex,
        totalMoves,
      );
      if (!gameOver) {
        if (currentPlayer === TicTacToe.CONFIG.playerAi) {
          aiMove();
        }
      } else {
        dispatch(updateGameResult({ isGameOver: gameOver, winner }));
      }
      setIsCalculating(false);
    }
  }, [
    squares,
    currentPlayer,
    currentMoveIndex,
    totalMoves,
    boardSize,
    isCalculating,
    dispatch,
  ]);

  const gameStatus = useCallback(() => {
    return !isGameOver
      ? t('player.turn', {
          player: currentPlayer,
        })
      : winner !== null
        ? t('player.win', { player: winner })
        : t('player.draw', {
            player1: TicTacToe.CONFIG.playerUser,
            player2: TicTacToe.CONFIG.playerAi,
          });
  }, [currentPlayer, isGameOver, t, winner]);

  function handleSquareClick(index: number) {
    if (
      isGameOver ||
      currentPlayer === TicTacToe.CONFIG.playerAi ||
      squares[index] !== null
    ) {
      return;
    }
    dispatch(move({ index }));
  }

  function resetGame() {
    dispatch(resetGameStates());
    if (workers && workers.length > 0) {
      workers.forEach((worker) => worker.terminate());
      setWorkers([]);
    }
  }

  function changeBoardSize(size: number) {
    dispatch(setBoardSize(size));
  }

  function toggleSettingMenu(show: boolean) {
    if (show !== showSettingMenu) {
      resetGame();
      setShowSettingMenu(show);
    }
  }

  function BoardLevelButton(level: string) {
    const isSelected: boolean = boardSize === TicTacToe.CONFIG.boardSize[level];
    const size: number = TicTacToe.CONFIG.boardSize[level];
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
        {Object.values(TicTacToe.CONFIG.level).map((level) =>
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
      <ScoreBoard />
      <div
        className={clsx('grid aspect-square w-full', {
          'grid-cols-3 grid-rows-3':
            boardSize === TicTacToe.CONFIG.boardSize.simple,
          'grid-cols-4 grid-rows-4':
            boardSize === TicTacToe.CONFIG.boardSize.mid,
          'grid-cols-5 grid-rows-5':
            boardSize === TicTacToe.CONFIG.boardSize.hard,
        })}
      >
        {squares.map((square, index) => (
          <BaseButton
            highlight={index === currentMoveIndex}
            key={`square-${index}`}
            className="text-3xl"
            onClick={() => handleSquareClick(index)}
          >
            {square}
          </BaseButton>
        ))}
      </div>
      <BaseButton
        highlight={isGameOver}
        bounce={isGameOver}
        onClick={() => resetGame()}
      >
        {t('replay')}
      </BaseButton>
      <BaseButton onClick={() => toggleSettingMenu(true)}>
        {t('level.reselect-level')}
      </BaseButton>
    </div>
  );
}
