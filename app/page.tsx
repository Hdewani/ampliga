import type {Metadata} from 'next';
import V2Page from '@/components/V2Page';
import './site.css';

export const metadata:Metadata={title:'Ampliga — We Build What Moves Businesses Forward',description:'Strategy, design, technology, AI and growth systems for ambitious businesses.'};

const websiteSchema={
 '@context':'https://schema.org',
 '@type':'WebSite',
 '@id':'https://www.ampliga.com/#website',
 name:'Ampliga',
 alternateName:['Ampliga Studio','Ampliga Digital Studio'],
 url:'https://www.ampliga.com/'
};

const organizationSchema={
 '@context':'https://schema.org',
 '@type':'Organization',
 '@id':'https://www.ampliga.com/#organization',
 name:'Ampliga',
 url:'https://www.ampliga.com/',
 logo:'https://www.ampliga.com/ampliga-logo.png',
 email:'hello@ampliga.com',
 description:'An independent digital studio creating brand, technology, AI automation and growth systems.'
};

export default function Home(){return <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/>
 <V2Page/>
</>}
