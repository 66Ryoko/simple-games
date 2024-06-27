export enum PLAYERS {
  'O' = 'O',
  'X' = 'X',
}
export type SquareValue = PLAYERS.O | PLAYERS.X | null;
const LEVEL = { simple: 'simple', mid: 'mid', hard: 'hard' };
export const CONFIG = {
  playerUser: PLAYERS.O,
  playerAi: PLAYERS.X,
  maxDepth: 5,
  level: LEVEL,
  boardSize: {
    [LEVEL.simple]: 3,
    [LEVEL.mid]: 4,
    [LEVEL.hard]: 5,
  },
  aiTimeout: 3000,
};
export interface AIWorkerMsg {
  squares: SquareValue[];
  boardSize: number;
  totalMoves: number;
  subPossibleMoves: number[];
}
export interface AIWorkerResponse {
  bestMoveIndex: number;
  bestScore: number;
}
export interface GameResult {
  isGameOver: boolean;
  winner: SquareValue;
}
export interface State extends GameResult {
  userScore: number;
  aiScore: number;
  boardSize: number;
  squares: SquareValue[];
  currentPlayer: PLAYERS.O | PLAYERS.X;
  currentMoveIndex: number;
  totalMoves: number;
}
