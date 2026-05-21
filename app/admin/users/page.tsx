"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionMenu } from "@/components/admin/action-menu";

interface FirestoreUser {
  uid: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  role: string;
  verified: boolean;
  joinedAt: string;
  categories?: string[];
}

const ROLE_TABS = [
  { value: "all", label: "All" },
  { value: "creator", label: "Creators" },
  { value: "studio", label: "Studios" },
  { value: "user", label: "Clients" },
  { value: "admin", label: "Admins" },
];

export default function UsersPage() {
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), orderBy("joinedAt", "desc"));
      const snap = await getDocs(q);
      setUsers(snap.docs.map(d => d.data() as FirestoreUser));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter((u) => {
    const matchRole = tab === "all" || u.role === tab;
    const matchQ = searchQuery === "" ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${u.firstname} ${u.lastname}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchQ;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800 h-8">
            {ROLE_TABS.map((t) => (
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
            <Input placeholder="Search users…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-52 pl-8 text-xs bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600" />
          </div>
          <Button onClick={fetchUsers} variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-xs text-zinc-500 font-medium h-9">User</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Role</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Verification</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Categories</TableHead>
              <TableHead className="text-xs text-zinc-500 font-medium h-9">Joined</TableHead>
              <TableHead className="h-9 w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-sm text-zinc-500">
                  Loading users from Firebase…
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-sm text-zinc-500">
                  {users.length === 0 ? "No users yet — sign ups will appear here." : "No users match your filter."}
                </TableCell>
              </TableRow>
            ) : filtered.map((user) => (
              <TableRow key={user.uid} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                      {(user.firstname?.[0] || user.username?.[0] || "?").toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-100">
                        {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.username}
                      </p>
                      <p className="text-[11px] text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs capitalize text-zinc-400">{user.role || "creator"}</span>
                </TableCell>
                <TableCell className="py-2.5">
                  <StatusBadge status={user.verified ? "verified" : "unverified"} />
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-xs text-zinc-500">{user.categories?.slice(0, 2).join(", ") || "—"}</span>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-zinc-500">
                  {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionMenu actions={[
                    { label: "View profile" },
                    { label: "Verify creator" },
                    { label: "Feature creator" },
                    { label: "Warn user", separator: true },
                    { label: "Suspend account", destructive: true },
                  ]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-[11px] text-zinc-600">
        {loading ? "Loading…" : `${filtered.length} user${filtered.length !== 1 ? "s" : ""} from Firebase`}
      </p>
    </div>
  );
}
