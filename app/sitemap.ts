import type {MetadataRoute} from 'next';

const baseUrl='https://www.ampliga.com';
const siteUpdated='2026-09-18';

export default function sitemap():MetadataRoute.Sitemap{
 const projectSlugs=[
  'tradeghar',
  'jp-associates',
  'sarox',
  'purely-saatvik',
  'hnm-realtors'
 ];

 return [
  {url:baseUrl,lastModified:siteUpdated,changeFrequency:'monthly',priority:1},
  ...projectSlugs.map(slug=>({
   url:`${baseUrl}/work/${slug}`,
   lastModified:siteUpdated,
   changeFrequency:'monthly' as const,
   priority:.8
  })),
  {url:`${baseUrl}/privacy`,lastModified:'2025-09-03',changeFrequency:'yearly',priority:.2},
  {url:`${baseUrl}/terms`,lastModified:'2025-09-03',changeFrequency:'yearly',priority:.2}
 ];
}
