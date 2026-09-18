import type { Metadata } from "next";
import { blog } from "@/blog.config";

export const metadata: Metadata = { title: "关于" };

export default function AboutPage() {
  return (
    <div
      data-pagefind-ignore
      className="prose prose-neutral max-w-none dark:prose-invert"
    >
      <h1>关于</h1>
      <p>
        Learning notes, thought, programe...
      </p>
      <h2>联系</h2>
      <ul>
        <li>
          GitHub：<a href={blog.social.github}>{blog.social.github}</a>
        </li>
        <li>
          邮箱：<a href={`mailto:${blog.social.email}`}>{blog.social.email}</a>
        </li>
      </ul>
    </div>
  );
}
