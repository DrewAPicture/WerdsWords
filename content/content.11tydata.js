module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: data =>
      data.page.filePathStem.replace(/^\/content\//, "/") + "/",
    category: data => {
      const parts = data.page.filePathStem.split("/");
      return parts.length >= 3 ? parts[parts.length - 2] : null;
    }
  }
};
