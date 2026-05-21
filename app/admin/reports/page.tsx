"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";
import { mockReports } from "@/lib/mock-data";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "investigating", label: "Investigating" },
  { value: "resolved", label: "Resolved" },
  { value: "dismissed", label: "Dismissed" },
];

const TYPE_LABELS: Record<string, string> = {
  scam: "Scam",
  stolen_asset: "Stolen Asset",
  spam: "Spam",
  fake_creator: "Fake Creator",
  other: "Other",
};

const SEVERITY_STYLE: Record<string, string> = {
  high: "text-red-400",
  medium: "text-amber-400",
  low: "text-zinc-500",
};

export default function ReportsPage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = mockReports.filter((r) => {
    const matchStatus = tab === "all" || r.status === tab;
    const matchQuery =
      query === "" ||
      r.targetUser.toLowerCase().includes(query.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800 h-8">
            {STATUS_TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="h-6 text-xs px-3 data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100 text-zinc-400"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Search reports…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-52 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Target</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Type</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Reported By</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Severity</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Description</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Date</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Status</TableHead>
              <TableHead className="h-9 w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((report) => (
              <TableRow key={report.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <p className="text-xs font-medium text-zinc-100">{report.targetUser}</p>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-400">{TYPE_LABELS[report.type] ?? report.type}</span>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-400">{report.reportedBy}</TableCell>
                <TableCell className="py-2.5">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${SEVERITY_STYLE[report.severity]}`}>
                    {report.severity}
                  </span>
                </TableCell>
                <TableCell className="py-2.5 max-w-xs">
                  <p className="text-xs text-zinc-500 truncate">{report.description}</p>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">{report.createdAt}</TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={report.status} />
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionMenu actions={[
                    { label: "View full report" },
                    { label: "Investigate" },
                    { label: "Contact reporter" },
                    { label: "Resolve", separator: true },
                    { label: "Dismiss report" },
                    { label: "Suspend target", destructive: true },
                  ]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No reports found.</div>
        )}
      </div>
      <p className="text-[11px] text-zinc-600">{filtered.length} report{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
