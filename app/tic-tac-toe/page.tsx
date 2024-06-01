import { Metadata } from 'next';
import Board from '@/app/ui/tic-tac-toe/board';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
};
export default function Page() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <Board />
    </div>
  );
}
