import { alphaBetaPruning } from '@/app/lib/utils';
import { SquareValue, TIC_TAC_TOE_CONFIG } from '../lib/definitions';
type TicTacToeAIWorkerMsg = {
  squares: SquareValue[];
  boardSize: number;
  totalMoves: number;
};
self.onmessage = (event: MessageEvent<TicTacToeAIWorkerMsg>) => {
  const { squares, boardSize, totalMoves } = event.data;

  let tmpSquares = [...squares];
  let bestScore: number = -Infinity;
  let bestMoveIndex: number = -1;
  for (let i = 0; i < tmpSquares.length; i++) {
    if (tmpSquares[i] === null) {
      if (bestMoveIndex === -1) {
        bestMoveIndex = i;
      }
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
      );
      tmpSquares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMoveIndex = i;
      }
    }
  }
  postMessage(bestMoveIndex);
};
