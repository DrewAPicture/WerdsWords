# Architecture

## Directory Structure

```
/
├── content/                         ← posts; subdirectories = categories
│   ├── content.11tydata.js          ← computed permalink + category for all posts
│   └── <category>/
│       └── <slug>.md                ← post: YAML frontmatter + markdown body
├── _includes/layouts/
│   ├── base.njk                     ← HTML shell: <head>, nav, <main>, footer
│   ├── listing.njk                  ← post-list layout (home, category, tag pages)
│   └── post.njk                     ← single post: metadata, view-source link, content
├── _data/
│   └── site.json                    ← global: name, url, author
├── public/
│   └── style.css                    ← minimal CSS; served via passthrough copy
├── index.njk                        ← / — all posts newest-first
├── category-pages.njk               ← /{category}/ — one page per category
├── tag-pages.njk                    ← /tags/{tag}/ — one page per tag
├── tags.njk                         ← /tags/ — all tags listed
├── .eleventy.js                     ← Eleventy config: plugin, collections, filters
├── .eleventyignore
└── package.json
```

## Permalink Routing

`content/content.11tydata.js` uses `eleventyComputed` to derive each post's URL and category from its file path:

```
content/essays/hello.md  →  /essays/hello/  (rendered)
                         →  /essays/hello.md (raw, via passthrough)
```

- `permalink`: strips `/content/` prefix, appends `/`
- `category`: takes the parent directory name (second-to-last path segment)

## Raw Markdown Serving

`.eleventy.js` passthrough-copies the entire `content/` directory into `_site/` root:

```js
eleventyConfig.addPassthroughCopy({ "content": "." });
```

This means `content/essays/hello.md` lands at both:
- `_site/essays/hello/index.html` (rendered HTML)
- `_site/essays/hello.md` (raw file — no path conflict)

The post layout links to the raw file: `{{ page.filePathStem | replace('/content/', '/') }}.md`

## Collections

Defined in `.eleventy.js`, all sourced from `content/**/*.md`:

| Collection | Contents |
|---|---|
| `posts` | All posts sorted newest-first |
| `allCategories` | Sorted unique category strings |
| `allTags` | Sorted unique tag strings |
| `postsByTag` | Object keyed by tag → array of posts |

## Filters

| Filter | Purpose |
|---|---|
| `postsByCategory(posts, cat)` | Returns posts where `data.category === cat` |
| `dateISO(date)` | Formats a Date as `YYYY-MM-DD` |

## Listing Layout Context Detection

`listing.njk` auto-detects which posts to show based on what variables are in scope:

```
category set  →  collections.posts | postsByCategory(category)
tag set       →  collections.postsByTag[tag]
neither       →  collections.posts  (homepage default)
```

This lets `index.njk`, `category-pages.njk`, and `tag-pages.njk` all share the layout without needing to pass a `posts` variable.

## Post Frontmatter Convention

```yaml
---
title: Hello World
date: 2026-05-15
description: Brief description.
tags: [tag-a, tag-b]
---
```

`category` is never set in frontmatter — it is always derived from the directory name.
