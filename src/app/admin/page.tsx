import type { Metadata } from "next";
import { AdminPageContent } from "@/components/admin/admin-page";

export const metadata: Metadata = {
  title: "Admin",
  description: "STACKREL admin panel — manage users, orders, templates, and analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPageContent />;
}
