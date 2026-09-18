import { normalizeBasePath } from "./lib/base-path";

/**
 * 站点全局配置。改这里，不用翻代码。
 */
export const blog = {
  title: "Anything",
  description: "Just Writing and Coding.",
  author: "kingyinchan",
  // 部署到 https://<user>.github.io/<repo> 时填 "/<repo>"；
  // 绑定自定义域名或用户主页仓库（<user>.github.io）时留空。
  // CI 里通过 NEXT_PUBLIC_BASE_PATH 注入，本地默认空。
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  postsPerPage: 10,
  nav: [
    { href: "/", label: "首页" },
    { href: "/search", label: "搜索" },
    { href: "/about", label: "关于" },
  ],
  social: {
    github: "https://github.com/kingyinchan",
    email: "jyc1725557595@gmail.com",
  },
  /**
   * 评论（Giscus）。去 https://giscus.app 按提示生成后把四个值填进来。
   * 前提：仓库是 public、装了 giscus app、开启了 Discussions。
   * 留空则文章页不渲染评论区。
   */
  giscus: {
    repo: "" as `${string}/${string}` | "",
    repoId: "",
    category: "Announcements",
    categoryId: "",
  },
} as const;

export type BlogConfig = typeof blog;
