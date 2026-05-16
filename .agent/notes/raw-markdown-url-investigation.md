# Investigation: Serving Raw Markdown at `/{slug}.md`

**Verdict: Feasible.** The infrastructure is almost there, but a URL mismatch means the feature doesn't currently work the way a user would expect.

---

## Current State

The Eleventy config passthrough-copies the entire `content/` directory into `_site/`:

```js
// .eleventy.js:7
eleventyConfig.addPassthroughCopy({ "content": "." });
```

Because passthrough copy preserves directory structure, a post at `content/wordpress/some-post.md` lands in `_site/wordpress/some-post.md`, served at `/wordpress/some-post.md`.

Meanwhile, the post's rendered HTML permalink strips the category:

```js
// content/content.11tydata.js:4-6
permalink: data => {
  const parts = data.page.filePathStem.split("/");
  return "/" + parts[parts.length - 1] + "/";
},
```

So the rendered post is at `/some-post/`.

### The mismatch

| What you want | What you get |
|---|---|
| `/some-post/` | Rendered HTML ✓ |
| `/some-post.md` | 404 — nothing here |
| `/wordpress/some-post.md` | Raw markdown ✓ (but not obvious) |

The "View source (.md)" link in `_includes/layouts/post.njk:21` generates the category-prefixed URL:

```nunjucks
<a href="{{ page.filePathStem | replace('/content/', '/') }}.md" ...>View source (.md)</a>
```

For a post in `content/wordpress/`, `page.filePathStem` is `/content/wordpress/some-post`, so this produces `/wordpress/some-post.md` — which does work, but a user cannot discover it by appending `.md` to the URL they're already on.

---

## Implementation

Add a new `11ty.js` template at the project root that paginates over all posts, reads each one's raw source, and outputs it at the flat slug URL.

### New file: `raw-posts.11ty.js`

```js
const fs = require("fs");

module.exports = class {
  data() {
    return {
      pagination: {
        data: "collections.posts",
        size: 1,
        alias: "post",
      },
      eleventyExcludeFromCollections: true,
      permalink: ({ post }) => post.url.replace(/\/$/, "") + ".md",
    };
  }

  render({ post }) {
    return fs.readFileSync(post.inputPath, "utf8");
  }
};
```

This produces one output file per post: `_site/{slug}.md` — the raw frontmatter + markdown source, served at `/{slug}.md`.

No conflict with the existing passthrough copy: that produces `/{category}/{slug}.md` while this produces `/{slug}.md`. Both can coexist, or the passthrough copy can be scoped to exclude `.md` files if dual-URL is undesirable (see below).

### Update the "View source" link

Once the flat URLs exist, update `_includes/layouts/post.njk:21` to point there instead of the category-prefixed URL:

```nunjucks
{# Before #}
<a href="{{ page.filePathStem | replace('/content/', '/') }}.md" ...>View source (.md)</a>

{# After #}
<a href="{{ page.url | replace(r/\/$/, '') }}.md" ...>View source (.md)</a>
```

`page.url` is the rendered permalink (e.g., `/some-post/`); trimming the trailing slash and appending `.md` gives `/some-post.md`.

---

## Side Effects and Considerations

### Dual raw URLs (low concern)
After this change, raw markdown would be accessible at two URLs:
- `/{slug}.md` — new, flat (matches the rendered URL pattern)
- `/{category}/{slug}.md` — existing, via passthrough copy

If you want only the flat URL, scope the passthrough copy to exclude `.md` files:

```js
eleventyConfig.addPassthroughCopy({
  "content": {
    expand: true,
    filter: ["**/*", "!**/*.md"],
  }
});
```

Or restructure it to only copy specific file types. This removes the category-prefixed raw URLs entirely.

### `content.11tydata.js` is publicly exposed (minor)
The passthrough copy also copies `content/content.11tydata.js` into `_site/`, making it accessible at `/content.11tydata.js`. This is harmless (it's just computed permalink logic) but unintentional. If the dual-URL cleanup above is done, the copy rule can be tightened to exclude `.js` files too.

### Build performance (negligible)
The pagination template adds one render call per post. Each call is a synchronous `fs.readFileSync` on a file already on disk — no meaningful overhead at the scale of this blog.

---

## Summary

| | Current | After implementation |
|---|---|---|
| Rendered post | `/some-post/` | `/some-post/` |
| Raw markdown (flat) | — (404) | `/some-post.md` ✓ |
| Raw markdown (category) | `/wordpress/some-post.md` | `/wordpress/some-post.md` (or removed) |
| "View source" link | `/wordpress/some-post.md` | `/some-post.md` |

The change is small: one new file (`raw-posts.11ty.js`) and one line updated in `post.njk`. The existing passthrough copy can be left alone or tightened depending on whether the category-prefixed raw URLs are worth keeping.
