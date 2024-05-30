import Image from 'next/image';
import { kanit } from '@/app/ui/fonts';
export default function NavBar() {
  return (
    <div className="align-center sticky top-0 flex h-16 w-full content-center items-center justify-between border-b border-gray-200 bg-white px-12 py-2 shadow-lg shadow-gray-100">
      <div className="flex content-center justify-start gap-2">
        <Image src="/logo.png" width="32" height="32" alt="Simple Games Logo" />
        <p className={`${kanit.className} hidden text-xl md:block`}>
          Simple Games
        </p>
      </div>
      <p className="rounded-full bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-500 hover:bg-sky-100">
        Tic-Toc-Toe
      </p>
    </div>
  );
}
