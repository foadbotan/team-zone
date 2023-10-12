import NavBar from '@/components/NavBar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team Zones - Free Time Zone Collaboration Tool',
  description:
    'Effortlessly collaborate across time zones with Team Zones, a free tool designed to simplify scheduling, enhance coordination, and empower your global team',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
