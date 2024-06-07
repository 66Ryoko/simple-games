import { alphaBetaPruning, getPossibleMoves } from '@/app/lib/utils';
import { SquareValue, TIC_TAC_TOE_CONFIG } from '@/app/lib/definitions';
type TicTacToeAIWorkerMsg = {
  squares: SquareValue[];
  boardSize: number;
  totalMoves: number;
};

self.onmessage = (event: MessageEvent<TicTacToeAIWorkerMsg>) => {
  const { squares, boardSize, totalMoves } = event.data;

  let tmpSquares = [...squares];
  let possibleMoves: number[] = getPossibleMoves(squares);
  let bestScore: number = -Infinity;
  let bestMoveIndex: number = -1;
  const scoreMap = new Map<string, number>();
  possibleMoves.forEach((i) => {
    tmpSquares[i] = TIC_TAC_TOE_CONFIG.playerAi;
    let score: number = alphaBetaPruning(
      tmpSquares,
      boardSize,
      false,
      i,
      totalMoves + 1,
      0,
      -Infinity,
      Infinity,
      scoreMap,
    );
    tmpSquares[i] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMoveIndex = i;
    }
  });
  if (bestMoveIndex === -1) {
    bestMoveIndex =
      possibleMoves[Math.floor(Math.random() * (possibleMoves.length - 1))];
  }
  postMessage(bestMoveIndex);
};
