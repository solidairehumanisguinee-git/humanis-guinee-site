import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration | Humanis Guinée Solidarité",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}
