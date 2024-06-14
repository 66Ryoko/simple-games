import { SquareValue, TIC_TAC_TOE_CONFIG } from '@/app/lib/definitions';

function getSquareIndex(
  row: number,
  column: number,
  boardWidth: number,
): number {
  return column * boardWidth + row;
}
export function checkIsSameRowOrColumn(
  row: number,
  column: number,
  boardWidth: number,
  squares: SquareValue[],
): SquareValue {
  let square: SquareValue = squares[getSquareIndex(row, column, boardWidth)];
  let sameRow: boolean = true,
    sameColumn: boolean = true;
  let i: number = 0;

  while ((sameRow || sameColumn) && i < boardWidth) {
    if (sameRow && i !== column) {
      sameRow = squares[getSquareIndex(row, i, boardWidth)] === square;
    }
    if (sameColumn && i !== row) {
      sameColumn = squares[getSquareIndex(i, column, boardWidth)] === square;
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
  let square: SquareValue = squares[getSquareIndex(row, column, boardWidth)];
  let sameDiagonal: boolean = true,
    sameAntiDiagonal: boolean = true;
  let i: number = 0;
  while ((sameDiagonal || sameAntiDiagonal) && i < boardWidth) {
    if (sameDiagonal && !(i === row && i === column)) {
      sameDiagonal = squares[getSquareIndex(i, i, boardWidth)] === square;
    }
    if (sameAntiDiagonal && !(boardWidth - i - 1 === row && i === column)) {
      sameAntiDiagonal =
        squares[getSquareIndex(boardWidth - i - 1, i, boardWidth)] === square;
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
  if (totalMoves < boardSize * 2) {
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
  scoreMap: Map<string, number>,
): number {
  const key: string = getScoreMapKey(squares);
  let scoreInMap: number | undefined = scoreMap.get(key);
  if (scoreInMap && scoreInMap !== Infinity && scoreInMap !== -Infinity) {
    return scoreInMap;
  }
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
  let possibleMoves: number[] = getPossibleMoves(squares);
  possibleMoves.every((i) => {
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
      scoreMap,
    );
    squares[i] = null;
    if (isMaximizingPlayer) {
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, score);
    } else {
      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, score);
    }
    return beta > alpha;
  });
  scoreMap.set(key, bestScore);
  return bestScore;
}
function getScoreMapKey(squares: SquareValue[]): string {
  return squares.join();
}
export function getPossibleMoves(squares: SquareValue[]): number[] {
  let possibleMoves: number[] = [];
  squares.forEach((square, index) => {
    if (square === null) {
      possibleMoves.push(index);
    }
  });
  return possibleMoves;
}
