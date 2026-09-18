import Link from "next/link";
import { blog } from "@/blog.config";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <section className="mb-4" data-pagefind-ignore>
        <h1 className="text-3xl font-bold tracking-tight">{blog.title}</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          {blog.description}
        </p>
        {tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {tag}
                  <span className="ml-1.5 text-neutral-400">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
          还没有文章。在 <code className="font-mono">content/posts/</code>{" "}
          下新建一个 .mdx 文件就会出现在这里。
        </p>
      ) : (
        <div className="mt-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
