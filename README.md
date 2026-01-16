# Reclaim My Life

A modern sober living home website built with Next.js and Sanity CMS.

## Project Structure

This is a **pnpm workspace monorepo** with two packages:

- **Web workspace** (`/web`) - Next.js 16 application with App Router
- **Studio workspace** (`/studio`) - Sanity Studio CMS for content management

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity Studio 5
- **Package Manager**: pnpm (workspace mode)
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js (ES2017+ target)
- pnpm installed globally: `npm install -g pnpm`

### Development

**Run the Next.js application:**
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

**Run Sanity Studio (CMS):**
```bash
pnpm sanity
```
Open [http://localhost:3333](http://localhost:3333) to manage content.

**Run both simultaneously:**
```bash
# In one terminal
pnpm dev

# In another terminal
pnpm sanity
```

### Other Commands

```bash
pnpm build              # Build Next.js for production
pnpm start              # Start production server
pnpm lint               # Run ESLint
pnpm sanity:build       # Build Sanity Studio
pnpm sanity:deploy      # Deploy Sanity Studio to Sanity hosting

# Testing
pnpm test               # Run tests
pnpm test:ui            # Run tests with UI
pnpm test:coverage      # Run tests with coverage
pnpm test:watch         # Run tests in watch mode
```

## Workspace Architecture

This project uses **pnpm workspaces** for clean separation of concerns:

```
/
├── web/                  # Next.js App Router app
│   ├── app/              # Routes and layouts
│   ├── components/       # React components
│   └── lib/              # Utilities and type definitions
├── studio/               # Sanity Studio workspace (separate package)
│   ├── package.json      # Studio-specific dependencies
│   ├── sanity.config.ts  # Sanity configuration
│   └── schemas/          # CMS content schemas
├── package.json          # Root workspace scripts
├── pnpm-workspace.yaml   # Workspace configuration
└── README.md             # Project overview
```

### Why Workspace Architecture?

- **Clean Separation**: Studio and Next.js have isolated dependencies
- **Efficient**: Shared dependencies (React, TypeScript) are symlinked, not duplicated
- **Scalable**: Easy to add more workspaces in the future (e.g., `/api`, `/docs`)
- **Type Safety**: Both workspaces use the same TypeScript configuration

## Environment Setup

Create a `/web/.env.local` file:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-15
```

Create a `/studio/.env` file:

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```


## CMS Integration

### How It Works

This site uses **Sanity CMS** for content management with **ISR (Incremental Static Regeneration)** for optimal performance.

**Architecture:**
- **Content Management**: Sanity Studio (`/studio`)
- **Content Delivery**: Sanity CDN (global, optimized)
- **Data Fetching**: Server Components with ISR
- **Revalidation**: 5 minutes (300 seconds)

### Content Flow

1. **Edit Content**: Make changes in Sanity Studio (http://localhost:3333)
2. **Publish**: Click "Publish" button in Studio
3. **Wait**: Changes appear on site within 5 minutes
4. **Future**: Webhook will trigger instant updates (planned)

### Revalidation Strategy

**Current (Phase 1):**
```typescript
export const revalidate = 300; // 5 minutes
```

- Content updates within 5 minutes
- Good balance of freshness and performance
- Uses ~8,640 Netlify Functions/month per page

**Future (Phase 2 - Planned):**
```typescript
export const revalidate = 3600; // 1 hour
```

- Add webhook for on-demand revalidation
- Instant updates when content published
- 92% reduction in Function usage

### CMS Architecture

```
Content Update Flow:
┌─────────────────┐
│ Sanity Studio   │  1. Content editor makes changes
│ (localhost:3333)│  2. Clicks "Publish"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sanity CDN     │  3. Content stored in Sanity Cloud
│  (Global)       │  4. Available via API
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js ISR    │  5. Fetches data server-side
│  (Server)       │  6. Generates static HTML
│                 │  7. Caches for 5 minutes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Netlify CDN    │  8. Serves cached page (fast!)
│  (Edge)         │  9. Revalidates after 5 min
└─────────────────┘
```

### Key Files

**CMS Integration:**
- `lib/sanity/client.ts` - Sanity client configuration
- `lib/sanity/queries.ts` - GROQ queries for data fetching
- `lib/sanity/types.ts` - TypeScript types for content

**Components:**
- `components/PortableText.tsx` - Renders rich text from CMS
- `components/SanityImage.tsx` - Optimized image rendering

**Content Schemas:**
- `studio/schemas/homePage.ts` - Home page content structure
- `studio/schemas/siteSettings.ts` - Site-wide settings

### Testing Content Changes

**Quick test:**
1. Start both servers:
   ```bash
   pnpm dev      # Terminal 1
   pnpm sanity   # Terminal 2
   ```
2. Change hero title in Studio → Publish
3. Wait 5 minutes
4. Hard refresh page (Cmd/Ctrl + Shift + R)
5. Verify title updated

### Troubleshooting

**Content not updating:**
- Wait full 5 minutes after publishing
- Hard refresh page (Cmd/Ctrl + Shift + R)
- Check that content is published (not draft) in Studio
- Verify environment variables in `.env.local`

**Images not loading:**
- Verify `cdn.sanity.io` is in `next.config.ts` `remotePatterns`
- Check that image has alt text in Studio
- Inspect Network tab for 404 errors

**Error: "Content not available":**
- Ensure Home Page document is published in Studio
- Check Sanity project ID in `.env.local`
- Verify CORS settings in Sanity dashboard

**Build errors:**
- Run `pnpm build` to check for TypeScript errors
- Verify all required fields have data in Studio
- Check that environment variables are set

### Performance Monitoring

**Netlify Function Usage:**
- Expected: ~8,640 executions/month per page
- Free tier limit: 125,000/month
- Monitor in Netlify dashboard

**ISR Performance:**
- First load (after revalidation): ~500-1000ms
- Cached loads: ~100-300ms
- Image optimization: WebP/AVIF via Sanity CDN

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
