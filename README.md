# 技术博客

Next.js 16（App Router，静态导出）+ Tailwind 4 + MDX，部署到 GitHub Pages。

## 常用命令

```bash
npm run dev        # 本地开发，http://localhost:3000，草稿可见
npm run new "标题" my-slug   # 新建一篇文章
npm run build      # 静态导出到 out/ 并生成 Pagefind 搜索索引
npm run preview    # 本地预览 out/（搜索功能只有这里能测）
npm run typecheck  # 类型检查
npm run lint
```

## 写文章

文章放在 `content/posts/*.mdx`，文件名就是 URL 里的 slug。frontmatter：

```yaml
---
title: "标题"          # 必填
date: 2026-09-18       # 必填
description: "摘要"    # 列表页和 SEO 用
tags: ["Next.js"]
draft: true            # true 时只在 dev 可见，构建会过滤掉
---
```

- 图片放 `public/images/<slug>/xxx.png`，正文里写 `![说明](/images/<slug>/xxx.png)`
- 代码块支持标题、行号、高亮行：`` ```ts title="a.ts" showLineNumbers {2,5-7} ``
- 数学公式：行内 `$x^2$`，独立用 `$$ ... $$`
- MDX 里可以直接用 React 组件，在 `lib/mdx.tsx` 的 `components` 里注册

## 还需要手动配的两件事

1. **`blog.config.ts`** —— 站点标题、作者、GitHub 链接、邮箱。
2. **评论（giscus）** —— 去 https://giscus.app 填仓库信息，把生成的
   `repo` / `repoId` / `categoryId` 抄进 `blog.config.ts` 的 `giscus`。
   前提：仓库 public、安装 giscus app、在仓库 Settings 里开启 Discussions。
   没填完整时文章页不渲染评论区。

## 部署

推到 GitHub 后，仓库 **Settings → Pages → Source** 选 **GitHub Actions**，
之后每次 push 到 `main` 会自动构建发布（`.github/workflows/deploy.yml`）。

`basePath` 由 workflow 自动注入：项目仓库会带 `/<repo>` 前缀，
用户主页仓库（`<user>.github.io`）或绑定自定义域名时为空。
