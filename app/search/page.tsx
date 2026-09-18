import type { Metadata } from "next";
import { Search } from "@/components/search";

export const metadata: Metadata = { title: "搜索" };

export default function SearchPage() {
  return (
    <div data-pagefind-ignore>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">搜索</h1>
      <Search />
    </div>
  );
}
