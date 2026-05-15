# Design Decisions

## Eleventy v3 over other SSGs

Eleventy was chosen for its zero-opinion approach: it imposes no client-side JS, no framework, and no build pipeline beyond what you opt into. The output is plain HTML files. Posts are just markdown. This makes the site trivially hostable, long-lived, and easy to migrate.

v3 specifically drops CommonJS-only constraints and aligns with modern Node ESM conventions, while remaining backward-compatible.

## Nunjucks over Liquid or other template engines

Nunjucks is the most capable template language Eleventy supports — it has macros, set/block scoping, and filters with parameters. Liquid (Eleventy's other first-class option) uses a different filter parameter syntax (`filter: value`) that is not compatible with Nunjucks, and is less expressive for conditional logic.

All templates in this project are `.njk`. Mixing template engines is avoided.

## Category via directory, not frontmatter

Categories are derived from the post's parent directory name (`content.11tydata.js`) rather than a frontmatter field. This enforces consistency (a post can only belong to one category, and it is always correct), removes the possibility of typos, and makes reorganizing a category as simple as renaming a folder.

## Raw markdown at sibling URL

The passthrough copy of `content/` into `_site/` root means `content/essays/hello.md` is served as `/essays/hello.md` — a sibling of the rendered `/essays/hello/`. This was a deliberate design goal: readers can access the source of any post by appending `.md` to the URL stem. There is no path conflict because rendered posts go to a subdirectory (`/hello/index.html`) while the raw file is a flat file (`/hello.md`).

## Listing layout with context detection

Rather than passing a `posts` variable down from each page, `listing.njk` reads `category` or `tag` from the template data cascade (set by Eleventy's pagination alias) and resolves the correct post set itself. This avoids the need for `eleventyComputed` boilerplate in every consuming template and keeps `category-pages.njk` and `tag-pages.njk` minimal.

## No CSS framework

The stylesheet is hand-written and minimal (~100 lines). The site is content-first; the CSS exists to make reading comfortable, not to impose a design system. This reduces build complexity and keeps the output portable.

## Syntax highlighting via Prism (plugin)

`@11ty/eleventy-plugin-syntaxhighlight` runs Prism at build time, emitting pre-highlighted HTML with no client-side JS required. Prism CSS is loaded from a CDN link in `base.njk`. This is a deliberate trade-off: the CDN link is a runtime dependency, but it avoids vendoring a large CSS file into the repo and keeps the plugin wiring simple.
