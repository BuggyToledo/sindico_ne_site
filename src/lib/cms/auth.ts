import crypto from "node:crypto";
import type { EditorialRole, EditorialUser } from "@/types/editorial";

const DEFAULT_SECRET =
  process.env.CMS_SESSION_SECRET ||
  "sindicone-editorial-hmac-secret-key-2026-server-only";

const PREVIEW_SECRET =
  process.env.CMS_PREVIEW_SECRET || "sindicone-preview-secret-2026";

/**
 * Server-side user registry with Role-Based Access Control (RBAC):
 * - admin: Full control (create, edit, publish, schedule, delete, restore revisions)
 * - editor: Create, edit, publish, schedule, restore revisions (cannot delete published posts)
 * - author: Create and edit drafts/review requests (cannot publish directly or delete)
 */
function getConfiguredUsers(): Array<EditorialUser & { password: string }> {
  return [
    {
      id: "user-admin-1",
      name: "Adriano Toledo (Administrador)",
      email: process.env.CMS_ADMIN_EMAIL || "admin@sindicone.com.br",
      role: "admin",
      password: process.env.CMS_ADMIN_PASSWORD || "SindicoNe@2026!",
    },
    {
      id: "user-editor-1",
      name: "Editoria Síndico Né!",
      email: process.env.CMS_EDITOR_EMAIL || "editor@sindicone.com.br",
      role: "editor",
      password: process.env.CMS_EDITOR_PASSWORD || "EditorNe@2026!",
    },
    {
      id: "user-author-1",
      name: "Redator Convidado",
      email: process.env.CMS_AUTHOR_EMAIL || "autor@sindicone.com.br",
      role: "author",
      password: process.env.CMS_AUTHOR_PASSWORD || "AutorNe@2026!",
    },
  ];
}

export function authenticateEditorialUser(
  email: string,
  password: string
): EditorialUser | null {
  const users = getConfiguredUsers();
  const match = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  if (!match) return null;
  return {
    id: match.id,
    name: match.name,
    email: match.email,
    role: match.role,
  };
}

export function createSessionToken(user: EditorialUser): string {
  const payload = JSON.stringify({
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
  });
  const base64Payload = Buffer.from(payload, "utf-8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", DEFAULT_SECRET)
    .update(base64Payload)
    .digest("base64url");
  return `${base64Payload}.${signature}`;
}

export function verifySessionToken(token?: string | null): EditorialUser | null {
  if (!token || !token.includes(".")) return null;
  const [base64Payload, signature] = token.split(".");
  if (!base64Payload || !signature) return null;

  const expectedSig = crypto
    .createHmac("sha256", DEFAULT_SECRET)
    .update(base64Payload)
    .digest("base64url");

  if (signature !== expectedSig) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(base64Payload, "base64url").toString("utf-8")
    ) as EditorialUser & { exp: number };
    if (!parsed.exp || Date.now() > parsed.exp) return null;
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

export function hasRolePermission(
  role: EditorialRole,
  action: "create" | "edit" | "publish" | "schedule" | "delete" | "restore"
): boolean {
  if (role === "admin") return true;
  if (role === "editor") {
    return action !== "delete";
  }
  if (role === "author") {
    return action === "create" || action === "edit";
  }
  return false;
}

export function generatePreviewToken(slug: string): string {
  return crypto
    .createHmac("sha256", PREVIEW_SECRET)
    .update(slug)
    .digest("hex")
    .slice(0, 24);
}

export function verifyPreviewToken(slug: string, token?: string | null): boolean {
  if (!token) return false;
  if (token === PREVIEW_SECRET) return true;
  return token === generatePreviewToken(slug);
}
