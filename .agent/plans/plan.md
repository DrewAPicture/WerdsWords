# Plan: WerdsWords 2.0 — Static Markdown Blog

## Context
Greenfield project. Directory is completely empty. Building a simple, fast, static blog using Eleventy (11ty) v3 where:
- Posts are written as markdown files in a `content/` directory
- Subdirectories of `content/` define categories
- Post URLs are derived from markdown filenames
- Raw markdown is accessible by appending `.md` to a post URL (e.g. `/cat/post.md`)
- Tags and syntax highlighting are also required

---

## Stack

| Concern | Choice |
|---|---|
| SSG | Eleventy (11ty) v3 |
| Templates | Nunjucks |
| Markdown | markdown-it (Eleventy default) |
| Syntax highlighting | `@11ty/eleventy-plugin-syntaxhighlight` (Prism) |

---

## Directory Structure

```
/
├── content/                         ← blog posts; subdirectories = categories
│   ├── content.11tydata.js          ← data cascade: layout, computed permalink & category
│   └── <category>/
│       └── <slug>.md                ← post with YAML frontmatter
├── _includes/
│   └── layouts/
│       ├── base.njk                 ← HTML shell, nav, link to style.css
│       ├── post.njk                 ← article wrapper, metadata, "View source" link
│       └── listing.njk             ← shared post-list layout (used by home, category, tag pages)
├── _data/
│   └── site.json                    ← site name, base URL, author
├── public/
│   └── style.css                    ← minimal CSS (no framework)
├── index.njk                        ← homepage — all posts, newest first
├── category-pages.njk               ← pagination over collections.allCategories → /{category}/
├── tag-pages.njk                    ← pagination over collections.allTags → /tags/{tag}/
├── tags.njk                         ← /tags/ index, all tags listed
├── .eleventy.js
├── .eleventyignore
└── package.json
```

---

## Key Mechanics

### 1. URL routing (post permalinks)
`content/content.11tydata.js` uses `eleventyComputed` to set each post's permalink and derive the `category` value:

```js
module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: data =>
      data.page.filePathStem.replace(/^\/content\//, "/") + "/",
    // content/essays/hello.md → /essays/hello/
    category: data => {
      const parts = data.page.filePathStem.split("/");
      return parts.length >= 3 ? parts[parts.length - 2] : null;
    }
  }
};
```

### 2. Raw markdown serving
In `.eleventy.js`, a passthrough copy maps `content/` into the _site root:

```js
eleventyConfig.addPassthroughCopy({ "content": "." });
// content/essays/hello.md → _site/essays/hello.md
```

Post rendered HTML goes to `_site/essays/hello/index.html`.
Raw markdown goes to `_site/essays/hello.md`.
No path conflict. The post template adds a "View source" link:

```njk
<a href="{{ page.filePathStem | replace('/content/', '/') }}.md">View source (.md)</a>
```

### 3. Collections (in `.eleventy.js`)
```js
// All posts, sorted newest first
eleventyConfig.addCollection("posts", col =>
  col.getFilteredByGlob("content/**/*.md").sort((a, b) => b.date - a.date)
);

// All unique categories
eleventyConfig.addCollection("allCategories", col => {
  const s = new Set();
  col.getFilteredByGlob("content/**/*.md")
     .forEach(p => { if (p.data.category) s.add(p.data.category); });
  return [...s].sort();
});

// All unique tags
eleventyConfig.addCollection("allTags", col => {
  const s = new Set();
  col.getFilteredByGlob("content/**/*.md")
     .forEach(p => (p.data.tags || []).forEach(t => s.add(t)));
  return [...s].sort();
});

// Posts keyed by tag (used by tag-pages.njk)
eleventyConfig.addCollection("postsByTag", col => {
  const map = {};
  col.getFilteredByGlob("content/**/*.md").forEach(p => {
    (p.data.tags || []).forEach(t => {
      (map[t] = map[t] || []).push(p);
    });
  });
  return map;
});
```

### 4. Tag pages
`tag-pages.njk` paginates over `collections.allTags` to generate one page per tag at `/tags/{tag}/`.

### 5. Category pages
`category-pages.njk` paginates over `collections.allCategories` to generate one page per category at `/{category}/`.

### 6. Syntax highlighting
```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
eleventyConfig.addPlugin(syntaxHighlight);
```
Prism CSS is included in `base.njk` via a CDN link (or local copy in `public/`).

---

## Post Frontmatter Convention
```yaml
---
title: Hello World
date: 2026-05-15
description: A brief intro post.
tags: [eleventy, meta]
---
```
Category is derived from the directory; no frontmatter field needed.

---

## Files to Create (in order)

1. `package.json` — scripts: `start` (serve), `build`; deps: eleventy v3, syntaxhighlight plugin
2. `.eleventyignore` — ignore `node_modules`, `_site`, `public`
3. `.eleventy.js` — plugin, passthrough, collections, return config
4. `content/content.11tydata.js` — permalink + category computed data
5. `_data/site.json` — `{ "name": "WerdsWords", "url": "..." }`
6. `_includes/layouts/base.njk` — HTML shell
7. `_includes/layouts/listing.njk` — post list partial
8. `_includes/layouts/post.njk` — single post layout with "View source" link
9. `public/style.css` — minimal styles
10. `index.njk` — homepage
11. `category-pages.njk` — generates `/{category}/` pages
12. `tag-pages.njk` — generates `/tags/{tag}/` pages
13. `tags.njk` — `/tags/` index
14. `content/example/hello-world.md` — sample post to verify everything works

---

## Verification

1. `npm install` — installs Eleventy and syntax highlight plugin
2. `npm start` — starts dev server at `http://localhost:8080`
3. Visit `/` — homepage lists posts
4. Click a post — rendered HTML with title, date, category, tags, syntax-highlighted code
5. Add `.md` suffix to post URL (e.g. `/example/hello-world.md`) — raw markdown served
6. Visit `/example/` — category page listing posts in that directory
7. Visit `/tags/` — all tags listed
8. Visit `/tags/meta/` — posts tagged `meta`
9. `npm run build` — `_site/` populated; check `_site/example/hello-world.md` exists alongside `_site/example/hello-world/index.html`
