import type { NextConfig } from "next";
import { normalizeBasePath } from "./lib/base-path";

const nextConfig: NextConfig = {
  // GitHub Pages 只能托管静态文件，所以走静态导出。
  output: "export",
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  // 每个路由导出成 <route>/index.html，Pages 上的嵌套路径才不会 404。
  trailingSlash: true,
  // 静态导出用不了 next/image 的按需优化。
  images: { unoptimized: true },
};

export default nextConfig;
