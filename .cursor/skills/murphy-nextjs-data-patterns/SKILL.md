---
name: murphy-nextjs-data-patterns
description: Murphy Cloud Next.js data-layer implementation patterns for Drizzle ORM, Server Actions, React Query hooks, permission checks, type schemas, and mock-data flow. Use when adding or modifying database schema, server/actions, hooks, permissions, user/auth actions, or typed domain data in Murphy Cloud products.
---

# Murphy Next.js Data Patterns

Use this skill for data-layer implementation detail shared by Murphy Cloud products.

## Data Flow

Preferred flow:

```text
Client page/component
  -> domain hook in hooks/use-*.ts
  -> Server Action in server/actions/*Action.ts
  -> Drizzle query or unified mock data source
```

Avoid internal `app/api` routes for ordinary data access. API routes are acceptable for auth, downloads, render endpoints, or other protocol boundaries.

## Drizzle

- Schema files live in `server/db/schema/{entity}.ts`.
- Use Drizzle query builder, not Prisma or raw SQL strings.
- Use `.returning()` when insert/update needs the result.
- Handle nullable columns intentionally.
- Common operators: `eq`, `and`, `or`, `desc`, `asc`, `isNull`, `inArray`.

## Server Actions

- Files start with `"use server";` and import `"server-only";`.
- Return `{ success: boolean, data?: T, error?: string }`.
- Use `auth()` for actions requiring a logged-in user.
- Write operations check DB-backed permissions.
- Database, file, and external I/O are wrapped in `try/catch`.

## React Query

- Hooks live in `hooks/use-{domain}.ts`.
- Use `useQuery` for reads and `useMutation` for writes.
- Mutation functions check `res.success`; failures throw `Error`.
- `onSuccess` invalidates relevant query keys.
- Components use `mutation.isPending`.

## Types and Validation

- Domain types live in `types/{domain}-types.ts`.
- Prefer Zod schemas for form/action input.
- Keep date serialization explicit.
- Centralize enum values and labels.

## Permissions

- Permission IDs come from constants, never scattered strings.
- Client checks are UX only; server checks are authoritative.
- Navigation entries declare required permissions when applicable.
