import type { ReactNode } from "react";
import { blog } from "@/blog.config";

const iconSize = { width: 20, height: 20 } as const;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...iconSize}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...iconSize}
    >
      <rect x="2" y="4.5" width="20" height="15" rx="2.5" />
      <path d="m2.5 7 8.4 5.6a2 2 0 0 0 2.2 0L21.5 7" />
    </svg>
  );
}

type SocialLink = { label: string; href: string; icon: ReactNode };

/**
 * 联系方式图标组。blog.config.ts 里留空的项自动不渲染。
 * 纯图标链接必须带 aria-label —— 否则读屏软件只会念出一串裸 URL。
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  const links: SocialLink[] = [];

  if (blog.social.github) {
    links.push({
      label: "GitHub",
      href: blog.social.github,
      icon: <GitHubIcon />,
    });
  }

  if (blog.social.email) {
    links.push({
      label: `发邮件给 ${blog.author}`,
      href: `mailto:${blog.social.email}`,
      icon: <MailIcon />,
    });
  }

  if (links.length === 0) return null;

  return (
    <ul className={`not-prose flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            >
              {link.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
