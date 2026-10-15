# Code conventions

These rules keep the codebase predictable. Most are enforced by tooling. Run
`bun run check` before pushing; CI runs the same checks plus e2e.

## Language

- **UI copy is Bahasa Indonesia**, written in sentence case with plain verbs.
  Buttons say exactly what happens ("Pesan via WhatsApp", not "Submit").
- **Code is English**: identifiers, comments, file names. Route _paths_ and
  content ids stay Indonesian because they are user-facing (`/produk`,
  `category=bawahan`).

## Folder rules

| Folder                | Put here                                                   | Don't put here                 |
| --------------------- | ---------------------------------------------------------- | ------------------------------ |
| `src/routes`          | Route definition, loader, `head()`, page composition       | Reusable UI, business logic    |
| `src/features/<name>` | UI + logic owned by one feature (catalog, product, …)      | Things used by many features   |
| `src/components`      | Cross-feature UI: `brand`, `layout`, `content`, `ui`       | Feature-specific behaviour     |
| `src/lib`             | Pure, framework-free helpers (testable in isolation)       | React components               |
| `src/content`         | Data: products, taxonomy, FAQ                              | Logic beyond small getters     |
| `src/config`          | Site-wide constants (brand, contact, nav)                  | Secrets (there are none)       |
| `scripts`             | Build-time generators (Bun)                                | Runtime code                   |

- `src/components/ui` is **vendored shadcn/ui**. Prefer composing or passing
  `className` over editing; if you must edit, keep it minimal. It's excluded
  from lint.
- Tests live **next to the code** (`foo.ts` → `foo.test.ts`). E2E specs live in
  `tests/e2e`.

## TypeScript & React

- `strict` mode, no `any`. Use `import type` for type-only imports.
- Named exports only (routes export `Route`, as TanStack requires).
- Function components with explicit prop types; no `React.FC`.
- Derive state instead of syncing it; reach for `useEffect` only for real side
  effects (timers, observers).
- Validate external input with Zod: URL search params (`catalogSearchSchema`)
  and form data (`contactSchema`). Bad input degrades gracefully; it never throws.
- Keep pages prerender-safe: anything that depends on the URL query or the
  browser must render identically on the server first (see `useHydrated()` in
  the catalog route).

## Styling

- Tailwind utilities with **design tokens only**. Raw hex in `className` is a
  lint error; add a token to `src/styles.css` instead (see
  [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)). Product fabric colours in
  `src/content/products.ts` are data, so they are exempt.
- Compose conditional classes with `cn()` (merges conflicting utilities).
- Style links as buttons with `buttonVariants({...})` on an `<a>`/`<Link>`;
  never put a `<button>` inside a link.
- Icons come from `@/components/brand/icons`, not lucide.

## Accessibility (non-negotiable)

- One `<h1>` per page; sections are labelled (`aria-labelledby`).
- Every interactive element is a real `<a>` / `<button>` / form control with
  an accessible name. Toggle chips use `aria-pressed`.
- Visible focus (`:focus-visible` outline); `prefers-reduced-motion` respected.
- Form errors are announced and focus moves to the first invalid field.

## Formatting & linting

- Prettier: no semicolons, double quotes, trailing commas (es5), 80 cols,
  Tailwind class sorting. `bun run format` fixes everything.
- ESLint: `@tanstack/eslint-config` + project rules. `bun run lint:fix`.

## Testing

| Layer      | Tool                       | What to cover                                               |
| ---------- | -------------------------- | ----------------------------------------------------------- |
| Unit       | Vitest                     | Pure logic in `lib/` and `features/*/*.ts`; content integrity |
| Component  | Vitest + Testing Library   | Interactive components (order panel, contact form)          |
| E2E        | Playwright (desktop+mobile)| User journeys on the **production build**, SEO output, headers |

- Query by role/label like a user would; `data-testid` only for things without
  an accessible role (result count, price).
- E2E fails on **any console error** (catches hydration mismatches) and stubs
  `wa.me`, so tests never leave the machine.
- `E2E_BASE_URL=https://<preview>.pages.dev bun run test:e2e` runs the suite
  against a deployed preview.

## Git

- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`.
- Branch from `main`; PRs get a Cloudflare preview deploy from CI.
