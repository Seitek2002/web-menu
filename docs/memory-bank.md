# Web Menu — Memory Bank

Purpose
- Single Page Application for browsing venue menus, applying bonuses, and creating orders with online payment and OTP verification.
- Supports multiple service modes: dine-in (table), takeaway, delivery. QR/URL entry points included.

Tech Stack
- React 18 + TypeScript + Vite
- Redux Toolkit + RTK Query (API slices)
- react-router-dom (lazy routes + Suspense)
- i18next (ru/en/kg)
- Tailwind via SCSS utilities
- Build: Vite, ESLint (simple-import-sort, prettier compatibility)
- Docker files present

Key Architecture
- Entry: src/main.tsx → src/App.tsx → src/router/index.tsx
- Lazy route splitting: Main, Home, Deliver, Takeaway, SelectOrderType, Scan, Cart, Order, Terms, NotFound, ProtectedRoute
- Global Suspense fallback displays Loader until chunks render
- Route metadata via react-helmet (MetaHelmet) with dynamic title/description/favicon based on venue

Routing (overview)
- / → Main (landing/marketing)
- /scan → QR scan page
- /deliver/:venue → delivery info form
- /takeaway/:venue → takeaway spot selection
- /:venue → select order type (dine-in, takeaway, delivery)
- /:venue/d, /:venue/:venueId/:id, /I/:venue/d, /I/:venue/:venueId/:id → Home (menu screen)
- /cart → Cart (guarded)
- /orders/:id → Order details/status
- /:venue/terms → Terms page (renders HTML from venue.terms)
- * → NotFound

Data Model and Types (aligned with OpenAPI 3.0.3)
- src/types/venues.types.ts
  - IVenues:
    - colorTheme: string (theme color for UI)
    - companyName: string, slug: string
    - logo: string | null
    - serviceFeePercent: number
    - schedules?: IWorkSchedule[] (1..7 dayOfWeek, isDayOff, is24h, workStart, workEnd)
    - schedule?: string (legacy fallback "HH:MM-HH:MM")
    - defaultDeliverySpot?: number | null
    - deliveryFixedFee?: string | null (decimal as string)
    - deliveryFreeFrom?: string | null (decimal as string)
    - terms?: string | null (HTML string)
    - spots?: ISpot[] ({id, name, address})
    - table?: { id, tableNum } for dine-in context
    - isDeliveryAvailable, isTakeoutAvailable, isDineinAvailable: boolean
- src/types/orders.types.ts
  - ServiceMode = 1 | 2 | 3 (1 dine-in, 2 takeaway, 3 delivery)
  - IReqCreateOrder: phone, comment?, serviceMode, address?, servicePrice?, tipsPrice?, useBonus?, bonus?, code?, hash?, spot?, table?, isTgBot?, tgRedirectUrl?, venue_slug, orderProducts[]
  - ICreateOrderResponse: { id, paymentUrl | null, phoneVerificationHash? }
  - IOrder / IOrderById for listing/details (decimal strings for prices)
- src/types/products.types.ts: catalog and cart item types (modificators etc.)
- src/types/categories.types.ts

API Slices (RTK Query)
- src/api/Venue.api.ts: getVenue({ venueSlug, tableId? })
  - Accept-Language header based on i18n language
- src/api/Products.api.ts: getProducts({ category?, search?, spotId?, venueSlug? })
- src/api/Categories.api.ts: getCategories({ venueSlug })
- src/api/Banners.api.ts: getBanners({ venue_slug })
- src/api/Orders.api.ts:
  - getOrders({ phone, spotId, tableId, venueSlug })
  - postOrders(payload: IReqCreateOrder)
  - getOrdersById({ id })
- src/api/Client.api.ts: client bonus (used in App to prefetch)

State Management (Redux Toolkit)
- src/store/yourFeatureSlice.ts: users data, cart, venue, order; helpers in src/utils/storageUtils.ts
- Persisted pieces: cartItems, users, venue in localStorage

Business Flows
- Working hours (closed state)
  - src/utils/timeUtils.ts:
    - getTodayScheduleWindow(schedules?, fallbackSchedule?) → {window, isClosed}
    - isOutsideWorkTime(window) for open/closed check
    - getTodayScheduleRangeString(...) for display
  - ProtectedRoute and Home/Catalog use these utils to block actions/show ClosedModal when closed
- OTP & Bonus in Cart
  - PointsModal for points then (if required) OTP step
  - Stored phoneVerificationHash in localStorage; if exists, skip OTP
  - payload useBonus/bonus/code/hash align with OpenAPI; final order posts to /orders
  - Loader shown only for final order submission (not for requesting SMS)
- Terms page
  - SubHeader venue block navigates to /:venue/terms
  - src/pages/Terms renders venue.terms HTML (dangerouslySetInnerHTML)

UI/UX Components
- Header: inline SVG logo with dynamic fill (colorTheme)
- SubHeader: venue info, short schedule, calendar icon to open WeeklyScheduleModal, click on venue → terms
- WeeklyScheduleModal: full week schedule based on IWorkSchedule[] (fallback to legacy string if missing)
- ClosedModal: informs about closed hours
- PointsModal & OtpModal: bonus/OTP flows with padding-based sizing conventions
- BusketDesktop: desktop-only cart summary; button disabled when cart empty
- Loader: fullscreen overlay spinner used globally and in Suspense

UI Conventions
- Modals: padding and max-width (avoid fixed width/height), .overlay usage
- Reserve image sizes/aspect ratio to reduce CLS
- i18n for static UI strings (ru/en/kg)

Performance Optimizations (applied)
- Route-level code splitting via React.lazy + Suspense for all pages (router)
- Component-level lazy for heavy parts in Home: Hero, Categories, Catalog, Search, ClearCartModal, BusketDesktop
- Global Loader fallback in App Suspense and router Suspense
- index.html: preconnect + dns-prefetch to https://imenu.kg; theme-color meta
- Advice left in codebase:
  - Use only woff2 in production (current fonts include legacy formats for compatibility)
  - Consider responsive images (srcset/sizes) and lazy for non-critical images
  - Tree-shake lucide-react imports; prefer inline SVG for recurring icons

Accessibility/SEO
- MetaHelmet sets dynamic title/description/open-graph + favicon per venue on subroutes
- Ensure alt attributes on images (ongoing)
- Maintain focus-visible/keyboard navigation styles and contrast with colorTheme

Build/Run
- Scripts:
  - dev: vite
  - build: tsc -b && vite build
  - preview: vite preview
  - serve: serve -s dist -p 3000
- Dockerfile/docker-compose available
- ESLint with simple-import-sort and prettier rules
  - Known: “Run autofix to sort these imports!” warnings remain (cosmetic)

Recent Changes (changelog)
- Added Terms page and route; SubHeader click navigates there; IVenues.terms
- Header logo: switched to inline SVG tied to venue colorTheme
- Weekly schedule support via IWorkSchedule[]; time utils and guards updated (ProtectedRoute/Home/Catalog/Hero/BusketDesktop)
- Cart: ServiceMode typing, handle bonus/OTP flows with localStorage hash reuse
- Modals unified to padding-based sizing
- Performance: lazy routes/components; index.html preconnect/theme-color
- Loader as global Suspense fallback and in Home’s lazy components

Known TODO / Future Work
- Preload critical woff2 fonts; exclude eot/ttf/woff in prod
- Responsive images and lazy load across the app
- Replace heavy icon imports with inline SVG or a sprite
- Add Lighthouse CI and bundle analyzer to track budgets
- Sanitize terms HTML if backend content cannot be fully trusted
- Fix ESLint import sort warnings via npm run lint -- --fix
- Add runtime Web Vitals reporting if needed

Conventions & Tips
- Use getTodayScheduleWindow for any “open/closed” logic
- Use IReqCreateOrder strictly (ServiceMode typing must be 1|2|3); cast if reading from UI
- For OTP flow: prefer existing hash from localStorage to skip prompting; request phoneVerificationHash only when needed
- Use Suspense + lazy for any heavy new screen or component; fallback should be <Loader />

File Map (key)
- Entry: src/App.tsx, src/router/index.tsx
- UI: src/components/*, src/pages/*
- API: src/api/*
- Types: src/types/*
- Utils: src/utils/* and src/utlis/* (note duplicate spelling; prefer src/utils)
- Assets: src/assets/*
