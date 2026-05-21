"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShoppingBag,
  Flag,
  BadgeCheck,
  CreditCard,
  Settings,
  ChevronRight,
  Zap,
  ArrowUpLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Marketplace", href: "/admin/marketplace", icon: ShoppingBag, badge: 3 },
  { label: "Reports", href: "/admin/reports", icon: Flag, badge: 3, badgeVariant: "destructive" as const },
  { label: "Verifications", href: "/admin/verifications", icon: BadgeCheck, badge: 3 },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-zinc-800 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div className="leading-none">
          <p className="text-sm font-semibold text-zinc-100 tracking-tight">Hepcy</p>
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-zinc-800 text-zinc-100 font-medium"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-indigo-400" : "text-zinc-500")} />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <Badge
                      variant={item.badgeVariant ?? "secondary"}
                      className={cn(
                        "h-4 min-w-4 px-1 text-[10px] font-semibold",
                        !item.badgeVariant && "bg-zinc-700 text-zinc-300 hover:bg-zinc-700"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  ) : active ? (
                    <ChevronRight className="h-3 w-3 text-zinc-500" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to site */}
      <div className="px-2 pb-1">
        <a
          href="http://localhost:5500/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
        >
          <ArrowUpLeft className="h-3.5 w-3.5 shrink-0" />
          Back to Hepcy site
        </a>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-2">
          <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-zinc-200">Hepcy Admin</p>
            <p className="truncate text-[10px] text-zinc-500">admin@hepcy.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
