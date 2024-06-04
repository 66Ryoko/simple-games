import { SquareValue } from '@/app/lib/definitions';
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
