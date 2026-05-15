const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Serve raw markdown files alongside rendered HTML
  eleventyConfig.addPassthroughCopy({ "content": "." });

  // All posts, newest first
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

  eleventyConfig.addFilter("postsByCategory", (posts, category) =>
    posts.filter(p => p.data.category === category)
  );

  eleventyConfig.addFilter("dateISO", date =>
    new Date(date).toISOString().split("T")[0]
  );

  // Posts keyed by tag
  eleventyConfig.addCollection("postsByTag", col => {
    const map = {};
    col.getFilteredByGlob("content/**/*.md").forEach(p => {
      (p.data.tags || []).forEach(t => {
        (map[t] = map[t] || []).push(p);
      });
    });
    return map;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
