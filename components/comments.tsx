"use client";

import { useEffect, useRef } from "react";
import { blog } from "@/blog.config";

/**
 * Giscus 评论区。配置没填全就整块不渲染。
 * 用原生 script 注入而不是 <Script>，因为 giscus 要求 script 标签本身带一串 data-*。
 */
export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { repo, repoId, category, categoryId } = blog.giscus;
  const configured = Boolean(repo && repoId && categoryId);

  useEffect(() => {
    if (!configured || !ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    Object.entries({
      "data-repo": repo,
      "data-repo-id": repoId,
      "data-category": category,
      "data-category-id": categoryId,
      // 用文章 pathname 作为 discussion 的匹配键
      "data-mapping": "pathname",
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark_dimmed"
        : "light",
      "data-lang": "zh-CN",
      "data-loading": "lazy",
    }).forEach(([k, v]) => script.setAttribute(k, v));

    ref.current.appendChild(script);
  }, [configured, repo, repoId, category, categoryId]);

  if (!configured) return null;

  return (
    <section className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800">
      <h2 className="mb-6 text-lg font-semibold">评论</h2>
      <div ref={ref} data-pagefind-ignore />
    </section>
  );
}
