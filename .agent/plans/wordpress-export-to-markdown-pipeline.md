# Plan: WordPress to Markdown Import Pipeline

## Overview

Import all published posts and selected pages from a WordPress multisite into the Eleventy blog. Posts go into `content/<category>/`, pages go into `pages/`.

---

## Stack

| Step | Tool |
|---|---|
| Export from WordPress | `wp-cli` (`wp export`) |
| HTML → markdown conversion | `wordpress-export-to-markdown` (npx) |
| Sort posts into Eleventy structure | `scripts/sort-posts.js` (custom Node.js) |
| Copy pages into Eleventy structure | Manual (10 pages, done by hand) |
| Frontmatter parsing | `gray-matter` |

---

## Part A — Posts

### Step 1 — Export from WordPress (SSH) ✓

```bash
wp --allow-root --url=https://werdswords.com export \
  --post_type=post \
  --post_status=publish \
  --filename_format=export.xml

scp -P <port> user@yourserver.com:/path/to/wordpress/export.xml ./export.xml
```

### Step 2 — Convert XML to markdown ✓

```bash
source ~/.nvm/nvm.sh && nvm use 25 && npx wordpress-export-to-markdown \
  --wizard=false \
  --post-folders=true \
  --frontmatter-fields=title,date,excerpt:description,tags,categories,slug \
  --date-format=yyyy-MM-dd \
  --quote-date=true \
  --save-images=attached \
  --output=./wp-export \
  --input=../export.xml
```

Produces `wp-export/posts/<slug>/index.md` with images in `wp-export/posts/<slug>/images/`.

### Step 3 — Sort into Eleventy structure

```bash
node scripts/sort-posts.js --dry-run
node scripts/sort-posts.js
```

`scripts/sort-posts.js` reads the `categories` frontmatter field, takes the first value, applies any remaps from `CATEGORY_MAP`, and writes each post to `content/<category>/<slug>.md`. Images are moved to `public/images/<slug>/` and references updated.

**Category remaps** (defined in `CATEGORY_MAP` in `scripts/sort-posts.js`):

| WordPress category | Eleventy category |
|---|---|
| `web-design` | `wordpress` |
| `stuff` | `a-musing` |
| `ideas` | `a-musing` |
| `music` | `a-musing` |
| `health` | `a-musing` |
| `software` | `web` |

**`uncategorized` posts** — handle individually after sort:

| Slug | Target category |
|---|---|
| `getting-jazzed-about-gutenberg` | `wordpress` |
| `guy-margaret-bourke-white-generation-simply-astounding-photography` | `a-musing` |
| `this-tweet-made-my-day` | `a-musing` |
| `something` | TBD |

### Step 4 — Verify

```bash
source ~/.nvm/nvm.sh && nvm use 25 && npm run build
```

---

## Part B — Pages

### Step 1 — Export selected pages from WordPress (SSH) ✓

```bash
wp --allow-root --url=https://werdswords.com export \
  --post_type=page \
  --post_status=publish \
  --post__in=2,205,1262,1553,1697,1699,1818,1886,1947,2048,1547 \
  --filename_format=export-pages-selected.xml

scp -P 2200 user@yourserver.com:/path/to/wordpress/export-pages-selected.xml ./export-pages-selected.xml
```

### Step 2 — Convert XML to markdown ✓

```bash
source ~/.nvm/nvm.sh && nvm use 25 && npx wordpress-export-to-markdown \
  --wizard=false \
  --post-folders=true \
  --frontmatter-fields=title,date,excerpt:description,slug \
  --date-format=yyyy-MM-dd \
  --quote-date=true \
  --save-images=attached \
  --output=./wp-export-pages \
  --input=../export-pages.xml
```

Produces `wp-export-pages/pages/<slug>/index.md`.

### Step 3 — Content cleanup ✓

All 10 pages in `wp-export-pages/pages/` have been reviewed and cleaned:

| Page | Notes |
|---|---|
| `about` | Needs copy update (outdated job title, broken internal links) |
| `conferences` | Reformatted; only goes to 2014 — update manually |
| `plugins` | Written fresh; links to individual plugin pages |
| `jazzy-generator-tag` | Filled from live site |
| `press-this-new-post` | Filled from live site |
| `redirect-link-format` | Filled from live site |
| `remove-dashboard-access-for-non-admins` | Filled from live site; acquired October 2024 note added |
| `support-me` | Filled from live site; acquired October 2024 note added |
| `get-wordpress-help` | Spam stripped; clean original content preserved |
| `codex-migration-progress` | Skipped — only contained a Google Sheets iframe |

### Step 4 — Create Eleventy page files

Pages live in `pages/` at the repo root (outside `content/`, so they don't appear in the posts collection). A `pages/pages.11tydata.js` data file sets the shared layout. Each page gets an explicit `permalink` in its own frontmatter.

Structure:
```
pages/
├── pages.11tydata.js        ← sets layout: layouts/base.njk
├── about.md
├── conferences.md
├── get-wordpress-help.md
├── jazzy-generator-tag.md
├── plugins.md
├── press-this-new-post.md
├── redirect-link-format.md
├── remove-dashboard-access-for-non-admins.md
└── support-me.md
```

---

## Key Decisions

- **Flat post permalinks** — posts use `/{slug}/` (not `/{category}/{slug}/`) to match existing WordPress URLs and preserve inbound links.
- **First category wins** — posts with multiple WordPress categories use the first as the Eleventy directory name.
- **Category remapping** — several small WordPress categories are consolidated into cleaner Eleventy equivalents via `CATEGORY_MAP` in the sort script.
- **Images** — attached images downloaded during conversion; moved to `public/images/<slug>/` by the sort script so they're served as static assets.
- **`categories` and `slug` stripped from post frontmatter** — category is derived from directory name; slug is the filename. Neither is needed in frontmatter.
- **Pages outside `content/`** — Eleventy pages live in `pages/` so they are excluded from the posts collection, tags, and category pages.

---

## Deferred

- **oEmbed** — YouTube and GitHub gist embeds need handling. Candidate solution: `@11ty/eleventy-plugin-embed-everything`. Defer until post import is clean.
- **`[caption]` shortcodes** — some older posts still contain WordPress `[caption]` shortcodes that weren't converted. Needs a cleanup pass after sort.
- **`about` page copy** — outdated job title and broken internal links need updating before publishing.
- **`conferences` page** — only goes to 2014; needs manual additions for 2015 and later.
