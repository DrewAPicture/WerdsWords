class PostsJSON {
  data() {
    return {
      permalink: "/posts.json",
      eleventyExcludeFromCollections: true,
    };
  }

  plainText(html, words = 30) {
    const text = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const arr = text.split(" ").filter(Boolean);
    return arr.length > words ? arr.slice(0, words).join(" ") + "…" : text;
  }

  render(data) {
    const posts = data.collections.posts.map(post => ({
      title: post.data.title || "",
      url: post.url,
      date: new Date(post.date).toISOString().split("T")[0],
      excerpt: this.plainText(post.templateContent, 30),
      category: post.data.category || "",
    }));
    return JSON.stringify(posts);
  }
}

module.exports = PostsJSON;
