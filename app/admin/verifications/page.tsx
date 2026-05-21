"use client";

import { useState } from "react";
import { BadgeCheck, XCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";
import { mockVerifications } from "@/lib/mock-data";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
];

export default function VerificationsPage() {
  const [tab, setTab] = useState("pending");

  const filtered = mockVerifications.filter((v) =>
    tab === "all" ? true : v.status === tab
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
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
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Applicant</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Role</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-center">Documents</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Submitted</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Status</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Notes</TableHead>
              <TableHead className="h-9" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => (
              <TableRow key={v.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                      {v.user[0]}
                    </div>
                    <p className="text-xs font-medium text-zinc-100">{v.user}</p>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs capitalize text-zinc-400">{v.role}</span>
                </TableCell>
                <TableCell className="py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-zinc-400">
                    <FileText className="h-3.5 w-3.5" />
                    {v.documents}
                  </div>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">{v.submittedAt}</TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={v.status} />
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">
                  {v.notes ?? "—"}
                </TableCell>
                <TableCell className="py-2.5">
                  {v.status === "pending" ? (
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        className="h-6 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white gap-1 px-2"
                      >
                        <BadgeCheck className="h-3 w-3" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-[11px] text-red-400 hover:bg-red-500/10 gap-1 px-2"
                      >
                        <XCircle className="h-3 w-3" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <ActionMenu actions={[
                      { label: "View documents" },
                      { label: "Revoke verification", destructive: true },
                    ]} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No verifications found.</div>
        )}
      </div>
      <p className="text-[11px] text-zinc-600">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
