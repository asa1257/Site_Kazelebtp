import type { Metadata } from "next";
import { confidentialite } from "@/content/legal";
import { LegalPageView } from "@/components/legal/LegalPageView";

export const metadata: Metadata = {
  title: confidentialite.title,
  description: confidentialite.description,
  alternates: { canonical: "/confidentialite" },
};

export default function Page() {
  return <LegalPageView page={confidentialite} />;
}
