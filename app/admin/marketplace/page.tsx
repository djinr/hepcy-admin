"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";

interface Asset {
  id: string;
  title: string;
  type: string;
  creator: string;
  creatorId?: string;
  status: "pending" | "approved" | "rejected" | "flagged";
  price: number;
  submittedAt: string;
  downloads: number;
  description?: string;
}

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "flagged", label: "Flagged" },
];

const TYPE_LABELS: Record<string, string> = {
  lut: "LUT Pack", template: "Template", prompt: "AI Prompt",
  blender: "Blender", houdini: "Houdini", preset: "Preset",
};

export default function MarketplacePage() {
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "assets"), orderBy("submittedAt", "desc"));
      const snap = await getDocs(q);
      setAssets(snap.docs.map(d => ({ id: d.id, ...d.data() } as Asset)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssets(); }, []);

  const updateStatus = async (id: string, status: Asset["status"]) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, "assets", id), { status });
      setAssets(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = assets.filter((a) => {
    const matchStatus = tab === "all" || a.status === tab;
    const matchQ = searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.creator || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQ;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800 h-8">
            {STATUS_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}
                className="h-6 text-xs px-3 data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100 text-zinc-400">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <Input placeholder="Search assets…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-52 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600" />
          </div>
          <Button onClick={fetchAssets} variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-sm text-zinc-500">
                  Loading assets from Firebase…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-sm text-zinc-500">
                  {assets.length === 0 ? "No assets submitted yet." : "No assets match your filter."}
                </TableCell>
              </TableRow>
            ) : filtered.map((asset) => (
              <TableRow key={asset.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <div>
                    <p className="text-xs font-medium text-zinc-100">{asset.title}</p>
                    {asset.description && <p className="text-[11px] text-zinc-600 truncate max-w-xs">{asset.description}</p>}
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-400">{TYPE_LABELS[asset.type] ?? asset.type}</span>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-300">{asset.creator}</span>
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-300">
                  {asset.price === 0 ? <span className="text-emerald-500">Free</span> : `$${asset.price}`}
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs tabular-nums text-zinc-500">{asset.downloads ?? 0}</TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">
                  {asset.submittedAt ? new Date(asset.submittedAt).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={asset.status} />
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-1">
                    {(asset.status === "pending" || asset.status === "flagged") && (
                      <>
                        <Button size="icon" variant="ghost"
                          disabled={updating === asset.id}
                          onClick={() => updateStatus(asset.id, "approved")}
                          className="h-6 w-6 text-emerald-500 hover:bg-emerald-500/10">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost"
                          disabled={updating === asset.id}
                          onClick={() => updateStatus(asset.id, "rejected")}
                          className="h-6 w-6 text-red-400 hover:bg-red-500/10">
                          <XCircle className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    )}
                    <ActionMenu actions={[
                      { label: "Approve", onClick: () => updateStatus(asset.id, "approved") },
                      { label: "Reject", onClick: () => updateStatus(asset.id, "rejected") },
                      { label: "Flag for review", onClick: () => updateStatus(asset.id, "flagged") },
                      { label: "View creator", separator: true },
                    ]} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-[11px] text-zinc-600">
        {loading ? "Loading…" : `${filtered.length} asset${filtered.length !== 1 ? "s" : ""} from Firebase`}
      </p>
    </div>
  );
}
