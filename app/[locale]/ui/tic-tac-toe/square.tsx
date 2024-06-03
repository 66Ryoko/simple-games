import { SquareValue } from '@/app/lib/definitions';
import { kanit } from '@/app/[locale]/fonts';
export default function Square({
  squareValue,
  onSquareClick,
}: {
  squareValue: SquareValue;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onSquareClick}
      className={`${kanit.className} flex h-full w-full items-center justify-center border border-gray-100 bg-gray-50 text-3xl font-bold hover:bg-gray-100`}
    >
      {squareValue}
    </button>
  );
}
