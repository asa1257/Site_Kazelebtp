import type { Metadata } from "next";
import { cookies } from "@/content/legal";
import { LegalPageView } from "@/components/legal/LegalPageView";

export const metadata: Metadata = {
  title: cookies.title,
  description: cookies.description,
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return <LegalPageView page={cookies} withCookieSettings />;
}
