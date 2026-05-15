# Plan: Tailwind Blog Template

## Context

The site currently has a minimal hand-rolled CSS stylesheet and bare Nunjucks templates with no real design. The goal is a full visual redesign using Tailwind CSS — accessible, modern, and editorial — with a typewriter-accented navigation, light/dark toggle, and infinite-scroll homepage backed by a static JSON endpoint.

---

## Aesthetic Direction

**"Analog Digital"** — a literary blog that feels like a printed journal that went digital. Clean grid, generous whitespace, editorial typography. The Courier Prime typewriter font in the nav creates a retro-editorial character without being kitschy.

- **Body font**: Lora (Google Fonts) — warm serif, excellent for reading
- **Accent/nav font**: Courier Prime (Google Fonts) — authentic typewriter character
- **Light palette**: paper `#faf9f7`, ink `#1c1917`, accent `#c0392b` (typewriter red), borders `#e8e6e0`
- **Dark palette**: `#1c1917` background, `#f5f0eb` text, same accent
- **Dark mode**: class-based (`dark` on `<html>`), toggled by JS, persisted to `localStorage`, respects `prefers-color-scheme` as default

---

## Tailwind Setup

### Install

```bash
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer npm-run-all
npx tailwindcss init -p
```

### `tailwind.config.js`

- `content`: `_includes/**/*.njk`, `*.njk`, `pages/**/*.md`
- `darkMode: 'class'`
- Extend theme: `fontFamily.typewriter`, `fontFamily.serif` (Lora)
- Add `@tailwindcss/typography` plugin for `prose` in article content

### `src/style.css` (new Tailwind source)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
/* custom overrides only — skip-link, focus-visible, prism theme adjustments */
```

Tailwind outputs to `public/style.css` (replaces the hand-written file).

### `package.json` script changes

```json
"start": "npm-run-all --parallel start:eleventy start:css",
"start:eleventy": "eleventy --serve",
"start:css": "tailwindcss -i ./src/style.css -o ./public/style.css --watch",
"build": "npm-run-all build:css build:eleventy",
"build:css": "tailwindcss -i ./src/style.css -o ./public/style.css --minify",
"build:eleventy": "eleventy"
```

CSS must build before Eleventy in production (`build:css` → `build:eleventy`).

---

## Templates

### `_includes/layouts/base.njk` — full rewrite

- Google Fonts `<link>` for Lora + Courier Prime
- Dark mode init script (inline `<script>` in `<head>`, reads `localStorage` / `prefers-color-scheme`, adds `.dark` to `<html>` before paint — prevents flash)
- Skip link (Tailwind-styled, accessible)
- `<header>`: site name in Courier Prime left-aligned, nav links (About, Plugins, Conferences) in Courier Prime center/right, dark mode toggle button (sun/moon icon) far right
- Active nav state: compare `page.url` against each link href using Nunjucks conditional — active link gets underline + accent color
- `<main id="main-content">` with `max-w-2xl mx-auto px-6 py-10`
- `<footer>`: copyright, minimal

### `_includes/layouts/post.njk` — rewrite

- Extends `base.njk`
- `<article>` wrapper
- `<h1>` title in Lora, large
- Byline: date (Courier Prime, muted), category link, tag chips
- "View source" link (small, muted)
- `{{ content | safe }}` inside `prose dark:prose-invert` div (Tailwind Typography)

### `_includes/layouts/page.njk` — new file

- Extends `base.njk`
- `<article>` with `<h1>{{ title }}</h1>` and `{{ content | safe }}` in `prose dark:prose-invert`
- `pages/pages.11tydata.js` updated to use `layouts/page.njk`

### `_includes/layouts/listing.njk` — rewrite

- Used for category and tag pages (not homepage)
- `<h1>` + simple post list: date in Courier Prime + title link per row
- Full list rendered server-side (no infinite scroll — only the homepage needs it)

### `_includes/layouts/home.njk` — new file

- Extends `base.njk`
- Renders **first 5 posts** from `collections.posts` server-side inside `<div id="post-list">`
- Each post card: date (Courier Prime), category badge, title, description excerpt
- `<div id="scroll-sentinel">` below the list — IntersectionObserver target
- Loading indicator (hidden by default, shown during fetch)
- `<script src="/js/infinite-scroll.js">` handles scroll loading

### `index.njk` — update layout

```yaml
---
layout: layouts/home.njk
title: Home
---
```

---

## Infinite Scroll (Static JSON Endpoint)

### `posts.json.njk` — new file

```
permalink: /posts.json
eleventyExcludeFromCollections: true
```

Outputs a JSON array of all posts with `title`, `url`, `date`, `description`, `category`.

### `public/js/infinite-scroll.js` — new file

- On DOMContentLoaded: fetch `/posts.json`, store array, set `offset = 5` (skipping server-rendered posts)
- Create `IntersectionObserver` watching `#scroll-sentinel`
- On intersection: slice next 5 posts from array, build HTML cards (matching server-rendered markup), append to `#post-list`, advance offset
- Hide sentinel when all posts loaded

---

## Dark Mode Toggle

Inline script in `<head>` (before `<body>` renders):
```js
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) document.documentElement.classList.add('dark');
```

Toggle button JS:
```js
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
```

---

## Files Changed

| File | Action |
|---|---|
| `package.json` | Update scripts, add deps |
| `tailwind.config.js` | New |
| `postcss.config.js` | New |
| `src/style.css` | New (Tailwind source) |
| `public/style.css` | Replaced by Tailwind output (remove hand-written CSS) |
| `public/js/infinite-scroll.js` | New |
| `posts.json.njk` | New |
| `_includes/layouts/base.njk` | Full rewrite |
| `_includes/layouts/post.njk` | Rewrite |
| `_includes/layouts/listing.njk` | Rewrite |
| `_includes/layouts/home.njk` | New |
| `_includes/layouts/page.njk` | New |
| `index.njk` | Update layout reference |
| `pages/pages.11tydata.js` | Update layout to `layouts/page.njk` |
| `content/example/hello-world.md` | Delete |

---

## Verification

1. `source ~/.nvm/nvm.sh && nvm use 25 && npm install` — installs Tailwind + new deps
2. `npm start` — both Eleventy and Tailwind CLI watch in parallel
3. Visit `http://localhost:8080/` — homepage renders 5 posts; scrolling to bottom loads more in batches of 5
4. Visit a post — article renders with `prose` typography; date in Courier Prime
5. Visit `/about/` — page title and prose body render correctly; "About" is highlighted in nav
6. Toggle dark mode — switches instantly, persists on reload
7. Resize to mobile — nav wraps or collapses gracefully; no horizontal overflow
8. Tab through nav — focus rings visible, skip link works, all interactive elements reachable
9. `npm run build` — CSS builds first, then Eleventy; `_site/style.css` exists and is minified
