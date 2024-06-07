import { SquareValue, TIC_TAC_TOE_CONFIG } from '@/app/lib/definitions';
function getSquare(
  row: number,
  column: number,
  boardWidth: number,
  squares: SquareValue[],
): SquareValue {
  return squares[column * boardWidth + row];
}
export function checkIsSameRowOrColumn(
  row: number,
  column: number,
  boardWidth: number,
  squares: SquareValue[],
): SquareValue {
  let square: SquareValue = getSquare(row, column, boardWidth, squares);
  let sameRow: boolean = true,
    sameColumn: boolean = true;
  let i: number = 0;

  while ((sameRow || sameColumn) && i < boardWidth) {
    if (sameRow) {
      sameRow = getSquare(row, i, boardWidth, squares) === square;
    }
    if (sameColumn) {
      sameColumn = getSquare(i, column, boardWidth, squares) === square;
    }
    i++;
  }
  if (sameRow || sameColumn) {
    return square;
  } else {
    return null;
  }
}
export function checkIsSameDiagonal(
  row: number,
  column: number,
  boardWidth: number,
  squares: SquareValue[],
): SquareValue {
  if (row !== column && row != boardWidth - column - 1) {
    return null;
  }
  let square: SquareValue = getSquare(row, column, boardWidth, squares);
  let sameDiagonal: boolean = true,
    sameAntiDiagonal: boolean = true;
  let i: number = 0;
  while ((sameDiagonal || sameAntiDiagonal) && i < boardWidth) {
    if (sameDiagonal) {
      sameDiagonal = getSquare(i, i, boardWidth, squares) === square;
    }
    if (sameAntiDiagonal) {
      sameAntiDiagonal =
        getSquare(boardWidth - i - 1, i, boardWidth, squares) === square;
    }
    i++;
  }
  if (sameDiagonal || sameAntiDiagonal) {
    return square;
  } else {
    return null;
  }
}
export function calculateWinner(
  squares: SquareValue[],
  boardSize: number,
  currentMoveIndex: number,
  totalMoves: number,
): { gameOver: boolean; winner: SquareValue } {
  if (totalMoves < boardSize) {
    return { gameOver: false, winner: null };
  }
  const row: number = currentMoveIndex % boardSize;
  const column: number = (currentMoveIndex - row) / boardSize;

  let winner: SquareValue = null;
  winner = checkIsSameRowOrColumn(row, column, boardSize, squares);
  if (winner !== null) {
    return { gameOver: true, winner: winner };
  } else {
    winner = checkIsSameDiagonal(row, column, boardSize, squares);
    let gameOver: boolean =
      totalMoves === Math.pow(boardSize, 2) || winner !== null;
    return { gameOver: gameOver, winner: winner };
  }
}

export function alphaBetaPruning(
  squares: SquareValue[],
  boardSize: number,
  isMaximizingPlayer: boolean,
  currentMoveIndex: number,
  totalMoves: number,
  depth: number,
  alpha: number,
  beta: number,
): number {
  const { gameOver, winner } = calculateWinner(
    squares,
    boardSize,
    currentMoveIndex,
    totalMoves,
  );
  if (winner === TIC_TAC_TOE_CONFIG.playerAi) {
    return TIC_TAC_TOE_CONFIG.maxDepth - depth;
  } else if (winner === TIC_TAC_TOE_CONFIG.playerUser) {
    return depth - TIC_TAC_TOE_CONFIG.maxDepth;
  } else if (gameOver || depth === TIC_TAC_TOE_CONFIG.maxDepth) {
    return 0;
  }
  let bestScore: number = isMaximizingPlayer ? -Infinity : Infinity;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = isMaximizingPlayer
        ? TIC_TAC_TOE_CONFIG.playerAi
        : TIC_TAC_TOE_CONFIG.playerUser;
      let score: number = alphaBetaPruning(
        squares,
        boardSize,
        !isMaximizingPlayer,
        i,
        totalMoves + 1,
        alpha,
        beta,
        depth + 1,
      );
      squares[i] = null;
      if (isMaximizingPlayer) {
        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, score);
      } else {
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, score);
      }
      if (beta <= alpha) {
        break;
      }
    }
  }
  return bestScore;
}
