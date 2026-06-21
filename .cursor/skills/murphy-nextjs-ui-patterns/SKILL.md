---
name: murphy-nextjs-ui-patterns
description: Murphy Cloud Next.js UI implementation patterns for React pages, data tables, virtualized tables, custom expandable tables, export dialogs, sheets, buttons, tooltips, and search controls. Use when creating or modifying Murphy Cloud product UI, tables, filters, export flows, or form drawers.
---

# Murphy Next.js UI Patterns

Use this skill for UI implementation details shared by Murphy Cloud products. Mandatory boundaries remain in `.cursor/rules/`.

## Component Structure

- Client pages start with `"use client"` when they use hooks, browser APIs, React Query, or local state.
- Keep import order: React, Next.js, third-party, UI components, business components, hooks, Server Actions, types.
- Component body order: hooks, state, memoized values, callbacks, effects, render.
- All write operations show success or failure toast.

## Tables

- Define columns with `React.useMemo<ColumnDef<T>[]>(...)`.
- Use a stable `tableId` when table preferences are persisted.
- Add `size` for meaningful columns and `meta` for toolbar filters.
- Use virtualized tables for large datasets.
- Avoid hard-coded table heights when flex layout can fill available space.
- Operation columns use `DropdownMenu`, not multiple inline buttons.
- For Chinese sorting, reuse a module-level `Intl.Collator("zh-CN")`.

## Forms and Drawers

- Sheet forms use `SheetHeader`, scrollable `SheetBody`, and fixed `SheetFooter`.
- Prefer one field per row in drawers.
- Buttons use icon + text.
- Disabled write actions should explain missing permissions.

## Dense Cells

- Long text must not expand row height unexpectedly.
- Use `truncate`, secondary muted text, and tooltip for full information where helpful.

## Export

- Export filtered data, not raw data.
- Show confirmation before export.
- Default filename includes timestamp and can be edited by the user.
- Set worksheet column widths and show toast success/failure.
