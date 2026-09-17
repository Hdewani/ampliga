import type { Metadata } from 'next';
import './globals.css';
import ScrollAnimations from '@/components/ScrollAnimations';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ampliga.com'),
  applicationName: 'Ampliga',
  title: {
    default: 'Ampliga — Build. Automate. Grow.',
    template: '%s | Ampliga'
  },
  description: 'Technology, AI automation and growth systems for ambitious businesses.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg'
  }
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><ScrollAnimations />{children}</body></html>
}
