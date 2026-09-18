import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `标签：${decodeURIComponent(tag)}` };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div data-pagefind-ignore>
      <h1 className="text-2xl font-bold tracking-tight">
        标签：{tag}
        <span className="ml-2 text-base font-normal text-neutral-500">
          {posts.length} 篇
        </span>
      </h1>
      <div className="mt-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
