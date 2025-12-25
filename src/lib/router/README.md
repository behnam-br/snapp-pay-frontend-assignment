# Router Library

Enhanced routing utilities built on top of React Router v7, providing lazy loading, route prefetching, and type-safe route configuration.

## Directory Structure

```
router/
├── components/
│   ├── link.tsx          # Enhanced Link with prefetching
│   ├── nav-link.tsx      # Enhanced NavLink with prefetching
│   └── use-prefetch.ts   # Prefetch hook (visibility + intent)
├── utils.tsx             # Route utilities (lazy loading, prefetch API)
└── README.md
```

## Features

| Feature | Description |
|---------|-------------|
| 🚀 **Lazy Loading** | Automatic code-splitting with `React.lazy` |
| ⚡ **Route Prefetching** | Preload route chunks before navigation |
| 👁️ **Visibility Prefetch** | Prefetch when link scrolls into view |
| 🎯 **Intent Prefetch** | Prefetch on hover, focus, or touch |
| 🔒 **Type Safety** | Typed route components from config |
| 📦 **Deduplication** | Routes are only prefetched once per session |

---

## Quick Start

### 1. Define Routes

```tsx
// src/app/routes.tsx
import { RouteConfig, getRouteComponents, withSuspense } from '@/lib/router/utils';

export const routes = [
  {
    path: '/',
    load: () => import('@/app/home/home-page'),
    component: 'HomePage',
  },
  {
    path: '/products',
    load: () => import('@/app/products/products-page'),
    component: 'ProductsPage',
  },
] as const satisfies readonly RouteConfig[];

// Generate lazy components
export const RouteComponents = getRouteComponents(routes);

// Build route tree
export const routeTree: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(RouteComponents.HomePage) },
      { path: 'products', element: withSuspense(RouteComponents.ProductsPage) },
    ],
  },
];
```

### 2. Use Prefetching Links

```tsx
import { Link } from '@/lib/router/components/link';
import { NavLink } from '@/lib/router/components/nav-link';

// Basic link (no prefetch)
<Link to="/about">About</Link>

// Link with prefetching enabled
<Link to="/products" prefetch>Products</Link>

// NavLink with active styles + prefetching
<NavLink 
  to="/dashboard" 
  prefetch 
  className={({ isActive }) => isActive ? 'active' : ''}
>
  Dashboard
</NavLink>
```

---

## API Reference

### `utils.tsx`

#### `RouteConfig`

Type definition for declarative route configuration.

```ts
type RouteConfig = {
  path: string;                                    // Route path (e.g. '/', '/products')
  load: () => Promise<Record<string, ComponentType>>; // Dynamic import
  component: string;                               // Exported component name
};
```

#### `getRouteComponents<T>(routes: T)`

Creates a typed map of lazy-loaded React components from route config.

```ts
const routes = [
  { path: '/', load: () => import('./pages'), component: 'Home' },
  { path: '/about', load: () => import('./pages'), component: 'About' },
] as const;

const RouteComponents = getRouteComponents(routes);
// RouteComponents.Home → React.lazy component
// RouteComponents.About → React.lazy component
```

**Returns:** `Record<T[number]['component'], ComponentType>`

#### `withSuspense(Component: ComponentType)`

Wraps a component with `<Suspense>` and a `<PageLoader />` fallback.

```tsx
<Route index element={withSuspense(RouteComponents.HomePage)} />
```

**Returns:** `ReactNode`

#### `prefetchRoute(path: string)`

Prefetches the route module for a given path.

```ts
// Prefetch on user intent
await prefetchRoute('/settings');

// Handles normalization automatically:
prefetchRoute('products');           // → '/products'
prefetchRoute('/products?tab=new');  // → '/products' (strips query)
prefetchRoute('/products#section');  // → '/products' (strips hash)
```

**Behavior:**
- Normalizes path (adds leading `/`, strips `?` and `#`)
- Skips if already prefetched (cached per session)
- No-op if route not found in config

**Returns:** `Promise<void>`

#### `prefetchAllRoutes()`

Prefetches all route modules at once.

```ts
// E.g., after initial page load to warm the cache
useEffect(() => {
  prefetchAllRoutes();
}, []);
```

**Returns:** `Promise<void[]>`

---

### `components/link.tsx`

#### `<Link>`

Enhanced React Router `Link` with optional prefetching.

```tsx
interface LinkProps extends Omit<RouterLinkProps, 'prefetch'> {
  prefetch?: boolean; // default: false
}
```

**Prefetch triggers:**
- `onMouseEnter` — Desktop hover
- `onFocus` — Keyboard navigation
- `onTouchStart` — Mobile touch
- Visibility — When link scrolls into viewport (100px margin)

**Example:**

```tsx
<Link to="/checkout" prefetch>
  Proceed to Checkout
</Link>
```

---

### `components/nav-link.tsx`

#### `<NavLink>`

Enhanced React Router `NavLink` with prefetching + active state styling.

```tsx
interface NavLinkProps extends Omit<RouterNavLinkProps, 'prefetch'> {
  prefetch?: boolean; // default: false
}
```

**Example:**

```tsx
<NavLink 
  to="/settings" 
  prefetch
  className={({ isActive, isPending }) => 
    isActive ? 'nav-active' : isPending ? 'nav-pending' : ''
  }
>
  Settings
</NavLink>
```

---

### `components/use-prefetch.ts`

#### `usePrefetch(to, prefetch, elementRef)`

React hook that handles prefetching logic for link components.

```ts
function usePrefetch<T extends HTMLElement = HTMLAnchorElement>(
  to: string,
  prefetch: boolean,
  elementRef: RefObject<T | null>
): () => void;
```

**Parameters:**
- `to` — Destination path
- `prefetch` — Whether prefetching is enabled
- `elementRef` — Ref to the link element (for IntersectionObserver)

**Returns:** A callback function to trigger prefetch manually (e.g., on hover)

**Behavior:**
1. **Visibility-based:** Uses `IntersectionObserver` with 100px margin to prefetch when the link is about to scroll into view
2. **Intent-based:** Returns a callback for manual trigger on hover/focus/touch

---

## How Prefetching Works

```
┌─────────────────────────────────────────────────────────────┐
│                     User visits page                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Links with prefetch={true} register IntersectionObserver   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────────┐
│ Link scrolls into view  │     │ User hovers/focuses link    │
│ (100px before visible)  │     │                             │
└─────────────────────────┘     └─────────────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              prefetchRoute('/target-path')                   │
│  1. Normalize path                                           │
│  2. Check cache (skip if already prefetched)                 │
│  3. Find matching route config                               │
│  4. Call route.load() → dynamic import                       │
│  5. Add to cache                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Route chunk loaded in background (browser cache)           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  User clicks link → Instant navigation (chunk ready)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Best Practices

### ✅ Do

```tsx
// Prefetch high-priority navigation links
<Link to="/checkout" prefetch>Checkout</Link>

// Prefetch nav items that users commonly visit
<NavLink to="/dashboard" prefetch>Dashboard</NavLink>

// Use withSuspense for all lazy routes
{ element: withSuspense(RouteComponents.Page) }
```

### ❌ Don't

```tsx
// Don't prefetch everything (wastes bandwidth)
<Link to="/rarely-used-admin-page" prefetch>Admin</Link>

// Don't forget as const for type inference
const routes = [...];  // ❌ Missing 'as const'
const routes = [...] as const;  // ✅

// Don't use prefetch on external links (won't work)
<Link to="https://external.com" prefetch>External</Link>
```

---

## Performance Considerations

| Scenario | Recommendation |
|----------|----------------|
| Main navigation | Enable prefetch |
| Hero CTAs | Enable prefetch |
| Footer links | Disable prefetch |
| Long lists of links | Disable prefetch |
| Behind auth | Consider disabling |

The prefetch cache is session-only (cleared on refresh), so routes are re-prefetched on each page load if triggered again.

---

## Dependencies

- `react` — Lazy, Suspense, hooks
- `react-router-dom` — Link, NavLink, routing primitives
- `@/shared/utils/merge-refs` — Combines multiple refs
- `@/components/layout/page-loader` — Suspense fallback UI

