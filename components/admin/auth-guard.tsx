"use client";

import { useState, useEffect } from "react";
import { Zap, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ADMIN_PASSWORD = "Admin@2026";
const SESSION_KEY = "hepcy_admin_auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem(SESSION_KEY);
    if (ok === "1") setAuthed(true);
    setChecking(false);
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (checking) return null;

  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600">
              <Zap className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="leading-none">
              <p className="text-sm font-semibold text-zinc-100 tracking-tight">Hepcy</p>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Admin</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h1 className="text-sm font-semibold text-zinc-100 mb-1">Admin access</h1>
            <p className="text-xs text-zinc-500 mb-5">Enter your admin password to continue.</p>

            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={`h-9 pr-9 text-sm bg-zinc-950 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 ${error ? "border-red-500/60" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400">Incorrect password. Try again.</p>
              )}

              <Button
                onClick={handleLogin}
                className="w-full h-9 text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Sign in to Admin
              </Button>
            </div>
          </div>

          <p className="text-center text-[11px] text-zinc-700 mt-4">
            Hepcy internal operations panel
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
