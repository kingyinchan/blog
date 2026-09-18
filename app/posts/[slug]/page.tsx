import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  extractHeadings,
  formatDate,
  getAllPosts,
  getPost,
} from "@/lib/posts";
import { renderMdx } from "@/lib/mdx";
import { Toc } from "@/components/toc";
import { Comments } from "@/components/comments";

type Props = { params: Promise<{ slug: string }> };

/** 静态导出必须把所有 slug 枚举出来。 */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = await renderMdx(post.content);
  const headings = extractHeadings(post.content);

  return (
    <div className="xl:grid xl:grid-cols-[1fr_14rem] xl:gap-10">
      <article>
        <header className="mb-10">
          <h1 className="text-3xl font-bold leading-snug tracking-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>约 {post.readingMinutes} 分钟</span>
          </div>
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </header>

        {/* data-pagefind-body：只把正文喂给搜索索引 */}
        <div
          data-pagefind-body
          className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:p-0"
        >
          {content}
        </div>

        <Comments />
      </article>

      <aside>
        <Toc headings={headings} />
      </aside>
    </div>
  );
}
