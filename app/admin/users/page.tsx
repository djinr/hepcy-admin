"use client";

import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";
import { mockUsers } from "@/lib/mock-data";
import type { Role } from "@/types";

const ROLE_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "creator", label: "Creators" },
  { value: "studio", label: "Studios" },
  { value: "user", label: "Clients" },
  { value: "admin", label: "Admins" },
];

export default function UsersPage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = mockUsers.filter((u) => {
    const matchRole = tab === "all" || u.role === tab;
    const matchQuery =
      query === "" ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    return matchRole && matchQuery;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800 h-8">
            {ROLE_TABS.map((t) => (
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <Input
              placeholder="Search users…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8 w-52 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600"
            />
          </div>
          <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
            <UserPlus className="h-3.5 w-3.5" /> Invite
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-xs text-zinc-500 font-medium h-9">User</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Role</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Status</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Verification</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-right">Projects</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-right">Earnings</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Last Active</TableHead>
              <TableHead className="h-9 w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-100">{user.name}</p>
                      <p className="text-[11px] text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs capitalize text-zinc-400">{user.role}</span>
                </TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={user.verification} />
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-300">
                  {user.projectCount}
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-300">
                  {user.totalEarnings != null ? `$${user.totalEarnings.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">{user.lastActive}</TableCell>
                <TableCell className="py-2.5">
                  <ActionMenu actions={[
                    { label: "View profile" },
                    { label: "Feature creator" },
                    { label: "Verify creator" },
                    { label: "Warn user", separator: true },
                    { label: "Suspend account", destructive: true },
                  ]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No users found.</div>
        )}
      </div>
      <p className="text-[11px] text-zinc-600">{filtered.length} user{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
