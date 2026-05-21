"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/admin": { title: "Overview", description: "Platform health at a glance" },
  "/admin/users": { title: "Users", description: "Manage creators, clients, studios, and admins" },
  "/admin/projects": { title: "Projects", description: "Monitor active productions and contracts" },
  "/admin/marketplace": { title: "Marketplace", description: "Approve and moderate asset submissions" },
  "/admin/reports": { title: "Reports", description: "Handle flagged content and disputes" },
  "/admin/verifications": { title: "Verifications", description: "Review and approve creator identities" },
  "/admin/payments": { title: "Payments", description: "Track transactions and payouts" },
  "/admin/settings": { title: "Settings", description: "Admin panel configuration" },
};

export function Header() {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Admin", description: "" };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm px-6">
      <div>
        <h1 className="text-sm font-semibold text-zinc-100">{page.title}</h1>
        <p className="text-xs text-zinc-500">{page.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Search…"
            className="h-8 w-52 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-indigo-600/40"
          />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </Button>
      </div>
    </header>
  );
}
