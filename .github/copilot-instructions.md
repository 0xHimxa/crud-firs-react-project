## Repository quick-start for AI coding agents

This file contains focused, actionable knowledge to make an AI coding assistant immediately productive in this repo.

Keep guidance short and concrete — reference the actual files and commands below when editing code.

### Big picture
- Framework: React (v19) + React Router (v7) full-stack template with server-side rendering (SSR).
- Entry points: server and client bundles are produced into `build/` by `npm run build`. The server is started with `npm run start` which runs `react-router-serve ./build/server/index.js` (see `package.json` scripts).
- Routing: file-based routes under `app/routes/`. The routing manifest is wired in `app/routes.ts` which currently references `routes/home.tsx`.
- Layout & SSR patterns: `app/root.tsx` exports `links`, `Layout`, default app `Outlet`, and an `ErrorBoundary` — follow these patterns for global head/links, error handling and layout.

### Important files to inspect
- `package.json` — scripts and core deps (react-router dev/build/serve, TypeScript, Vite). Use these scripts rather than assuming `vite` directly.
- `app/root.tsx` — global Layout, `Links`, `Meta`, `Scripts`, `ScrollRestoration`, and `ErrorBoundary`. Use its `LinksFunction` pattern when adding route-level links/styles.
- `app/routes.ts` — route manifest for the dev tooling; add new route files under `app/routes/` and reference them here if necessary.
- `react-router.config.ts` — SSR flag (currently `ssr: true`). Be careful when toggling; affects rendering mode and build outputs.
- `vite.config.ts` — plugins: Tailwind (`@tailwindcss/vite`), `@react-router/dev/vite`, and `vite-tsconfig-paths`.
- `Dockerfile` — production image expects `build/` with `client/` and `server/` bundles; `CMD` runs `npm run start`.

### Developer workflows and exact commands
- Install dependencies: `npm install`.
- Development (HMR + dev server): `npm run dev` (runs `react-router dev`).
- Build (production bundles): `npm run build` (runs `react-router build`) — produces `build/client` and `build/server`.
- Start production server (locally or in container): `npm run start` (runs `react-router-serve ./build/server/index.js`).
- Type generation/typecheck: `npm run typecheck` (runs `react-router typegen && tsc`).

When modifying server-rendered routes/components, prefer running `npm run dev` and use the dev route manifest; for production parity, validate with `npm run build` and `npm run start`.

### Conventions and patterns to follow
- Routing files: create route components under `app/routes/`. Example: add `app/routes/about.tsx` and export a React component as default. Update `app/routes.ts` if you add non-standard manifests.
- Links & head tags: export a `links` function (see `app/root.tsx`) that returns an array of link objects for fonts/styles — follow the `Route.LinksFunction` shape.
- Error handling: export an `ErrorBoundary` or use the existing pattern in `app/root.tsx` to show stack traces only in `import.meta.env.DEV`.
- Styling: Tailwind is configured in `vite.config.ts` and used globally; prefer utility classes placed directly in components.

### Integration points & gotchas
- React Router dev tooling: scripts call `@react-router/dev/*` utilities — don't replace script names without considering dev tooling integration.
- SSR vs SPA: `react-router.config.ts` sets `ssr: true`. Switching to SPA mode requires changes to routing config and possibly Vite plugin usage.
- Build outputs: Dockerfile expects `build/` to be present with `client/` and `server/` directories. Production image uses `npm run start` to serve server bundle.

### How to add a new route (quick example)
1. Create `app/routes/newpage.tsx` with a default exported React component.
2. (If needed) update `app/routes.ts` to reference the route file, e.g. add `index("routes/newpage.tsx")` or the appropriate route helper.
3. Test in dev: `npm run dev`. Build and test production: `npm run build && npm run start`.

### When you need more context
- If you need API/backend integration, search for code outside `app/` — this template is primarily front-end + SSR routes; there may be no separate API layer in this repo.
- For deployment questions check `Dockerfile` and `README.md` (examples already included there).

If anything above is unclear or you want the guidance extended (CI, env vars, secrets, or the intended cloud deployment), tell me which area to expand and I will update this file.
