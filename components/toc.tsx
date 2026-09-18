import type { Heading } from "@/lib/posts";

/** 文章目录。宽屏时吸附在正文右侧，窄屏隐藏。 */
export function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="目录"
      className="sticky top-24 hidden max-h-[70vh] overflow-y-auto text-sm xl:block"
      // 目录本身不该被搜索索引进去
      data-pagefind-ignore
    >
      <p className="mb-3 font-medium text-neutral-900 dark:text-neutral-100">
        目录
      </p>
      <ul className="space-y-2 border-l border-neutral-200 dark:border-neutral-800">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-7" : "pl-4"}>
            <a
              href={`#${h.id}`}
              className="-ml-px block border-l-2 border-transparent pl-2 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
