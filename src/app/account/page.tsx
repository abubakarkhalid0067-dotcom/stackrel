import type { Metadata } from "next";
import { DashboardPageContent } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your STACKREL dashboard — orders, templates, and account settings.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <DashboardPageContent />;
}
