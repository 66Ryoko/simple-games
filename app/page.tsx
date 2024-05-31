import Image from 'next/image';
import { kanit } from '@/app/ui/fonts';
export default function Home() {
  return (
    <main
      className="p-0"
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      <Image
        alt="hero image"
        src="/hero-desktop.jpg"
        fill
        style={{
          objectFit: 'cover',
        }}
        className="hidden md:block"
      />
      <Image
        alt="hero image"
        src="/hero-mobile.jpg"
        fill
        style={{
          objectFit: 'cover',
        }}
        className="block md:hidden"
      />
      <div className="absolute inset-x-0 top-1/4 z-10 mx-auto flex items-center justify-center">
        <p
          className={`${kanit.className} text-4xl text-gray-50 sm:text-5xl md:text-7xl md:text-gray-800 `}
        >
          Let's play!
        </p>
      </div>
    </main>
  );
}
