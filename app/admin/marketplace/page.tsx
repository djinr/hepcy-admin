"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";
import { mockAssets } from "@/lib/mock-data";
import type { AssetStatus } from "@/types";

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "flagged", label: "Flagged" },
];

const TYPE_LABELS: Record<string, string> = {
  lut: "LUT Pack",
  template: "Template",
  prompt: "Prompt",
  blender: "Blender",
  houdini: "Houdini",
  preset: "Preset",
};

export default function MarketplacePage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = mockAssets.filter((a) => {
    const matchStatus = tab === "all" || a.status === tab;
    const matchQuery =
      query === "" ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.creator.toLowerCase().includes(query.toLowerCase());
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
            placeholder="Search assets…"
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
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Asset</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Type</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Creator</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-right">Price</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-right">Downloads</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Submitted</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Status</TableHead>
              <TableHead className="h-9" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((asset) => (
              <TableRow key={asset.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <p className="text-xs font-medium text-zinc-100">{asset.title}</p>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-400">{TYPE_LABELS[asset.type] ?? asset.type}</span>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-300">{asset.creator}</span>
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-300">${asset.price}</TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-500">{asset.downloads}</TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">{asset.submittedAt}</TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={asset.status} />
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-1">
                    {asset.status === "pending" || asset.status === "flagged" ? (
                      <>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-emerald-500 hover:bg-emerald-500/10">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400 hover:bg-red-500/10">
                          <XCircle className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    ) : null}
                    <ActionMenu actions={[
                      { label: "Preview asset" },
                      { label: "View creator" },
                      { label: "Approve", },
                      { label: "Reject", separator: true },
                      { label: "Flag for review", destructive: true },
                    ]} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No assets found.</div>
        )}
      </div>
      <p className="text-[11px] text-zinc-600">{filtered.length} asset{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
