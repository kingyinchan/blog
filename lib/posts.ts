import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function parseFile(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`${filename} 缺少 frontmatter: title`);
  if (!data.date) throw new Error(`${filename} 缺少 frontmatter: date`);

  return {
    slug,
    title: String(data.title),
    // frontmatter 里写 2026-09-18 会被 YAML 解析成 Date，统一成 ISO 日期串。
    date: new Date(data.date).toISOString().slice(0, 10),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

/** 全部文章，按日期倒序。生产构建下过滤掉 draft。 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** 标签 -> 文章数，按数量倒序。 */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export type Heading = { depth: 2 | 3; text: string; id: string };

/** 从 Markdown 正文里抽 h2/h3 做目录，避免为了目录再跑一遍 AST。 */
export function extractHeadings(content: string): Heading[] {
  // 用 rehype-slug 背后同一个 slugger，锚点 id 才对得上（含重名标题的 -1 后缀）。
  const slugger = new GithubSlugger();
  // 先剔掉围栏代码块，免得把注释里的 ## 当成标题。
  const withoutCode = content.replace(/^```[\s\S]*?^```/gm, "");
  const headings: Heading[] = [];
  for (const m of withoutCode.matchAll(/^(#{2,3})[ \t]+(.+?)[ \t]*$/gm)) {
    const text = m[2].replace(/[*_`]/g, "");
    headings.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return headings;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}
