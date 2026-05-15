# Plan: WordPress to Markdown Import Pipeline

## Overview

Export 125 published posts from a WordPress multisite and convert them into markdown files structured for this Eleventy blog.

---

## Stack

| Step | Tool |
|---|---|
| Export from WordPress | `wp-cli` (`wp export`) |
| HTML → markdown conversion | `wordpress-export-to-markdown` (npx) |
| Sort into Eleventy structure | `scripts/sort-posts.js` (custom Node.js) |
| Frontmatter parsing | `gray-matter` |

---

## Pipeline

### Step 1 — Export from WordPress (SSH)

```bash
wp --url=https://yourblog.example.com export \
  --post_type=post \
  --post_status=publish \
  --filename_format=export.xml
```

Copy to local machine:

```bash
scp user@yourserver.com:/path/to/wordpress/export.xml ./export.xml
```

### Step 2 — Convert XML to markdown

```bash
npx wordpress-export-to-markdown \
  --wizard=false \
  --post-folders \
  --frontmatter-fields=title,date,excerpt:description,tags,categories,slug \
  --date-format=yyyy-MM-dd \
  --quote-date \
  --save-images=attached \
  --output=./wp-export
```

Produces `wp-export/<post-slug>/index.md` with images in `wp-export/<post-slug>/images/`.

### Step 3 — Sort into Eleventy structure

```bash
npm install --save-dev gray-matter
node scripts/sort-posts.js --dry-run
node scripts/sort-posts.js
```

Script (`scripts/sort-posts.js`) reads the `categories` frontmatter field, takes the first value, and writes each post to `content/<category>/<slug>.md`. Images are moved to `public/images/<slug>/` and references updated accordingly.

### Step 4 — Verify

```bash
npm run build
```

---

## Key Decisions

- **First category wins** — posts with multiple WordPress categories use the first as the Eleventy directory name.
- **Images** — attached images downloaded during conversion; moved to `public/images/<slug>/` by the sort script so they're served as static assets.
- **`categories` and `slug` stripped from frontmatter** — category is derived from directory name; slug is the filename. Neither needs to be in the post frontmatter.

---

## Deferred

- **oEmbed** — YouTube and GitHub gist embeds need handling. Candidate solution: `@11ty/eleventy-plugin-embed-everything`. Defer until post import is clean.
