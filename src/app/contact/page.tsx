import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with STACKREL — questions about custom websites, premium templates, or partnerships. We respond within 24 hours.",
  openGraph: {
    title: "Contact — STACKREL",
    description:
      "Have a question about a project or template? We'd love to hear from you.",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
