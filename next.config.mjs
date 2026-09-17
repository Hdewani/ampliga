/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The HNM case study moved from a campaign-named slug to a brand-named one,
      // so the URL matches the page's h1, title and breadcrumb. The old path is
      // already indexed via the sitemap, so preserve its ranking signals.
      {
        source: '/work/hnm-meta-campaign',
        destination: '/work/hnm-realtors',
        statusCode: 301
      }
    ];
  }
};

export default nextConfig;
