enum TicTacToePlayers {
  'O' = 'O',
  'X' = 'X',
}
export type SquareValue = TicTacToePlayers.O | TicTacToePlayers.X | null;
const TIC_TAC_TOE_LEVEL = { simple: 'simple', mid: 'mid', hard: 'hard' };
export const TIC_TAC_TOE_CONFIG = {
  playerUser: TicTacToePlayers.O,
  playerAi: TicTacToePlayers.X,
  maxDepth: 5,
  level: TIC_TAC_TOE_LEVEL,
  boardSize: {
    [TIC_TAC_TOE_LEVEL.simple]: 3,
    [TIC_TAC_TOE_LEVEL.mid]: 4,
    [TIC_TAC_TOE_LEVEL.hard]: 5,
  },
};
export type TicTacToeAIWorkerMsg = {
  squares: SquareValue[];
  boardSize: number;
  totalMoves: number;
  subPossibleMoves: number[];
};
export type TicTacToeAIWorkerResponse = {
  bestMoveIndex: number;
  bestScore: number;
};
