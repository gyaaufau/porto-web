import { portfolioCertificates, portfolioProjects } from "../data/portfolio";
import { absoluteUrl } from "../data/seo";

const staticPages = [
  "/",
  "/projects",
  "/certificates",
  "/blog",
  "/blog/how-to-build-scalable-flutter-app-architecture"
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const lastmod = new Date().toISOString();
  const urls = [
    ...staticPages.map((path) => absoluteUrl(path)),
    ...portfolioProjects.map((project) => absoluteUrl(`/projects/${project.id}`)),
    ...portfolioCertificates.map((certificate) => absoluteUrl(`/certificates/${certificate.id}`))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
