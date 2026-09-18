import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-neutral-200 py-8 last:border-0 dark:border-neutral-800">
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} 分钟</span>
        {post.draft && (
          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            草稿
          </span>
        )}
      </div>

      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        <Link
          href={`/posts/${post.slug}`}
          className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>

      {post.description && (
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
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
    </article>
  );
}
