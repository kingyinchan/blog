import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-5xl font-bold text-neutral-300 dark:text-neutral-700">
        404
      </p>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        这个页面不存在，或者已经被挪走了。
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-blue-600 hover:underline dark:text-blue-400"
      >
        回首页
      </Link>
    </div>
  );
}
