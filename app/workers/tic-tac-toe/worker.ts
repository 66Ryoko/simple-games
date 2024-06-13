import { alphaBetaPruning } from '@/app/lib/utils';
import {
  TIC_TAC_TOE_CONFIG,
  TicTacToeAIWorkerMsg,
  TicTacToeAIWorkerResponse,
} from '@/app/lib/definitions';

self.onmessage = (event: MessageEvent<TicTacToeAIWorkerMsg>) => {
  const { squares, boardSize, totalMoves, subPossibleMoves } = event.data;
  let tmpSquares = [...squares];
  let bestScore: number = -Infinity;
  let bestMoveIndex: number = -1;
  const scoreMap = new Map<string, number>();
  subPossibleMoves.forEach((i) => {
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
  let response: TicTacToeAIWorkerResponse = {
    bestMoveIndex,
    bestScore,
  };
  postMessage(response);
};
