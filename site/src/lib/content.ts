import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

// Resolve content dir: works both locally (cwd = site/) and on Vercel (cwd = project root)
const CONTENT_DIR = fs.existsSync(path.resolve(process.cwd(), 'content'))
  ? path.resolve(process.cwd(), 'content')
  : path.resolve(process.cwd(), '..', 'content');
const CONTENT_TYPES = ['landing-pages', 'blog-posts', 'guides', 'faqs', 'comparisons'];

export interface ContentPage {
  frontmatter: Record<string, any>;
  content: string;
}

export function getPublishedContent(): ContentPage[] {
  const pages: ContentPage[] = [];
  const isDev = import.meta.env?.DEV ?? process.env.NODE_ENV !== 'production';

  for (const type of CONTENT_TYPES) {
    const typeDir = path.join(CONTENT_DIR, type);
    if (!fs.existsSync(typeDir)) continue;

    const files = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(typeDir, file), 'utf-8');
      const { data, content } = matter(raw);
      // Include all content with a valid slug (draft, review, published)
      if (!data.slug) continue;
      pages.push({ frontmatter: data, content });
    }
  }

  return pages;
}
