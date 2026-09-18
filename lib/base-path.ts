/**
 * CI 里 actions/configure-pages 对用户主页仓库（<user>.github.io）会给出 "/"，
 * 而 Next 的 basePath 既不接受 "/" 也不接受结尾斜杠，会直接构建失败。
 * 统一归一化成 "" 或 "/repo"。
 */
export function normalizeBasePath(raw: string | undefined): string {
  const value = (raw ?? "").trim().replace(/\/+$/, "");
  return value === "/" ? "" : value;
}
