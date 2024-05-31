import type { Metadata } from 'next';
import NavBar from '@/app/ui/navbar';
import { inter } from '@/app/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Simple Games',
    default: 'Simple Games',
  },
  description: 'A simple games website.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
