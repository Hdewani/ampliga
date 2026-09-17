import type {Metadata} from 'next';
import V2Page from '@/components/V2Page';
import './site.css';

const homeTitle='Ampliga — We Build What Moves Businesses Forward';
const homeDescription='Strategy, design, technology, AI and growth systems for ambitious businesses.';
export const metadata:Metadata={
 title:{absolute:homeTitle},
 description:homeDescription,
 alternates:{canonical:'/'},
 openGraph:{title:homeTitle,description:homeDescription,url:'/',siteName:'Ampliga',type:'website',images:[{url:'https://www.ampliga.com/opengraph-image',width:1200,height:630,alt:'Ampliga — strategy, design, technology, AI and growth'}]},
 twitter:{card:'summary_large_image',title:homeTitle,description:homeDescription,images:['https://www.ampliga.com/opengraph-image']}
};

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
 telephone:'+91-99990-28398',
 foundingDate:'2009',
 contactPoint:{
  '@type':'ContactPoint',
  contactType:'sales and customer enquiries',
  telephone:'+91-99990-28398',
  email:'hello@ampliga.com',
  availableLanguage:['English','Hindi']
 },
 description:'An independent digital studio creating brand, technology, AI automation and growth systems.'
};

export default function Home(){return <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/>
 <V2Page/>
</>}
