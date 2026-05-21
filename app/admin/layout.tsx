import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { AuthGuard } from "@/components/admin/auth-guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-zinc-950">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden pl-56">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
