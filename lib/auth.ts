import type { Role } from "@/types";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

// Mock auth — replace with real auth provider (NextAuth, Clerk, etc.)
export const MOCK_ADMIN: AdminUser = {
  id: "admin-1",
  name: "Hepcy Admin",
  email: "admin@hepcy.io",
  role: "superadmin",
};

export function canAccess(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Role[] = ["user", "creator", "studio", "admin", "superadmin"];
  return hierarchy.indexOf(userRole) >= hierarchy.indexOf(requiredRole);
}

export function isAdmin(role: Role): boolean {
  return role === "admin" || role === "superadmin";
}
