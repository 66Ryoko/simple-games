import Image from 'next/image';
import Link from 'next/link';
import { kanit } from '@/app/fonts';
export default function NavLogo() {
  return (
    <Link href="/">
      <div className="flex content-center justify-start gap-2">
        <Image src="/logo.png" width="32" height="32" alt="Simple Games Logo" />
        <p className={`${kanit.className} hidden text-xl md:block`}>
          Simple Games
        </p>
      </div>
    </Link>
  );
}
