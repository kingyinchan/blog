import type { Metadata } from "next";
import Link from "next/link";
import { blog } from "@/blog.config";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  metadataBase: new URL(blog.siteUrl),
  title: {
    default: blog.title,
    template: `%s · ${blog.title}`,
  },
  description: blog.description,
  openGraph: {
    type: "website",
    siteName: blog.title,
    title: blog.title,
    description: blog.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
          <nav className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              {blog.title}
            </Link>
            <ul className="flex items-center gap-5 text-sm text-neutral-600 dark:text-neutral-400">
              {blog.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-6 py-6 text-sm text-neutral-500">
            <span>
              © {new Date().getFullYear()} {blog.author}
            </span>
            <a
              href={blog.social.github}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
