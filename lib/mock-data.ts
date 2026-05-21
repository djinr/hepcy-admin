import type { User, Asset, Project, Report, Verification, Payment, ActivityItem } from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "Nomin Battsetseg", email: "nomin@hepcy.io", role: "creator", status: "active", verification: "verified", joinedAt: "2024-03-12", lastActive: "2026-05-20", projectCount: 48, totalEarnings: 24800 },
  { id: "u2", name: "Ariunbold Gantulga", email: "ari@studio-g.mn", role: "studio", status: "active", verification: "verified", joinedAt: "2024-01-08", lastActive: "2026-05-21", projectCount: 122, totalEarnings: 98400 },
  { id: "u3", name: "Tsetsgee Dorj", email: "tsetsgee@hepcy.io", role: "creator", status: "pending", verification: "pending", joinedAt: "2026-05-18", lastActive: "2026-05-18", projectCount: 2, totalEarnings: 0 },
  { id: "u4", name: "Enkhjargal Bat", email: "enk@client.mn", role: "user", status: "active", verification: "unverified", joinedAt: "2025-09-14", lastActive: "2026-05-15", projectCount: 7 },
  { id: "u5", name: "Bilguun Sukhbaatar", email: "bilguun@hepcy.io", role: "creator", status: "suspended", verification: "verified", joinedAt: "2024-06-21", lastActive: "2026-04-02", projectCount: 31, totalEarnings: 8200 },
  { id: "u6", name: "Oyuntuya Naran", email: "oyun@naran.studio", role: "studio", status: "active", verification: "verified", joinedAt: "2023-11-30", lastActive: "2026-05-20", projectCount: 89, totalEarnings: 67300 },
  { id: "u7", name: "Ganbaatar Ochir", email: "ganba@freelance.mn", role: "creator", status: "warned", verification: "verified", joinedAt: "2024-08-05", lastActive: "2026-05-19", projectCount: 14, totalEarnings: 3100 },
  { id: "u8", name: "Lkhamragchaa Bold", email: "lkham@hepcy.io", role: "creator", status: "active", verification: "pending", joinedAt: "2026-05-10", lastActive: "2026-05-21", projectCount: 5, totalEarnings: 420 },
];

export const mockAssets: Asset[] = [
  { id: "a1", title: "Cinematic Desert LUT Pack", type: "lut", creator: "Nomin Battsetseg", creatorId: "u1", status: "pending", price: 29, submittedAt: "2026-05-20", downloads: 0 },
  { id: "a2", title: "Neon City Motion Pack", type: "template", creator: "Oyuntuya Naran", creatorId: "u6", status: "approved", price: 49, submittedAt: "2026-05-15", reviewedAt: "2026-05-16", reviewedBy: "Admin", downloads: 342 },
  { id: "a3", title: "Blender Sci-Fi Rig v2", type: "blender", creator: "Bilguun Sukhbaatar", creatorId: "u5", status: "flagged", price: 79, submittedAt: "2026-05-12", downloads: 18 },
  { id: "a4", title: "GPT-4 Prompt Bundle Vol.3", type: "prompt", creator: "Ganbaatar Ochir", creatorId: "u7", status: "pending", price: 19, submittedAt: "2026-05-21", downloads: 0 },
  { id: "a5", title: "Houdini FX Toolkit", type: "houdini", creator: "Ariunbold Gantulga", creatorId: "u2", status: "approved", price: 149, submittedAt: "2026-04-30", reviewedAt: "2026-05-01", reviewedBy: "Admin", downloads: 88 },
  { id: "a6", title: "Teal & Orange Film LUT", type: "lut", creator: "Lkhamragchaa Bold", creatorId: "u8", status: "pending", price: 18, submittedAt: "2026-05-21", downloads: 0 },
  { id: "a7", title: "Brand Identity Preset Pack", type: "preset", creator: "Tsetsgee Dorj", creatorId: "u3", status: "rejected", price: 35, submittedAt: "2026-05-17", reviewedAt: "2026-05-18", reviewedBy: "Admin", downloads: 0 },
];

export const mockProjects: Project[] = [
  { id: "p1", title: "Nike Mongolia Campaign", client: "Enkhjargal Bat", studio: "Ariunbold Gantulga", status: "active", milestones: 6, completedMilestones: 3, budget: 12000, startDate: "2026-04-01", dueDate: "2026-06-30", hasDispute: false },
  { id: "p2", title: "Mongol Bank Brand Film", client: "Mongol Bank LLC", studio: "Oyuntuya Naran", status: "in_review", milestones: 4, completedMilestones: 4, budget: 28000, startDate: "2026-02-15", dueDate: "2026-05-15", hasDispute: false },
  { id: "p3", title: "3D Product Viz — Gobi", client: "Gobi Cashmere", studio: "Naran Studio", status: "disputed", milestones: 3, completedMilestones: 2, budget: 8500, startDate: "2026-03-10", dueDate: "2026-05-10", hasDispute: true },
  { id: "p4", title: "Motion Identity — Mobicom", client: "Mobicom Corp", studio: "Ariunbold Gantulga", status: "completed", milestones: 5, completedMilestones: 5, budget: 15000, startDate: "2025-12-01", dueDate: "2026-02-28", hasDispute: false },
  { id: "p5", title: "AI Ad Campaign Gen", client: "TDB Bank", studio: "Nomin Battsetseg", status: "active", milestones: 3, completedMilestones: 1, budget: 6200, startDate: "2026-05-01", dueDate: "2026-07-01", hasDispute: false },
];

export const mockReports: Report[] = [
  { id: "r1", type: "stolen_asset", reportedBy: "Nomin Battsetseg", targetUser: "Bilguun Sukhbaatar", targetId: "u5", status: "investigating", severity: "high", createdAt: "2026-05-19", description: "Blender rig is a direct copy of my paid work from 2025." },
  { id: "r2", type: "fake_creator", reportedBy: "Enkhjargal Bat", targetUser: "Tsetsgee Dorj", targetId: "u3", status: "open", severity: "medium", createdAt: "2026-05-20", description: "Portfolio images appear to be AI-generated and misrepresented as original work." },
  { id: "r3", type: "scam", reportedBy: "Gobi Cashmere", targetUser: "Ganbaatar Ochir", targetId: "u7", status: "open", severity: "high", createdAt: "2026-05-21", description: "Project deliverables not provided after full payment." },
  { id: "r4", type: "spam", reportedBy: "Oyuntuya Naran", targetUser: "Unknown", targetId: "u0", status: "resolved", severity: "low", createdAt: "2026-05-10", description: "Mass messaging creators with unsolicited offers." },
];

export const mockVerifications: Verification[] = [
  { id: "v1", user: "Tsetsgee Dorj", userId: "u3", role: "creator", submittedAt: "2026-05-18", documents: 3, status: "pending" },
  { id: "v2", user: "Lkhamragchaa Bold", userId: "u8", role: "creator", submittedAt: "2026-05-10", documents: 4, status: "pending" },
  { id: "v3", user: "Munkh-Orgil Studio", userId: "u9", role: "studio", submittedAt: "2026-05-08", documents: 6, status: "pending" },
  { id: "v4", user: "Bilguun Sukhbaatar", userId: "u5", role: "creator", submittedAt: "2024-06-21", documents: 3, status: "verified", notes: "Verified by admin review." },
];

export const mockPayments: Payment[] = [
  { id: "py1", from: "Enkhjargal Bat", to: "Ariunbold Gantulga", amount: 4000, type: "project", status: "completed", createdAt: "2026-05-18", reference: "PRJ-P1-M2" },
  { id: "py2", from: "Gobi Cashmere", to: "Naran Studio", amount: 2833, type: "project", status: "pending", createdAt: "2026-05-20", reference: "PRJ-P3-M3" },
  { id: "py3", from: "Market Buyer", to: "Oyuntuya Naran", amount: 49, type: "marketplace", status: "completed", createdAt: "2026-05-21", reference: "MKT-A2-3421" },
  { id: "py4", from: "TDB Bank", to: "Nomin Battsetseg", amount: 2066, type: "project", status: "pending", createdAt: "2026-05-19", reference: "PRJ-P5-M1" },
  { id: "py5", from: "Gobi Cashmere", to: "Naran Studio", amount: 2833, type: "refund", status: "pending", createdAt: "2026-05-21", reference: "REF-PRJ-P3" },
];

export const mockActivity: ActivityItem[] = [
  { id: "ac1", action: "submitted verification", subject: "Tsetsgee Dorj", actor: "Tsetsgee Dorj", timestamp: "2026-05-21T10:42:00Z", type: "user" },
  { id: "ac2", action: "uploaded asset", subject: "GPT-4 Prompt Bundle Vol.3", actor: "Ganbaatar Ochir", timestamp: "2026-05-21T09:18:00Z", type: "asset" },
  { id: "ac3", action: "filed report", subject: "Scam report #r3", actor: "Gobi Cashmere", timestamp: "2026-05-21T08:55:00Z", type: "report" },
  { id: "ac4", action: "milestone approved", subject: "Nike Mongolia Campaign M3", actor: "Admin", timestamp: "2026-05-20T17:30:00Z", type: "project" },
  { id: "ac5", action: "asset approved", subject: "Neon City Motion Pack", actor: "Admin", timestamp: "2026-05-16T14:10:00Z", type: "asset" },
  { id: "ac6", action: "account suspended", subject: "Bilguun Sukhbaatar", actor: "Admin", timestamp: "2026-05-15T11:05:00Z", type: "user" },
];

export const dashboardStats = {
  totalCreators: 1284,
  activeProjects: 247,
  marketplaceSales: 18640,
  pendingApprovals: 11,
  flaggedReports: 3,
  verificationQueue: 3,
};
