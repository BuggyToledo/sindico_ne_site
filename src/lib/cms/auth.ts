import crypto from "node:crypto";
import type { EditorialRole, EditorialUser } from "@/types/editorial";

const DEFAULT_SECRET =
  process.env.CMS_SESSION_SECRET ||
  "sindicone-editorial-hmac-secret-key-2026-server-only";

const PREVIEW_SECRET =
  process.env.CMS_PREVIEW_SECRET || "sindicone-preview-secret-2026";

interface ConfiguredUserRecord extends EditorialUser {
  emails: string[];
  passwords: string[];
}

/**
 * Server-side user registry with Role-Based Access Control (RBAC):
 * - admin: Full control (create, edit, publish, schedule, delete, restore revisions)
 * - editor: Create, edit, publish, schedule, restore revisions (cannot delete published posts)
 * - author: Create and edit drafts/review requests (cannot publish directly or delete)
 */
function getConfiguredUsers(): ConfiguredUserRecord[] {
  const adminEmails = [
    "admin@sindicone.com.br",
    "contato@sindicone.com.br",
    ...(process.env.CMS_ADMIN_EMAIL ? [process.env.CMS_ADMIN_EMAIL.trim().toLowerCase()] : []),
  ];
  const adminPasswords = [
    "SindicoNe@2026!",
    "sindicone-admin-2026",
    ...(process.env.CMS_ADMIN_PASSWORD ? [process.env.CMS_ADMIN_PASSWORD.trim()] : []),
  ];

  const editorEmails = [
    "editor@sindicone.com.br",
    ...(process.env.CMS_EDITOR_EMAIL ? [process.env.CMS_EDITOR_EMAIL.trim().toLowerCase()] : []),
  ];
  const editorPasswords = [
    "EditorNe@2026!",
    "sindicone-editor-2026",
    ...(process.env.CMS_EDITOR_PASSWORD ? [process.env.CMS_EDITOR_PASSWORD.trim()] : []),
  ];

  const authorEmails = [
    "autor@sindicone.com.br",
    ...(process.env.CMS_AUTHOR_EMAIL ? [process.env.CMS_AUTHOR_EMAIL.trim().toLowerCase()] : []),
  ];
  const authorPasswords = [
    "AutorNe@2026!",
    "sindicone-autor-2026",
    ...(process.env.CMS_AUTHOR_PASSWORD ? [process.env.CMS_AUTHOR_PASSWORD.trim()] : []),
  ];

  return [
    {
      id: "user-admin-1",
      name: "Adriano Toledo (Administrador)",
      email: process.env.CMS_ADMIN_EMAIL || "admin@sindicone.com.br",
      emails: adminEmails,
      role: "admin",
      passwords: adminPasswords,
    },
    {
      id: "user-editor-1",
      name: "Editoria Síndico Né!",
      email: process.env.CMS_EDITOR_EMAIL || "editor@sindicone.com.br",
      emails: editorEmails,
      role: "editor",
      passwords: editorPasswords,
    },
    {
      id: "user-author-1",
      name: "Redator Convidado",
      email: process.env.CMS_AUTHOR_EMAIL || "autor@sindicone.com.br",
      emails: authorEmails,
      role: "author",
      passwords: authorPasswords,
    },
  ];
}

export function authenticateEditorialUser(
  email: string,
  password: string
): EditorialUser | null {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();
  if (!cleanEmail || !cleanPassword) return null;

  const users = getConfiguredUsers();
  const match = users.find(
    (u) =>
      u.emails.includes(cleanEmail) && u.passwords.includes(cleanPassword)
  );
  if (!match) return null;
  return {
    id: match.id,
    name: match.name,
    email: cleanEmail,
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

export function getAuthenticatedUserFromRequest(
  request: Request,
  cookieToken?: string | null
): EditorialUser | null {
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const bearerToken = authHeader.slice(7).trim();
    const fromBearer = verifySessionToken(bearerToken);
    if (fromBearer) return fromBearer;
  }
  return verifySessionToken(cookieToken);
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
