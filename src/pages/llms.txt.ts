import { absoluteUrl, siteConfig } from "../data/seo";

export function GET() {
  const body = `# ${siteConfig.siteName}

> ${siteConfig.description}

## Primary entity
- Brand: ${siteConfig.brandName}
- Person: ${siteConfig.personName}
- Role: Flutter Developer
- Location: ${siteConfig.location}

## Important URLs
- Home: ${absoluteUrl("/")}
- Projects: ${absoluteUrl("/projects")}
- Certificates: ${absoluteUrl("/certificates")}
- Blog: ${absoluteUrl("/blog")}
- Article: ${absoluteUrl("/blog/how-to-build-scalable-flutter-app-architecture")}

## Topics
- Flutter development
- Mobile app architecture
- Clean architecture
- REST API integration
- Mobile performance optimization

## Contact
- Email: ${siteConfig.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
