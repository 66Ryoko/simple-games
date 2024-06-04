export const TIC_TAC_TOE_LEVEL = { simple: 'simple', mid: 'mid', hard: 'hard' };
export const BOARD_SIZES = {
  [TIC_TAC_TOE_LEVEL.simple]: 3,
  [TIC_TAC_TOE_LEVEL.mid]: 4,
  [TIC_TAC_TOE_LEVEL.hard]: 5,
};
export enum TicTacToePlayers {
  'O' = 'O',
  'X' = 'X',
}
export type SquareValue = TicTacToePlayers.O | TicTacToePlayers.X | null;
