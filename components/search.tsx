"use client";

import { useEffect, useState } from "react";
import { blog } from "@/blog.config";

type PagefindUI = new (options: Record<string, unknown>) => unknown;

declare global {
  interface Window {
    PagefindUI?: PagefindUI;
  }
}

/**
 * Pagefind 搜索。索引是 `next build` 之后由 pagefind CLI 扫 out/ 生成的，
 * 所以 `next dev` 下没有索引文件 —— 这里显式提示，而不是让它静默转圈。
 */
export function Search() {
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

  useEffect(() => {
    const base = blog.basePath;
    let cancelled = false;

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${base}/pagefind/pagefind-ui.css`;
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = `${base}/pagefind/pagefind-ui.js`;
    script.onload = () => {
      if (cancelled || !window.PagefindUI) return;
      new window.PagefindUI({
        element: "#search",
        showSubResults: true,
        showImages: false,
        excerptLength: 25,
        translations: {
          placeholder: "搜索文章…",
          clear_search: "清空",
          load_more: "加载更多",
          search_label: "搜索本站",
          filters_label: "筛选",
          zero_results: "没有匹配 [SEARCH_TERM] 的结果",
          many_results: "[COUNT] 条结果",
          one_result: "1 条结果",
          searching: "搜索中…",
        },
      });
      setStatus("ready");
    };
    script.onerror = () => !cancelled && setStatus("missing");
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      css.remove();
      script.remove();
    };
  }, []);

  return (
    <>
      <div id="search" />
      {status === "missing" && (
        <p className="rounded-lg border border-dashed border-neutral-300 p-6 text-sm text-neutral-500 dark:border-neutral-700">
          搜索索引尚未生成。开发模式下执行{" "}
          <code className="font-mono">npm run build</code> 后再用{" "}
          <code className="font-mono">npm run preview</code> 预览即可看到搜索结果。
        </p>
      )}
    </>
  );
}
