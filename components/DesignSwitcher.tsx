'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesignSwitcher(){
  const pathname=usePathname();
  if(pathname!=='/') return null;
  return <Link href="/v2" className="design-switcher">EXPLORE V2 ↗</Link>;
}
