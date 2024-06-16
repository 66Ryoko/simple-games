import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicTacToe } from '@/app/lib/definitions';
import { genSquares } from '@/app/lib/utils';

const DEFAULT_BOARD_SIZE = TicTacToe.CONFIG.boardSize.simple;
const initialState: TicTacToe.State = {
  isGameOver: false,
  winner: null,
  userScore: 0,
  aiScore: 0,
  squares: genSquares(DEFAULT_BOARD_SIZE),
  boardSize: DEFAULT_BOARD_SIZE,
  currentPlayer: TicTacToe.CONFIG.playerUser,
  currentMoveIndex: -1,
  totalMoves: 0,
};
const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    setBoardSize(state, action: PayloadAction<number>) {
      state.boardSize = action.payload;
      resetGameStates();
    },
    move(state, action: PayloadAction<{ index: number }>) {
      if (action.payload.index < state.squares.length) {
        let newSquares: TicTacToe.SquareValue[] = [...state.squares];
        newSquares[action.payload.index] = state.currentPlayer;
        state.squares = newSquares;
        state.currentMoveIndex = action.payload.index;
        state.totalMoves += 1;
        state.currentPlayer =
          state.currentPlayer === TicTacToe.CONFIG.playerUser
            ? TicTacToe.CONFIG.playerAi
            : TicTacToe.CONFIG.playerUser;
      }
    },
    updateGameResult: (state, action: PayloadAction<TicTacToe.GameResult>) => {
      state.isGameOver = action.payload.isGameOver;
      state.winner = action.payload.winner;
      if (action.payload.winner === TicTacToe.CONFIG.playerUser) {
        state.userScore += 1;
      } else if (action.payload.winner === TicTacToe.CONFIG.playerAi) {
        state.aiScore += 1;
      }
    },
    resetGameStates: (state) => {
      state.isGameOver = false;
      state.winner = null;
      state.currentPlayer = TicTacToe.CONFIG.playerUser;
      state.currentMoveIndex = -1;
      state.totalMoves = 0;
      state.squares = genSquares(state.boardSize);
    },
  },
});

export const { setBoardSize, move, updateGameResult, resetGameStates } =
  ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;
