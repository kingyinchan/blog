import type { Metadata } from "next";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = { title: "关于" };

export default function AboutPage() {
  return (
    <div
      data-pagefind-ignore
      className="prose prose-neutral max-w-none dark:prose-invert"
    >
      <h1>关于</h1>
      <p>Learning notes, thought, program...</p>
      <h2>联系</h2>
      <SocialLinks className="mt-6" />
    </div>
  );
}
