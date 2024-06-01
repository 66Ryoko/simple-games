'use client';
import { useEffect, useState } from 'react';
import { TicTacToePlayers, SquareValue } from '@/app/lib/definitions';
import Square from '@/app/ui/tic-tac-toe/square';
import { kanit } from '@/app/fonts';
import clsx from 'clsx';

const BOARD_WIDTH = 3;
export default function Board() {
  const [squares, setSquares] = useState<SquareValue[]>(
    Array(Math.pow(BOARD_WIDTH, 2)).fill(null),
  );
  const [filledSquareCount, setFilledSquareCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<SquareValue>(null);

  useEffect(() => {
    function calculateWinner(): SquareValue {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [first, second, third] = lines[i];
        if (
          squares[first] != null &&
          squares[first] === squares[second] &&
          squares[first] === squares[third]
        ) {
          return squares[first];
        }
      }
      return null;
    }
    let winner: SquareValue = calculateWinner();
    setWinner(winner);
    setIsGameOver(
      filledSquareCount === Math.pow(BOARD_WIDTH, 2) || winner !== null,
    );
  }, [squares, filledSquareCount]);

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
    setFilledSquareCount(filledSquareCount + 1);
  }

  function resetGame() {
    setSquares(Array(Math.pow(BOARD_WIDTH, 2)).fill(null));
    setFilledSquareCount(0);
    setIsGameOver(false);
    setWinner(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <p
        className={clsx(
          `${kanit.className} text-center text-lg`,
          isGameOver ? 'text-blue-500' : 'text-gray-500',
        )}
      >
        {!isGameOver
          ? `${getCurrentPlayer(filledSquareCount)} Turn`
          : winner !== null
            ? `${winner} Win!`
            : `${TicTacToePlayers.O} ${TicTacToePlayers.X} Draw!`}
      </p>
      <div
        className={`grid h-60 w-60 grid-cols-${BOARD_WIDTH} grid-rows-${BOARD_WIDTH}`}
      >
        {squares.map((square, index) => (
          <Square
            key={`square-${index}`}
            squareValue={square}
            onSquareClick={() => handleSquareClick(index)}
          />
        ))}
      </div>
      {
        <button
          onClick={resetGame}
          className={`flex w-full items-center justify-center border border-gray-100 bg-gray-50 p-2 hover:bg-gray-100`}
        >
          Replay
        </button>
      }
    </div>
  );
}
