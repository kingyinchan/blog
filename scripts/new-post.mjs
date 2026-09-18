/**
 * 新建一篇文章：npm run new "标题" [slug]
 * 不传 slug 时按标题生成；中文标题建议自己传一个英文 slug（它会进 URL）。
 */
import fs from "node:fs";
import path from "node:path";

const [, , title, slugArg] = process.argv;

if (!title) {
  console.error('用法: npm run new "文章标题" [slug]');
  process.exit(1);
}

const slug =
  slugArg ??
  title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");

const file = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);

if (fs.existsSync(file)) {
  console.error(`已存在: ${path.relative(process.cwd(), file)}`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const frontmatter = [
  "---",
  `title: "${title.replace(/"/g, '\\"')}"`,
  `date: ${date}`,
  'description: ""',
  "tags: []",
  "draft: true",
  "---",
  "",
  "写点什么。",
  "",
].join("\n");

fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, frontmatter, "utf8");
console.log(`已创建 ${path.relative(process.cwd(), file)}`);
