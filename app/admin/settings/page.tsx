import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Platform */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="px-5 py-4 border-b border-zinc-800">
          <CardTitle className="text-sm font-semibold text-zinc-100">Platform</CardTitle>
          <CardDescription className="text-xs text-zinc-500">General platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-4 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Platform name</Label>
            <Input defaultValue="Hepcy" className="h-8 text-xs bg-zinc-950 border-zinc-700 text-zinc-200" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Support email</Label>
            <Input defaultValue="support@hepcy.io" className="h-8 text-xs bg-zinc-950 border-zinc-700 text-zinc-200" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Platform fee (%)</Label>
            <Input defaultValue="10" type="number" className="h-8 w-24 text-xs bg-zinc-950 border-zinc-700 text-zinc-200" />
          </div>
          <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">Save changes</Button>
        </CardContent>
      </Card>

      {/* Moderation */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="px-5 py-4 border-b border-zinc-800">
          <CardTitle className="text-sm font-semibold text-zinc-100">Moderation</CardTitle>
          <CardDescription className="text-xs text-zinc-500">Asset review and report thresholds</CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Auto-flag at report count</Label>
              <Input defaultValue="3" type="number" className="h-8 text-xs bg-zinc-950 border-zinc-700 text-zinc-200" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Asset review SLA (hours)</Label>
              <Input defaultValue="48" type="number" className="h-8 text-xs bg-zinc-950 border-zinc-700 text-zinc-200" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Verification SLA (days)</Label>
            <Input defaultValue="5" type="number" className="h-8 w-24 text-xs bg-zinc-950 border-zinc-700 text-zinc-200" />
          </div>
          <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">Save changes</Button>
        </CardContent>
      </Card>

      {/* Admin accounts */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="px-5 py-4 border-b border-zinc-800">
          <CardTitle className="text-sm font-semibold text-zinc-100">Admin Accounts</CardTitle>
          <CardDescription className="text-xs text-zinc-500">Manage admin and superadmin users</CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-4 space-y-3">
          {[
            { name: "Hepcy Admin", email: "admin@hepcy.io", role: "superadmin" },
            { name: "Ops Team", email: "ops@hepcy.io", role: "admin" },
          ].map((admin) => (
            <div key={admin.email} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                  {admin.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-200">{admin.name}</p>
                  <p className="text-[11px] text-zinc-500">{admin.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] capitalize text-zinc-400">{admin.role}</span>
                <Separator orientation="vertical" className="h-3 bg-zinc-700" />
                <Button variant="ghost" size="sm" className="h-6 text-[11px] text-zinc-500 hover:text-red-400 px-2">
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 mt-2">
            + Invite admin
          </Button>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="bg-zinc-900 border-red-900/40">
        <CardHeader className="px-5 py-4 border-b border-red-900/30">
          <CardTitle className="text-sm font-semibold text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-xs text-zinc-500">Irreversible platform-wide actions</CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-200">Maintenance mode</p>
              <p className="text-[11px] text-zinc-500">Block all non-admin access to the platform.</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs border-zinc-700 text-zinc-400 hover:border-red-800 hover:text-red-400">
              Enable
            </Button>
          </div>
          <Separator className="bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-200">Clear asset queue</p>
              <p className="text-[11px] text-zinc-500">Reject all pending asset submissions.</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs border-zinc-700 text-zinc-400 hover:border-red-800 hover:text-red-400">
              Clear queue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
