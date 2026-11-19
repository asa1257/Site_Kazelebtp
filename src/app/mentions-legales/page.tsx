import type { Metadata } from "next";
import { mentionsLegales } from "@/content/legal";
import { LegalPageView } from "@/components/legal/LegalPageView";

export const metadata: Metadata = {
  title: mentionsLegales.title,
  description: mentionsLegales.description,
  alternates: { canonical: "/mentions-legales" },
};

export default function Page() {
  return <LegalPageView page={mentionsLegales} />;
}
