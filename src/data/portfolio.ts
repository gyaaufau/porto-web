import type { ImageMetadata } from "astro";
import myPhoto from "./myself/me.jpg";

const contactMarkdown = import.meta.glob("./contact.md", {
  query: "?raw",
  import: "default",
  eager: true
}) as Record<string, string>;

const aboutMarkdown = import.meta.glob("./about.md", {
  query: "?raw",
  import: "default",
  eager: true
}) as Record<string, string>;

export type PortfolioLink = {
  label: string;
  href: string;
  kind: "primary" | "secondary";
  note: string;
};

export type ProjectSectionEntry = {
  title?: string;
  paragraphs: string[];
  bullets: string[];
  codeBlocks: {
    language: string;
    content: string;
  }[];
};

export type ProjectSection = {
  title: string;
  entries: ProjectSectionEntry[];
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type ProjectLogo = {
  src: string;
  alt: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  featured: boolean;
  period: string;
  periodShort: string;
  stack: string[];
  highlight: string;
  details: string[];
  links: {
    label: string;
    href: string;
  }[];
  logo?: ProjectLogo;
  sections: ProjectSection[];
  screenshots: ProjectScreenshot[];
};

const markdownFiles = import.meta.glob("./project/*/project.md", {
  query: "?raw",
  import: "default",
  eager: true
}) as Record<string, string>;

const screenshotFiles = import.meta.glob("./project/*/screenshots/*.{png,jpg,jpeg,JPG,JPEG,webp,WEBP}", {
  eager: true
}) as Record<string, { default: ImageMetadata }>;

const logoFiles = import.meta.glob("./project/*/logo/*.{png,jpg,jpeg,JPG,JPEG,webp,WEBP,svg}", {
  eager: true
}) as Record<string, { default: ImageMetadata | string }>;

const humanizeSlug = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const cleanInline = (value: string) =>
  value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();

const parseFrontmatter = (markdown: string) => {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { metadata: {}, body: markdown };
  }

  const metadata = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        if (separatorIndex === -1) {
          return [line, ""];
        }

        const key = line.slice(0, separatorIndex).trim();
        const rawValue = line.slice(separatorIndex + 1).trim();
        const value =
          rawValue === "true" ? true : rawValue === "false" ? false : rawValue.replace(/^["']|["']$/g, "");
        return [key, value];
      })
  );

  return {
    metadata,
    body: markdown.slice(match[0].length)
  };
};

const contactSource = contactMarkdown["./contact.md"] ?? "";
const parsedContact = parseFrontmatter(contactSource);
const contactData = {
  location: String(parsedContact.metadata.location ?? "Bandung, Indonesia"),
  email: String(parsedContact.metadata.email ?? "hello@example.com"),
  whatsapp: String(parsedContact.metadata.whatsapp ?? "https://wa.me/"),
  github: String(parsedContact.metadata.github ?? "https://github.com/"),
  linkedin: String(parsedContact.metadata.linkedin ?? "https://linkedin.com/"),
  playStore: String(parsedContact.metadata.playStore ?? "https://play.google.com/store/"),
  playConsole: String(parsedContact.metadata.playConsole ?? "https://play.google.com/console/"),
  cv: String(parsedContact.metadata.cv ?? "https://drive.google.com/")
};

const splitParagraphs = (lines: string[]) => {
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  for (const rawLine of lines) {
    const line = cleanInline(rawLine);

    if (!line) {
      if (buffer.length > 0) {
        paragraphs.push(buffer.join(" "));
        buffer = [];
      }
      continue;
    }

    buffer.push(line);
  }

  if (buffer.length > 0) {
    paragraphs.push(buffer.join(" "));
  }

  return paragraphs;
};

const aboutSource = aboutMarkdown["./about.md"] ?? "";
const parsedAbout = parseFrontmatter(aboutSource);
const aboutParagraphs = splitParagraphs(parsedAbout.body.split("\n"));
const aboutData = {
  name: String(parsedAbout.metadata.name ?? "Argya Aulia Fauzandika"),
  role: String(parsedAbout.metadata.role ?? "Mobile Developer (Flutter)"),
  intro: String(
    parsedAbout.metadata.intro ??
    "I build mobile products with a focus on thoughtful Flutter architecture, smooth UX, and maintainable code that can grow with the team."
  ),
  paragraphs: aboutParagraphs.length > 0 ? aboutParagraphs : ["Profile content will be added soon."]
};

const parseSectionEntries = (body: string): ProjectSectionEntry[] => {
  const parts = body.split(/^###\s+/m);
  const titles = [...body.matchAll(/^###\s+(.+)$/gm)].map((match) => cleanInline(match[1]));

  const parseEntryBody = (chunk: string, title?: string): ProjectSectionEntry => {
    const lines = chunk.split("\n");
    const codeBlocks: { language: string; content: string }[] = [];
    const contentLines: string[] = [];
    let activeCodeBlock: { language: string; lines: string[] } | null = null;

    for (const line of lines) {
      const fenceMatch = line.match(/^```(\w+)?\s*$/);
      if (fenceMatch) {
        if (activeCodeBlock) {
          codeBlocks.push({
            language: activeCodeBlock.language,
            content: activeCodeBlock.lines.join("\n")
          });
          activeCodeBlock = null;
        } else {
          activeCodeBlock = {
            language: fenceMatch[1] ?? "",
            lines: []
          };
        }
        continue;
      }

      if (activeCodeBlock) {
        activeCodeBlock.lines.push(line);
        continue;
      }

      contentLines.push(line);
    }

    const bullets = lines
      .filter((line) => /^-\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim()))
      .map((line) => cleanInline(line.replace(/^-\s+/, "").replace(/^\d+\.\s+/, "")));
    const paragraphLines = contentLines.filter((line) => {
      const trimmed = line.trim();
      return trimmed && !/^-\s+/.test(trimmed) && !/^\d+\.\s+/.test(trimmed);
    });

    return {
      title,
      paragraphs: splitParagraphs(paragraphLines),
      bullets,
      codeBlocks
    };
  };

  if (parts.length === 1) {
    return [parseEntryBody(parts[0])];
  }

  const intro = parts[0].trim();
  const entries: ProjectSectionEntry[] = [];

  if (intro) {
    entries.push(parseEntryBody(intro));
  }

  for (let index = 1; index < parts.length; index += 1) {
    entries.push(parseEntryBody(parts[index], titles[index - 1]));
  }

  return entries.filter(
    (entry) => entry.paragraphs.length > 0 || entry.bullets.length > 0 || entry.codeBlocks.length > 0 || entry.title
  );
};

const parseSections = (markdown: string): ProjectSection[] => {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const bodyStart = start + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? markdown.length) : markdown.length;
    const body = markdown.slice(bodyStart, end).trim();

    return {
      title: cleanInline(match[1]),
      entries: parseSectionEntries(body)
    };
  });
};

const getSection = (sections: ProjectSection[], title: string) =>
  sections.find((section) => section.title.toLowerCase() === title.toLowerCase());

const firstParagraph = (section?: ProjectSection) =>
  section?.entries.flatMap((entry) => entry.paragraphs).find(Boolean) ?? "";

const firstBullets = (section?: ProjectSection, limit = 3) =>
  section?.entries.flatMap((entry) => entry.bullets).slice(0, limit) ?? [];

const collectStack = (section?: ProjectSection) => {
  const values = section?.entries.flatMap((entry) => entry.bullets) ?? [];
  return Array.from(new Set(values)).slice(0, 8);
};

const collectLinks = (section?: ProjectSection) =>
  (section?.entries.flatMap((entry) => entry.bullets) ?? [])
    .map((item) => {
      const match = item.match(/^([^:]+):\s*<?(https?:\/\/[^>\s]+)>?$/i);
      if (!match) {
        return null;
      }

      return {
        label: cleanInline(match[1]),
        href: match[2]
      };
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));

const monthShortMap: Record<string, string> = {
  Januari: "Jan",
  Februari: "Feb",
  Maret: "Mar",
  April: "Apr",
  Mei: "Mei",
  Juni: "Jun",
  Juli: "Jul",
  Agustus: "Agu",
  September: "Sep",
  Oktober: "Okt",
  November: "Nov",
  Desember: "Des"
};

const shortenPeriod = (period: string) =>
  period.replace(
    /\b(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\b/g,
    (month) => monthShortMap[month] ?? month
  );

const screenshotsByProject = Object.entries(screenshotFiles).reduce<Record<string, ProjectScreenshot[]>>(
  (acc, [path, image]) => {
    const slug = path.match(/\.\/project\/([^/]+)\//)?.[1];
    if (!slug) {
      return acc;
    }

    acc[slug] ??= [];
    acc[slug].push({
      src: image.default.src,
      alt: `${humanizeSlug(slug)} screenshot ${acc[slug].length + 1}`
    });
    return acc;
  },
  {}
);

Object.values(screenshotsByProject).forEach((items) => {
  items.sort((left, right) => left.src.localeCompare(right.src));
});

const logosByProject = Object.entries(logoFiles).reduce<Record<string, ProjectLogo>>((acc, [path, asset]) => {
  const slug = path.match(/\.\/project\/([^/]+)\//)?.[1];
  if (!slug || acc[slug]) {
    return acc;
  }

  const src = typeof asset.default === "string" ? asset.default : asset.default.src;
  acc[slug] = {
    src,
    alt: `${humanizeSlug(slug)} logo`
  };
  return acc;
}, {});

const projectItems: ProjectItem[] = Object.entries(markdownFiles)
  .map(([path, markdown]) => {
    const slug = path.match(/\.\/project\/([^/]+)\/project\.md$/)?.[1];
    if (!slug) {
      return null;
    }

    const { metadata, body } = parseFrontmatter(markdown);
    const title = cleanInline(body.match(/^#\s+(.+)$/m)?.[1] ?? humanizeSlug(slug));
    const sections = parseSections(body);
    const period = firstParagraph(getSection(sections, "Periode Project")) || "In progress";
    const shortVersion =
      firstParagraph(getSection(sections, "Versi Singkat untuk Portofolio")) ||
      firstParagraph(getSection(sections, "Ringkasan Singkat")) ||
      "Project details will be added soon.";
    const highlight = firstParagraph(getSection(sections, "Problem yang Diselesaikan")) || shortVersion;
    const details =
      firstBullets(getSection(sections, "Fitur Utama"), 4).length > 0
        ? firstBullets(getSection(sections, "Fitur Utama"), 4)
        : firstBullets(getSection(sections, "Versi Menengah untuk CV atau LinkedIn"), 4);
    const visibleSections = sections.filter(
      (section) => !["periode project", "repository"].includes(section.title.toLowerCase())
    );

    return {
      id: slug,
      title,
      summary: shortVersion,
      featured: metadata.featured === true,
      period,
      periodShort: shortenPeriod(period),
      stack: collectStack(getSection(sections, "Tech Stack")),
      highlight,
      details,
      links: collectLinks(getSection(sections, "Repository")),
      logo: logosByProject[slug],
      sections: visibleSections,
      screenshots: screenshotsByProject[slug] ?? []
    };
  })
  .filter((item): item is ProjectItem => Boolean(item))
  .sort((left, right) => right.period.localeCompare(left.period));

const fallbackProjects = ["otolog", "shou"]
  .filter((slug) => !projectItems.some((item) => item.id === slug))
  .map((slug) => ({
    id: slug,
    title: humanizeSlug(slug),
    summary: "Details will be added soon.",
    featured: false,
    period: "In progress",
    periodShort: "In progress",
    stack: [],
    highlight: "Project documentation is still being prepared.",
    details: ["Project markdown is not filled yet."],
    links: [],
    logo: logosByProject[slug],
    sections: [
      {
        title: "Status",
        entries: [
          {
            paragraphs: ["Project markdown is still empty. Add content in project.md to populate this modal automatically."],
            bullets: [],
            codeBlocks: []
          }
        ]
      }
    ],
    screenshots: screenshotsByProject[slug] ?? []
  })) satisfies ProjectItem[];

export const portfolio = {
  name: aboutData.name,
  role: aboutData.role,
  location: contactData.location,
  intro: aboutData.intro,
  about: aboutData.paragraphs,
  photo: {
    src: myPhoto.src,
    alt: "Portrait of Argya Aulia Fauzandika"
  },
  heroLinks: [
    {
      label: "Download CV",
      href: contactData.cv,
      kind: "primary",
      note: "Link loaded from contact.md."
    },
    {
      label: "GitHub",
      href: contactData.github,
      kind: "secondary",
      note: "Link loaded from contact.md."
    },
    {
      label: "LinkedIn",
      href: contactData.linkedin,
      kind: "secondary",
      note: "Link loaded from contact.md."
    },
    {
      label: "Play Store",
      href: contactData.playStore,
      kind: "secondary",
      note: "Link loaded from contact.md."
    }
  ] satisfies PortfolioLink[],
  directoryLinks: [
    {
      title: "CV",
      value: "Resume download",
      href: contactData.cv,
      caption: "Public download link for your latest resume."
    },
    {
      title: "Play Console",
      value: "Developer profile",
      href: contactData.playConsole,
      caption: "Publisher or app listing link."
    },
    {
      title: "GitHub",
      value: "Code archive",
      href: contactData.github,
      caption: "Code, experiments, and shipped work."
    },
    {
      title: "LinkedIn",
      value: "Professional profile",
      href: contactData.linkedin,
      caption: "Career timeline and networking profile."
    },
    {
      title: "WhatsApp",
      value: "Quick chat",
      href: contactData.whatsapp,
      caption: "Fastest contact for direct conversation."
    },
    {
      title: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      caption: "Best for collaboration and freelance inquiries."
    }
  ],
  projects: [...projectItems, ...fallbackProjects] satisfies ProjectItem[]
};

export const featuredProjects = portfolio.projects.filter((project) => project.featured).slice(0, 3);
export const regularProjects = portfolio.projects.filter(
  (project) => !project.featured || !featuredProjects.some((featured) => featured.id === project.id)
);
export const portfolioProjects = portfolio.projects;
