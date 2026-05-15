module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: data => {
      const parts = data.page.filePathStem.split("/");
      return "/" + parts[parts.length - 1] + "/";
    },
    category: data => {
      const parts = data.page.filePathStem.split("/");
      return parts.length >= 3 ? parts[parts.length - 2] : null;
    }
  }
};
