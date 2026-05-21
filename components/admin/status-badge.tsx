import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  UserStatus,
  VerificationStatus,
  AssetStatus,
  ReportStatus,
  ProjectStatus,
  PaymentStatus,
} from "@/types";

type AnyStatus =
  | UserStatus
  | VerificationStatus
  | AssetStatus
  | ReportStatus
  | ProjectStatus
  | PaymentStatus;

const statusConfig: Record<string, { label: string; className: string }> = {
  // User
  active:       { label: "Active",       className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  suspended:    { label: "Suspended",    className: "bg-red-500/10 text-red-400 border-red-500/20" },
  warned:       { label: "Warned",       className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  pending:      { label: "Pending",      className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  // Verification
  verified:     { label: "Verified",     className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  unverified:   { label: "Unverified",   className: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30" },
  rejected:     { label: "Rejected",     className: "bg-red-500/10 text-red-400 border-red-500/20" },
  // Asset
  approved:     { label: "Approved",     className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  flagged:      { label: "Flagged",      className: "bg-red-500/10 text-red-400 border-red-500/20" },
  // Report
  open:         { label: "Open",         className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  investigating:{ label: "Investigating",className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  resolved:     { label: "Resolved",     className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  dismissed:    { label: "Dismissed",    className: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30" },
  // Project
  draft:        { label: "Draft",        className: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30" },
  in_review:    { label: "In Review",    className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  completed:    { label: "Completed",    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  disputed:     { label: "Disputed",     className: "bg-red-500/10 text-red-400 border-red-500/20" },
  // Payment
  failed:       { label: "Failed",       className: "bg-red-500/10 text-red-400 border-red-500/20" },
  refunded:     { label: "Refunded",     className: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30" },
};

interface StatusBadgeProps {
  status: AnyStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: "bg-zinc-700/50 text-zinc-400" };
  return (
    <Badge
      variant="outline"
      className={cn("text-[11px] font-medium border px-1.5 py-0 h-5", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
