(function () {
  var posts = [];
  var offset = 5;
  var BATCH = 5;
  var postList = document.getElementById('post-list');
  var sentinel = document.getElementById('scroll-sentinel');
  var loader = document.getElementById('loading-indicator');

  if (!postList || !sentinel) return;

  fetch('/posts.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      posts = data;
      if (posts.length <= offset) {
        sentinel.remove();
        return;
      }
      var observer = new IntersectionObserver(onIntersect, { rootMargin: '200px' });
      observer.observe(sentinel);
    })
    .catch(function () { sentinel.remove(); });

  function onIntersect(entries) {
    if (!entries[0].isIntersecting) return;
    loader.classList.remove('hidden');

    var batch = posts.slice(offset, offset + BATCH);
    batch.forEach(function (post) {
      postList.insertAdjacentHTML('beforeend', renderCard(post));
    });
    offset += batch.length;

    loader.classList.add('hidden');
    if (offset >= posts.length) sentinel.remove();
  }

  function renderCard(post) {
    var categoryHtml = post.category
      ? '<span class="font-typewriter text-xs text-accent uppercase tracking-widest">' + esc(post.category) + '</span>'
      : '';
    var descHtml = post.description
      ? '<p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">' + esc(post.description) + '</p>'
      : '';
    return '<article class="py-6 border-t border-stone-200 dark:border-stone-700">'
      + '<div class="flex items-center gap-3 mb-2">'
      + '<time class="font-typewriter text-xs text-stone-400 dark:text-stone-500">' + esc(post.date) + '</time>'
      + categoryHtml
      + '</div>'
      + '<h2 class="font-serif text-xl font-semibold mb-2 leading-snug">'
      + '<a href="' + esc(post.url) + '" class="text-ink dark:text-paper hover:text-accent dark:hover:text-accent transition-colors">' + esc(post.title) + '</a>'
      + '</h2>'
      + descHtml
      + '</article>';
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
