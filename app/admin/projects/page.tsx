"use client";

import { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";
import { mockProjects } from "@/lib/mock-data";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "in_review", label: "In Review" },
  { value: "disputed", label: "Disputed" },
  { value: "completed", label: "Completed" },
];

export default function ProjectsPage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = mockProjects.filter((p) => {
    const matchStatus = tab === "all" || p.status === tab;
    const matchQuery =
      query === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.client.toLowerCase().includes(query.toLowerCase()) ||
      p.studio.toLowerCase().includes(query.toLowerCase());
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
            placeholder="Search projects…"
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
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Project</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Client</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Studio</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Milestones</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9 text-right">Budget</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Due</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Status</TableHead>
              <TableHead className="h-9 w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((project) => (
              <TableRow key={project.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2">
                    {project.hasDispute && (
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                    )}
                    <p className="text-xs font-medium text-zinc-100">{project.title}</p>
                  </div>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-400">{project.client}</TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-400">{project.studio}</TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: project.milestones }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-4 rounded-sm ${
                            i < project.completedMilestones ? "bg-indigo-500" : "bg-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-500 tabular-nums">
                      {project.completedMilestones}/{project.milestones}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-300">
                  ${project.budget.toLocaleString()}
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">{project.dueDate}</TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionMenu actions={[
                    { label: "View details" },
                    { label: "View contract" },
                    { label: "Review milestones" },
                    { label: "Mediate dispute", separator: true },
                    { label: "Force close project", destructive: true },
                  ]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No projects found.</div>
        )}
      </div>
      <p className="text-[11px] text-zinc-600">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</p>
    </div>
  );
}
