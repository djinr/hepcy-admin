import { Users, FolderKanban, ShoppingBag, Clock, Flag, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dashboardStats } from "@/lib/mock-data";

const stats = [
  {
    label: "Total Creators",
    value: dashboardStats.totalCreators.toLocaleString(),
    icon: Users,
    delta: "+24 this month",
    deltaPositive: true,
  },
  {
    label: "Active Projects",
    value: dashboardStats.activeProjects.toLocaleString(),
    icon: FolderKanban,
    delta: "+12 this week",
    deltaPositive: true,
  },
  {
    label: "Marketplace Sales",
    value: `$${dashboardStats.marketplaceSales.toLocaleString()}`,
    icon: ShoppingBag,
    delta: "+8.2% vs last month",
    deltaPositive: true,
  },
  {
    label: "Pending Approvals",
    value: dashboardStats.pendingApprovals.toLocaleString(),
    icon: Clock,
    delta: "3 assets, 3 verifications",
    deltaPositive: null,
  },
  {
    label: "Flagged Reports",
    value: dashboardStats.flaggedReports.toLocaleString(),
    icon: Flag,
    delta: "2 high severity",
    deltaPositive: false,
  },
  {
    label: "Verification Queue",
    value: dashboardStats.verificationQueue.toLocaleString(),
    icon: BadgeCheck,
    delta: "Avg. 1.2 days wait",
    deltaPositive: null,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-zinc-500 font-medium">{stat.label}</p>
              <stat.icon className="h-3.5 w-3.5 text-zinc-600" />
            </div>
            <p className="text-xl font-semibold text-zinc-100 tabular-nums">{stat.value}</p>
            <p className={cn(
              "mt-1 text-[11px]",
              stat.deltaPositive === true && "text-emerald-500",
              stat.deltaPositive === false && "text-red-400",
              stat.deltaPositive === null && "text-zinc-500",
            )}>
              {stat.delta}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
