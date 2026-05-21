import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { StatsCards } from "@/components/admin/stats-cards";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { StatusBadge } from "@/components/admin/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockReports, mockVerifications, mockAssets } from "@/lib/mock-data";

export default function AdminOverview() {
  const openReports = mockReports.filter((r) => r.status === "open" || r.status === "investigating");
  const pendingVerifications = mockVerifications.filter((v) => v.status === "pending");
  const pendingAssets = mockAssets.filter((a) => a.status === "pending");

  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Flagged Reports */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-zinc-800">
              <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                Open Reports
              </CardTitle>
              <Link href="/admin/reports">
                <Button variant="ghost" size="sm" className="h-6 text-[11px] text-zinc-500 hover:text-zinc-200 px-2">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-zinc-800">
                {openReports.map((report) => (
                  <li key={report.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-zinc-200">{report.targetUser}</p>
                      <p className="text-[11px] text-zinc-500 capitalize">{report.type.replace("_", " ")}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-semibold uppercase tracking-wide ${
                        report.severity === "high" ? "text-red-400" :
                        report.severity === "medium" ? "text-amber-400" : "text-zinc-500"
                      }`}>{report.severity}</span>
                      <StatusBadge status={report.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Verification Queue */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-zinc-800">
              <CardTitle className="text-sm font-semibold text-zinc-200">Verification Queue</CardTitle>
              <Link href="/admin/verifications">
                <Button variant="ghost" size="sm" className="h-6 text-[11px] text-zinc-500 hover:text-zinc-200 px-2">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-zinc-800">
                {pendingVerifications.map((v) => (
                  <li key={v.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-zinc-200">{v.user}</p>
                      <p className="text-[11px] text-zinc-500 capitalize">{v.role} · {v.documents} docs</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pending Assets */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-zinc-800">
              <CardTitle className="text-sm font-semibold text-zinc-200">Asset Queue</CardTitle>
              <Link href="/admin/marketplace">
                <Button variant="ghost" size="sm" className="h-6 text-[11px] text-zinc-500 hover:text-zinc-200 px-2">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-zinc-800">
                {pendingAssets.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-zinc-200">{a.title}</p>
                      <p className="text-[11px] text-zinc-500 capitalize">{a.type} · ${a.price}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
