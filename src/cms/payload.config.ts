/**
 * Payload CMS 3.x Schema Reference & Collection Configuration (`src/cms/payload.config.ts`).
 *
 * Mirrors the exact data model used by `src/types/editorial.ts` and `src/lib/cms/store.ts`
 * so the project can switch from the file/JSON store to a dedicated PostgreSQL/SQLite
 * Payload database adapter without modifying any frontend component or editorial field.
 */

export const PayloadCollectionsConfig = {
  collections: [
    {
      slug: "articles",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "categorySlug", "status", "publishedAt", "updatedAt"],
      },
      access: {
        // Public readers can only read published articles; authenticated editors/admins can read all
        read: ({ req }: { req: { user?: { role?: string } } }) => {
          if (req?.user) return true;
          return { status: { equals: "published" } };
        },
        create: ({ req }: { req: { user?: { role?: string } } }) =>
          Boolean(req?.user?.role && ["admin", "editor", "author"].includes(req.user.role)),
        update: ({ req }: { req: { user?: { role?: string } } }) =>
          Boolean(req?.user?.role && ["admin", "editor", "author"].includes(req.user.role)),
        delete: ({ req }: { req: { user?: { role?: string } } }) =>
          req?.user?.role === "admin",
      },
      versions: {
        drafts: true,
        maxPerDoc: 20,
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true, unique: true, index: true },
        { name: "LegacyRootUrl", type: "checkbox", defaultValue: false },
        { name: "excerpt", type: "textarea", required: true },
        { name: "directAnswer", type: "textarea", required: true },
        { name: "contentHtml", type: "richText", required: true },
        {
          name: "featuredImage",
          type: "group",
          fields: [
            { name: "url", type: "text", required: true },
            { name: "alt", type: "text", required: true },
            { name: "width", type: "number", defaultValue: 1200 },
            { name: "height", type: "number", defaultValue: 675 },
            { name: "caption", type: "text" },
          ],
        },
        { name: "authorId", type: "text", required: true, defaultValue: "adriano-toledo" },
        { name: "reviewerId", type: "text", defaultValue: "adriano-toledo" },
        { name: "categorySlug", type: "text", required: true, index: true },
        { name: "tags", type: "array", fields: [{ name: "tag", type: "text" }] },
        { name: "publishedAt", type: "date", required: true },
        { name: "updatedAt", type: "date", required: true },
        { name: "scheduledFor", type: "date" },
        {
          name: "status",
          type: "select",
          options: ["draft", "in_review", "scheduled", "published", "archived"],
          defaultValue: "draft",
          required: true,
        },
        { name: "seoTitle", type: "text", required: true },
        { name: "seoDescription", type: "textarea", required: true },
        { name: "canonicalUrl", type: "text", required: true },
        { name: "noIndex", type: "checkbox", defaultValue: false },
        {
          name: "references",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "publisher", type: "text", required: true },
            { name: "url", type: "text" },
          ],
        },
        {
          name: "faq",
          type: "array",
          fields: [
            { name: "question", type: "text", required: true },
            { name: "answer", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
} as const;
