# Agent Guidelines for reclaim-my-life

This document provides essential information for AI coding agents working in this repository.

## Project Overview

- **Type**: Next.js 16 Web Application (App Router)
- **Language**: TypeScript 5.x (strict mode enabled)
- **Framework**: React 19.2.3
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm (use `pnpm install`, not npm or yarn)
- **Node Version**: ES2017+ target

## Build, Lint, and Test Commands

### Development
```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build production bundle
pnpm start        # Start production server
pnpm lint         # Run ESLint on codebase
```

### Testing
**Note**: No testing framework is currently configured. If tests are added:
- Recommended: Jest, Vitest, or Playwright
- Test file pattern: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`

### Running Single Tests
When a testing framework is added, document commands here.

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Always enabled
- **Module resolution**: bundler
- **Path alias**: `@/*` maps to project root (e.g., `import { foo } from "@/lib/utils"`)
- **JSX runtime**: react-jsx (no need to import React in components)
- **Target**: ES2017

### Imports
```typescript
// Order: external packages, then internal modules, then relative imports
import type { Metadata } from "next";                    // Type-only imports first
import { Geist, Geist_Mono } from "next/font/google";   // External packages
import "./globals.css";                                   // Relative imports last

// Use type imports when importing only types
import type { ReactNode } from "react";

// Use path aliases for internal modules
import { Button } from "@/components/ui/button";
```

### File Naming
- **Components**: PascalCase (e.g., `UserProfile.tsx`, `Button.tsx`)
- **Utilities/Libs**: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- **Next.js Special Files**: lowercase (e.g., `page.tsx`, `layout.tsx`, `route.ts`)

### Component Structure
```typescript
// Server Components (default in App Router)
export default function ComponentName() {
  return <div>...</div>;
}

// Client Components (when needed)
"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [state, setState] = useState(false);
  return <div>...</div>;
}

// Use named exports for utilities, default exports for components
```

### React Conventions
- **Default**: Server Components (no "use client" directive)
- **Client Components**: Add `"use client"` directive only when needed (hooks, event handlers, browser APIs)
- **Metadata**: Export `metadata` object for SEO in pages and layouts
- **Props**: Use `Readonly<{}>` for props when appropriate

### Tailwind CSS
- **Version**: v4 (uses new `@import "tailwindcss"` syntax)
- **Dark Mode**: Uses `prefers-color-scheme` media query
- **Custom Colors**: Define in globals.css using CSS variables and `@theme inline`
- **Utility-First**: Prefer Tailwind utilities over custom CSS
- **Responsive**: Use responsive prefixes (sm:, md:, lg:, xl:, 2xl:)

```tsx
// Example: Tailwind class organization
<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
  {/* Group related utilities: layout -> spacing -> colors -> effects */}
</div>
```

### Formatting
- **Indentation**: 2 spaces
- **Quotes**: Double quotes for strings
- **Semicolons**: Required
- **Line Length**: No strict limit, but keep readable
- **Trailing Commas**: Use in multi-line objects/arrays

### Naming Conventions
- **Variables/Functions**: camelCase (`getUserData`, `isLoading`)
- **Components**: PascalCase (`UserProfile`, `AuthButton`)
- **Constants**: UPPER_SNAKE_CASE for true constants (`API_URL`, `MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`)
- **Booleans**: Use `is`, `has`, `should` prefixes (`isLoading`, `hasError`)

### Types
- Prefer `type` over `interface` for object shapes unless extending
- Use `unknown` instead of `any` when type is truly unknown
- Leverage TypeScript inference; don't over-annotate
- Export types alongside components when reusable

```typescript
// Good
type UserProps = {
  name: string;
  age: number;
};

// For function props, use inline or separate types
type ButtonProps = Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
}>;
```

### Error Handling
- Use try/catch for async operations
- Provide meaningful error messages
- Handle errors at appropriate boundaries
- Use Error Boundaries for React component errors

```typescript
// Server actions/API routes
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error("Failed to fetch data:", error);
  throw new Error("Failed to fetch data");
}
```

### Next.js Specific
- **App Router**: Use app directory structure
- **Special Files**: `page.tsx` (routes), `layout.tsx` (layouts), `route.ts` (API), `loading.tsx`, `error.tsx`
- **Data Fetching**: Use async Server Components, avoid useEffect for initial data
- **Images**: Always use Next.js `Image` component with width/height
- **Links**: Use Next.js `Link` component for navigation
- **Fonts**: Use `next/font` for optimized font loading

### Comments
- Write self-documenting code; minimize comments
- Use comments for "why", not "what"
- **Avoid obvious comments**: Don't comment what the code clearly shows
  - ❌ Bad: `// Loop through users` above `users.forEach(...)`
  - ❌ Bad: `// Set user name` above `user.name = name`
  - ❌ Bad: `// Mock Next.js navigation` above `vi.mock("next/navigation")`
- **No speculative comments**: Don't comment about future intentions
  - ❌ Bad: `// Structure ready for future providers`
  - ❌ Bad: `// Not enforced initially, but tracked for future 80% goal`
- **JSDoc only when needed**: For public APIs when type signature isn't self-explanatory
- **TODO comments**: Use `// TODO: description` format when needed

## Project Structure

```
/app                 # Next.js App Router (routes, layouts, pages)
  layout.tsx         # Root layout
  page.tsx           # Home page
  globals.css        # Global styles and Tailwind config
/public              # Static assets (images, fonts, etc.)
/node_modules        # Dependencies (ignored by git)
/.next               # Build output (ignored by git)
```

## ESLint Configuration
- Uses ESLint v9 flat config (`eslint.config.mjs`)
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
- Always run `pnpm lint` before committing

## Git Workflow
- Write clear, concise commit messages
- Follow conventional commits format when possible
- Don't commit: `node_modules`, `.next`, `.env*`, build outputs

## Development Philosophy & Preferences

### Dependency Management
- **Just-in-time additions**: Only add packages/helpers when actively implementing features that need them
- **Avoid speculative code**: No "we might need this later" additions
- **Example**: Don't install accessibility testing packages during test setup; install them when writing the first accessibility test
- **Why**: Keeps codebase lean, avoids unused dependencies, prevents premature optimization

### Code Organization
- **Grow organically**: Let file structure and utilities emerge from actual needs
- **Refactor when painful**: Don't over-architect upfront; wait for patterns to emerge
- **Delete unused code**: Regular cleanup of unused files/functions is encouraged
- **Minimal viable structure**: Start simple, add complexity only when necessary

### AI Collaboration Guidelines

#### Learning Balance (70/30 Rule)
- **AI handles 70%**: Boilerplate, setup, configuration, repetitive patterns, well-established best practices
- **Human handles 30%**: Novel problems, business logic, learning opportunities, complex decisions
- **Goal**: Maximize learning while maintaining development velocity

#### Review & Understanding
- **Mandatory review**: Always review AI-generated code before committing
- **Question decisions**: Challenge AI on "why" for significant architectural or technical choices
- **Understand before accepting**: If you can't explain what the code does, ask for clarification or research it
- **Modify and experiment**: Don't just accept AI output; try changing it, breaking it, improving it

#### Communication Style
- **Explain tradeoffs**: AI should present pros/cons for major decisions, not just implement
- **Ask permission**: For adding new dependencies, major refactors, or architectural changes
- **Provide context**: AI should explain why a particular approach was chosen over alternatives
- **Link to resources**: Include relevant documentation or learning resources when introducing new concepts

#### Development Workflow
- **Incremental additions**: Add one piece at a time, verify it works, then move to the next
- **Test immediately**: Verify each change works before moving forward
- **Commit frequently**: Small, focused commits are preferred over large changesets
- **Document decisions**: Significant choices should be explained in commit messages or comments

## Additional Notes
- This is a sober living home website; early stage of development
- Testing infrastructure uses Vitest + React Testing Library + happy-dom
- No state management library configured yet
- No API client configured yet
- No database or backend configured yet
- Dark mode support is built-in via CSS variables and `prefers-color-scheme`
