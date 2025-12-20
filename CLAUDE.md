# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jobes is a personal job tracker dashboard built to manage job opportunities, professional contacts, and application progress. You will ALWAYS read @context.md for full feature specifications at the start of every session.

## Commands

```bash
bun dev        # Start development server at localhost:3000
bun run build  # Production build
bun run lint   # Run ESLint
```

## Tech Stack & Constraints

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router with React Server Components)
- **UI**: shadcn/ui (new-york style) with Tailwind CSS v4
- **Forms**: react-hook-form + zod validation
- **Backend Logic**: Effect.ts is REQUIRED for all backend/service code

### Effect.ts Usage

All backend services, data operations, and business logic MUST use Effect.ts. Structure services with methods like `createCompany`, `createPerson` to enable future database migration. Frontend components may use vanilla React patterns for now.

### Storage Architecture

Currently localStorage-based, but services are abstracted to facilitate future database integration. Keep data operations in dedicated service modules.

## Project Structure

```
app/              # Next.js App Router pages
  companies/      # Companies feature
components/
  ui/             # shadcn/ui components
lib/
  utils.ts        # Shared utilities (cn helper for Tailwind)
```

## shadcn/ui

Add components via: `bunx shadcn@latest add <component-name>`

Configuration in `components.json` - uses `@/components/ui` alias.
