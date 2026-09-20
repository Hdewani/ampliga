import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';
import ScrollAnimations from '@/components/ScrollAnimations';

const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' });
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-instrument-serif', display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

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
  const fontVariables = `${instrumentSans.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} ${manrope.variable}`;
  return <html lang="en" className={fontVariables}><body><ScrollAnimations />{children}</body></html>
}
