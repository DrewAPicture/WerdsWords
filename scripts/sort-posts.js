// Sorts wp-export/ output into content/<category>/<slug>.md
// and moves images to public/images/<slug>/.
//
// Usage: node scripts/sort-posts.js [--dry-run]
//
// Expects wp-export/ at the repo root (output of wordpress-export-to-markdown).
// Writes into content/ and public/images/ — run from the repo root.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DRY_RUN = process.argv.includes("--dry-run");
const INPUT_DIR = path.resolve("wp-export/posts");
const CONTENT_DIR = path.resolve("content");
const IMAGES_DIR = path.resolve("public/images");

// Remap WordPress category slugs to different Eleventy categories
const CATEGORY_MAP = {
  "web-design": "wordpress",
};

if (!fs.existsSync(INPUT_DIR)) {
  console.error(`Error: ${INPUT_DIR} not found. Run wordpress-export-to-markdown first.`);
  process.exit(1);
}

const entries = fs.readdirSync(INPUT_DIR).filter(name =>
  fs.statSync(path.join(INPUT_DIR, name)).isDirectory()
);

let processed = 0;
let skipped = 0;

for (const folder of entries) {
  const indexPath = path.join(INPUT_DIR, folder, "index.md");

  if (!fs.existsSync(indexPath)) {
    console.warn(`  skip  ${folder} (no index.md)`);
    skipped++;
    continue;
  }

  const raw = fs.readFileSync(indexPath, "utf8");
  const { data, content } = matter(raw);

  // First category wins; normalise to lowercase-hyphenated; apply remaps
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const rawCategory = categories.length > 0
    ? categories[0].toLowerCase().replace(/\s+/g, "-")
    : "uncategorized";
  const category = CATEGORY_MAP[rawCategory] ?? rawCategory;

  const slug = data.slug || folder;
  const destDir = path.join(CONTENT_DIR, category);
  const destFile = path.join(destDir, `${slug}.md`);

  // Move images and rewrite references
  const imgSrc = path.join(INPUT_DIR, folder, "images");
  const imgDest = path.join(IMAGES_DIR, slug);
  let body = content;

  if (fs.existsSync(imgSrc)) {
    body = body.replace(/\(\.\/images\//g, `(/images/${slug}/`);
    if (!DRY_RUN) {
      fs.mkdirSync(imgDest, { recursive: true });
      fs.cpSync(imgSrc, imgDest, { recursive: true });
    }
  }

  // Strip fields Eleventy derives automatically (category from directory,
  // slug not needed in frontmatter)
  const { categories: _c, slug: _s, ...frontmatter } = data;

  if (DRY_RUN) {
    console.log(`  dry   ${slug} → content/${category}/${slug}.md`);
  } else {
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(destFile, matter.stringify(body, frontmatter));
    console.log(`  ok    ${slug} → content/${category}/${slug}.md`);
  }

  processed++;
}

const mode = DRY_RUN ? " (dry run)" : "";
console.log(`\n${processed} posts processed, ${skipped} skipped${mode}.`);
