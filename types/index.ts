export type Role = "user" | "creator" | "studio" | "admin" | "superadmin";

export type UserStatus = "active" | "suspended" | "pending" | "warned";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export type AssetStatus = "pending" | "approved" | "rejected" | "flagged";

export type ReportStatus = "open" | "investigating" | "resolved" | "dismissed";

export type ProjectStatus = "draft" | "active" | "in_review" | "completed" | "disputed";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  verification: VerificationStatus;
  joinedAt: string;
  lastActive: string;
  projectCount: number;
  totalEarnings?: number;
  avatar?: string;
}

export interface Asset {
  id: string;
  title: string;
  type: "lut" | "template" | "prompt" | "blender" | "houdini" | "preset";
  creator: string;
  creatorId: string;
  status: AssetStatus;
  price: number;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  downloads: number;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  studio: string;
  status: ProjectStatus;
  milestones: number;
  completedMilestones: number;
  budget: number;
  startDate: string;
  dueDate: string;
  hasDispute: boolean;
}

export interface Report {
  id: string;
  type: "scam" | "stolen_asset" | "spam" | "fake_creator" | "other";
  reportedBy: string;
  targetUser: string;
  targetId: string;
  status: ReportStatus;
  severity: "low" | "medium" | "high";
  createdAt: string;
  description: string;
}

export interface Verification {
  id: string;
  user: string;
  userId: string;
  role: Role;
  submittedAt: string;
  documents: number;
  status: VerificationStatus;
  notes?: string;
}

export interface Payment {
  id: string;
  from: string;
  to: string;
  amount: number;
  type: "project" | "marketplace" | "subscription" | "refund";
  status: PaymentStatus;
  createdAt: string;
  reference: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  subject: string;
  actor: string;
  timestamp: string;
  type: "user" | "asset" | "project" | "report" | "payment";
}
