'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesignSwitcher(){
  const pathname=usePathname();
  if(pathname!=='/v2') return null;
  return <Link href="/" className="design-switcher">VIEW NEW DESIGN ↗</Link>;
}
