"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";
import { mockPayments } from "@/lib/mock-data";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const TYPE_LABELS: Record<string, string> = {
  project: "Project",
  marketplace: "Marketplace",
  subscription: "Subscription",
  refund: "Refund",
};

export default function PaymentsPage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = mockPayments.filter((p) => {
    const matchStatus = tab === "all" || p.status === tab;
    const matchQuery =
      query === "" ||
      p.from.toLowerCase().includes(query.toLowerCase()) ||
      p.to.toLowerCase().includes(query.toLowerCase()) ||
      p.reference.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  const total = filtered.reduce((sum, p) => sum + p.amount, 0);

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
        <div className="flex items-center gap-3">
          <div className="text-xs text-zinc-500">
            Total: <span className="font-semibold text-zinc-200 tabular-nums">${total.toLocaleString()}</span>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <Input
              placeholder="Search payments…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8 w-52 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Reference</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">From → To</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Type</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-right">Amount</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Date</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Status</TableHead>
              <TableHead className="h-9 w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((payment) => (
              <TableRow key={payment.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <span className="text-xs font-mono text-zinc-400">{payment.reference}</span>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <span>{payment.from}</span>
                    <ArrowRight className="h-3 w-3 text-zinc-600 shrink-0" />
                    <span>{payment.to}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-400">{TYPE_LABELS[payment.type]}</span>
                </TableCell>
                <TableCell className="py-2.5 text-right">
                  <span className={`text-xs font-semibold tabular-nums ${
                    payment.type === "refund" ? "text-amber-400" : "text-zinc-100"
                  }`}>
                    {payment.type === "refund" ? "-" : "+"}${payment.amount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">{payment.createdAt}</TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionMenu actions={[
                    { label: "View transaction" },
                    { label: "View project" },
                    { label: "Process refund", separator: true, destructive: true },
                  ]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No payments found.</div>
        )}
      </div>
      <p className="text-[11px] text-zinc-600">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
