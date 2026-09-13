import type {MetadataRoute} from 'next';

const baseUrl='https://www.ampliga.com';

export default function sitemap():MetadataRoute.Sitemap{
 const projectSlugs=[
  'tradeghar',
  'jp-associates',
  'sarox',
  'purely-saatvik',
  'hnm-meta-campaign'
 ];

 return [
  {url:baseUrl,changeFrequency:'monthly',priority:1},
  ...projectSlugs.map(slug=>({
   url:`${baseUrl}/work/${slug}`,
   changeFrequency:'monthly' as const,
   priority:.8
  })),
  {url:`${baseUrl}/privacy`,changeFrequency:'yearly',priority:.2},
  {url:`${baseUrl}/terms`,changeFrequency:'yearly',priority:.2}
 ];
}
