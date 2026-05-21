import { Users, Package, FolderKanban, Flag, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockActivity } from "@/lib/mock-data";
import type { ActivityItem } from "@/types";

const typeConfig: Record<ActivityItem["type"], { icon: React.ElementType; color: string }> = {
  user:    { icon: Users,         color: "text-blue-400 bg-blue-500/10" },
  asset:   { icon: Package,       color: "text-indigo-400 bg-indigo-500/10" },
  project: { icon: FolderKanban,  color: "text-emerald-400 bg-emerald-500/10" },
  report:  { icon: Flag,          color: "text-red-400 bg-red-500/10" },
  payment: { icon: CreditCard,    color: "text-amber-400 bg-amber-500/10" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function ActivityFeed() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="px-4 py-3 border-b border-zinc-800">
        <CardTitle className="text-sm font-semibold text-zinc-200">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-zinc-800">
          {mockActivity.map((item) => {
            const cfg = typeConfig[item.type];
            return (
              <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                <div className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md", cfg.color)}>
                  <cfg.icon className="h-3 w-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-300">
                    <span className="font-medium text-zinc-100">{item.actor}</span>
                    {" "}{item.action}{" "}
                    <span className="font-medium text-zinc-100">{item.subject}</span>
                  </p>
                </div>
                <time className="shrink-0 text-[11px] text-zinc-600">{timeAgo(item.timestamp)}</time>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
