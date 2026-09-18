import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

const prettyCodeOptions: PrettyCodeOptions = {
  // 双主题：同时产出 --shiki-light / --shiki-dark 两套变量，
  // 由 globals.css 按 prefers-color-scheme 切换，不需要客户端 JS。
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: { block: "text", inline: "text" },
};

/** 文章正文里可用的组件。想在 MDX 里用自定义组件，加到这里即可。 */
const components: MDXComponents = {
  a: ({ href = "", children, ...rest }) => {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  },
  // 静态导出下 next/image 不做优化，但仍能拿到懒加载和尺寸占位。
  img: ({ src = "", alt = "" }) => (
    <Image
      src={src as string}
      alt={alt}
      width={1600}
      height={900}
      className="h-auto w-full rounded-lg border border-neutral-200 dark:border-neutral-800"
    />
  ),
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      // frontmatter 已经被 gray-matter 摘掉了，这里传进来的是纯正文。
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          [rehypePrettyCode, prettyCodeOptions],
          rehypeKatex,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: "heading-anchor" } },
          ],
        ],
      },
    },
  });
  return content;
}
