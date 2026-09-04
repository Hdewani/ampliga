import type {Metadata} from 'next';
import V2Page from '@/components/V2Page';
import './site.css';

export const metadata:Metadata={title:'Ampliga — We Build What Moves Businesses Forward',description:'Strategy, design, technology, AI and growth systems for ambitious businesses.'};

export default function Home(){return <V2Page/>}
