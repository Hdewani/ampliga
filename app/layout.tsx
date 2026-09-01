import type { Metadata } from 'next';
import './globals.css';
import ScrollAnimations from '@/components/ScrollAnimations';
import DesignSwitcher from '@/components/DesignSwitcher';

export const metadata: Metadata = {
  metadataBase: new URL('https://ampliga.com'),
  title: 'Ampliga — Build. Automate. Grow.',
  description: 'Technology, AI automation and growth systems for ambitious businesses.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg'
  },
  alternates: { canonical: '/' },
  openGraph: { title: 'Ampliga — Build. Automate. Grow.', description: 'We build digital systems that move businesses forward.', type: 'website' }
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><ScrollAnimations /><DesignSwitcher />{children}</body></html>
}
